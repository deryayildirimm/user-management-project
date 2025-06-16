from fastapi import FastAPI
from app.routes import auth_routes, admin_routes, user_routes
from app.db.database import create_database
from fastapi.middleware.cors import CORSMiddleware
from app.db.init_db import init_users

app = FastAPI()
create_database()

@app.on_event("startup")
def on_startup():
    init_users()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router, prefix="/api/auth")
app.include_router(admin_routes.router)
app.include_router(user_routes.router)

