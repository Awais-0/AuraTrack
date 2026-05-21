import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "PulseOS"
    API_V1_STR: str = "/api/v1"
    
    POSTGRES_SERVER: str = os.getenv("DATABASE_HOSTNAME", "").strip()
    POSTGRES_USER: str = os.getenv("DATABASE_USERNAME", "").strip()
    POSTGRES_PASSWORD: str = os.getenv("DATABASE_PASSWORD", "").strip()
    POSTGRES_DB: str = os.getenv("DATABASE_NAME", "").strip()
    POSTGRES_PORT: str = os.getenv("DATABASE_PORT", "").strip()
    
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        from urllib.parse import quote_plus
        return f"postgresql://{self.POSTGRES_USER}:{quote_plus(self.POSTGRES_PASSWORD)}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"


    # JWT Settings
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    ALGORITHM: str = os.getenv("ALGORITHM")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

    # Cloudinary Settings
    CLOUDINARY_CLOUD_NAME: str = os.getenv("CLOUDINARY_CLOUD_NAME")
    CLOUDINARY_API_KEY: str = os.getenv("CLOUDINARY_API_KEY")
    CLOUDINARY_API_SECRET: str = os.getenv("CLOUDINARY_API_SECRET")

    # TMDB Settings
    THE_MOVIE_DB_ACCESS_TOKEN: str = os.getenv("THE_MOVIE_DB_ACCESS_TOKEN", "")
    THE_MOVIE_DB_API_KEY: str = os.getenv("THE_MOVIE_DB_API_KEY", "")

settings = Settings()
