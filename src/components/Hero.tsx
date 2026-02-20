import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton';
import TextType from './TextType';

import { MEDIA } from '@/data/media';

const GALLERY_IMAGES = [
  { id: 1, src: MEDIA.hero.kavitha, title: "Kavitha" },
  { id: 2, src: MEDIA.hero.education, title: "Education" },
  { id: 3, src: MEDIA.hero.nutrition, title: "Nutrition" },
  { id: 4, src: MEDIA.hero.relief, title: "Relief" },
  { id: 5, src: MEDIA.hero.global, title: "Global" },
  { id: 6, src: MEDIA.hero.future, title: "Future" },
];

const Hero = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen w-full bg-[#FDFBF7] flex flex-col justify-center overflow-hidden pt-32 pb-20">

      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-[60vh] bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* 1. Centered Premium Typography */}
      <div className="relative z-10 container px-4 mx-auto text-center mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/5 shadow-sm text-sm font-medium text-slate-500 mb-8 relative overflow-hidden group"
        >
          <Sparkles size={14} className="text-yellow-500 fill-yellow-500 group-hover:animate-pulse" />
          <span className="tracking-wide uppercase text-xs font-bold animate-shimmer [animation-duration:8s] bg-[linear-gradient(110deg,#64748b,45%,#f59e0b,55%,#64748b)] bg-[length:200%_100%] bg-clip-text text-transparent">Born in Kavitha • Impacting the World</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl lg:text-9xl font-serif font-medium text-slate-900 leading-none md:leading-[0.9] tracking-tight mb-8"
        >
          Roots in India. <br />
          <span className="italic text-primary">Reach for Humanity.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-2xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed mb-12 px-6 min-h-[4rem] md:min-h-[3.5rem]"
        >
          <TextType
            text="From the rural heart of Kavitha, Gujarat, to a global platform for change. We provide education, daily nutrition, and crisis relief to children."
            typingSpeed={30}
            showCursor={true}
            cursorCharacter="|"
            loop={false}
            className="inline"
            startOnVisible={true}
            as="span"
          />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton>
            <Link to="/donate" className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-full text-lg font-medium hover:bg-primary transition-colors shadow-xl inline-block">
              Start Donating
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link to="/about" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full text-lg font-medium hover:bg-slate-50 transition-colors inline-block">
              Our Mission
            </Link>
          </MagneticButton>
        </motion.div>
      </div>

      {/* 2. Expandable Pill Gallery (Cinematic Mobile Slider / Desktop Pill) */}
      <div className="relative z-10 w-full overflow-hidden px-0 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex gap-4 md:gap-6 justify-start md:justify-center h-[60vh] md:h-[500px] overflow-x-auto md:overflow-visible snap-x snap-mandatory px-6 md:px-4 pb-8 md:pb-0 scrollbar-hide max-w-[1600px] mx-auto w-full"
        >
          {GALLERY_IMAGES.map((img, index) => (
            <motion.div
              key={img.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              layout
              className={`
                relative h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] snap-center shrink-0
                min-w-[85vw] md:min-w-0 md:flex-1
                ${hoveredIndex === index ? 'md:flex-[3]' : ''}
                ${hoveredIndex !== null && hoveredIndex !== index ? 'md:opacity-50 md:grayscale' : 'opacity-100 grayscale-0'}
              `}
            >
              {/* Continuous subtle breathing & panning effect */}
              <motion.div
                className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%]"
                animate={{
                  x: ["0%", "-2%", "2%", "0%"],
                  y: ["0%", "2%", "-2%", "0%"],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 20 + index * 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <motion.img
                  whileInView={{ scale: [1.2, 1], filter: ["brightness(1.4)", "brightness(1)"] }}
                  viewport={{ amount: 0.4 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transform md:scale-110 md:hover:scale-100 transition-transform duration-700"
                  loading={index < 2 ? "eager" : "lazy"}
                  width={600}
                  height={800}
                  // @ts-ignore
                  fetchpriority={index === 0 ? "high" : "auto"}
                />
              </motion.div>

              {/* Shadow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

              {/* Label (Visible on Expand/Mobile) */}
              <div className={`absolute bottom-8 left-8 text-white transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-100 md:opacity-0'}`}>
                <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-1">Impact</p>
                <p className="text-3xl md:text-5xl font-serif font-medium">{img.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Swipe Hint */}
        <div className="absolute top-1/2 right-4 z-20 md:hidden pointer-events-none animate-pulse">
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-full text-white border border-white/20">
            <ArrowRight size={20} />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] bg-black/5 backdrop-blur-sm px-2 py-1 rounded-full uppercase tracking-widest text-slate-500">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-slate-300 to-transparent overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-full h-full bg-slate-900"
          />
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;
