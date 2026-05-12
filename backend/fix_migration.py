from sqlalchemy import text
from app.db.session import engine

def fix_migration():
    print("Renaming joined_at to created_at in userprofile...")
    try:
        with engine.connect() as conn:
            # Rename if joined_at exists
            conn.execute(text("ALTER TABLE userprofile RENAME COLUMN joined_at TO created_at"))
            conn.commit()
            print("Successfully renamed joined_at to created_at.")
    except Exception as e:
        print(f"Error fixing migration: {e}")

if __name__ == "__main__":
    fix_migration()
