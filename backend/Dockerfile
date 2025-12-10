FROM python:3.10-slim

# Install build tools and MySQL client headers
RUN apt-get update && \
    apt-get install -y --no-install-recommends build-essential pkg-config default-libmysqlclient-dev && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . /app

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

ENV PORT=8080
EXPOSE 8080

# Use gunicorn to serve the Flask app; ensure it binds to the PORT env var
CMD exec gunicorn -w 2 -b 0.0.0.0:$PORT app:app