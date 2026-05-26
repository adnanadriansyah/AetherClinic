import { motion } from 'framer-motion';

export default function StatCard({ icon: Icon, label, value, change, color = 'primary', className = '' }) {
  const colors = {
    primary: 'from-primary to-secondary',
    accent: 'from-accent to-primary',
    success: 'from-success to-secondary',
    warning: 'from-warning to-accent',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`glass-card p-6 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-text-secondary font-medium">{label}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {change && (
            <p className={`text-sm font-medium ${change >= 0 ? 'text-success' : 'text-danger'}`}>
              {change >= 0 ? '+' : ''}{change}% vs last month
            </p>
          )}
        </div>
        {Icon && (
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[color]} p-3 flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
