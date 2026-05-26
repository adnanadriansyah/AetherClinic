import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Sparkles, Phone, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import AnimatedButton from '../ui/AnimatedButton';

export default function MainLayout({ children }) {
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/doctors', label: 'Doctors' },
    { to: '/testimonials', label: 'Testimonials' },
    { to: '/contact', label: 'Contact' },
  ];

  const isHome = location.pathname === '/';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-bg-dark' : 'bg-white'}`}>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-white/5 shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Aether<span className="text-primary">Clinic</span></span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200
                    ${location.pathname === link.to
                      ? 'text-white bg-white/10'
                      : 'text-text-secondary hover:text-white hover:bg-white/5'}`}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button onClick={toggleTheme} className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                {isDark ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-text-secondary" />}
              </button>
              <div className="hidden lg:flex items-center gap-3">
                <Link to="/login">
                  <AnimatedButton variant="ghost" size="sm">Sign In</AnimatedButton>
                </Link>
                <Link to="/signup">
                  <AnimatedButton size="sm">Get Started</AnimatedButton>
                </Link>
              </div>
              <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                {menuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
            <div className="relative mt-16 mx-4 glass-card p-6">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-text-secondary hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <Link to="/login" onClick={() => setMenuOpen(false)} className="block w-full">
                  <AnimatedButton variant="ghost" size="md" className="w-full">Sign In</AnimatedButton>
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)} className="block w-full">
                  <AnimatedButton size="md" className="w-full">Get Started</AnimatedButton>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {children}
      </main>

      <footer className="relative border-t border-white/5 bg-bg-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Aether<span className="text-primary">Clinic</span></span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Premium healthcare and aesthetic medicine. Where science meets art, and your wellness is our masterpiece.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2.5">
                {['Botox & Fillers', 'Laser Treatments', 'IV Therapy', 'Skin Rejuvenation', 'Hair Restoration'].map(item => (
                  <li key={item}><a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2.5">
                {['About Us', 'Careers', 'Blog', 'Press', 'Privacy Policy'].map(item => (
                  <li key={item}><a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2.5">
                <li className="flex items-center gap-2 text-sm text-text-secondary">
                  <Phone className="w-4 h-4 text-primary" /> (555) 123-4567
                </li>
                <li className="text-sm text-text-secondary">hello@aetherclinic.com</li>
                <li className="text-sm text-text-secondary">123 Wellness Ave, Suite 100<br />Beverly Hills, CA 90210</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-text-secondary text-sm">&copy; 2026 Aether Clinic. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {['Twitter', 'Instagram', 'LinkedIn', 'Facebook'].map(s => (
                <a key={s} href="#" className="text-text-secondary hover:text-primary transition-colors text-sm">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
