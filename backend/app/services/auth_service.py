# services/auth_service.py

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime
from app.core.config import SECRET_KEY, ALGORITHM
from typing import Optional, List

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def verify_token(token: str = Depends(oauth2_scheme)) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: Optional[str] = payload.get("sub")
        role : Optional[str] =payload.get("role")
        exp: Optional[int] = payload.get("exp")

        if username is None or exp is None or role is None:
            raise HTTPException(status_code=401, detail="Geçersiz token")

        if datetime.utcnow().timestamp() > exp:
            raise HTTPException(status_code=401, detail="Token süresi dolmuş")

        return {"username": username, "role": role}

    except JWTError:
        raise HTTPException(status_code=401, detail="Token doğrulanamadı")

def require_roles(allowed_roles: List[str]):
    def role_checker(token_data: dict = Depends(verify_token)):
        user_role = token_data.get("role")
        if user_role not in allowed_roles:
            raise HTTPException(status_code=403, detail="Bu işlemi yapma yetkiniz yok")
        return token_data
    return role_checker