# services/auth_service.py

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime
from app.core.config import SECRET_KEY, ALGORITHM
from typing import Optional

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def verify_token(token: str = Depends(oauth2_scheme)) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: Optional[str] = payload.get("sub")
        exp: Optional[int] = payload.get("exp")

        if username is None or exp is None:
            raise HTTPException(status_code=401, detail="Geçersiz token")

        if datetime.utcnow().timestamp() > exp:
            raise HTTPException(status_code=401, detail="Token süresi dolmuş")

        return {"username": username}

    except JWTError:
        raise HTTPException(status_code=401, detail="Token doğrulanamadı")
