import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Calendar, User, Share2, Clock, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import GrandFinale from '@/components/GrandFinale';
import { stories } from '@/data/stories';
import NotFound from './NotFound';
import { useRef } from 'react';

const StoryDetail = () => {
    const { id } = useParams();
    const story = stories.find(s => s.id === Number(id)); // Check against numeric ID
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    // Handle Mock "Featured" Story (ID 99 from Stories Page)
    if (id === '99') {
        const FEATURED_STORY = {
            id: 99,
            title: "The Girl Who Built a Library",
            category: "Education",
            date: "Feb 10, 2026",
            author: "Sarah Jenkins",
            excerpt: "In a village where girls were forbidden to read, Ananya started a revolution with just one book.",
            image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2074",
            content: `
                <p>The first time Ananya held a book, she hid it under her shawl. In her village, nestled deep in the valleys of rural India, education was considered a luxury for boys and a distraction for girls.</p>
                <p>"My father told me that books would give me dangerous ideas," Ananya recalls, sitting in the sun-drenched courtyard that serves as her makeshift classroom. "He was right. They gave me the idea that I could clear the path for others."</p>
                <h3>The First Step</h3>
                <p>It began with a single copy of an English dictionary, found in a pile of donations intended for the boys' school. Ananya, then just 14, taught herself to decipher the words by comparing them to old newspapers.</p>
                <p>Word spread. Other girls, hungry for knowledge, began to gather in secret. What started as a clandestine book club grew into a movement. They called themselves 'The Readers of the Valley'.</p>
                <blockquote>"Knowledge is the only wealth that cannot be stolen."</blockquote>
                <p>When the Patel Foundation learned of Ananya's initiative, we didn't come in with bulldozers to build a school. We came with a question: "What do you need?"</p>
                <p>The answer was simple: "We need a roof."</p>
                <h3>Building the Dream</h3>
                <p>Today, the 'Ananya Library' stands as a beacon of hope. It houses over 5,000 books and serves as a community hub for 300 girls. It is entirely solar-powered, connected to the internet, and managed by the girls themselves.</p>
                <p>Ananya is now studying law on a full scholarship. "This library is not just a building," she says. "It is a fortress. Inside these walls, we are not just girls. We are scientists, poets, and leaders."</p>
            `
        };
        // Inject featured story if accessed via ID 99
        return <RenderStoryDetail story={FEATURED_STORY} />;
    }

    if (!story) return <NotFound />;
    return <RenderStoryDetail story={story} />;
};

const RenderStoryDetail = ({ story }: { story: any }) => {
    const { scrollYProgress } = useScroll();

    return (
        <main className="bg-[#fffcf5] text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-900 min-h-screen">
            <SEO title={story.title} description={story.excerpt} />

            {/* Reading Progress Bar */}
            <motion.div
                style={{ scaleX: scrollYProgress }}
                className="fixed top-0 left-0 right-0 h-1 bg-orange-600 transform origin-left z-50"
            />

            <Navbar theme="light" />

            <article className="pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-4xl">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest text-orange-600 mb-6"
                        >
                            <span>{story.category}</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span>{story.date}</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-serif font-medium leading-tight mb-8 text-slate-900"
                        >
                            {story.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-slate-500 font-serif italic max-w-2xl mx-auto"
                        >
                            {story.excerpt}
                        </motion.p>
                    </div>

                    {/* Author Bar */}
                    <div className="flex items-center justify-between border-t border-b border-slate-200 py-6 mb-12">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
                                <img src={`https://ui-avatars.com/api/?name=${story.author}&background=random`} alt={story.author} />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-slate-900">{story.author}</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">Patel Foundation Contributor</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-slate-400">
                            <Share2 className="hover:text-slate-900 cursor-pointer transition-colors" size={20} />
                            <div className="w-px h-6 bg-slate-200" />
                            <div className="text-xs font-bold uppercase flex items-center gap-2">
                                <Clock size={14} /> 8 min read
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="rounded-xl overflow-hidden mb-16 shadow-2xl"
                    >
                        <img src={story.image} alt={story.title} className="w-full h-auto" />
                        <div className="p-4 bg-white/50 text-xs text-slate-500 italic text-center">
                            Photography from the field in {story.category === 'Digital Access' ? 'Kenya' : 'India'}.
                        </div>
                    </motion.div>

                    {/* Content */}
                    <div className="prose prose-lg prose-slate prose-headings:font-serif prose-headings:font-normal prose-a:text-orange-600 max-w-none mx-auto first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-orange-600">
                        <div dangerouslySetInnerHTML={{ __html: story.content }} />
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2 mt-12 mb-20">
                        {['Impact', story.category, 'Community', '2025'].map(tag => (
                            <span key={tag} className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-slate-200 cursor-pointer transition-colors">
                                #{tag}
                            </span>
                        ))}
                    </div>

                </div>
            </article>

            {/* Read Next */}
            <section className="bg-white py-20 border-t border-slate-100">
                <div className="container mx-auto px-6">
                    <h3 className="text-3xl font-serif font-medium mb-12 text-center text-slate-900">Read Next</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {stories.filter(s => s.id !== story.id).slice(0, 3).map(s => (
                            <Link to={`/stories/${s.id}`} key={s.id} className="group cursor-pointer">
                                <div className="aspect-[3/2] rounded-lg overflow-hidden mb-4 bg-slate-100">
                                    <img src={s.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                                <div className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2">{s.category}</div>
                                <h4 className="text-xl font-serif font-medium text-slate-900 group-hover:underline decoration-orange-600 underline-offset-4 line-clamp-2">
                                    {s.title}
                                </h4>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <GrandFinale />
        </main>
    );
}

export default StoryDetail;
