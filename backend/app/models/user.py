from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    email: str = Field(index=True, unique=True)
    hashed_password: str
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationship
    profile: Optional["UserProfile"] = Relationship(back_populates="user")

class UserProfile(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", unique=True)
    fullname: str
    email: str
    address: Optional[str] = None
    gender: Optional[str] = None
    occupation: Optional[str] = None
    about: Optional[str] = None
    avatar_url: Optional[str] = None
    cover_pic_url: Optional[str] = None
    github_url: Optional[str] = None
    twitter_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    membership_status: Optional[str] = Field(default="Free")
    joined_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationship
    user: Optional[User] = Relationship(back_populates="profile")
