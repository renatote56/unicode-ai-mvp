from fastapi import FastAPI
from app.routers import chat

app = FastAPI()

app.include_router(chat.router, prefix="/api/v1")

@app.get("/api/v1/health")
def health():
    return {"status": "ok", "version": 1.0}