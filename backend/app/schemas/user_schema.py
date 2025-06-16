from pydantic import BaseModel, EmailStr
from app.models.user_role_enum import UserRole

class UserCreate(BaseModel):
    userName : str
    email: EmailStr
    password: str
    role: UserRole = UserRole.USER  # varsayılan olarak user

    class Config:
        use_enum_values = True  # Swagger’da string olarak gösterilmesini sağlar

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
