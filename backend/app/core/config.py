import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "PulseOS"
    API_V1_STR: str = "/api/v1"
    
    POSTGRES_SERVER: str = os.getenv("DATABASE_HOSTNAME")
    POSTGRES_USER: str = os.getenv("DATABASE_USERNAME")
    POSTGRES_PASSWORD: str = os.getenv("DATABASE_PASSWORD")
    POSTGRES_DB: str = os.getenv("DATABASE_NAME")
    POSTGRES_PORT: str = os.getenv("DATABASE_PORT")
    
    SQLALCHEMY_DATABASE_URI: str = (
        f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"
    )

    # JWT Settings
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    ALGORITHM: str = os.getenv("ALGORITHM")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

    # Cloudinary Settings
    CLOUDINARY_CLOUD_NAME: str = os.getenv("CLOUDINARY_CLOUD_NAME")
    CLOUDINARY_API_KEY: str = os.getenv("CLOUDINARY_API_KEY")
    CLOUDINARY_API_SECRET: str = os.getenv("CLOUDINARY_API_SECRET")

settings = Settings()
