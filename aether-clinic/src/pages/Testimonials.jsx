import { motion } from 'framer-motion';
import { Star, Quote, ChevronRight } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import GlassCard from '../components/ui/GlassCard';
import SectionTitle from '../components/ui/SectionTitle';
import { testimonials } from '../data/mockData';

const allTestimonials = [
  ...testimonials,
  { id: 5, name: 'Elena K.', role: 'Verified Patient', rating: 5, text: 'The IV therapy has been life-changing. I feel more energetic and focused than ever. The clinic is absolutely stunning.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80' },
  { id: 6, name: 'Thomas B.', role: 'Verified Patient', rating: 5, text: 'World-class facility with world-class doctors. My laser treatment results are incredible. Could not recommend more highly.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80' },
  { id: 7, name: 'Isabella M.', role: 'Verified Patient', rating: 4, text: 'Wonderful experience from start to finish. The staff made me feel so comfortable and the results speak for themselves.', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80' },
  { id: 8, name: 'William T.', role: 'Verified Patient', rating: 5, text: 'I was nervous about my first procedure, but Dr. Chen and his team were incredibly reassuring. The results exceeded my expectations.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' },
];

export default function Testimonials() {
  return (
    <MainLayout>
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <SectionTitle title="Patient Stories" subtitle="Hear from our community about their Aether experience" light />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {allTestimonials.map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="glass-card p-6 relative">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
                <div className="flex items-center gap-4 mb-4">
                  <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <h4 className="text-white font-semibold text-lg">{t.name}</h4>
                    <p className="text-sm text-text-secondary">{t.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-text-secondary leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
