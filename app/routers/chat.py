from fastapi import APIRouter
from app.models.schemas import ChatRequest
from app.db import supabase
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("No se encontro la api key de GEMINI en el archivo .env.")

genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-2.5-flash')

@router.post("/chat")
def chat(request_body: ChatRequest):
    print(f"Recibido: {request_body.message}")

    supabase.table("messages").insert({
        "role": "user",
        "content": request_body.message
    }).execute()

    try:
        response = model.generate_content(request_body.message)
        ai_text = response.text
    except Exception as e:
        ai_text = f"Error conectando con el cerebro: {str(e)}"

    supabase.table("messages").insert({
        "role": "assistant",
        "content": ai_text
    }).execute()

    return {"user_message": request_body.message, "response": ai_text} 