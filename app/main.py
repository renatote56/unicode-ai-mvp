from fastapi import FastAPI
from app.routers import chat
import os
from dotenv import load_dotenv
from fastapi.security import APIKeyHeader
from fastapi import HTTPException, Depends, Security

load_dotenv()

API_KEY_SEGURA = os.getenv("UNICODE_AI_API_KEY")

api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)

async def get_api_key(api_key_header: str = Security(api_key_header)):
    if api_key_header == API_KEY_SEGURA:
        return api_key_header
    raise HTTPException(status_code=403, detail="API Key inválida.")

app = FastAPI()

app.include_router(chat.router, prefix="/api/v1", dependencies=[Depends(get_api_key)])

@app.get("/api/v1/health")
def health():
    return {"status": "ok", "version": 1.0}