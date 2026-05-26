import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, ChevronRight } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import GlassCard from '../components/ui/GlassCard';
import AnimatedButton from '../components/ui/AnimatedButton';

const contactInfo = [
  { icon: Phone, title: 'Phone', details: '(555) 123-4567', sub: 'Mon-Sat, 8AM-8PM' },
  { icon: Mail, title: 'Email', details: 'hello@aetherclinic.com', sub: 'We reply within 24h' },
  { icon: MapPin, title: 'Location', details: '123 Wellness Ave, Suite 100', sub: 'Beverly Hills, CA 90210' },
  { icon: Clock, title: 'Hours', details: 'Mon-Sat: 8AM - 8PM', sub: 'Sun: 10AM - 4PM' },
];

export default function Contact() {
  return (
    <MainLayout>
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-lg text-text-secondary">We'd love to hear from you. Reach out to our concierge team.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {contactInfo.map((item, i) => (
                  <GlassCard key={i} className="p-5">
                    <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center mb-3">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-white">{item.details}</p>
                    <p className="text-xs text-text-secondary mt-1">{item.sub}</p>
                  </GlassCard>
                ))}
              </div>

              <GlassCard className="p-6 h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-text-secondary">Interactive map would render here</p>
                  <p className="text-sm text-text-secondary mt-1">123 Wellness Ave, Beverly Hills, CA</p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-text-secondary mb-1.5">First Name</label>
                      <input type="text" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-all" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-1.5">Last Name</label>
                      <input type="text" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-all" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-1.5">Email</label>
                    <input type="email" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-all" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-1.5">Subject</label>
                    <input type="text" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-all" placeholder="How can we help?" />
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-1.5">Message</label>
                    <textarea rows={4} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-all resize-none" placeholder="Tell us more about your needs..." />
                  </div>
                  <AnimatedButton variant="primary" size="lg" className="w-full" icon>
                    <Send className="w-4 h-4" /> Send Message
                  </AnimatedButton>
                </form>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
