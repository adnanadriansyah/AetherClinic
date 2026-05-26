import { motion } from 'framer-motion';
import { Search, Star, Clock, DollarSign, Filter, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/ui/SectionTitle';
import AnimatedButton from '../components/ui/AnimatedButton';
import { treatments } from '../data/mockData';
import MainLayout from '../components/layout/MainLayout';

const categories = ['All', 'Aesthetic', 'Laser', 'Wellness', 'Skin', 'Body', 'Hair'];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = treatments.filter(t =>
    (activeCategory === 'All' || t.category === activeCategory) &&
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <SectionTitle title="Our Treatments" subtitle="Premium aesthetic and wellness procedures tailored to you" light />
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search treatments..." className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-all" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat ? 'bg-primary text-white' : 'bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white'
                  }`}>{cat}</button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="glass-card overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 glass px-3 py-1 rounded-full text-xs text-white">{t.category}</div>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-semibold text-white">{t.name}</h3>
                  <p className="text-sm text-text-secondary line-clamp-2">{t.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3 text-xs text-text-secondary">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{t.duration}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{t.price}</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs text-white">{t.rating}</span>
                    </div>
                  </div>
                  <Link to="/appointments" className="block mt-3">
                    <AnimatedButton variant="secondary" size="sm" className="w-full">Book Now</AnimatedButton>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
