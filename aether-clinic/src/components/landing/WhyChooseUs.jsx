import { motion } from 'framer-motion';
import { Shield, Microscope, Sparkles, Heart, Users, Award } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

const features = [
  { icon: Shield, title: 'Board-Certified Experts', description: 'Our physicians are leaders in aesthetic medicine with decades of combined experience.' },
  { icon: Microscope, title: 'Cutting-Edge Technology', description: 'We invest in the latest FDA-approved technologies for superior, safer results.' },
  { icon: Sparkles, title: 'Personalized Care', description: 'Every treatment plan is uniquely crafted to your anatomy, goals, and aesthetic vision.' },
  { icon: Heart, title: 'Luxury Experience', description: 'From our spa-like suites to our concierge service, every detail is designed for your comfort.' },
  { icon: Users, title: 'Patient-Centered Approach', description: 'Your voice matters. We prioritize open communication and shared decision-making.' },
  { icon: Award, title: 'Proven Results', description: 'Over 15,000 satisfied patients with a 97% satisfaction rate and 4.9-star average rating.' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 gradient-bg-subtle" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle
          title="Why Aether Clinic?"
          subtitle="We redefine the standard of excellence in aesthetic medicine"
          light
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-6 group"
            >
              <div className="w-12 h-12 rounded-xl gradient-bg p-3 mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
