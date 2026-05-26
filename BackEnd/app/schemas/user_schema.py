from pydantic import BaseModel, EmailStr
from typing import Optional


# Criar usuário (entrada)
class UserCreate(BaseModel):
    USR_EMAIL:      str
    USR_NAME:       str
    USR_PASSWORD:   str
    USR_IA_API_KEY: Optional[str] = None


# Atualizar usuário (entrada parcial)
class UserUpdate(BaseModel):
    USR_NAME:       Optional[str] = None
    USR_PASSWORD:   Optional[str] = None
    USR_IA_API_KEY: Optional[str] = None


# Resposta (saída) — nunca expõe a senha
class UserResponse(BaseModel):
    USR_ID:         int
    USR_EMAIL:      str
    USR_NAME:       str
    USR_IA_API_KEY: Optional[str] = None

    class Config:
        from_attributes = True