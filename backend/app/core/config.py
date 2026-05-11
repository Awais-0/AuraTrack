import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "AuraTrack"
    API_V1_STR: str = "/api/v1"
    
    POSTGRES_SERVER: str = os.getenv("DATABASE_HOSTNAME", "localhost")
    POSTGRES_USER: str = os.getenv("DATABASE_USERNAME", "postgres")
    POSTGRES_PASSWORD: str = os.getenv("DATABASE_PASSWORD", "123456")
    POSTGRES_DB: str = os.getenv("DATABASE_NAME", "auratrack")
    POSTGRES_PORT: str = os.getenv("DATABASE_PORT", "5432")
    
    SQLALCHEMY_DATABASE_URI: str = (
        f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"
    )

    # JWT Settings
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-super-secret-key-for-development")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

settings = Settings()
