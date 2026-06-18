from fastapi import Depends, HTTPException, status, APIRouter
from sqlalchemy.orm import Session
from database.database import get_db
from database.models import Contact
from database.schema import ContactResponsechema, CreateContactSchema

router = APIRouter()


@router.post("/contacts", response_model=ContactResponsechema)
def create_contact(request: CreateContactSchema, db: Session=Depends(get_db)):
    existing_contact = db.query(Contact).filter_by(name=request.name).first()

    if existing_contact:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Contact allready exists!")
    
    new_contact = Contact(
        name=request.name,
        category=request.category,
        phone=request.phone
    )
    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)
    
    return new_contact