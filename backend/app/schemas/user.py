from typing import Optional
from pydantic import BaseModel, EmailStr

# Shared properties
class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    is_active: Optional[bool] = True
    username: Optional[str] = None

# Properties to receive via API on creation
class UserCreate(UserBase):
    email: EmailStr
    username: str
    password: str

# Properties to receive via API on update
class UserUpdate(UserBase):
    password: Optional[str] = None

# Properties to return via API
class UserOut(UserBase):
    id: int

    class Config:
        from_attributes = True

# JSON Web Token
class Token(BaseModel):
    access_token: str
    token_type: str

# Contents of JWT token
class TokenData(BaseModel):
    sub: Optional[str] = None
