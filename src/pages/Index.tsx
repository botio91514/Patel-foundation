import { lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Manifesto from '@/components/Manifesto';
import ImpactStats from '@/components/ImpactStats';
import Programs from '@/components/Programs';
import SEO from '@/components/SEO';

const LatestStories = lazy(() => import('@/components/LatestStories'));
const GrandFinale = lazy(() => import('@/components/GrandFinale'));

const Index = () => {
  return (
    <main className="w-full relative">
      <SEO
        title="Home"
        description="Empowering communities through education, healthcare, and sustainable development. Join the Patel Foundation in creating lasting change."
      />
      <Navbar />
      <Hero />
      <About />
      <Manifesto />
      <ImpactStats />
      <Programs />
      <Suspense fallback={null}>
        <LatestStories />
        <GrandFinale />
      </Suspense>
    </main>
  );
};

export default Index;
