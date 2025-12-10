
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

EXPOSE 5000
CMD ["python", "app.py"]