import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', light = false, glow = false, hover = true, ...props }) {
  const baseClass = light ? 'glass-card-light' : 'glass-card';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`${baseClass} ${glow ? 'glow-effect' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
