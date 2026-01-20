import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Paperclip, Square, Image, FileText } from "lucide-react";

export default function FloatingInputBar({
    input,
    setInput,
    onSend,
    isLoading,
    isGenerating,
    onStopGeneration,
    variant = "fixed",
    sidebarOpen = true
}) {
    const [isFocused, setIsFocused] = useState(false);
    const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
    const attachmentRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSend(e);
            setShowAttachmentMenu(false);
        }
    };

    // Calculate left position for fixed mode based on sidebar state
    const leftPosition = variant === "fixed"
        ? (sidebarOpen ? "calc(130px + 50vw)" : "50%")
        : undefined;

    const containerClasses = variant === "fixed"
        ? "fixed bottom-6 -translate-x-1/2 w-full max-w-3xl px-4 z-20"
        : "w-full max-w-3xl z-20";

    const containerStyle = variant === "fixed" ? { left: leftPosition } : {};

    return (
        <div className={containerClasses} style={containerStyle}>
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="relative"
            >
                {/* Attachment Menu */}
                <AnimatePresence>
                    {showAttachmentMenu && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute bottom-full left-4 mb-2 glass-ultra border border-unicode-green/20 rounded-xl shadow-2xl overflow-hidden"
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    alert("Función de insertar imagen próximamente");
                                    setShowAttachmentMenu(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-unicode-green/10 text-gray-300 hover:text-white transition-all text-left"
                            >
                                <Image className="w-5 h-5 text-unicode-green" />
                                <span className="text-sm font-medium whitespace-nowrap">Insertar Imagen</span>
                            </button>
                            <div className="w-full h-px bg-unicode-gray-border"></div>
                            <button
                                type="button"
                                onClick={() => {
                                    alert("Función de insertar documento próximamente");
                                    setShowAttachmentMenu(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-unicode-green/10 text-gray-300 hover:text-white transition-all text-left"
                            >
                                <FileText className="w-5 h-5 text-unicode-green" />
                                <span className="text-sm font-medium whitespace-nowrap">Insertar Documento</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Input Container */}
                <div
                    className={`relative bg-unicode-gray border transition-all duration-300 rounded-full shadow-2xl ${isFocused
                            ? "border-unicode-green/50 glow-ring-green"
                            : "border-unicode-gray-border"
                        }`}
                >
                    {/* Upload Button */}
                    <button
                        ref={attachmentRef}
                        type="button"
                        onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:bg-unicode-gray-card rounded-full transition-all ${showAttachmentMenu ? "text-unicode-green bg-unicode-gray-card" : "text-gray-400 hover:text-unicode-green"
                            }`}
                        title="Adjuntar archivo"
                    >
                        <Paperclip className="w-5 h-5" />
                    </button>

                    {/* Input Field */}
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Escribe tu mensaje..."
                        className="w-full bg-transparent border-none text-white rounded-full pl-16 pr-16 py-5 focus:outline-none placeholder:text-gray-500 font-medium"
                        disabled={isLoading}
                    />

                    {/* Send/Stop Button */}
                    {isGenerating ? (
                        <button
                            type="button"
                            onClick={onStopGeneration}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-red-500/50"
                            title="Detener generación"
                        >
                            <Square className="w-5 h-5" fill="currentColor" />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-unicode-green hover:bg-unicode-green-dark text-unicode-black rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-unicode-gray-card disabled:text-gray-600 shadow-lg hover:shadow-unicode-green/50"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Helper Text */}
                <p className="text-center text-xs text-gray-600 mt-3 font-mono">
                    Unicode AI puede cometer errores. Verifica la información importante.
                </p>
            </motion.form>

            {/* Click outside to close attachment menu */}
            {showAttachmentMenu && (
                <div
                    className="fixed inset-0 -z-10"
                    onClick={() => setShowAttachmentMenu(false)}
                ></div>
            )}
        </div>
    );
}
