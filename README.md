# LinkedIn Candidate Finder (MERN MVP)

A simple MERN-based web app that helps recruiters quickly find **LinkedIn profiles** using the **Google Custom Search API**.  
Search with keywords (e.g. `python developer bangalore`), get 20 results per page, and navigate up to 100 results with Next/Prev buttons.

---

## 🚀 Features
- Search any keyword/query (e.g. `"react developer AND remote"`)
- Boolean operators supported: `AND`, `OR`, `NOT`, `-keyword`
- Fetches **20 LinkedIn profiles per page** (up to 100 total)
- Clean snippets with **clickable profile links**
- Simple pagination (Prev / Next)
- Backend wrapper around Google CSE for safety
- Future-ready for filters (location, experience, skills, etc.)

---

## 🛠️ Tech Stack
- **Frontend:** React (Vite or CRA)
- **Backend:** Node.js + Express
- **API:** Google Custom Search JSON API
- **Extras:** Axios, CORS, dotenv, express-rate-limit

---

## ⚙️ Setup Instructions

### 1. Clone Repo
```bash
git clone https://github.com/your-username/linkedin-candidate-finder.git
cd linkedin-candidate-finder
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a .env file inside backend/:

```ini
GOOGLE_API_KEY=your_google_api_key
GOOGLE_CX=your_custom_search_engine_id
RESULTS_PER_PAGE=20
MAX_RESULTS=100
```
Start backend:
```bash
node server.js
```

Runs on: http://localhost:5000

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Start frontend:
```bash
npm run dev
```

Runs on: http://localhost:5173 (Vite) or http://localhost:3000 (CRA)


## 🔍 Example Search Queries

python developer bangalore

"data scientist" AND "remote"

"full stack developer" OR "frontend engineer"

"java developer" -intern

## 📌 Roadmap

 Add filters (Country, Experience, Skills)

 Export results to CSV

 Saved searches (with MongoDB)

 User accounts & authentication

 Polished UI with Tailwind / Material UI

 ---