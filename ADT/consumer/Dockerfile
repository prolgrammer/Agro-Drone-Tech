# consumer/Dockerfile

FROM python:3.8-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY consumer.py .
COPY recommendations.json /app/recommendations.json

CMD ["python", "consumer.py"]