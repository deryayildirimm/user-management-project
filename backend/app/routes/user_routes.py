from fastapi import APIRouter, Depends
from app.services.auth_service import verify_token
from app.models.user_model import User
from app.db.database import SessionLocal
from sqlalchemy.orm import Session
from app.services.auth_service import require_roles

router = APIRouter(prefix="/api/users", tags=["Users"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/me")
def get_my_profile(token_data: dict = Depends(verify_token), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == token_data["username"]).first()
    return {
        "id": user.id,
        "userName" : user.userName,
        "email": user.email,
        "role": user.role.value
    }

@router.get("/")
def get_all_users(
    db: Session = Depends(get_db),
    _: dict = Depends(require_roles(["admin"]))
):
    users = db.query(User).all()
    return [
        {
            "id": user.id,
            "email": user.email,
            "role": user.role.value,
            "userName": user.userName
        }
        for user in users
    ]

@router.get("/{user_id}")
def get_user_by_id(
    user_id: int,
    db: Session = Depends(get_db),
    _: dict = Depends(require_roles(["admin"]))  # sadece admin görsün
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return {"error": "User not found"}  # veya raise HTTPException
    return {
        "id": user.id,
        "userName": user.userName,
        "email": user.email,
        "role": user.role.value
    }