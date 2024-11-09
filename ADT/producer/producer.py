from kafka import KafkaProducer
import os
import time
import logging
import base64
import json

# Настройка логирования
logging.basicConfig(level=logging.INFO)

# Логика повторного подключения
producer = None
while not producer:
    try:
        producer = KafkaProducer(
            bootstrap_servers=['kafka:9092'],
            value_serializer=lambda v: json.dumps(v).encode('utf-8')  # Кодирование JSON
        )
        logging.info("Успешное подключение к Kafka")
    except Exception as e:
        logging.error(f"Kafka недоступен, повторная попытка... Ошибка: {e}")
        time.sleep(5)

# Папка с изображениями для отправки
image_folder = 'images_to_send'

# Пример параметров
user_id = "user_123"
field_id = "field_456"
coordinates = {"latitude": 35.6895, "longitude": 139.6917}
soil_type = "Песчаная"
crop_type = "wheat"

# Отправляем изображения в Kafka
for filename in os.listdir(image_folder):
    if filename.endswith(".jpg") or filename.endswith(".png"):
        with open(os.path.join(image_folder, filename), 'rb') as image_file:
            # Кодируем изображение в base64
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
            logging.info(f'Изображение {filename} и параметры отправлены в Kafka')
        time.sleep(2)  # Пауза, чтобы консюмер успел обработать данные

producer.close()
