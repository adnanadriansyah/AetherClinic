import { motion } from 'framer-motion';
import { Sparkles, Shield, Activity } from 'lucide-react';
import AnimatedButton from '../ui/AnimatedButton';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-white/80 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              Premium Healthcare & Aesthetic Medicine
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Where Science Meets
              <span className="gradient-text block mt-2">Timeless Beauty</span>
            </h1>
            <p className="text-lg text-text-secondary mb-8 max-w-xl leading-relaxed">
              Experience the future of aesthetic medicine with our board-certified specialists,
              cutting-edge treatments, and a sanctuary designed for your transformation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup">
                <AnimatedButton variant="primary" size="lg" icon>
                  Begin Your Journey
                </AnimatedButton>
              </Link>
              <Link to="/services">
                <AnimatedButton variant="secondary" size="lg">
                  Explore Treatments
                </AnimatedButton>
              </Link>
            </div>

            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-white/5">
              {[
                { icon: Shield, label: 'Board Certified' },
                { icon: Activity, label: '97% Satisfaction' },
                { icon: Sparkles, label: 'Advanced Tech' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm text-text-secondary">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 gradient-bg rounded-3xl opacity-20 blur-2xl animate-float" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden glass border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&q=80"
                  alt="Aesthetic clinic"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 glass-card p-4">
                <p className="text-3xl font-bold text-white">15K+</p>
                <p className="text-sm text-text-secondary">Happy Patients</p>
              </div>
              <div className="absolute -top-4 -right-4 glass-card p-4">
                <p className="text-3xl font-bold text-white">4.9</p>
                <p className="text-sm text-text-secondary">Avg Rating</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
