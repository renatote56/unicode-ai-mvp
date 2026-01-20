import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "./Navbar";
import MockTerminal from "./MockTerminal";
import BentoGrid from "./BentoGrid";
import Footer from "./Footer";

export default function LandingPage() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-12">
                {/* Cyberpunk Grid Background */}
                <div className="absolute inset-0 grid-bg opacity-40"></div>

                {/* Gradient Orbs */}
                <div className="absolute top-20 left-10 w-96 h-96 bg-unicode-green/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-6"
                    >
                        <span className="inline-block px-4 py-2 rounded-full bg-unicode-green/10 text-unicode-green text-sm font-semibold border border-unicode-green/20 backdrop-blur-sm">
                            🚀 Construido por estudiantes para estudiantes
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight"
                    >
                        <span className="bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent">
                            Potenciando el
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-unicode-green via-unicode-green-light to-unicode-green bg-clip-text text-transparent">
                            desarrollo de software
                        </span>
                        <br />
                        <span className="bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent">
                            en la UNI
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed"
                    >
                        Únete a la revolución con nuestro asistente inteligente.
                        <br className="hidden md:block" />
                        Modelos RAG integrados y contexto real.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mb-16"
                    >
                        <button
                            onClick={() => navigate('/chat')}
                            className="group relative px-10 py-5 bg-unicode-green text-unicode-black font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 glow-green hover:shadow-[0_0_40px_rgba(0,255,136,0.6)]"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Empezar Ahora
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        </button>
                    </motion.div>

                    {/* Mock Terminal Preview */}
                    <MockTerminal />
                </div>
            </section>

            {/* Bento Grid Features */}
            <BentoGrid />

            {/* Footer */}
            <Footer />
        </div>
    );
}

