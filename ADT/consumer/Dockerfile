# Используем базовый образ Python
FROM python:3.8-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем системные зависимости, если они нужны (например, libgl для работы с OpenCV или Pillow)
RUN apt-get update && \
    apt-get install -y --no-install-recommends libgl1-mesa-glx && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Копируем requirements.txt и устанавливаем все Python-зависимости
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем остальные файлы (код и модели)
COPY consumer.py /app/consumer.py
COPY model/WheatDiseaseDetection.h5 /app/model/
COPY recommendations.json /app/recommendations.json

# Запускаем Consumer
CMD ["python", "consumer.py"]
