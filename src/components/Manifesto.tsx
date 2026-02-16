import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

import { MEDIA } from '@/data/media';

const values = [
    {
        id: 1,
        title: "Roots Deep as Earth",
        description: "Born from the red soil of Kavitha. We carry the village spirit in our very soul.",
        image: MEDIA.projects.trees
    },
    {
        id: 2,
        title: "Unstoppable Force",
        description: "We don't just give aid. We ignite potential, creating a wildfire of progress.",
        image: MEDIA.events.reliefWork
    },
    {
        id: 3,
        title: "The Human Thread",
        description: "Connecting a donor in New York to a child in Gujarat. One heart, one pulse.",
        image: MEDIA.hero.global
    },
    {
        id: 4,
        title: "Audacious Hope",
        description: "Dreaming big isn't enough. We build the schools, the clinics, the future.",
        image: MEDIA.hero.future
    },
    {
        id: 5,
        title: "Legacy of Light",
        description: "Every act of kindness casts a shadow that stretches into eternity.",
        image: MEDIA.projects.vidya
    }
];

const ManifestoItem = ({ item, index, setModal }: { item: any, index: number, setModal: any }) => {
    return (
        <div
            onMouseEnter={() => setModal({ active: true, index })}
            onMouseLeave={() => setModal({ active: false, index })}
            className="group flex flex-col md:flex-row justify-between items-start md:items-center py-12 md:py-24 border-t border-white/20 cursor-pointer transition-all duration-500 md:hover:px-12"
        >
            {/* Mobile Image */}
            <div className="w-full h-64 mb-6 md:hidden rounded-lg overflow-hidden border border-white/10">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-80"
                    loading="lazy"
                />
            </div>

            <h3 className="text-4xl md:text-8xl font-serif text-white group-hover:text-white/50 group-hover:translate-x-4 transition-all duration-500 w-full md:w-auto text-left tracking-tight mb-4 md:mb-0">
                {item.title}
            </h3>
            <div className="flex items-center gap-4 md:gap-12 w-full md:w-auto justify-between md:justify-end">
                <p className="text-white/40 group-hover:text-white transition-colors duration-500 text-sm md:text-xl max-w-xs text-left font-light leading-relaxed">
                    {item.description}
                </p>
                <span className="text-white/20 text-xl md:text-2xl font-mono group-hover:text-primary transition-colors duration-500">0{index + 1}</span>
            </div>
        </div>
    );
};

const Manifesto = () => {
    const [modal, setModal] = useState({ active: false, index: 0 });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth physics-based movement
    const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 });
    const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        mouseX.set(clientX);
        mouseY.set(clientY);
    };

    const scaleAnimation = {
        initial: { scale: 0, x: "-50%", y: "-50%" },
        open: { scale: 1, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } },
        closed: { scale: 0, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] as [number, number, number, number] } }
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative bg-black py-16 md:py-32 px-6 md:px-12 w-full z-20 overflow-hidden"
        >
            {/* Background Noise with Overlay */}
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>

            <div className="container mx-auto relative z-10">
                <div className="mb-24 md:mb-32">
                    <h4 className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-6">Our DNA</h4>
                    <h2 className="text-white text-5xl md:text-7xl lg:text-8xl font-light leading-[0.9] max-w-6xl tracking-tighter">
                        Not Just a Foundation. <br />
                        <span className="text-white/30 italic font-serif ml-4 md:ml-12">A Living Movement.</span>
                    </h2>
                </div>

                <div className="flex flex-col w-full hover:opacity-100 group-hover/list:opacity-50">
                    {values.map((item, index) => (
                        <ManifestoItem key={index} item={item} index={index} setModal={setModal} />
                    ))}
                </div>
            </div>

            {/* Floating Reveal Modal */}
            <motion.div
                variants={scaleAnimation}
                initial="initial"
                animate={modal.active ? "open" : "closed"}
                className="fixed top-0 left-0 h-[350px] w-[450px] pointer-events-none overflow-hidden rounded-2xl z-50 shadow-2xl bg-neutral-900 hidden lg:block"
                style={{
                    left: smoothX,
                    top: smoothY
                }}
            >
                <div
                    style={{ top: modal.index * -100 + "%" }}
                    className="relative h-full w-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                >
                    {values.map((item, i) => (
                        <div key={i} className="h-full w-full flex items-center justify-center bg-neutral-900">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover opacity-90 scale-105" // Added scale to avoid white edges
                                loading="lazy"
                                width={450}
                                height={350}
                            />
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Cursor Label - Trailing Effect */}
            <motion.div
                variants={{
                    initial: { scale: 0, opacity: 0 },
                    open: { scale: 1, opacity: 1, transition: { duration: 0.3, delay: 0.05, ease: "easeInOut" } },
                    closed: { scale: 0, opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }
                }}
                animate={modal.active ? "open" : "closed"}
                className="fixed top-0 left-0 w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center z-50 pointer-events-none text-black font-bold text-sm uppercase tracking-widest hidden md:flex backdrop-blur-sm"
                style={{
                    left: smoothX,
                    top: smoothY
                }}
            >
                View
            </motion.div>

        </section>
    );
};

export default Manifesto;
