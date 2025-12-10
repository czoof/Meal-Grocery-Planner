# Backend - Meal Grocery Planner

## Cloud Run Deployment Note

Cloud Run provides a `PORT` environment variable (default 8080). The backend must bind to `0.0.0.0:$PORT`. The Dockerfile runs gunicorn which binds to `${PORT}` at runtime.

## Local Testing

To test the Docker image locally and verify it binds to the PORT environment variable:

```bash
docker build -t meal-planner-backend ./backend
docker run -e PORT=8080 -p 8080:8080 meal-planner-backend
curl http://localhost:8080/
```

The curl command should return a JSON response indicating the backend is running.
