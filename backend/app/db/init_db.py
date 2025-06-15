from app.db.database import SessionLocal
from app.models.user_model import User
from app.services.hashing_service import hash_password
from app.models.user_role_enum import UserRole

def init_users():
    db = SessionLocal()

    if not db.query(User).filter(User.email == "admin@example.com").first():
        admin_user = User(
            email="admin@example.com",
            password=hash_password("admin123"),
            role=UserRole.ADMIN
        )
        db.add(admin_user)

    if not db.query(User).filter(User.email == "user@example.com").first():
        normal_user = User(
            email="user@example.com",
            password=hash_password("user123"),
            role=UserRole.USER
        )
        db.add(normal_user)

    db.commit()
    db.close()