import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import SEO from '@/components/SEO';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { SITE_CONFIG } from '@/data/config';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (SITE_CONFIG.contactEmail.includes('example.com')) {
            toast.error("Please configure your email in src/data/config.ts");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch(`https://formsubmit.co/ajax/${SITE_CONFIG.contactEmail}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    _subject: `New Contact Message: ${formData.subject}`,
                    Name: formData.name,
                    Email: formData.email,
                    Subject: formData.subject,
                    Message: formData.message,
                    _template: "table"
                })
            });

            if (res.ok) {
                toast.success("Message sent successfully! We'll get back to you soon.");
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="overflow-x-hidden min-h-screen bg-background">
            <SEO
                title="Contact Us"
                description="Get in touch with the Patel Foundation. We'd love to hear from you."
            />
            <Navbar />
            <PageHeader
                title="Contact Us"
                subtitle="Have questions? We're here to help. Reach out to our team for any inquiries about our programs, partnerships, or donations."
                backgroundImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
            />

            <section className="py-24 px-6 lg:px-12 bg-background">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16">

                        {/* Contact Info Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-serif font-medium mb-8">Get in Touch</h2>

                            <div className="space-y-8 mb-12">
                                <div className="flex items-start gap-6 group">
                                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Headquarters</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            123 Foundation Way, Suite 500<br />
                                            New York, NY 10001
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Phone</h3>
                                        <p className="text-muted-foreground mb-1">
                                            Main: +1 (800) 555-0199
                                        </p>
                                        <p className="text-muted-foreground">
                                            Support: +1 (800) 555-0200
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Email</h3>
                                        <p className="text-muted-foreground mb-1">
                                            General: info@patelfoundation.org
                                        </p>
                                        <p className="text-muted-foreground">
                                            Press: media@patelfoundation.org
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Office Hours</h3>
                                        <p className="text-muted-foreground">
                                            Monday - Friday: 9:00 AM - 6:00 PM EST
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="w-full h-64 bg-muted rounded-md relative overflow-hidden group">
                                <img
                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop"
                                    alt="Office Map"
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <button className="bg-white text-foreground px-4 py-2 rounded-sm shadow-md text-sm font-medium hover:bg-gray-50 transition-colors">
                                        View on Google Maps
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Form Column */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-card p-8 lg:p-12 rounded-sm shadow-elegant border border-border/50"
                        >
                            <h3 className="text-2xl font-serif font-medium mb-6 flex items-center gap-3">
                                <MessageSquare className="text-primary" /> Send a Message
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 border border-input rounded-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-background"
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 border border-input rounded-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-background"
                                            placeholder="Your email"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-4 py-3 border border-input rounded-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-background"
                                        placeholder="How can we help?"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 border border-input rounded-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-background resize-none"
                                        placeholder="Write your message here..."
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full btn-premium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <><span>Sending...</span><Loader2 size={18} className="animate-spin" /></>
                                    ) : (
                                        <><span>Send Message</span><Send size={18} /></>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default Contact;
