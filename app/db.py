import os 
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")

if not url or not key:
    raise ValueError("Están faltando las credenciales de supabase para la url y key.")

supabase: Client = create_client(url, key)
print("Conexion con supabase exitosa.")