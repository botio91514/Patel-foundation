import { Suspense, lazy, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { AnimatePresence } from "framer-motion";

import Index from "./pages/Index";
import SocialSidebar from "./components/SocialSidebar";
import ScrollToTop from "./components/ScrollToTop";
import GlobalEffects from "./components/GlobalEffects";
import SmoothScroll from "./components/SmoothScroll";
import Preloader from "./components/Preloader";

// Lazy Load Pages for better performance
const About = lazy(() => import("./pages/About"));
const Programs = lazy(() => import("./pages/Programs"));
const Stories = lazy(() => import("./pages/Stories"));
const GetInvolved = lazy(() => import("./pages/GetInvolved"));
const Donate = lazy(() => import("./pages/Donate"));
const Contact = lazy(() => import("./pages/Contact"));
const StoryDetail = lazy(() => import("./pages/StoryDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Gallery = lazy(() => import("./pages/Gallery"));

const queryClient = new QueryClient();

// Minimal fallback for lazy loaded pages
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loader2 className="w-10 h-10 animate-spin text-primary" />
  </div>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(() => {
    // Only show preloader once per session
    const hasShown = sessionStorage.getItem('hasShownPreloader');
    return !hasShown;
  });

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      sessionStorage.setItem('hasShownPreloader', 'true');
    }
  }, [isLoading]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <GlobalEffects />
          <SmoothScroll />
          <ScrollToTop />
          <SocialSidebar />

          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/stories/:id" element={<StoryDetail />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>

          <AnimatePresence>
            {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;


