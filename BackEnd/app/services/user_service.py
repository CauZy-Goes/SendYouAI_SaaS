from sqlalchemy.orm import Session
from fastapi import HTTPException
from passlib.context import CryptContext

from app.models.user_model import User
from app.schemas.user_schema import UserCreate, UserUpdate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password[:72])  # bcrypt suporta no máximo 72 bytes


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain[:72], hashed)


def get_all(db: Session):
    return db.query(User).all()


def get_by_id(db: Session, user_id: int):
    user = db.query(User).filter(User.USR_ID == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user


def get_by_email(db: Session, email: str):
    return db.query(User).filter(User.USR_EMAIL == email).first()


def create(db: Session, data: UserCreate):
    if get_by_email(db, data.USR_EMAIL):
        raise HTTPException(status_code=400, detail="E-mail já cadastrado")

    user = User(
        USR_EMAIL=data.USR_EMAIL,
        USR_NAME=data.USR_NAME,
        USR_PASSWORD=hash_password(data.USR_PASSWORD),
        USR_IA_API_KEY=data.USR_IA_API_KEY,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def update(db: Session, user_id: int, data: UserUpdate):
    user = get_by_id(db, user_id)

    if data.USR_NAME is not None:
        user.USR_NAME = data.USR_NAME
    if data.USR_PASSWORD is not None:
        user.USR_PASSWORD = hash_password(data.USR_PASSWORD)
    if data.USR_IA_API_KEY is not None:
        user.USR_IA_API_KEY = data.USR_IA_API_KEY

    db.commit()
    db.refresh(user)
    return user


def delete(db: Session, user_id: int):
    user = get_by_id(db, user_id)
    db.delete(user)
    db.commit()
    return {"mensagem": "Usuário deletado com sucesso"}