# routes/admin_route.py

from fastapi import APIRouter, Depends
from app.services.auth_service import require_roles

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/dashboard", dependencies=[Depends(require_roles(["admin"]))])
def admin_dashboard():
    return {"message": "Admin paneline hoş geldiniz"}
