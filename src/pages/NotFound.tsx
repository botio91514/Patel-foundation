import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-9xl font-serif font-bold text-primary/10 mb-[-40px] select-none">404</h1>
          <h2 className="text-4xl font-serif font-medium mb-6 relative z-10">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-10 text-lg">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <Link
            to="/"
            className="btn-premium inline-flex items-center gap-2"
          >
            <Home size={18} />
            <span>Return Home</span>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};

export default NotFound;
