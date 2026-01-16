import os
from dotenv import load_dotenv
from pathlib import Path

# Cargar .env desde la raíz del proyecto (un nivel arriba de frontend/)
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

API_KEY = os.getenv("UNICODE_AI_API_KEY")

print(f"DEBUG: .env path: {env_path}")
print(f"DEBUG: API_KEY loaded: {bool(API_KEY)}") # No imprimir la clave real por seguridad

if not API_KEY:
    st.error("⚠️ ERROR DE CONFIGURACIÓN: No se encontró la API KEY en el archivo .env")
    st.stop()

# --- 1. CONFIGURACIÓN DE PÁGINA ---
st.set_page_config(
    page_title="Unicode AI | MVP",
    page_icon="🤖",
    layout="centered"
)

# --- 2. ESTILOS CSS PERSONALIZADOS (Look & Feel Unicode) ---
# Esto oculta la marca de Streamlit y aplica colores oscuros/verdes
st.markdown("""
<style>
    /* Fondo general oscuro */
    .stApp {
        background-color: #0E1117;
    }
    /* Color de acento (Verde Unicode) para botones y inputs */
    div.stButton > button {
        background-color: #00FF88;
        color: black;
        border: none;
        font-weight: bold;
    }
    div.stButton > button:hover {
        background-color: #00CC6A;
        color: black;
    }
    /* Ocultar menú de hamburguesa y footer de Streamlit */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    
    /* Estilo del chat */
    .stChatMessage {
        background-color: #262730;
        border-radius: 10px;
    }
</style>
""", unsafe_allow_html=True)

# --- 3. BARRA LATERAL (SIDEBAR) ---
with st.sidebar:
    # Aquí podrías poner st.image("logo_unicode.png") si tienes el archivo
    st.title("🦄 UNICODE AI")
    st.markdown("---")
    st.markdown("""
    **Versión:** MVP 1.0
    **Motor:** Gemini 1.5 Flash + RAG
    **Memoria:** ChromaDB (Local)
    """)
    
    st.markdown("### ⚙️ Controles")
    if st.button("🗑️ Limpiar Conversación"):
        st.session_state.messages = []
        st.rerun()
        
    st.markdown("---")
    st.caption("Desarrollado por el área de I+D - Unicode 2026")

# --- 4. LÓGICA DEL CHAT ---

# Título Principal
st.title("💬 Asistente Virtual Unicode")
st.markdown("¡Hola! Soy la IA de Unicode. Pregúntame sobre las áreas (RRPP, DCC), nuestros proyectos o cómo unirte.")

# Inicializar historial
if "messages" not in st.session_state:
    st.session_state.messages = []

# Mostrar mensajes anteriores
for message in st.session_state.messages:
    # Elegimos avatar según el rol
    avatar = "🧑‍💻" if message["role"] == "user" else "🤖"
    with st.chat_message(message["role"], avatar=avatar):
        st.markdown(message["content"])

# --- 5. INTERACCIÓN CON EL USUARIO ---
if prompt := st.chat_input("Escribe tu consulta aquí..."):
    # A. Mostrar mensaje del usuario
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user", avatar="🧑‍💻"):
        st.markdown(prompt)

    # B. Conectar con el Backend (Tu API)
    API_URL = "http://127.0.0.1:8000/api/v1/chat"
    
    with st.chat_message("assistant", avatar="🤖"):
        message_placeholder = st.empty()
        full_response = ""
        
        with st.spinner("Consultando base de conocimientos..."):
            try:
                # Llamada a la API
                response = requests.post(
                    API_URL, 
                    json={"message": prompt},
                    headers={"X-API-Key": API_KEY}
                )
                
                if response.status_code == 200:
                    data = response.json()
                    ai_text = data.get("response", "No recibí respuesta.")
                    
                    # Efecto de "escribiendo" (Typewriter effect)
                    for chunk in ai_text.split():
                        full_response += chunk + " "
                        time.sleep(0.05) # Pequeña pausa para efecto visual
                        message_placeholder.markdown(full_response + "▌")
                    
                    message_placeholder.markdown(full_response)
                else:
                    error_msg = f"⚠️ Error del servidor: {response.status_code}"
                    message_placeholder.error(error_msg)
                    full_response = error_msg

            except requests.exceptions.ConnectionError:
                error_msg = "🔌 No puedo conectar con el cerebro (Backend apagado)."
                message_placeholder.error(error_msg)
                full_response = error_msg
                
    # C. Guardar respuesta en historial visual
    st.session_state.messages.append({"role": "assistant", "content": full_response})