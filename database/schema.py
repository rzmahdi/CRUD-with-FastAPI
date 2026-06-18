from pydantic import BaseModel


class CreateContactSchema(BaseModel):
    name: str
    category: str
    phone: str