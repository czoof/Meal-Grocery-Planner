# Google Cloud Run Deployment Guide

This guide walks through deploying the Meal & Grocery Planner to Google Cloud Run.

## Prerequisites

1. **Google Cloud Account** - Create one at https://cloud.google.com
2. **Google Cloud CLI** - Download from https://cloud.google.com/sdk/docs/install
3. **Docker** - Already have this ✅

## Step 1: Set Up Google Cloud Project

```powershell
# Install Google Cloud CLI (if not already installed)
# Download from: https://cloud.google.com/sdk/docs/install-sdk#windows

# Initialize gcloud and authenticate
gcloud init

# Set your project ID (you'll create this in GCP Console)
$PROJECT_ID = "your-project-id"
gcloud config set project $PROJECT_ID

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

## Step 2: Create Google Cloud Project

1. Go to https://console.cloud.google.com/
2. Click "Create Project"
3. Name it "Meal-Grocery-Planner"
4. Click "Create"
5. Wait for the project to be created
6. Copy the Project ID (format: `project-name-12345`)

## Step 3: Configure Docker Authentication

```powershell
# Authenticate Docker with Google Cloud Container Registry
gcloud auth configure-docker

# Verify authentication worked
docker info
```

## Step 4: Build and Push Backend to Container Registry

```powershell
# Set variables
$PROJECT_ID = "your-project-id"
$BACKEND_IMAGE = "gcr.io/$PROJECT_ID/meal-backend"

# Build backend image
docker build -t $BACKEND_IMAGE backend/

# Push to Google Container Registry
docker push $BACKEND_IMAGE

# Verify it uploaded
gcloud container images list
```

## Step 5: Build and Push Frontend to Container Registry

```powershell
# Set variables
$PROJECT_ID = "your-project-id"
$FRONTEND_IMAGE = "gcr.io/$PROJECT_ID/meal-frontend"

# Build frontend image
docker build -t $FRONTEND_IMAGE frontend/

# Push to Google Container Registry
docker push $FRONTEND_IMAGE

# Verify it uploaded
gcloud container images list
```

## Step 6: Deploy Backend to Cloud Run

```powershell
$PROJECT_ID = "your-project-id"
$BACKEND_IMAGE = "gcr.io/$PROJECT_ID/meal-backend"

gcloud run deploy meal-backend `
  --image $BACKEND_IMAGE `
  --platform managed `
  --region us-central1 `
  --allow-unauthenticated `
  --port 8080

# The command will output a service URL like:
# Service URL: https://meal-backend-xxx.run.app
```

## Step 7: Deploy Frontend to Cloud Run

After deploying the backend, you'll have a backend URL. Update the frontend `.env`:

```powershell
# Save the backend URL from Step 6
$BACKEND_URL = "https://meal-backend-xxx.run.app"

# Update frontend/.env with the backend URL
# Edit: frontend/.env
# Change: VITE_BACKEND_URL=$BACKEND_URL
```

Then deploy frontend:

```powershell
$PROJECT_ID = "your-project-id"
$FRONTEND_IMAGE = "gcr.io/$PROJECT_ID/meal-frontend"

gcloud run deploy meal-frontend `
  --image $FRONTEND_IMAGE `
  --platform managed `
  --region us-central1 `
  --allow-unauthenticated `
  --port 5173

# The command will output a service URL like:
# Service URL: https://meal-frontend-xxx.run.app
```

## Step 8: Test Deployment

Visit the frontend URL from Step 7 in your browser. You should see your app!

## Troubleshooting

**View logs:**
```powershell
gcloud run logs read meal-backend
gcloud run logs read meal-frontend
```

**Update a service:**
```powershell
# Re-push new image and redeploy
docker build -t gcr.io/$PROJECT_ID/meal-backend backend/
docker push gcr.io/$PROJECT_ID/meal-backend
gcloud run deploy meal-backend --image gcr.io/$PROJECT_ID/meal-backend --region us-central1
```

**Delete a service:**
```powershell
gcloud run services delete meal-backend
gcloud run services delete meal-frontend
```

## Your Deployment URLs

Once deployed, you'll have URLs like:
- **Frontend:** https://meal-frontend-xxx.run.app
- **Backend:** https://meal-backend-xxx.run.app

Submit these URLs as part of your assignment!
