# Meal & Grocery Planner (MVP)

This is the MVP (Minimum Viable Product) for the Meal & Grocery Planner web application.

---

## ✅ Current MVP Features

### **Backend (Flask)**
- Returns: `{ "message": "Meal Planner Backend Running!" }`
- Runs on port **5000**
- Containerized in Docker

### **Frontend (React + Vite)**
- Simple homepage that displays:  
  **"Meal & Grocery Planner Frontend Running"**
- Runs on port **5173**
- Will connect to backend in Sprint 2

---

## ⚙️ Tech Stack
- **Frontend:** React (Vite)
- **Backend:** Python Flask
- **Database:** MySQL (coming later)
- **Deployment:** Docker + Google Cloud Run
- **AI Tools:** Copilot + ChatGPT used for development

---

## 🚀 Running Locally

### Backend
cd backend
pip install -r requirements.txt
python app.py

### Frontend
cd frontend
npm install
npm run dev


---

## 📦 Docker

### Backend Docker
cd backend
docker build -t meal-backend .
docker run -p 5000:5000 meal-backend


(Frontend Docker coming later)

---

## 🧠 AI Usage Documentation
Examples of AI assistance:
- Backend Flask app structure (ChatGPT)
- Dockerfile creation (ChatGPT)
- React boilerplate simplification (ChatGPT)
- Commit message suggestions (ChatGPT)
- Folder architecture decisions (ChatGPT)
- Error troubleshooting (ChatGPT)

---

## 🔜 Next Sprint (Unit 13)
- Connect frontend → backend
- Add form for adding meals
- Store meals in MySQL
- Add CI/CD pipeline
