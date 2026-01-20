import { motion } from "framer-motion";

export default function ModelSelector() {
    return (
        <div
            className="fixed top-6 -translate-x-1/2 z-30"
            style={{ left: "calc(130px + 50vw)" }}
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-ultra border border-unicode-green/20 rounded-full px-6 py-3 flex items-center gap-3 shadow-lg"
            >
                {/* Online Status Indicator */}
                <div className="relative flex items-center gap-2">
                    <div className="relative">
                        <div className="w-2 h-2 bg-unicode-green rounded-full"></div>
                        <div className="absolute inset-0 w-2 h-2 bg-unicode-green rounded-full animate-ping opacity-75"></div>
                    </div>
                    <span className="text-xs text-unicode-green font-semibold">Online</span>
                </div>

                {/* Divider */}
                <div className="w-px h-4 bg-unicode-gray-border"></div>

                {/* Model Badge */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300 font-mono">Modelo:</span>
                    <span className="text-sm text-white font-semibold">Gemini 1.5 Pro</span>
                </div>
            </motion.div>
        </div>
    );
}
