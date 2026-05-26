from sqlalchemy import Column, Integer, String
from app.database import Base


class User(Base):
    __tablename__ = "users"

    USR_ID         = Column(Integer, primary_key=True, index=True, autoincrement=True)
    USR_EMAIL      = Column(String(255), nullable=False, unique=True)
    USR_NAME       = Column(String(255), nullable=False)
    USR_PASSWORD   = Column(String(255), nullable=False)
    USR_IA_API_KEY = Column(String(255), nullable=True)