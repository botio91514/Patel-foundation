import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import GrandFinale from '@/components/GrandFinale';
import { Calendar, User, ArrowRight, BookOpen, Quote, Filter, PlayCircle } from 'lucide-react';
import { stories } from '@/data/stories';
import { MEDIA } from '@/data/media';

// --- 1. HERO CAROUSEL DATA ---
const HERO_STORIES = [
    {
        id: 99,
        category: "Cover Story",
        title: "The Girl Who Built a Library.",
        subtitle: "In a village where girls were forbidden to read, Ananya started a revolution with just one book.",
        date: "Feb 10, 2026",
        image: MEDIA.stories.libraryGirl
    },
    {
        id: 5, // Oxygen Mission
        category: "Crisis Response",
        title: "The Oxygen Mission.",
        subtitle: "When the second wave hit, we pivoted our entire logistics network to deliver life-saving oxygen.",
        date: "April 12, 2021",
        image: MEDIA.stories.oxygenMission
    },
    {
        id: 2, // Digital Classrooms
        category: "Innovation",
        title: "Classrooms Without Walls.",
        subtitle: "How solar-powered tablets are bridging the digital divide for students in remote Kenya.",
        date: "Feb 28, 2024",
        image: MEDIA.stories.digitalClass
    }
];

const CATEGORIES = ["All", "Education", "Pandemic Relief", "Healthcare", "Women", "Digital Access"];

const Stories = () => {
    const [filter, setFilter] = useState("All");
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const yHero = useTransform(scrollYProgress, [0, 1], [0, 200]);

    // Hero Carousel State
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % HERO_STORIES.length);
        }, 6000); // Change every 6 seconds
        return () => clearInterval(timer);
    }, []);

    const activeStory = HERO_STORIES[currentIndex];

    // Filter Logic
    const filteredStories = filter === "All"
        ? stories
        : stories.filter(s => s.category === filter);

    return (
        <main ref={containerRef} className="bg-[#FDFBF7] min-h-screen text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden w-full max-w-[100vw]">
            <SEO title="Journal - Impact Stories" description="Chronicles of change from the Patel Foundation." />

            <Navbar theme="dark" />

            {/* --- 1. EDITORIAL HERO SLIDER --- */}
            <section className="relative h-screen w-full flex items-end justify-start overflow-hidden bg-black">

                {/* Background Image Transition */}
                <div className="absolute inset-0 z-0">
                    <AnimatePresence mode="popLayout">
                        <motion.img
                            key={activeStory.id}
                            src={activeStory.image}
                            alt="Hero"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5 }}
                            className="absolute inset-0 w-full h-full object-cover opacity-80"
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
                </div>

                <div className="relative z-10 container mx-auto px-6 pb-20 text-white w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStory.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span className="bg-orange-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                                    {activeStory.category}
                                </span>
                                <span className="flex items-center gap-2 text-white/80 text-sm font-medium tracking-wide">
                                    <Calendar size={14} /> {activeStory.date}
                                </span>
                            </div>

                            <h1 className="text-6xl md:text-8xl font-serif font-medium leading-[0.9] mb-6 max-w-4xl tracking-tight">
                                {activeStory.title}
                            </h1>

                            <p className="text-xl md:text-2xl text-white/80 max-w-2xl font-light leading-relaxed mb-10">
                                {activeStory.subtitle}
                            </p>

                            <div className="flex gap-4">
                                <Link
                                    to={`/stories/${activeStory.id}`}
                                    className="px-8 py-4 bg-white text-black font-bold text-sm tracking-widest uppercase rounded-full hover:bg-orange-500 hover:text-white transition-colors flex items-center gap-3"
                                >
                                    Read Full Story <ArrowRight size={18} />
                                </Link>
                                <button className="px-8 py-4 border border-white/30 text-white font-bold text-sm tracking-widest uppercase rounded-full hover:bg-white/10 transition-colors flex items-center gap-3 backdrop-blur-sm">
                                    <PlayCircle size={18} /> Watch Film
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Progress Indicators */}
                    <div className="absolute bottom-10 right-6 flex gap-3">
                        {HERO_STORIES.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-12 h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-orange-500' : 'bg-white/30 hover:bg-white'}`}
                            />
                        ))}
                    </div>
                </div>
            </section>


            {/* --- 2. THE JOURNAL SECTION --- */}
            <section className="pt-12 pb-24 px-6 relative">


                <div className="container mx-auto">

                    {/* Header & Filter */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div>
                            <span className="text-orange-600 font-bold uppercase tracking-widest text-xs mb-2 block">The Impact Log</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-slate-900">Latest Chronicles</h2>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-5 py-2 rounded-full text-sm font-bold border transition-all ${filter === cat ? 'bg-slate-900 text-white border-slate-900' : 'bg-transparent text-slate-500 border-slate-200 hover:border-slate-900 hover:text-slate-900'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* MASONRY / GRID LAYOUT */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">

                        {/* Quote Card (Insert randomly or fixed position) */}
                        <div className="bg-orange-600 text-white p-10 rounded-xl flex flex-col justify-center relative overflow-hidden group">
                            <div className="absolute top-4 right-4 text-orange-400 opacity-30">
                                <Quote size={64} />
                            </div>
                            <blockquote className="text-2xl font-serif leading-relaxed relative z-10 mb-6 font-medium">
                                "When the schools closed, we thought learning was over. Then the tablets arrived. Now, I code every day."
                            </blockquote>
                            <cite className="not-italic text-orange-200 font-mono text-sm uppercase tracking-widest">
                                — Rahul, Age 14, Digital Access Scholar
                            </cite>
                        </div>

                        {filteredStories.map((story, index) => (
                            <motion.article
                                key={story.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: index * 0.1, duration: 0.8 }}
                                className="group cursor-pointer flex flex-col"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-6 bg-slate-200">
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                                    <img
                                        src={story.image}
                                        alt={story.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-900 rounded-sm z-20">
                                        {story.category}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium mb-3">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {story.date}</span>
                                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                    <span>5 min read</span>
                                </div>

                                <h3 className="text-3xl font-serif font-medium text-slate-900 mb-3 group-hover:text-orange-600 transition-colors leading-tight">
                                    <Link to={`/stories/${story.id}`}>
                                        {story.title}
                                    </Link>
                                </h3>

                                <p className="text-slate-500 font-light leading-relaxed mb-4 line-clamp-3">
                                    {story.excerpt}
                                </p>

                                <Link to={`/stories/${story.id}`} className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-900 group-hover:text-orange-600 transition-colors mt-auto">
                                    Read Story <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </motion.article>
                        ))}

                    </div>

                    {/* Load More Button */}
                    <div className="flex justify-center mt-20">
                        <button className="px-10 py-4 border border-slate-200 hover:border-slate-900 text-slate-500 hover:text-slate-900 rounded-full text-sm font-bold uppercase tracking-widest transition-all">
                            Load More Stories
                        </button>
                    </div>

                </div>
            </section>

            {/* --- 3. NEWSLETTER / IMPACT UPDATE --- */}
            <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 pointer-events-none" />
                <div className="container mx-auto px-6 text-center relative z-10 max-w-2xl">
                    <BookOpen size={48} className="mx-auto mb-8 text-orange-500" />
                    <h2 className="text-4xl md:text-5xl font-serif mb-6">Stories straight to your inbox.</h2>
                    <p className="text-lg text-slate-400 mb-10 font-light">
                        No spam. No fluff. Just real stories of how your support is changing the world, once a month.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-light"
                        />
                        <button className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full transition-colors uppercase tracking-widest text-sm">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            <GrandFinale />
        </main>
    );
};

export default Stories;
