from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from database.database import Base, engine
from contextlib import asynccontextmanager
import routers

@asynccontextmanager
async def life_span(app: FastAPI):
    print("App Start!")
    Base.metadata.create_all(engine)
    yield
    print("App Stop!")

app = FastAPI(lifespan=life_span)
app.include_router(routers.router)
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/")
def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html"
    )