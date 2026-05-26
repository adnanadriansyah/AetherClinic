import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function AnimatedButton({
  children, variant = 'primary', size = 'md', icon, loading, className = '', ...props
}) {
  const base = 'relative inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'gradient-bg text-white shadow-lg shadow-primary/25 hover:shadow-primary/40',
    secondary: 'glass text-white hover:bg-white/15 border border-white/10',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10',
    ghost: 'text-text-secondary hover:text-white hover:bg-white/5',
    light: 'bg-white text-primary hover:bg-white/90 shadow-lg',
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
      {children}
      {icon && !loading && <ArrowRight className="w-4 h-4" />}
    </motion.button>
  );
}
