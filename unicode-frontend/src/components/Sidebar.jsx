import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageSquare, Home, Settings, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({
    isOpen,
    onNewChat,
    chatSessions = [],
    onSelectSession,
    onDeleteSession,
    currentSessionId,
    onClose,
    onOpenSettings
}) {
    const navigate = useNavigate();

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 260, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full glass-ultra border-r border-unicode-gray-border flex flex-col p-4 z-20 overflow-hidden"
                >
                    {/* Header with Logo */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <img
                                src="/unicode-logo.png"
                                alt="Unicode Logo"
                                className="w-7 h-7"
                            />
                            <span className="font-bold text-base tracking-wider bg-gradient-to-r from-unicode-green to-unicode-green-light bg-clip-text text-transparent">
                                UNICODE AI
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 hover:bg-unicode-gray rounded-lg text-gray-400 hover:text-white transition-all"
                            title="Cerrar sidebar"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="flex items-center gap-2 mb-6">
                        {/* Home Button */}
                        <button
                            onClick={() => navigate('/')}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 border border-unicode-gray-border hover:border-unicode-green/30 text-gray-400 hover:text-unicode-green hover:bg-unicode-green/5 rounded-lg transition-all text-sm"
                            title="Volver al inicio"
                        >
                            <Home className="w-4 h-4" />
                        </button>

                        {/* New Chat Button */}
                        <button
                            onClick={onNewChat}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 border border-unicode-green text-unicode-green hover:bg-unicode-green/10 rounded-lg transition-all text-sm font-semibold"
                            title="Nuevo chat"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Chat History */}
                    <div className="flex-1 overflow-y-auto">
                        <p className="text-xs font-semibold text-gray-600 mb-3 px-2 uppercase tracking-wider">
                            Recientes
                        </p>
                        <div className="space-y-1">
                            {chatSessions.length > 0 ? (
                                chatSessions.map((session) => (
                                    <div
                                        key={session.id}
                                        className={`group relative w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-all ${session.id === currentSessionId
                                                ? 'bg-unicode-green/10 text-white border border-unicode-green/30'
                                                : 'text-gray-400 hover:bg-unicode-gray hover:text-white'
                                            }`}
                                    >
                                        <button
                                            onClick={() => onSelectSession(session.id)}
                                            className="flex-1 flex items-center gap-2 min-w-0"
                                        >
                                            <MessageSquare className={`w-4 h-4 shrink-0 ${session.id === currentSessionId ? 'text-unicode-green' : 'group-hover:text-unicode-green'
                                                } transition-colors`} />
                                            <span className="truncate">{session.title}</span>
                                        </button>

                                        {/* Delete Button (appears on hover) */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteSession(session.id);
                                            }}
                                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded text-red-400 hover:text-red-300 transition-all"
                                            title="Eliminar chat"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="px-3 py-6 text-center">
                                    <div className="w-12 h-12 bg-unicode-gray rounded-xl flex items-center justify-center mx-auto mb-3">
                                        <MessageSquare className="w-6 h-6 text-gray-600" />
                                    </div>
                                    <p className="text-xs text-gray-600">
                                        No hay chats recientes
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* User Profile & Settings */}
                    <div className="mt-auto pt-4 border-t border-unicode-gray-border space-y-2">
                        {/* Settings Button */}
                        <button
                            onClick={onOpenSettings}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-unicode-gray rounded-lg transition-colors group text-gray-400 hover:text-white"
                        >
                            <Settings className="w-4 h-4 group-hover:text-unicode-green transition-colors" />
                            <span className="text-sm font-medium">Configuración</span>
                        </button>

                        {/* User Profile */}
                        <div className="flex items-center gap-3 px-2 py-2 hover:bg-unicode-gray rounded-lg transition-colors cursor-pointer group">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-unicode-green to-unicode-green-dark flex items-center justify-center font-bold text-unicode-black text-sm">
                                U
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                                <span className="text-sm font-semibold text-white truncate">
                                    Estudiante UNI
                                </span>
                                <span className="text-xs text-gray-500 font-mono">
                                    Free Plan
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
