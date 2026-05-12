from sqlalchemy import text
from app.db.session import engine

def migrate():
    columns_to_add = [
        ("github_url", "VARCHAR"),
        ("twitter_url", "VARCHAR"),
        ("linkedin_url", "VARCHAR")
    ]
    
    with engine.connect() as conn:
        for col_name, col_type in columns_to_add:
            print(f"Adding column {col_name} to userprofile...")
            try:
                conn.execute(text(f"ALTER TABLE userprofile ADD COLUMN {col_name} {col_type}"))
                conn.commit()
                print(f"Successfully added {col_name}.")
            except Exception as e:
                if "already exists" in str(e):
                    print(f"Column {col_name} already exists, skipping.")
                else:
                    print(f"Error adding {col_name}: {e}")

if __name__ == "__main__":
    migrate()
