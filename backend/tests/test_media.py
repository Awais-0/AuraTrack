import sys
import os

# Add backend directory to python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient
from sqlmodel import Session, select
from app.main import app
from app.db.session import engine
from app.models.user import User, UserProfile
from app.models.media import Media

client = TestClient(app)

def cleanup_db(email: str, username: str):
    """Clean up test user and associated data from development database."""
    with Session(engine) as session:
        # Find user
        statement = select(User).where((User.email == email) | (User.username == username))
        user = session.exec(statement).first()
        if user:
            # Delete media tracking items for user
            media_statement = select(Media).where(Media.user_id == user.id)
            media_items = session.exec(media_statement).all()
            for item in media_items:
                session.delete(item)
            
            # Delete profile
            profile_statement = select(UserProfile).where(UserProfile.user_id == user.id)
            profile = session.exec(profile_statement).first()
            if profile:
                session.delete(profile)
                
            # Delete user
            session.delete(user)
            session.commit()
            print(f"Cleaned up test user: {username}")

def test_media_flow():
    test_email = "test_media_user@example.com"
    test_username = "testmediauser"
    test_password = "securepassword123"
    
    # 1. Cleanup any leftover state first
    cleanup_db(test_email, test_username)
    
    try:
        # 2. Sign up test user
        signup_payload = {
            "email": test_email,
            "username": test_username,
            "fullname": "Test Media User",
            "password": test_password,
            "is_active": True
        }
        response = client.post("/api/v1/auth/signup", json=signup_payload)
        assert response.status_code == 200, f"Signup failed: {response.text}"
        signup_data = response.json()
        assert signup_data["success"] is True
        assert signup_data["data"]["email"] == test_email
        print("1. Signup successful!")

        # 3. Log in to get token
        login_data = {
            "username": test_username,
            "password": test_password
        }
        response = client.post("/api/v1/auth/login", data=login_data)
        assert response.status_code == 200, f"Login failed: {response.text}"
        token_res = response.json()
        assert "access_token" in token_res
        token = token_res["access_token"]
        headers = {"Authorization": f"Bearer {token}"}
        print("2. Login successful! Got token.")

        # 4. Create manual Manga entry
        manga_payload = {
            "title": "Chainsaw Man",
            "type": "manga",
            "status": "active",
            "current_progress": 5,
            "total_units": 15,
            "rating": 9.0,
            "cover_image": "https://example.com/chainsaw_man.jpg",
            "genres": ["Action", "Dark Fantasy"]
        }
        response = client.post("/api/v1/media", json=manga_payload, headers=headers)
        assert response.status_code == 200, f"Manga creation failed: {response.text}"
        manga_data = response.json()["data"]
        manga_id = manga_data["id"]
        assert manga_data["title"] == "Chainsaw Man"
        assert manga_data["currentProgress"] == 5
        assert manga_data["totalUnits"] == 15
        assert manga_data["genres"] == ["Action", "Dark Fantasy"]
        print("3. Manual Manga entry created successfully!")

        # 5. Create TMDB-synced Movie entry (Inception, TMDB ID = 27205)
        movie_payload = {
            "title": "Inception Mock Title",
            "type": "movie",
            "status": "planning",
            "tmdb_id": 27205
        }
        response = client.post("/api/v1/media", json=movie_payload, headers=headers)
        assert response.status_code == 200, f"Movie sync creation failed: {response.text}"
        movie_data = response.json()["data"]
        movie_id = movie_data["id"]
        # TMDB service should fetch the correct title and cover
        assert movie_data["title"] == "Inception"
        assert movie_data["totalUnits"] == 1
        assert "Sci-Fi" in movie_data["genres"] or "Action" in movie_data["genres"]
        assert movie_data["coverImage"].startswith("https://image.tmdb.org/t/p/")
        print("4. TMDB-synced Movie entry created successfully! TMDB details verified.")

        # 6. List User Media Library
        response = client.get("/api/v1/media", headers=headers)
        assert response.status_code == 200, f"Listing media failed: {response.text}"
        items = response.json()["data"]
        assert len(items) == 2
        # Verify ordering (Inception should be first since it was updated last)
        assert items[0]["id"] == movie_id
        assert items[1]["id"] == manga_id
        print("5. Listed user media library successfully and verified order.")

        # 7. Update Media item (Manga progress and rating)
        update_payload = {
            "current_progress": 10,
            "rating": 9.5
        }
        response = client.patch(f"/api/v1/media/{manga_id}", json=update_payload, headers=headers)
        assert response.status_code == 200, f"Updating media failed: {response.text}"
        updated_data = response.json()["data"]
        assert updated_data["currentProgress"] == 10
        assert updated_data["rating"] == 9.5
        print("6. Media progress and rating updated successfully!")

        # 8. Test TMDB search API
        response = client.get("/api/v1/media/search-tmdb?query=inception", headers=headers)
        assert response.status_code == 200, f"TMDB search failed: {response.text}"
        search_results = response.json()["data"]
        assert isinstance(search_results, list)
        assert len(search_results) > 0
        assert any("Inception" in item["title"] for item in search_results)
        print("7. TMDB search API verified successfully!")

        # 9. Delete media items
        response = client.delete(f"/api/v1/media/{manga_id}", headers=headers)
        assert response.status_code == 204, f"Deleting manga failed: {response.text}"
        response = client.delete(f"/api/v1/media/{movie_id}", headers=headers)
        assert response.status_code == 204, f"Deleting movie failed: {response.text}"
        
        # Verify empty library
        response = client.get("/api/v1/media", headers=headers)
        assert len(response.json()["data"]) == 0
        print("8. Deletion of media items verified successfully!")

    finally:
        # Always clean up
        cleanup_db(test_email, test_username)

if __name__ == "__main__":
    print("Starting backend media tests...")
    test_media_flow()
    print("ALL TESTS PASSED SUCCESSFULLY!")
