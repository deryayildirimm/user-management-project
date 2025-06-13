from fastapi import FastAPI
from app.routes import auth_routes, protected_routes
from app.db.database import create_database
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
create_database()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router, prefix="/api/auth")