import os
from fastapi import APIRouter
from dotenv import load_dotenv
from app.models.schemas import ChatRequest
from app.db import supabase

#Langchain
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

load_dotenv()
router = APIRouter()

llm = ChatGoogleGenerativeAI(
    model = "gemini-2.5-flash",
    temperature = 0,
    google_api_key = os.getenv("GEMINI_API_KEY")
)

embeddings = GoogleGenerativeAIEmbeddings(
    model = "text-embedding-004",
    google_api_key = os.getenv("GEMINI_API_KEY")
)

vectorstore = Chroma(
    persist_directory = "app/vectorstore_db",
    embedding_function = embeddings
)

retriever = vectorstore.as_retriever(search_kwargs = {"k": 3})

template = """
Eres Unicode AI, el asistente oficial de la organización estudiantil UNICODE.
Usa los siguientes fragmentos de contexto recuperado para responder la pregunta del usuario.
Si no sabes la respuesta basándote en el contexto, di que no tienes esa información. No inventes datos.

Contexto:
{context}

Pregunta:
{question}
"""
prompt = ChatPromptTemplate.from_template(template)

rag_chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

@router.post("/chat")
def chat(request_body: ChatRequest):
    supabase.table("messages").insert({
        "role": "user",
        "content": request_body.message
    }).execute()

    print("Pregunta recibida: {request_body.message}")

    try:
        ai_response = rag_chain.invoke(request_body.message)
    except Exception as e:
        ai_response = f"Lo siento, tuve un error consultando mi memoria: {str(e)}"
    
    supabase.table("messages").insert({
        "role": "assistant",
        "content": ai_response
    }).execute()

    return {"user_message": request_body.message, "response": ai_response}