import { useState } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Send, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MEDIA } from '@/data/media';
import { toast } from 'sonner';
import { SITE_CONFIG } from '@/data/config';

const footerLinks = {
  about: [
    { name: 'Our Story', href: '/about' },
    { name: 'Leadership', href: '/about' },
    { name: 'Annual Reports', href: '/about' },
    { name: 'Careers', href: '/get-involved' },
  ],
  programs: [
    { name: 'Education', href: '/programs' },
    { name: 'Healthcare', href: '/programs' },
    { name: 'Sustainability', href: '/programs' },
    { name: 'Emergency Relief', href: '/programs' },
  ],
  getInvolved: [
    { name: 'Donate', href: '/donate' },
    { name: 'Volunteer', href: '/get-involved' },
    { name: 'Partner With Us', href: '/get-involved' },
    { name: 'Events', href: '/get-involved' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: SITE_CONFIG.socials.facebook, label: 'Facebook' },

  { icon: Instagram, href: SITE_CONFIG.socials.instagram, label: 'Instagram' },
  { icon: Linkedin, href: SITE_CONFIG.socials.linkedin, label: 'LinkedIn' },
  { icon: Youtube, href: SITE_CONFIG.socials.youtube, label: 'YouTube' },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Check if user set their email
    if (SITE_CONFIG.contactEmail.includes('example.com')) {
      toast.error("Setup Required: Please update 'src/data/config.ts' with your real email address to receive submissions.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${SITE_CONFIG.contactEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          type: 'Newsletter Subscription',
          email: email,
          _subject: "New Newsletter Subscriber! 🎉",
          _template: "table"
        })
      });

      if (response.ok) {
        toast.success("Welcome to the community! You've successfully subscribed.");
        setEmail('');
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Logo & Newsletter */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="flex items-center gap-3 mb-6"
            >
              <img
                src={MEDIA.brand.logoFull}
                alt="Patel Foundation"
                className="h-14 w-auto"
              />
              <div>
                <span className="text-lg font-serif font-semibold tracking-tight">
                  Patel
                </span>
                <span className="block text-xs tracking-[0.2em] text-primary-foreground/70 uppercase">
                  Foundation
                </span>
              </div>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6 max-w-sm">
              Dedicated to transforming lives through education, healthcare, and
              sustainable community development. Together, we create lasting change.
            </p>

            <div className="mb-8 max-w-sm">
              <h4 className="text-sm font-medium mb-3">Stay Updated</h4>
              <form onSubmit={handleSubscribe} className="flex gap-2 relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-sm px-4 py-2 text-sm w-full focus:outline-none focus:border-primary text-primary-foreground placeholder:text-primary-foreground/40 disabled:opacity-50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Subscribe to newsletter"
                  className="bg-primary text-foreground px-3 py-2 rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </form>
            </div>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-medium text-sm tracking-wider uppercase mb-4">About</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm tracking-wider uppercase mb-4">Programs</h3>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm tracking-wider uppercase mb-4">Get Involved</h3>
            <ul className="space-y-3">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-primary-foreground/10 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
          <p>© 2024 Patel Foundation. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
