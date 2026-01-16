import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Menu, Plus, MessageSquare, User, Bot, Sparkles } from "lucide-react";
import axios from "axios";

export default function ChatInterface() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: "user", content: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/v1/chat", {
                message: userMsg.content,
            }, {
                headers: {
                    "X-API-Key": "unicode_go_2026_id" // Using dummy key or env var if reachable. Ideally from env.
                }
            });

            const aiMsg = {
                role: "assistant",
                content: response.data.response || "No response received."
            };
            setMessages((prev) => [...prev, aiMsg]);
        } catch (error) {
            console.error("Error connecting to backend:", error);
            const errorMsg = {
                role: "assistant",
                content: "⚠️ Error conectando con el servidor. Asegúrate de que el backend esté corriendo."
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-unicode-black text-white font-sans overflow-hidden">
            {/* Sidebar */}
            <AnimatePresence mode="wait">
                {isSidebarOpen && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 260, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="h-full bg-unicode-gray border-r border-white/5 flex flex-col p-4 z-20"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <span className="font-bold text-lg tracking-wider text-unicode-green flex items-center gap-2">
                                <Sparkles className="w-5 h-5" /> UNICODE AI
                            </span>
                        </div>

                        <button
                            onClick={() => setMessages([])}
                            className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm font-medium mb-6 border border-white/5"
                        >
                            <Plus className="w-4 h-4" /> Nuevo Chat
                        </button>

                        <div className="flex-1 overflow-y-auto">
                            <p className="text-xs font-semibold text-gray-500 mb-3 px-2">Recientes</p>
                            <div className="space-y-1">
                                <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:bg-white/5 hover:text-white rounded-lg text-sm text-left transition-colors truncate">
                                    <MessageSquare className="w-4 h-4 shrink-0" />
                                    <span className="truncate">Bienvenida al sistema</span>
                                </button>
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-white/5">
                            <div className="flex items-center gap-3 px-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-unicode-green to-blue-500 flex items-center justify-center font-bold text-black text-xs">
                                    U
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">Usuario</span>
                                    <span className="text-xs text-gray-500">Free Plan</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col relative min-w-0">
                {/* Header */}
                <header className="h-14 flex items-center px-4 border-b border-white/5 bg-unicode-black/50 backdrop-blur-md absolute top-0 w-full z-10">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <span className="ml-4 font-medium text-gray-300">Modelo: Gemini 1.5 Flash</span>
                </header>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto pt-20 pb-40 px-4 md:px-0">
                    <div className="max-w-3xl mx-auto space-y-6">
                        {messages.length === 0 ? (
                            <div className="text-center mt-20 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Sparkles className="w-8 h-8 text-unicode-green" />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">¿Cómo puedo ayudarte hoy?</h2>
                                <p className="text-gray-400">Pregúntame sobre la Universidad, áreas de Unicode o proyectos.</p>
                            </div>
                        ) : (
                            messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-4 ${msg.role === 'assistant' ? '' : 'flex-row-reverse'}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant'
                                        ? 'bg-unicode-green text-black'
                                        : 'bg-white/10 text-white'
                                        }`}>
                                        {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                                    </div>
                                    <div className={`group relative max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-lg ${msg.role === 'assistant'
                                        ? 'bg-unicode-gray text-gray-100 border border-white/5'
                                        : 'bg-white/10 text-white'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))
                        )}
                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex gap-4"
                            >
                                <div className="w-8 h-8 rounded-full bg-unicode-green text-black flex items-center justify-center shrink-0">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <div className="bg-unicode-gray rounded-2xl px-5 py-3 border border-white/5 flex gap-1 items-center">
                                    <span className="w-2 h-2 bg-unicode-green rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                                    <span className="w-2 h-2 bg-unicode-green rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                                    <span className="w-2 h-2 bg-unicode-green rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Area */}
                <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-unicode-black via-unicode-black to-transparent">
                    <div className="max-w-3xl mx-auto">
                        <form onSubmit={handleSend} className="relative group">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Escribe un mensaje a Unicode AI..."
                                className="w-full bg-unicode-gray/80 backdrop-blur-xl border border-white/10 text-white rounded-2xl pl-6 pr-14 py-4 focus:outline-none focus:border-unicode-green/50 focus:ring-1 focus:ring-unicode-green/50 transition-all shadow-lg placeholder:text-gray-500"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-unicode-green hover:text-black rounded-xl text-gray-400 transition-all disabled:opacity-50 disabled:hover:bg-white/10 disabled:hover:text-gray-400"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                        <p className="text-center text-xs text-gray-600 mt-3">
                            Unicode AI puede cometer errores. Verifica la información importante.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
