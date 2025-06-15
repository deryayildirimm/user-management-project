from sqlalchemy import Column, Integer, String, Enum as SqlEnum
from app.db.database import Base
from app.models.user_role_enum import UserRole  

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(SqlEnum(UserRole), nullable=False, default=UserRole.USER)  