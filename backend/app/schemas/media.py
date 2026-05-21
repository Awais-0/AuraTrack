from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

def format_relative_time(dt: datetime) -> str:
    now = datetime.utcnow()
    diff = now - dt
    
    if diff.days == 0:
        if diff.seconds < 60:
            return "Just now"
        elif diff.seconds < 3600:
            minutes = diff.seconds // 60
            return f"{minutes} minute{'s' if minutes > 1 else ''} ago"
        else:
            hours = diff.seconds // 3600
            return f"{hours} hour{'s' if hours > 1 else ''} ago"
    elif diff.days == 1:
        return "Yesterday"
    elif diff.days < 7:
        return f"{diff.days} day{'s' if diff.days > 1 else ''} ago"
    elif diff.days < 30:
        weeks = diff.days // 7
        return f"{weeks} week{'s' if weeks > 1 else ''} ago"
    else:
        months = diff.days // 30
        return f"{months} month{'s' if months > 1 else ''} ago"

class MediaBase(BaseModel):
    title: str
    type: str  # movie, anime, manga, tv_show
    status: str = "planning"  # planning, active, completed, paused
    current_progress: int = 0
    total_units: int = 1
    rating: float = 0.0
    cover_image: Optional[str] = None
    genres: List[str] = []
    tmdb_id: Optional[int] = None

class MediaCreate(MediaBase):
    pass

class MediaUpdate(BaseModel):
    status: Optional[str] = None
    current_progress: Optional[int] = None
    total_units: Optional[int] = None
    rating: Optional[float] = None

class MediaOut(BaseModel):
    id: int
    title: str
    type: str
    status: str
    currentProgress: int
    totalUnits: int
    rating: float
    coverImage: Optional[str]
    genres: List[str]
    lastUpdated: str
    tmdbId: Optional[int] = None

    class Config:
        from_attributes = True

    @classmethod
    def from_db(cls, db_media) -> "MediaOut":
        import json
        genres_list = []
        if db_media.genres:
            try:
                genres_list = json.loads(db_media.genres)
            except Exception:
                genres_list = []
                
        # Format the relative time for updated_at
        last_updated_str = format_relative_time(db_media.updated_at)
        
        return cls(
            id=db_media.id,
            title=db_media.title,
            type=db_media.type,
            status=db_media.status,
            currentProgress=db_media.current_progress,
            totalUnits=db_media.total_units,
            rating=db_media.rating,
            coverImage=db_media.cover_image,
            genres=genres_list,
            lastUpdated=last_updated_str,
            tmdbId=db_media.tmdb_id
        )
