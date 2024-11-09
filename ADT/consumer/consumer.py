import json
import numpy as np
import tensorflow as tf
from keras.models import load_model
from kafka import KafkaConsumer
import io
from PIL import Image
import os
import logging
import base64
import concurrent.futures

logging.basicConfig(level=logging.INFO)
logging.info("Запуск consumer.py начат")

model_path = '/app/model/WheatDiseaseDetection.h5'
recommendations_path = '/app/recommendations.json'

if not os.path.exists(model_path):
    logging.error(f"Файл модели {model_path} не найден.")
    exit(1)

if not os.path.exists(recommendations_path):
    logging.error(f"Файл рекомендаций {recommendations_path} не найден.")
    exit(1)

model = load_model(model_path)
logging.info("Модель загружена успешно")

with open(recommendations_path, 'r', encoding='utf-8') as f:
    recommendations = json.load(f)
logging.info("Рекомендации загружены успешно")

consumer = KafkaConsumer(
    'image_topic',
    bootstrap_servers=[os.getenv("KAFKA_BROKER", "kafka:9092")],
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='image_processing_group',
    value_deserializer=lambda m: json.loads(m.decode('utf-8')),
    fetch_min_bytes=1,
    fetch_max_wait_ms=100
)

def preprocess_image(image_data_base64):
    image_data = base64.b64decode(image_data_base64)
    image = Image.open(io.BytesIO(image_data))
    image = image.resize((255, 255))
    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

def process_message(message):
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

    processed_image = preprocess_image(image_data_base64)
    prediction = model.predict(processed_image)
    predicted_class = np.argmax(prediction, axis=1)[0]
    predicted_class_name = list(recommendations.keys())[predicted_class]
    disease_info = recommendations.get(predicted_class_name, {})

    disease_description = disease_info.get("description", "Неизвестная болезнь")
    general_recommendation = disease_info.get("general", "Общие рекомендации отсутствуют")
    soil_specific_recommendation = disease_info.get("soil_specific", {}).get(soil_type, "Рекомендации для этого типа почвы отсутствуют")

    logging.info(f"User ID: {user_id}, Field ID: {field_id}")
    logging.info(f"Координаты: {coordinates.get('latitude')}, {coordinates.get('longitude')}")
    logging.info(f"Культура: {crop_type}, Тип почвы: {soil_type}")
    logging.info(f"Класс болезни: {predicted_class} — {disease_description}")
    logging.info(f"Общие рекомендации: {general_recommendation}")
    logging.info(f"Почвенно-специфические рекомендации: {soil_specific_recommendation}")

logging.info("Запуск Kafka Consumer")

with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
    for message in consumer:
        executor.submit(process_message, message)
