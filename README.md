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

---

## 🌐 Deployed Application
Your live backend is deployed on Google Cloud Run:
**URL:** [https://meal-planner-122732189394.us-central1.run.app](https://meal-planner-122732189394.us-central1.run.app)

Your live frontend is deployed on Google Cloud Run:
**URL:** [https://meal-planner-frontend-122732189394.us-central1.run.app](https://meal-planner-frontend-122732189394.us-central1.run.app)

---

## 📝 Submission Links
- **GitHub Repository:** [https://github.com/czoof/Meal-Grocery-Planner](https://github.com/czoof/Meal-Grocery-Planner)
- **Jira Project:** [https://charleszoof.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog?epics=visible](https://charleszoof.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog?epics=visible)
- **Confluence Space:** [https://charleszoof.atlassian.net/wiki/spaces/MGPD/pages/196739/Project+Overview](https://charleszoof.atlassian.net/wiki/spaces/MGPD/pages/196739/Project+Overview)

---

## 📋 CI/CD Pipeline
Automated tests and deployment are handled by GitHub Actions. On every push to `main`:
- Backend and frontend tests run
- If tests pass, code is deployed to Google Cloud Run

See `.github/workflows/ci-cd.yml` for details.

---

## 📚 Documentation & Project Management
- **Jira:** Sprints, user stories, and tasks are tracked and publicly viewable
- **Confluence:** Project overview, sprint retrospectives, and technical documentation

---

## 🏁 How to Submit
Submit the following links:
1. GitHub repository (with branches, commits, and README)
2. Deployed Cloud Run URLs (frontend & backend)
3. Jira project URL (public)
4. Confluence space URL (public)
