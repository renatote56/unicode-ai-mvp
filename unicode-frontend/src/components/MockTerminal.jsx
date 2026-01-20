import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export default function MockTerminal() {
    return (
        <motion.div
            initial={{ opacity: 0, rotateX: 20, y: 50 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative max-w-3xl w-full mx-auto"
            style={{ perspective: "1000px" }}
        >
            <div
                className="relative bg-unicode-gray border border-unicode-gray-border rounded-xl overflow-hidden shadow-2xl"
                style={{ transform: "rotateX(5deg) rotateY(-5deg)" }}
            >
                {/* Terminal Header */}
                <div className="bg-unicode-black-light border-b border-unicode-gray-border px-4 py-3 flex items-center gap-2">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                        <Terminal className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-400 font-mono">unicode-terminal</span>
                    </div>
                </div>

                {/* Terminal Body */}
                <div className="p-6 font-mono text-sm space-y-3 bg-unicode-black-light">
                    <div className="flex gap-2">
                        <span className="text-unicode-green">$</span>
                        <span className="text-gray-300">unicode-ai generate function</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="pl-4 space-y-2"
                    >
                        <div className="text-gray-500">// Generando código optimizado...</div>

                        <div className="space-y-1">
                            <div>
                                <span className="text-purple-400">function</span>
                                {" "}
                                <span className="text-unicode-green">calcularPromedio</span>
                                <span className="text-gray-300">(</span>
                                <span className="text-orange-400">arr</span>
                                <span className="text-gray-300">) {"{"}</span>
                            </div>
                            <div className="pl-4">
                                <span className="text-purple-400">const</span>
                                {" "}
                                <span className="text-blue-400">sum</span>
                                {" = arr."}
                                <span className="text-unicode-green">reduce</span>
                                <span className="text-gray-300">((a, b) =&gt; a + b, 0);</span>
                            </div>
                            <div className="pl-4">
                                <span className="text-purple-400">return</span>
                                {" "}
                                <span className="text-gray-300">sum / arr.length;</span>
                            </div>
                            <div>
                                <span className="text-gray-300">{"}"}</span>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 0.5 }}
                            className="flex items-center gap-2 text-unicode-green"
                        >
                            <span>✓</span>
                            <span>Código generado exitosamente</span>
                        </motion.div>
                    </motion.div>

                    <div className="flex gap-2 mt-4">
                        <span className="text-unicode-green">$</span>
                        <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="text-gray-300"
                        >
                            _
                        </motion.span>
                    </div>
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-unicode-green/20 to-purple-500/20 blur-xl -z-10 opacity-50"></div>
            </div>
        </motion.div>
    );
}
