# Google Cloud Run Manual Deployment (Web Console)

This is the easiest way to deploy! You'll use the Google Cloud Console web interface.

## Step 1: Prepare Your Code

Commit your changes to GitHub:

```powershell
cd C:\Users\charl\Meal-Grocery-Planner
git add .
git commit -m "Prepare for Google Cloud deployment"
git push origin feature/frontend-setup
```

## Step 2: Go to Google Cloud Console

1. Open: https://console.cloud.google.com/
2. Make sure you're in your project (top-left corner shows "project-c4048e96-6c8d-4d4a-950")

## Step 3: Deploy Backend to Cloud Run

1. Click the **Cloud Run** service in the left sidebar (or search for "Cloud Run")
2. Click **Create Service**
3. Select **Continuously deploy from a source repository**
4. Click **Set Up Cloud Build**

### Connect your GitHub Repository:

1. Click **Connect repository**
2. Select "GitHub" as source
3. Authenticate with your GitHub account
4. Select repository: **czoof/Meal-Grocery-Planner**
5. Click **Connect**

### Configure Build Settings:

1. Branch: `main` (or `feature/frontend-setup`)
2. Build type: **Dockerfile**
3. Dockerfile location: `backend/Dockerfile`
4. Click **Save**

### Configure Cloud Run Service:

1. **Service name:** `meal-backend`
2. **Region:** `us-central1`
3. **Authentication:** Allow unauthenticated invocations
4. **Container port:** `8080`
5. Under **Environment variables**, add:
   - `PORT` = `8080`

6. Click **Create**

**Save the service URL** - it will look like: `https://meal-backend-xxxxx.run.app`

## Step 4: Update Frontend .env with Backend URL

1. After backend deploys, edit `frontend/.env`:

```
VITE_BACKEND_URL=https://meal-backend-xxxxx.run.app/
```

Replace `xxxxx` with your actual Cloud Run URL.

2. Commit and push:
```powershell
git add frontend/.env
git commit -m "Update backend URL for Cloud Run deployment"
git push origin feature/frontend-setup
```

## Step 5: Deploy Frontend to Cloud Run

1. Back in Google Cloud Console, go to **Cloud Run**
2. Click **Create Service**
3. Select **Continuously deploy from a source repository**
4. Click **Set Up Cloud Build**

### Configure for Frontend:

1. Select your repository again: **czoof/Meal-Grocery-Planner**
2. Branch: `main` (or `feature/frontend-setup`)
3. Build type: **Dockerfile**
4. Dockerfile location: `frontend/Dockerfile`
5. Click **Save**

### Configure Cloud Run Service:

1. **Service name:** `meal-frontend`
2. **Region:** `us-central1`
3. **Authentication:** Allow unauthenticated invocations
4. **Container port:** `5173`
5. Click **Create**

**Save the service URL** - it will look like: `https://meal-frontend-xxxxx.run.app`

## Step 6: Test Your Deployment

1. Open the frontend URL in your browser: `https://meal-frontend-xxxxx.run.app`
2. If you see your app, congratulations! 🎉
3. If there are errors, check the logs:
   - In Cloud Run console, click on your service
   - Click **Logs** tab to see what went wrong

## Your Deployment URLs

Save these for your assignment submission:

- **Frontend:** https://meal-frontend-xxxxx.run.app
- **Backend:** https://meal-backend-xxxxx.run.app

---

## Troubleshooting

If deployment fails:

1. **Check build logs:** Cloud Run console → Your service → Logs
2. **Common issues:**
   - Dockerfile not found → Check dockerfile path
   - Port issues → Make sure PORT env variable is set to 8080
   - Build failures → Check requirements.txt or package.json for errors

3. **Rebuild manually:**
   - In Cloud Run console, click your service
   - Click **Triggers** tab
   - Select your trigger and click **Run**

