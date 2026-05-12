from sqlalchemy import text
from app.db.session import engine

def migrate():
    print("Adding joined_at column to userprofile...")
    try:
        with engine.connect() as conn:
            conn.execute(text("ALTER TABLE userprofile ADD COLUMN joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP"))
            conn.commit()
            print("Successfully added joined_at.")
    except Exception as e:
        if "already exists" in str(e):
            print("Column created_at already exists, skipping.")
        else:
            print(f"Error adding created_at: {e}")

if __name__ == "__main__":
    migrate()
