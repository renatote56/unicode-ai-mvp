from fastapi import APIRouter
from app.models.schemas import ChatRequest

router = APIRouter()

@router.post("/chat")
def chat(request: ChatRequest):
    return {"user_message": request.message, "response": "Hola, soy Unicode AI"}