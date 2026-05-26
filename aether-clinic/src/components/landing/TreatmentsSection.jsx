import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTitle from '../ui/SectionTitle';
import { treatments } from '../../data/mockData';

export default function TreatmentsSection() {
  return (
    <section className="py-20 relative" id="treatments">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Premium Treatments"
          subtitle="Curated aesthetic and wellness procedures designed to enhance your natural beauty"
          light
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {treatments.slice(0, 4).map((treatment, i) => (
            <motion.div
              key={treatment.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card overflow-hidden group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={treatment.image} alt={treatment.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent" />
                <div className="absolute top-3 left-3 glass px-3 py-1 rounded-full text-xs text-white">
                  {treatment.category}
                </div>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-semibold text-white">{treatment.name}</h3>
                <p className="text-sm text-text-secondary line-clamp-2">{treatment.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3 text-xs text-text-secondary">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{treatment.duration}</span>
                    <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{treatment.price}</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs text-white">{treatment.rating}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/services" className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors font-medium">
            View All Treatments <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
