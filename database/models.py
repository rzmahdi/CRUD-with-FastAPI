from sqlalchemy import Column, Integer, String
from database.database import Base


class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, autoincrement=True, primary_key=True)
    name = Column(String(50), nullable=False, unique=True)
    category = Column(String(30), nullable=False)
    phone = Column(String(12), nullable=False)