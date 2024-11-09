FROM python:3.8-slim

WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY consumer.py .
COPY recommendations.json /app/recommendations.json

CMD ["python", "consumer.py"]
