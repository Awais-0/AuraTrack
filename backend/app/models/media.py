from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class Media(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", index=True)
    title: str = Field(index=True)
    type: str = Field(index=True)  # movie, anime, manga, tv_show
    status: str = Field(default="planning")  # planning, active, completed, paused
    current_progress: int = Field(default=0)
    total_units: int = Field(default=1)
    rating: float = Field(default=0.0)
    cover_image: Optional[str] = None
    genres: Optional[str] = Field(default="[]")  # JSON serialized list of genre names
    tmdb_id: Optional[int] = Field(default=None, index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
