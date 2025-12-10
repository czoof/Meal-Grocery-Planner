
FROM python:3.10

RUN apt-get update
RUN apt-get install -y pkg-config default-libmysqlclient-dev
RUN which pkg-config && pkg-config --version

WORKDIR /app
COPY . /app
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 5000
CMD ["python", "app.py"]