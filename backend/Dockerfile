
FROM python:3.10

# Install all system dependencies for mysqlclient
RUN apt-get update && apt-get install -y gcc default-libmysqlclient-dev libmysqlclient-dev build-essential pkg-config && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . /app
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 5000
CMD ["python", "app.py"]