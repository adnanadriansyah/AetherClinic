import { motion } from 'framer-motion';
import { Sparkles, Eye, EyeOff, ChevronRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedButton from '../components/ui/AnimatedButton';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: 'John Doe', email, role });
    if (role === 'patient') navigate('/dashboard');
    else if (role === 'doctor') navigate('/doctor');
    else navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4 relative overflow-hidden">
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-text-secondary hover:text-white transition-colors z-10">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Home</span>
      </Link>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-text-secondary mt-1">Sign in to your Aether Clinic account</p>
        </div>

        <div className="glass-card p-8">
          <div className="flex gap-2 mb-6">
            {['patient', 'doctor', 'admin'].map(r => (
              <button key={r} onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                  role === r ? 'bg-primary text-white' : 'bg-white/5 text-text-secondary hover:bg-white/10'
                }`}>{r}</button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-all"
                placeholder="you@example.com" required />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-all"
                  placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-text-secondary cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-primary" /> Remember me
              </label>
              <a href="#" className="text-primary hover:text-primary-light">Forgot password?</a>
            </div>
            <AnimatedButton variant="primary" size="lg" className="w-full" type="submit" icon>
              Sign In
            </AnimatedButton>
          </form>

          <p className="text-center text-sm text-text-secondary mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:text-primary-light font-medium">Sign up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
