from fastapi.routing import APIRouter
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from database.models import Contact
from database.schema import ContactResponsechema, CreateContactSchema

router = APIRouter()


@router.post("/contacts", response_model=ContactResponsechema)
def create_contact(request: CreateContactSchema, db: Session=Depends(get_db)):
    pass