from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from typing import List, Optional
from app.db.session import get_session
from app.models.user import User
from app.api.v1.endpoints.users import get_current_user
from app.models.media import Media
from app.schemas.media import MediaCreate, MediaUpdate, MediaOut
from app.services.tmdb import tmdb_service
import json
from datetime import datetime

router = APIRouter()

@router.get("", response_model=List[MediaOut])
def get_user_media(
    *,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
    type: Optional[str] = Query(None, description="Filter by media type: movie, anime, manga, tv_show")
):
    """
    Get all media library items for the current user.
    """
    statement = select(Media).where(Media.user_id == current_user.id)
    if type:
        statement = statement.where(Media.type == type)
    
    # Order by updated_at descending
    statement = statement.order_by(Media.updated_at.desc())
    media_items = session.exec(statement).all()
    
    return [MediaOut.from_db(item) for item in media_items]


@router.post("", response_model=MediaOut)
async def create_media(
    *,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
    media_in: MediaCreate
):
    """
    Create a new media tracking item.
    If tmdb_id is provided, fetch extra details from TMDB to fill cover, genres, total episodes.
    """
    # Create DB model
    db_media = Media(
        user_id=current_user.id,
        title=media_in.title,
        type=media_in.type,
        status=media_in.status,
        current_progress=media_in.current_progress,
        total_units=media_in.total_units,
        rating=media_in.rating,
        cover_image=media_in.cover_image,
        genres=json.dumps(media_in.genres),
        tmdb_id=media_in.tmdb_id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    # Sync with TMDB if ID is provided
    if media_in.tmdb_id:
        if media_in.type == "movie":
            details = await tmdb_service.get_movie_details(media_in.tmdb_id)
            if details:
                db_media.title = details.get("title", db_media.title)
                db_media.total_units = 1
                poster_path = details.get("poster_path")
                if poster_path:
                    db_media.cover_image = f"https://image.tmdb.org/t/p/w500{poster_path}"
                genres_list = [g.get("name") for g in details.get("genres", []) if g.get("name")]
                db_media.genres = json.dumps(genres_list)
        else: # tv_show or anime
            details = await tmdb_service.get_tv_details(media_in.tmdb_id)
            if details:
                db_media.title = details.get("name", db_media.title)
                # Fetch total episodes
                num_episodes = details.get("number_of_episodes")
                if num_episodes:
                    db_media.total_units = num_episodes
                poster_path = details.get("poster_path")
                if poster_path:
                    db_media.cover_image = f"https://image.tmdb.org/t/p/w500{poster_path}"
                genres_list = [g.get("name") for g in details.get("genres", []) if g.get("name")]
                db_media.genres = json.dumps(genres_list)

    session.add(db_media)
    session.commit()
    session.refresh(db_media)
    return MediaOut.from_db(db_media)


@router.patch("/{media_id}", response_model=MediaOut)
def update_media(
    *,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
    media_id: int,
    media_in: MediaUpdate
):
    """
    Update progress, status, or rating of a media item.
    """
    db_media = session.get(Media, media_id)
    if not db_media:
        raise HTTPException(status_code=404, detail="Media item not found")
    if db_media.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this item")

    update_data = media_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_media, field, value)
        
    db_media.updated_at = datetime.utcnow()
    
    session.add(db_media)
    session.commit()
    session.refresh(db_media)
    return MediaOut.from_db(db_media)


@router.delete("/{media_id}", status_code=204)
def delete_media(
    *,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
    media_id: int
):
    """
    Delete a media item from library.
    """
    db_media = session.get(Media, media_id)
    if not db_media:
        raise HTTPException(status_code=404, detail="Media item not found")
    if db_media.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this item")

    session.delete(db_media)
    session.commit()
    return None


@router.get("/search-tmdb")
async def search_tmdb(
    *,
    current_user: User = Depends(get_current_user),
    query: str = Query(..., description="Search query")
):
    """
    Search movies and TV shows from TMDB.
    """
    results = await tmdb_service.search_multi(query)
    return results
