import { motion } from 'framer-motion';

const stats = [
  { value: '15,000+', label: 'Happy Patients' },
  { value: '24', label: 'Expert Doctors' },
  { value: '50+', label: 'Treatments' },
  { value: '97%', label: 'Satisfaction Rate' },
  { value: '12+', label: 'Years Excellence' },
];

export default function StatsSection() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 lg:p-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl lg:text-4xl font-bold gradient-text mb-1">{stat.value}</p>
                <p className="text-sm text-text-secondary">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
