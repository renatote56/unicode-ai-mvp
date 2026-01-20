import { motion } from "framer-motion";
import { Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative border-t border-unicode-green/10 bg-unicode-black/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Left - Message */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-gray-400 text-sm"
                    >
                        Hecho con <span className="text-red-500">❤️</span> por el equipo de Unicode
                    </motion.p>

                    {/* Center - Logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2"
                    >
                        <img
                            src="/unicode-logo.png"
                            alt="Unicode Logo"
                            className="w-6 h-6 opacity-70"
                        />
                        <span className="text-gray-500 text-xs font-mono">UNICODE.PE</span>
                    </motion.div>

                    {/* Right - Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4"
                    >
                        <a
                            href="https://www.instagram.com/cc.unicode/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-unicode-gray-card hover:bg-unicode-green/20 text-gray-400 hover:text-unicode-green transition-all duration-300 hover:scale-110"
                            aria-label="Instagram"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/ccunicode/?viewAsMember=true"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-unicode-gray-card hover:bg-unicode-green/20 text-gray-400 hover:text-unicode-green transition-all duration-300 hover:scale-110"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </motion.div>
                </div>

                {/* Bottom Note */}
                <div className="mt-6 pt-6 border-t border-unicode-gray-border text-center">
                    <p className="text-xs text-gray-600 font-mono">
                        © 2026 Unicode AI. Desarrollado por estudiantes de la Universidad Nacional de Ingeniería (UNI).
                    </p>
                </div>
            </div>
        </footer>
    );
}
