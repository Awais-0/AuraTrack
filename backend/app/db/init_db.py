import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from app.core.config import settings
from sqlmodel import SQLModel
from app.db.session import engine
from app.models.user import User  # This registers the model

def create_db_if_not_exists():
    """
    Creates the database if it does not exist.
    Must connect to a default database like 'postgres' first.
    """
    try:
        # Connect to 'postgres' database to check/create the target database
        conn = psycopg2.connect(
            user=settings.POSTGRES_USER,
            password=settings.POSTGRES_PASSWORD,
            host=settings.POSTGRES_SERVER,
            port=settings.POSTGRES_PORT,
            dbname="postgres"
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        
        # Check if database exists
        cursor.execute(f"SELECT 1 FROM pg_catalog.pg_database WHERE datname = '{settings.POSTGRES_DB}'")
        exists = cursor.fetchone()
        
        if not exists:
            print(f"Database '{settings.POSTGRES_DB}' does not exist. Creating...")
            cursor.execute(f"CREATE DATABASE {settings.POSTGRES_DB}")
            print(f"Database '{settings.POSTGRES_DB}' created successfully!")
        else:
            print(f"Database '{settings.POSTGRES_DB}' already exists.")
            
        cursor.close()
        conn.close()
    except Exception as e:
        print(f"Error checking/creating database: {e}")

def init_db():
    """
    Initializes the database by creating all tables.
    """
    create_db_if_not_exists()
    # This will create tables defined in SQLModel models
    SQLModel.metadata.create_all(engine)
    print("Database tables initialized.")
