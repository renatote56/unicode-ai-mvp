import { motion } from "framer-motion";
import { Cpu, Globe, Code } from "lucide-react";

export default function BentoGrid() {
    return (
        <section id="features" className="w-full max-w-7xl mx-auto px-6 py-24">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Herramientas que potencian tu desarrollo
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Todo lo que necesitas para llevar tus proyectos al siguiente nivel
                </p>
            </motion.div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Large Card - AI */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="md:col-span-2 lg:col-span-2"
                >
                    <BentoCard
                        icon={<Cpu className="w-10 h-10 text-unicode-green" />}
                        title="Inteligencia Artificial"
                        description="Modelos RAG entrenados con data de la facultad. Obtén respuestas precisas basadas en el contenido de tus cursos y recursos académicos."
                        gradient="from-unicode-green/10 to-transparent"
                    />
                </motion.div>

                {/* Medium Card - Community */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="md:col-span-1"
                >
                    <BentoCard
                        icon={<Globe className="w-10 h-10 text-blue-400" />}
                        title="Comunidad"
                        description="Conecta con otros devs de la FIIS. Comparte conocimiento y crece junto a la comunidad."
                        gradient="from-blue-500/10 to-transparent"
                    />
                </motion.div>

                {/* Medium Card - Development */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="md:col-span-1"
                >
                    <BentoCard
                        icon={<Code className="w-10 h-10 text-purple-400" />}
                        title="Desarrollo"
                        description="Snippets optimizados para tus cursos. Acelera tu flujo de trabajo con código probado."
                        gradient="from-purple-500/10 to-transparent"
                    />
                </motion.div>

                {/* Medium Card - Extra feature (optional) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="md:col-span-2 lg:col-span-2"
                >
                    <BentoCard
                        icon={
                            <div className="relative">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-unicode-green to-unicode-green-dark flex items-center justify-center text-2xl">
                                    ⚡
                                </div>
                            </div>
                        }
                        title="Resultados en tiempo real"
                        description="Obtén respuestas instantáneas con nuestra arquitectura optimizada. Experimenta la velocidad de una IA diseñada específicamente para estudiantes de ingeniería."
                        gradient="from-unicode-green/10 via-purple-500/5 to-transparent"
                    />
                </motion.div>
            </div>
        </section>
    );
}

function BentoCard({ icon, title, description, gradient }) {
    return (
        <div className="group relative h-full bg-unicode-gray rounded-2xl p-8 border border-unicode-gray-border hover:border-unicode-green/40 transition-all duration-500 overflow-hidden">
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

            {/* Content */}
            <div className="relative z-10">
                {/* Icon Container */}
                <div className="mb-6 w-fit p-4 rounded-xl bg-unicode-black-light group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-unicode-green transition-colors duration-300">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Hover glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-unicode-green/20 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}
