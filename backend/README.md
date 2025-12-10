# Meal Planner Backend

Flask backend API for the Meal Grocery Planner application.

## Cloud Run Deployment

Cloud Run requires the service to bind to the PORT environment variable (default 8080). The container uses gunicorn and exposes port 8080.

## Local Development

To run locally:

```bash
pip install -r requirements.txt
python app.py
```

The application will default to port 8080 if PORT environment variable is not set.

## Docker

To build and run with Docker:

```bash
docker build -t meal-planner-backend .
docker run -e PORT=8080 -p 8080:8080 meal-planner-backend
```
