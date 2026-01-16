import { motion } from "framer-motion";
import { ArrowRight, Code, Cpu, Globe } from "lucide-react";

export default function LandingPage({ onStart }) {
    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center text-center px-4">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-unicode-green/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
            >
                <span className="inline-block py-1 px-3 rounded-full bg-unicode-green/10 text-unicode-green text-sm font-semibold mb-6 border border-unicode-green/20">
                    The Future of Coding
                </span>

                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                    UNICODE AI
                </h1>

                <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                    Potenciando el desarrollo de software en la UNI.
                    Únete a la revolución con nuestro asistente inteligente.
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onStart}
                    className="group relative px-8 py-4 bg-unicode-green text-unicode-black font-bold text-lg rounded-full overflow-hidden transition-all shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:shadow-[0_0_40px_rgba(0,255,136,0.6)]"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Probar Free Trial <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </motion.button>
            </motion.div>

            {/* Features Grid */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full"
            >
                <FeatureCard
                    icon={<Code className="w-8 h-8 text-unicode-green" />}
                    title="Desarrollo"
                    desc="Innovación en software y algoritmos avanzados."
                />
                <FeatureCard
                    icon={<Cpu className="w-8 h-8 text-blue-400" />}
                    title="Inteligencia Artificial"
                    desc="Modelos RAG integrados para asistencia en tiempo real."
                />
                <FeatureCard
                    icon={<Globe className="w-8 h-8 text-purple-400" />}
                    title="Comunidad"
                    desc="Centro cultural de la UNI para el mundo."
                />
            </motion.div>
        </div>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <div className="p-6 rounded-2xl bg-unicode-gray/50 border border-white/5 backdrop-blur-sm hover:bg-unicode-gray hover:border-unicode-green/30 transition-all group">
            <div className="mb-4 bg-black/40 w-fit p-3 rounded-xl group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm">{desc}</p>
        </div>
    )
}
