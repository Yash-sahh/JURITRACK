# ⚖️ NyayaSarthi
### *From Court Judgments to Actionable Outcomes*

> NyayaSarthi is an AI-powered prototype that transforms dense, unstructured court judgment PDFs into clean, structured, trackable action items — with a human-in-the-loop verification step before anything hits the dashboard.

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Workflow](#-workflow)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Setup Instructions](#️-setup-instructions)
- [Deployment](#-deployment)
- [API Reference](#-api-reference)
- [Future Improvements](#-future-improvements)
- [License](#-license)

---

## 📌 About

Court judgments are long, complex, and hard to act on. NyayaSarthi bridges that gap.

Upload a judgment PDF → let AI extract the key actions, departments, deadlines, and risk levels → verify the output yourself → track everything on a clean dashboard. That's it.

Built as a hackathon prototype, NyayaSarthi demonstrates how AI can make legal compliance faster, clearer, and less error-prone.

---

## 🚀 Features

- 📄 **PDF Upload** – Simple drag-and-drop or click-to-upload for court judgment files
- 🔍 **Text Extraction** – Pulls full readable text from uploaded PDFs automatically
- 🧠 **AI Processing** – Uses Gemini API to identify:
  - ✅ Required actions
  - 🏛️ Responsible departments
  - 📅 Deadlines
  - 🔴 Risk levels (Low / Medium / High)
- 👤 **Human Verification** – Review and approve or reject AI-extracted data before it's finalized
- 📊 **Dashboard View** – See all approved actions in one organized, trackable place

---

## 🧩 Workflow

```
1. Upload PDF
       ↓
2. Text Extraction (backend parses the document)
       ↓
3. AI Processing (Gemini identifies actions, deadlines, departments, risk)
       ↓
4. Human Verification (you review the AI output and approve/edit)
       ↓
5. Dashboard (approved data is stored and displayed)
```

---

## 🛠️ Tech Stack

### Frontend
| Tool | Purpose |
|------|---------|
| React | UI framework |
| Tailwind CSS | Styling |
| Axios | API calls to backend |

### Backend
| Tool | Purpose |
|------|---------|
| FastAPI | REST API framework |
| Python | Core language |
| PyMuPDF / pdfplumber | PDF text extraction |
| Google Gemini API | AI processing |

---

## 📁 Project Structure

```
NYAYASARTHI/
│
├── backend/                        # FastAPI backend
│   ├── ai_processor.py             # Gemini AI integration & prompt logic
│   ├── config.py                   # App configuration & env variables
│   ├── main.py                     # FastAPI app entry point
│   ├── models.py                   # Pydantic request/response models
│   ├── pdf_utils.py                # PDF text extraction utilities
│   └── requirements.txt            # Python dependencies
│
├── frontend/                       # React frontend
│   ├── build/                      # Production build output (auto-generated)
│   ├── public/
│   │   └── index.html              # HTML entry point
│   ├── src/
│   │   ├── components/
│   │   │   ├── ActionTable.js      # Displays extracted actions in table format
│   │   │   ├── FileUpload.js       # PDF upload component
│   │   │   └── Navbar.js           # Navigation bar
│   │   ├── pages/                  # Route-level page components
│   │   ├── App.js                  # Root component & routing
│   │   ├── index.js                # React DOM entry point
│   │   └── styles.css              # Global styles
│   ├── .env.example                # Sample environment variables
│   ├── package.json                # Frontend dependencies
│   └── package-lock.json
│
├── .gitignore
└── package-lock.json
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Yash-sahh/NyayaSarthi
cd nyayasarthi
```

---

### 2. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

#### Backend `.env` file

Create a `.env` file inside the `backend/` folder:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

#### Run the backend

```bash
uvicorn main:app --reload
```

Backend will be live at: `http://localhost:8000`

---

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install
```

#### Frontend `.env` file

A `.env.example` is already provided in the `frontend/` folder. Copy it and fill in your values:

```bash
cp .env.example .env
```

```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

#### Run the frontend

```bash
npm run dev
```

Frontend will be live at: `http://localhost:5173`

---

## 🌐 Deployment

### Frontend → Netlify

1. Push your `frontend/` folder (or the whole repo) to GitHub
2. Go to [netlify.com](https://netlify.com) → **New Site from Git**
3. Set **Build Command**: `npm run build`
4. Set **Publish Directory**: `dist` (or `build` for CRA)
5. Add environment variable in Netlify dashboard:
   ```
   REACT_APP_BACKEND_URL = https://nyayasarthi-production-21cb.up.railway.app
   ```
6. Deploy ✅

---

### Backend → Railway

1. Go to [railway.app](https://railway.app) → **New Project → Deploy from GitHub**
2. Select your repository and point to the `backend/` folder
3. Add environment variable in Railway dashboard:
   ```
   GEMINI_API_KEY = your_gemini_api_key_here
   ```
4. Railway will auto-detect FastAPI and deploy it
5. Copy the generated Railway URL (e.g., `https://nyayasarthi-production-21cb.up.railway.app/`)

---

### Connecting Frontend and Backend

Once both are deployed:

- Go to your **Netlify** site settings → Environment Variables
- Update `REACT_APP_BACKEND_URL` to your Railway backend URL:
  ```
  REACT_APP_BACKEND_URL = https://nyayasarthi-production-21cb.up.railway.app/
  ```
- Redeploy the frontend — done! 🎉
- final deployed = 'https://nyayasharthi.netlify.app'

---

## 📡 API Reference

### `POST /upload`

Upload a court judgment PDF for processing.

**Request:**
```
Content-Type: multipart/form-data

file: <PDF file>
```

**Response:**
```json
{
  "status": "success",
  "extracted_text": "...full text from the PDF...",
  "ai_output": {
    "actions": [
      {
        "action": "Submit compliance report",
        "department": "Revenue Department",
        "deadline": "2025-08-15",
        "risk_level": "High"
      }
    ]
  }
}
```

**Error Response:**
```json
{
  "status": "error",
  "message": "Could not extract text from the provided PDF."
}
```

---

## 🔮 Future Improvements

- 🔐 User authentication and role-based access
- 📬 Email/SMS alerts for approaching deadlines
- 🗃️ Database integration (PostgreSQL) for persistent storage
- 📤 Export approved actions as CSV or Excel
- 🌍 Multi-language support for regional court judgments
- 🤖 Fine-tuned legal AI model instead of general-purpose Gemini

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 NyayaSarthi Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

See the full [LICENSE](./LICENSE) file for details.

---

<div align="center">
  <sub>Built with ☕ and a belief that legal compliance shouldn't require a law degree.</sub>
</div>
