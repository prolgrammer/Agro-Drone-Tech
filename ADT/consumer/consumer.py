import json
import numpy as np
import tensorflow as tf
from keras.models import load_model
from kafka import KafkaConsumer, KafkaProducer
import io
from PIL import Image
import os
import logging
import base64
import concurrent.futures
import threading
import time

logging.basicConfig(level=logging.INFO)
logging.info("Запуск consumer.py начат")

# Мьютекс для синхронизации вывода
lock = threading.Lock()

# Пути к модели и рекомендациям
model_path = '/app/model/WheatDiseaseDetection.h5'
recommendations_path = '/app/recommendations.json'

# Функция для загрузки модели и рекомендаций
def load_model_and_recommendations():
    global model, recommendations
    try:
        model = load_model(model_path)
        logging.info("Модель загружена успешно")
    except Exception as e:
        logging.error(f"Ошибка при загрузке модели: {e}")
        exit(1)

    try:
        with open(recommendations_path, 'r', encoding='utf-8') as f:
            recommendations = json.load(f)
        logging.info("Рекомендации загружены успешно")
    except Exception as e:
        logging.error(f"Ошибка при загрузке рекомендаций: {e}")
        exit(1)

# Запуск загрузки модели и рекомендаций в отдельном потоке
load_thread = threading.Thread(target=load_model_and_recommendations)
load_thread.start()
load_thread.join()

# Инициализация Kafka Consumer
consumer = KafkaConsumer(
    'image_topic',
    bootstrap_servers=[os.getenv("KAFKA_BROKER", "kafka:9092")],
    auto_offset_reset='earliest',
    enable_auto_commit=False,
    group_id='image_processing_group',
    value_deserializer=lambda m: json.loads(m.decode('utf-8')),
    fetch_min_bytes=1,
    fetch_max_wait_ms=50
)

# Инициализация Kafka Producer
producer = None
while not producer:
    try:
        logging.info("Попытка подключения к Kafka Producer...")
        producer = KafkaProducer(
            bootstrap_servers=[os.getenv("KAFKA_BROKER", "kafka:9092")],
            acks='all',
            value_serializer=lambda v: json.dumps(v).encode('utf-8')
        )
        logging.info("Успешное подключение к Kafka Producer")
    except Exception as e:
        logging.error(f"Kafka недоступен, повторная попытка... Ошибка: {e}")
        time.sleep(5)

# Функция для предобработки изображения
def preprocess_image(image_data_base64):
    image_data = base64.b64decode(image_data_base64)
    image = Image.open(io.BytesIO(image_data))
    image = image.resize((255, 255))
    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

# Функция для отправки обработанных данных через Kafka Producer
def send_processed_data(user_id, field_id, disease_class, disease_description, general_recommendation, soil_specific_recommendation):
    response_message = {
        "user_id": user_id,
        "field_id": field_id,
        "disease_class": disease_class,
        "disease_description": disease_description,
        "general_recommendation": general_recommendation,
        "soil_specific_recommendation": soil_specific_recommendation
    }
    producer.send('processed_data_topic', response_message)
    logging.info(f"Данные для user_id: {user_id} отправлены обратно в Kafka")

# Основная функция для обработки сообщений
def process_message(message):
    with lock:
        try:
            logging.info("Обработка сообщения начата")
            user_id = message.value.get("user_id")
            field_id = message.value.get("field_id")
            coordinates = message.value.get("coordinates", {})
            soil_type = message.value.get("soil_type")
            crop_type = message.value.get("crop_type")
            image_data_base64 = message.value.get("image_data")

            if not image_data_base64:
                logging.error("Изображение отсутствует в сообщении.")
                return

            # Предобработка изображения и предсказание
            processed_image = preprocess_image(image_data_base64)
            prediction = model.predict(processed_image)
            predicted_class = np.argmax(prediction, axis=1)[0]
            predicted_class_name = list(recommendations.keys())[predicted_class]
            disease_info = recommendations.get(predicted_class_name, {})

            disease_description = disease_info.get("description", "Неизвестная болезнь")
            general_recommendation = disease_info.get("general", "Общие рекомендации отсутствуют")
            soil_specific_recommendation = disease_info.get("soil_specific", {}).get(soil_type, "Рекомендации для этого типа почвы отсутствуют")

            # Логирование всей информации
            logging.info(f"User ID: {user_id}, Field ID: {field_id}")
            logging.info(f"Координаты: {coordinates.get('latitude')}, {coordinates.get('longitude')}")
            logging.info(f"Культура: {crop_type}, Тип почвы: {soil_type}")
            logging.info(f"Класс болезни: {predicted_class_name} — {disease_description}")
            logging.info(f"Общие рекомендации: {general_recommendation}")
            logging.info(f"Почвенно-специфические рекомендации: {soil_specific_recommendation}")

            # Отправка обработанных данных через Kafka Producer
            send_processed_data(
                user_id=user_id,
                field_id=field_id,
                disease_class=predicted_class_name,
                disease_description=disease_description,
                general_recommendation=general_recommendation,
                soil_specific_recommendation=soil_specific_recommendation
            )

            # Подтверждение смещения после успешной обработки
            consumer.commit()

        except Exception as e:
            logging.error(f"Ошибка при обработке сообщения: {e}")

# Использование ThreadPoolExecutor для обработки сообщений в несколько потоков
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
    for message in consumer:
        executor.submit(process_message, message)
