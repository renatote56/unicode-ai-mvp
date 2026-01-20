import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, User, Bot } from "lucide-react";
import axios from "axios";
import Sidebar from "./Sidebar";
import ModelSelector from "./ModelSelector";
import StarterCards from "./StarterCards";
import FloatingInputBar from "./FloatingInputBar";
import SettingsModal from "./SettingsModal";
import CodeBlock from "./CodeBlock";
import {
    loadSessions,
    saveSession,
    deleteSession,
    clearAllSessions,
    generateSessionId,
    getSessionTitle,
} from "../utils/sessionManager";

export default function ChatInterface() {
    // Chat State
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    // Session State
    const [currentSessionId, setCurrentSessionId] = useState(() => generateSessionId());
    const [chatSessions, setChatSessions] = useState(() => loadSessions());
    const [isSessionSaved, setIsSessionSaved] = useState(false);

    // UI State
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Streaming State
    const [streamingText, setStreamingText] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);

    // Refs
    const messagesEndRef = useRef(null);
    const streamIntervalRef = useRef(null);

    // Scroll to bottom when messages change
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, streamingText]);

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (streamIntervalRef.current) {
                clearInterval(streamIntervalRef.current);
            }
        };
    }, []);

    // Typewriter Streaming Effect
    const typewriterEffect = (text, callback) => {
        let index = 0;
        setStreamingText("");
        setIsStreaming(true);
        setIsGenerating(true);

        if (streamIntervalRef.current) {
            clearInterval(streamIntervalRef.current);
        }

        streamIntervalRef.current = setInterval(() => {
            if (index < text.length) {
                setStreamingText((prev) => prev + text[index]);
                index++;
            } else {
                clearInterval(streamIntervalRef.current);
                streamIntervalRef.current = null;
                setIsStreaming(false);
                setIsGenerating(false);
                callback();
            }
        }, 20);
    };

    // Stop Generation
    const handleStopGeneration = () => {
        if (streamIntervalRef.current) {
            clearInterval(streamIntervalRef.current);
            streamIntervalRef.current = null;
        }

        // Save partial message
        if (streamingText) {
            const assistantMsg = { role: "assistant", content: streamingText };
            setMessages((prev) => [...prev, assistantMsg]);
        }

        setStreamingText("");
        setIsStreaming(false);
        setIsGenerating(false);
        setIsLoading(false);
    };

    // Save current session to localStorage
    const saveCurrentSession = (updatedMessages) => {
        if (updatedMessages.length === 0) return;

        const session = {
            id: currentSessionId,
            title: getSessionTitle(updatedMessages),
            messages: updatedMessages,
        };

        const updatedSessions = saveSession(session);
        setChatSessions(updatedSessions);
        setIsSessionSaved(true);
    };

    // Handle sending message
    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = { role: "user", content: input };
        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setInput("");
        setIsLoading(true);

        // Save session after FIRST user message
        if (!isSessionSaved) {
            saveCurrentSession(updatedMessages);
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/v1/chat",
                { message: userMsg.content },
                {
                    headers: {
                        "X-API-Key": "unicode_go_2026_id",
                        "Content-Type": "application/json"
                    }
                }
            );

            const aiResponse = response.data.response || "No response received.";

            // Simulate typewriter streaming effect
            typewriterEffect(aiResponse, () => {
                const assistantMsg = { role: "assistant", content: aiResponse };
                const finalMessages = [...updatedMessages, assistantMsg];
                setMessages(finalMessages);
                setStreamingText("");
                setIsLoading(false);

                // Update session with AI response
                saveCurrentSession(finalMessages);
            });
        } catch (error) {
            console.error("Error sending message:", error);
            console.error("Error response:", error.response?.data);
            console.error("Error status:", error.response?.status);

            let errorMessage = "❌ Error conectando con el servidor. Asegúrate de que el backend esté corriendo.";

            if (error.response) {
                // Server responded with error
                errorMessage = `❌ Error ${error.response.status}: ${error.response.data?.detail || error.response.statusText}`;
            } else if (error.request) {
                // Request made but no response
                errorMessage = "❌ No se recibió respuesta del servidor. Verifica que el backend esté corriendo.";
            }

            const errorMsg = {
                role: "assistant",
                content: errorMessage,
            };
            const finalMessages = [...updatedMessages, errorMsg];
            setMessages(finalMessages);
            setIsLoading(false);
            saveCurrentSession(finalMessages);
        }
    };

    // New Chat Handler
    const handleNewChat = () => {
        // Save current session before clearing
        if (messages.length > 0 && !isSessionSaved) {
            saveCurrentSession(messages);
        }

        // Reset to new session
        setCurrentSessionId(generateSessionId());
        setMessages([]);
        setInput("");
        setStreamingText("");
        setIsSessionSaved(false);
        setIsStreaming(false);
        setIsGenerating(false);
        setIsLoading(false);
    };

    // Select Session Handler
    const handleSelectSession = (sessionId) => {
        const session = chatSessions.find((s) => s.id === sessionId);
        if (session) {
            // Save current session before switching
            if (messages.length > 0 && currentSessionId !== sessionId) {
                saveCurrentSession(messages);
            }

            setCurrentSessionId(session.id);
            setMessages(session.messages);
            setIsSessionSaved(true);
            setInput("");
            setStreamingText("");
            setIsStreaming(false);
            setIsGenerating(false);
            setIsLoading(false);
        }
    };

    // Delete Session Handler
    const handleDeleteSession = (sessionId) => {
        const updatedSessions = deleteSession(sessionId);
        setChatSessions(updatedSessions);

        // If deleted session is current, start new chat
        if (sessionId === currentSessionId) {
            handleNewChat();
        }
    };

    // Clear All History Handler
    const handleClearHistory = () => {
        clearAllSessions();
        setChatSessions([]);
        handleNewChat();
    };

    // Handle Starter Card Click
    const handleSelectPrompt = (prompt) => {
        setInput(prompt);
    };

    return (
        <div className="h-screen bg-unicode-black-deeper flex overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onNewChat={handleNewChat}
                chatSessions={chatSessions}
                onSelectSession={handleSelectSession}
                onDeleteSession={handleDeleteSession}
                currentSessionId={currentSessionId}
                onOpenSettings={() => setIsSettingsOpen(true)}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative">
                {/* Model Selector */}
                <ModelSelector sidebarOpen={isSidebarOpen} />

                {/* Hamburger Menu (only shown when sidebar is closed) */}
                {!isSidebarOpen && (
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="fixed top-6 left-6 z-30 p-3 glass-ultra border border-unicode-green/20 rounded-full hover:bg-unicode-green/10 transition-all text-unicode-green"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                )}

                {/* Conditional Rendering: Empty State vs Chat State */}
                {messages.length === 0 ? (
                    // EMPTY STATE: Centered Layout
                    <div className="flex-1 flex flex-col items-center justify-center h-full w-full px-4">
                        <div className="w-full max-w-3xl flex flex-col items-center gap-8">
                            <StarterCards onSelectPrompt={handleSelectPrompt} />
                            <FloatingInputBar
                                input={input}
                                setInput={setInput}
                                onSend={handleSend}
                                isLoading={isLoading}
                                isGenerating={isGenerating}
                                onStopGeneration={handleStopGeneration}
                                variant="static"
                                sidebarOpen={isSidebarOpen}
                            />
                        </div>
                    </div>
                ) : (
                    // CHAT STATE: Scrollable + Fixed Bottom
                    <>
                        <div className="flex-1 overflow-y-auto px-4 pt-24 pb-32">
                            <div className="w-full max-w-3xl mx-auto space-y-6">
                                {messages.map((msg, index) => (
                                    <MessageBubble key={index} message={msg} />
                                ))}

                                {/* Streaming Message */}
                                {isStreaming && streamingText && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-unicode-green flex items-center justify-center shrink-0">
                                            <Bot className="w-5 h-5 text-unicode-black" />
                                        </div>
                                        <div className="flex-1 pt-2">
                                            <div className="text-white whitespace-pre-wrap">
                                                {streamingText}
                                                <span className="typewriter-cursor"></span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Loading Indicator */}
                                {isLoading && !isStreaming && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-unicode-green flex items-center justify-center">
                                            <Bot className="w-5 h-5 text-unicode-black" />
                                        </div>
                                        <div className="flex gap-1">
                                            <div
                                                className="w-2 h-2 bg-unicode-green rounded-full animate-bounce"
                                                style={{ animationDelay: "0s" }}
                                            />
                                            <div
                                                className="w-2 h-2 bg-unicode-green rounded-full animate-bounce"
                                                style={{ animationDelay: "0.2s" }}
                                            />
                                            <div
                                                className="w-2 h-2 bg-unicode-green rounded-full animate-bounce"
                                                style={{ animationDelay: "0.4s" }}
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Floating Input Bar (Fixed) */}
                        <FloatingInputBar
                            input={input}
                            setInput={setInput}
                            onSend={handleSend}
                            isLoading={isLoading}
                            isGenerating={isGenerating}
                            onStopGeneration={handleStopGeneration}
                            variant="fixed"
                            sidebarOpen={isSidebarOpen}
                        />
                    </>
                )}
            </div>

            {/* Settings Modal */}
            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                onClearHistory={handleClearHistory}
            />
        </div>
    );
}

// Message Bubble Component
function MessageBubble({ message }) {
    const isUser = message.role === "user";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-4 ${isUser ? "flex-row-reverse" : ""}`}
        >
            {/* Avatar */}
            <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isUser
                    ? "bg-unicode-gray-user"
                    : "bg-unicode-green"
                    }`}
            >
                {isUser ? (
                    <User className="w-5 h-5 text-white" />
                ) : (
                    <Bot className="w-5 h-5 text-unicode-black" />
                )}
            </div>

            {/* Message Content */}
            <div className={`flex-1 ${isUser ? "flex justify-end" : ""}`}>
                <div
                    className={`inline-block max-w-full ${isUser
                        ? "bg-unicode-gray-user text-white rounded-2xl px-5 py-3"
                        : "text-white pt-2"
                        }`}
                >
                    <div className="whitespace-pre-wrap break-words">
                        {message.content}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
