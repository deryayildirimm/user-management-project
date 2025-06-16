from app.db.database import SessionLocal
from app.models.user_model import User
from app.services.hashing_service import hash_password
from app.models.user_role_enum import UserRole

def init_users():
    db = SessionLocal()

 
    users = [
        {"email": "admin@example.com", "password": "admin123", "role": UserRole.ADMIN, "userName": "Admin User"},
        {"email": "user@example.com", "password": "user123", "role": UserRole.USER, "userName": "Normal User"},
        {"email": "jane@example.com", "password": "jane123", "role": UserRole.USER, "userName": "Jane Doe"},
        {"email": "john@example.com", "password": "john123", "role": UserRole.USER, "userName": "John Smith"},
        {"email": "alice@example.com", "password": "alice123", "role": UserRole.USER, "userName": "Alice Wonderland"},
        {"email": "bob@example.com", "password": "bob123", "role": UserRole.USER, "userName": "Bob Marley"},
        {"email": "lucy@example.com", "password": "lucy123", "role": UserRole.USER, "userName": "Lucy Heartfilia"},
        {"email": "mike@example.com", "password": "mike123", "role": UserRole.USER, "userName": "Mike Tyson"},
    ]

    for user_data in users:
        if not db.query(User).filter(User.email == user_data["email"]).first():
            user = User(
                email=user_data["email"],
                password=hash_password(user_data["password"]),
                role=user_data["role"],
                userName=user_data["userName"]
            )
            db.add(user)

    db.commit()
    db.close()