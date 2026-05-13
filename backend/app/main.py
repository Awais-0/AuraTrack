from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from contextlib import asynccontextmanager
from app.api.v1.api import api_router
from app.core.config import settings
from app.core.handlers import setup_handlers

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Database initialization is now handled by migrations
    yield
    # Shutdown: Clean up if needed

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for AuraTrack productivity tracker",
    version="0.1.0",
    lifespan=lifespan
)

# Setup Handlers & Middleware
setup_handlers(app)

# Include Routers
app.include_router(api_router, prefix=settings.API_V1_STR)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3001",
        "http://localhost:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Welcome to AuraTrack API",
        "status": "online",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    # Get port from environment variable or default to 8000
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app.main:app", host="localhost", port=port, reload=True)