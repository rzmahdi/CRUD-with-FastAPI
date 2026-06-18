from pydantic import BaseModel


class CreateContactSchema(BaseModel):
    name: str
    category: str
    phone: str


class ContactResponsechema(BaseModel):
    id: int
    name: str
    category: str
    phone: str