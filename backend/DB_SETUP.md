# Google Cloud SQL setup instructions for backend

1. Go to https://console.cloud.google.com/sql and create a new MySQL instance.
2. Set the database name to `mealplanner` and note the username/password.
3. In your Cloud Run service, set the following environment variable:
   - `DATABASE_URL=mysql://USERNAME:PASSWORD@HOST/mealplanner`
   (Replace USERNAME, PASSWORD, and HOST with your actual values)
4. Make sure your backend requirements.txt includes Flask-SQLAlchemy and mysqlclient.
5. Redeploy your backend to Cloud Run with the updated environment variable.

# Local MySQL setup (for development)
1. Install MySQL locally.
2. Create a database: `CREATE DATABASE mealplanner;`
3. Update backend/app.py connection string if needed.
4. Run `pip install Flask-SQLAlchemy mysqlclient` in your backend folder.
5. Start backend: `python app.py` (it will auto-create tables).
