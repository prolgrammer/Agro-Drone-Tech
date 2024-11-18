from kafka import KafkaProducer
import os
import time
import logging
import base64
import json

logging.basicConfig(level=logging.INFO)

logging.info("Запуск producer.py начат")

# Условие для временного выключения продюсера
TEMP_DISABLE_PRODUCER = True  # Установите True для отключения

if TEMP_DISABLE_PRODUCER:
    logging.info("Продюсер временно отключен.")
producer = None
while not producer:
    try:
        logging.info("Попытка подключения к Kafka...")
        producer = KafkaProducer(
            bootstrap_servers=[os.getenv("KAFKA_BROKER", "kafka:9092")],
            acks='all',
            value_serializer=lambda v: json.dumps(v).encode('utf-8')
        )

        logging.info("Успешное подключение к Kafka")
    except Exception as e:
        logging.error(f"Kafka недоступен, повторная попытка... Ошибка: {e}")
        time.sleep(5)

image_folder = 'images_to_send'
user_id = "user_123"
field_id = "field_456"
coordinates = {"latitude": 35.6895, "longitude": 139.6917}
soil_type = "Песчаная"
crop_type = "wheat"

logging.info("Начинаем отправку изображений")

for filename in os.listdir(image_folder):
    if filename.endswith(".jpg") or filename.endswith(".png"):
        with open(os.path.join(image_folder, filename), 'rb') as image_file:
            image_data_base64 = base64.b64encode(image_file.read()).decode('utf-8')
            message = {
                "user_id": user_id,
                "field_id": field_id,
                "coordinates": coordinates,
                "soil_type": soil_type,
                "crop_type": crop_type,
                "image_data": image_data_base64
            }
            producer.send('image_topic', message)
            logging.info(f'Изображение {filename} отправлено в Kafka')
        time.sleep(4)  # Ожидание 10 секунд перед началом отправки сообщений

logging.info("Завершение работы producer.py")
producer.close()
