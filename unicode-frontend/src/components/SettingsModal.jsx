import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Palette, Database, User } from "lucide-react";

export default function SettingsModal({ isOpen, onClose, onClearHistory }) {
    const [activeTab, setActiveTab] = useState("data");

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-unicode-gray border border-unicode-gray-border rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-unicode-gray-border">
                        <h2 className="text-xl font-bold text-white">Configuración</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-unicode-gray-card rounded-lg text-gray-400 hover:text-white transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-unicode-gray-border px-6">
                        <button
                            onClick={() => setActiveTab("theme")}
                            className={`px-4 py-3 text-sm font-medium transition-all border-b-2 ${activeTab === "theme"
                                    ? "border-unicode-green text-unicode-green"
                                    : "border-transparent text-gray-400 hover:text-white"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <Palette className="w-4 h-4" />
                                Tema
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab("data")}
                            className={`px-4 py-3 text-sm font-medium transition-all border-b-2 ${activeTab === "data"
                                    ? "border-unicode-green text-unicode-green"
                                    : "border-transparent text-gray-400 hover:text-white"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <Database className="w-4 h-4" />
                                Datos
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab("account")}
                            className={`px-4 py-3 text-sm font-medium transition-all border-b-2 ${activeTab === "account"
                                    ? "border-unicode-green text-unicode-green"
                                    : "border-transparent text-gray-400 hover:text-white"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Cuenta
                            </div>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 max-h-[60vh] overflow-y-auto">
                        {activeTab === "theme" && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white mb-2">Apariencia</h3>
                                <p className="text-gray-400 text-sm mb-4">
                                    Personaliza la apariencia de Unicode AI (Próximamente)
                                </p>
                                <div className="bg-unicode-gray-card border border-unicode-gray-border rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-white font-medium">Modo Oscuro</h4>
                                            <p className="text-gray-500 text-xs mt-1">Actualmente activo</p>
                                        </div>
                                        <div className="w-12 h-6 bg-unicode-green rounded-full flex items-center justify-end px-1">
                                            <div className="w-4 h-4 bg-white rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "data" && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white mb-2">Gestión de Datos</h3>
                                <p className="text-gray-400 text-sm mb-4">
                                    Administra tus conversaciones y datos almacenados
                                </p>

                                {/* Clear History Button */}
                                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <Trash2 className="w-5 h-5 text-red-400 mt-0.5" />
                                        <div className="flex-1">
                                            <h4 className="text-white font-medium mb-1">Borrar Historial</h4>
                                            <p className="text-gray-400 text-sm mb-3">
                                                Elimina todas tus conversaciones guardadas. Esta acción no se puede deshacer.
                                            </p>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm("¿Estás seguro de que quieres borrar todo el historial? Esta acción no se puede deshacer.")) {
                                                        onClearHistory();
                                                        onClose();
                                                    }
                                                }}
                                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-all"
                                            >
                                                Borrar Todo el Historial
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "account" && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white mb-2">Información de Cuenta</h3>
                                <p className="text-gray-400 text-sm mb-4">
                                    Gestiona tu perfil de usuario (Próximamente)
                                </p>
                                <div className="bg-unicode-gray-card border border-unicode-gray-border rounded-lg p-4 space-y-3">
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase tracking-wider">Nombre</label>
                                        <p className="text-white font-medium mt-1">Estudiante UNI</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase tracking-wider">Plan</label>
                                        <p className="text-white font-medium mt-1">Free Plan</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase tracking-wider">Email</label>
                                        <p className="text-gray-400 text-sm mt-1">estudiante@uni.edu.pe</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-unicode-gray-border flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-unicode-green hover:bg-unicode-green-dark text-unicode-black rounded-lg font-semibold transition-all"
                        >
                            Cerrar
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
