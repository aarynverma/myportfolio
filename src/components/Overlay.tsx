"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

const Overlay = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
    const x2 = useTransform(scrollYProgress, [0.25, 0.45], [-50, 0]);

    const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0]);
    const x3 = useTransform(scrollYProgress, [0.55, 0.75], [50, 0]);

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">
            {/* Section 1: Center */}
            <div className="sticky top-0 h-screen flex items-center justify-center">
                <motion.div style={{ opacity: opacity1, y: y1 }} className="text-center px-4">
                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-4">Aryan Verma</h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-200 font-medium">Senior Software Engineer</p>
                    <p className="text-base sm:text-lg md:text-xl text-gray-200 font-light mt-2">Creative Systems Builder</p>
                </motion.div>
            </div>

            {/* Section 2: Left */}
            <div className="absolute top-[150vh] w-full h-screen flex items-center">
                <motion.div
                    style={{ opacity: opacity2, x: x2 }}
                    className="container mx-auto px-6 md:px-20"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold max-w-2xl leading-tight">
                        I build scalable <span className="text-blue-500">real-time</span> digital experiences.
                    </h2>
                </motion.div>
            </div>

            {/* Section 3: Right */}
            <div className="absolute top-[300vh] w-full h-screen flex items-center justify-end">
                <motion.div
                    style={{ opacity: opacity3, x: x3 }}
                    className="container mx-auto px-6 md:px-20 text-right"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold ml-auto max-w-2xl leading-tight">
                        Bridging engineering <span className="text-purple-500">precision</span> with creative interaction.
                    </h2>
                </motion.div>
            </div>

            {/* Floating Resume Button */}
            <motion.a
                href="https://drive.google.com/file/d/1shaWWsLO5NFclJnE36-vEA1ExLLFR8R_/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="fixed top-8 right-8 z-50 group pointer-events-auto"
            >
                <div className="relative px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-colors duration-300 hover:bg-white/10 hover:border-white/30">
                    <span className="relative z-10 text-xs font-medium tracking-widest uppercase text-gray-300 group-hover:text-white transition-colors">
                        Resume
                    </span>
                </div>
            </motion.a>
        </div>
    );
};

export default Overlay;
