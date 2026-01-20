import { motion } from "framer-motion";
import { Code, Cpu, Database, Zap } from "lucide-react";

const starterPrompts = [
    {
        icon: Cpu,
        title: "Quantum Computing",
        prompt: "Explain quantum computing in simple terms",
    },
    {
        icon: Code,
        title: "Debug Python",
        prompt: "Help me debug this Python code",
    },
    {
        icon: Zap,
        title: "React Component",
        prompt: "Generate a React component for a user profile card",
    },
    {
        icon: Database,
        title: "SQL Query",
        prompt: "Write an optimized SQL query for...",
    }
];

export default function StarterCards({ onSelectPrompt }) {
    return (
        <div className="w-full space-y-10">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <div className="w-16 h-16 bg-unicode-green rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-unicode-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
                    </svg>
                </div>
                <h2 className="text-4xl font-bold mb-3 text-white">
                    ¿Cómo puedo ayudarte?
                </h2>
                <p className="text-gray-500 text-sm">
                    Selecciona un prompt o escribe tu propia consulta
                </p>
            </motion.div>

            {/* Starter Cards Grid - Transparent with borders only */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                {starterPrompts.map((item, index) => (
                    <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        onClick={() => onSelectPrompt(item.prompt)}
                        className="group relative border border-unicode-gray-border/40 hover:border-unicode-green/50 rounded-xl p-5 text-left transition-all duration-300 overflow-hidden bg-transparent hover:bg-unicode-gray/10"
                    >
                        {/* Content */}
                        <div className="relative z-10">
                            <div className="mb-3">
                                <item.icon className="w-5 h-5 text-unicode-green" />
                            </div>
                            <h3 className="font-semibold mb-2 text-white text-base">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                {item.prompt}
                            </p>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
