import { motion } from "framer-motion";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-unicode-green/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                >
                    <img
                        src="/unicode-logo.png"
                        alt="Unicode Logo"
                        className="w-8 h-8"
                    />
                    <span className="text-2xl font-bold bg-gradient-to-r from-unicode-green to-emerald-400 bg-clip-text text-transparent">
                        UNICODE AI
                    </span>
                </motion.div>

                {/* Navigation Links */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hidden md:flex items-center gap-8"
                >
                    <a
                        href="#quienes-somos"
                        className="text-gray-300 hover:text-unicode-green transition-colors duration-300 font-medium"
                    >
                        ¿Quiénes somos?
                    </a>
                    <a
                        href="#proyectos"
                        className="text-gray-300 hover:text-unicode-green transition-colors duration-300 font-medium"
                    >
                        Nuestros proyectos
                    </a>
                    <a
                        href="#aportes"
                        className="text-gray-300 hover:text-unicode-green transition-colors duration-300 font-medium"
                    >
                        Nuestros aportes
                    </a>

                    {/* Sign In Button */}
                    <button className="px-6 py-2.5 bg-unicode-green/10 text-unicode-green border border-unicode-green/30 rounded-full hover:bg-unicode-green/20 hover:border-unicode-green/50 transition-all duration-300 font-semibold backdrop-blur-sm">
                        Sign In
                    </button>
                </motion.div>
            </div>
        </nav>
    );
}
