from fastapi import Depends, HTTPException, status, APIRouter
from sqlalchemy.orm import Session
from database.database import get_db
from database.models import Contact
from database.schema import ContactResponsechema, CreateContactSchema
from typing import List

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

@router.get("/contacts", response_model=List[ContactResponsechema])
def get_contacts(db: Session=Depends(get_db)):
    return db.query(Contact).all()


@router.post("/contacts/{contact_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_contact(contact_id: int, db: Session=Depends(get_db)):
    existing_contact = db.query(Contact).filter_by(id=contact_id).first()

    if not existing_contact:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "contact does not exsits!")
    
    db.delete(existing_contact)
    db.commit()


@router.put("/contacts/{contact_id}")
def edit_contact(contact_id: int, request: CreateContactSchema, db: Session=Depends(get_db)):
    existing_contact = db.query(Contact).filter_by(id=contact_id).first()

    if not existing_contact:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "contact does not exsits!")

    existing_contact.name = request.name
    existing_contact.category = request.category
    existing_contact.phone = request.phone

    db.commit()
    db.refresh(existing_contact)

    return existing_contact
