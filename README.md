# AuraTrack 🚀

AuraTrack is a premium, high-fidelity productivity tracking platform designed to monitor digital flow, focus sessions, and workspace analytics across all devices.

## 🌟 Key Features
- **Bento-Grid Dashboard**: A modern, interactive UI for real-time productivity metrics.
- **Deep Work Tracking**: Monitor focus sessions and flow distribution.
- **AI Insights**: Integrated with Gemini AI for personalized productivity coaching.
- **Live Sync**: Real-time connection between frontend analytics and backend data.

## 🛠 Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion, Recharts.
- **Backend**: FastAPI (Python), PostgreSQL, SQLModel, Uvicorn.
- **Database**: PostgreSQL (Auto-initializing).

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+)
- **Python** (3.10+)
- **PostgreSQL** (Running locally or on a server)

### 1. Clone the Repository
```bash
git clone https://github.com/Awais-0/AuraTrack.git
cd AuraTrack
```

### 2. Backend Setup
Navigate to the `backend` directory:
```bash
cd backend
```
- **Install Dependencies**:
  ```bash
  pip install -r requirements.txt
  ```
- **Environment Variables**:
  Create a `.env` file based on `.env.example`:
  ```env
  PORT=8000
  DATABASE_USERNAME=postgres
  DATABASE_PASSWORD=your_password
  DATABASE_HOSTNAME=localhost
  DATABASE_PORT=5432
  DATABASE_NAME=auratrack
  ```
- **Run the Server**:
  ```bash
  python run.py
  ```
  *Note: The database and tables will be created automatically on the first run.*

### 3. Frontend Setup
Navigate to the `frontend` directory:
```bash
cd frontend
```
- **Install Dependencies**:
  ```bash
  npm install
  ```
- **Environment Variables**:
  Create a `.env` file:
  ```env
  VITE_API_URL=http://localhost:8000
  VITE_GEMINI_API_KEY=your_gemini_key
  ```
- **Run the App**:
  ```bash
  npm run dev
  ```
  The app will be available at `http://localhost:3001`.

---

## 📁 Project Structure
```text
AuraTrack/
├── frontend/           # React + Vite application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Dashboard, Analytics, Sessions, etc.
│   │   ├── lib/        # API utilities and helpers
│   │   └── assets/     # Global styles and images
├── backend/            # FastAPI application
│   ├── app/
│   │   ├── api/        # Route versioning (v1)
│   │   ├── models/     # SQLModel database tables
│   │   ├── schemas/    # Pydantic validation models
│   │   └── core/       # App configuration
│   ├── tests/          # Pytest suite
│   └── run.py          # Entry point script
└── README.md
```

## 📜 Development Guidelines
- **Commit Messages**: Use descriptive prefixing (e.g., `feat:`, `fix:`, `docs:`).
- **Styling**: Use Tailwind CSS for all components. Follow the established glassmorphism design tokens.
- **API**: Always define a Pydantic `schema` for request/response bodies in the backend.

---

## 🤝 Contributing
1. Create a feature branch (`git checkout -b feature/amazing-feature`).
2. Commit your changes (`git commit -m 'feat: add amazing feature'`).
3. Push to the branch (`git push origin feature/amazing-feature`).
4. Open a Pull Request.

**Built with ❤️ by Muhammad Awais Raza**
