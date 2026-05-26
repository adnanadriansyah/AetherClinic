import { motion } from 'framer-motion';
import { Sparkles, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedButton from '../components/ui/AnimatedButton';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name, email, role: 'patient' });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Begin Your Journey</h1>
          <p className="text-text-secondary mt-1">Create your Aether Clinic account</p>
        </div>

        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-all"
                placeholder="John Doe" required />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-all"
                placeholder="you@example.com" required />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-all"
                placeholder="Create a strong password" required />
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <input type="checkbox" className="w-4 h-4 rounded accent-primary" required />
              <span>I agree to the <a href="#" className="text-primary hover:text-primary-light">Terms of Service</a> and <a href="#" className="text-primary hover:text-primary-light">Privacy Policy</a></span>
            </div>
            <AnimatedButton variant="primary" size="lg" className="w-full" type="submit" icon>
              Create Account
            </AnimatedButton>
          </form>

          <p className="text-center text-sm text-text-secondary mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary-light font-medium">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
