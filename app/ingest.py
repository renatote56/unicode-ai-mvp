import os
import glob
from dotenv import load_dotenv
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma

load_dotenv()
google_api_key = os.getenv("GEMINI_API_KEY")

vectorstore_path = "app/vectorstore_db"

def ingest_data():
    print("Iniciando ingesta de datos ...")

    archivos = glob.glob("data/*md")
    documentos = []

    if not archivos:
        print("No se encontraron archivos en el formato .md ...")
        return
    
    print(f"Se encontraron {len(archivos)} documentos: {archivos}")

    for archivo in archivos:
        try:
            loader = TextLoader(archivo, encoding = "utf-8")
            documentos.extend(loader.load())
        except Exception as e:
            print(f"No se puede leer {archivo}: {e}")
    
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size = 1000,
        chunk_overlap = 200,
        separators = ["\n##", "\n#", "\n", " "]
    )

    chunks = text_splitter.split_documents(documentos)
    print(f"Se ha dividido en {len(chunks)} fragmentos de info ...")

    print("Generando embeddings y guardando en ChromaDB ... ")

    embeddings  = GoogleGenerativeAIEmbeddings(
        model = "text-embedding-004",
        google_api_key = os.getenv("GEMINI_API_KEY")
    )

    vectorstore = Chroma.from_documents(
        documents = chunks,
        embedding = embeddings,
        persist_directory = vectorstore_path
    )

    print("Embeddings guardados y memoria creada.")

if __name__ == "__main__":
    ingest_data()