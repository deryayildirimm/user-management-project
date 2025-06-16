from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user_schema import UserCreate, UserLogin, TokenResponse
from app.models.user_model import User
from app.services.hashing_service import hash_password, verify_password
from app.services.token_service import create_access_token
from app.db.database import SessionLocal
from app.models.user_role_enum import UserRole

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def read_root():
    return {"message": "Backend çalışıyor!"}

@router.post("/register", response_model=TokenResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        email=user.email, 
        password=hash_password(user.password),
        role=UserRole.USER 
        )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = create_access_token(
        {"sub": new_user.email},
        role=new_user.role.value  #  rol enum'un string değeri
        )
    return {"access_token": access_token}

@router.post("/login", response_model=TokenResponse)
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(
        {"sub": db_user.email},
         role=db_user.role.value
        )
    return {"access_token": access_token}

