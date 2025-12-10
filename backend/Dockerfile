
FROM python:3.10

# Install build tools, pkg-config, and MySQL client headers in a single RUN
RUN apt-get update && \
	apt-get install -y --no-install-recommends build-essential pkg-config default-libmysqlclient-dev && \
	rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . /app

# Upgrade pip to avoid old pip build issues
RUN pip install --upgrade pip

# Install Python dependencies (mysqlclient can now build)
RUN pip install --no-cache-dir -r requirements.txt

# Cloud Run expects the service to listen on $PORT (8080)
ENV PORT=8080
EXPOSE 8080
# Use Gunicorn to serve Flask app and bind to $PORT
CMD ["bash", "-c", "gunicorn --bind 0.0.0.0:${PORT} app:app"]