import { motion } from 'framer-motion';
import { Star, BadgeCheck, Calendar, Search, MapPin, Filter } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/ui/SectionTitle';
import AnimatedButton from '../components/ui/AnimatedButton';
import { doctors } from '../data/mockData';
import MainLayout from '../components/layout/MainLayout';

export default function Doctors() {
  const [search, setSearch] = useState('');

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <SectionTitle title="Our Specialists" subtitle="World-class physicians dedicated to your care" light />
          </motion.div>

          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or specialty..." className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-all" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((doctor, i) => (
              <motion.div key={doctor.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass-card p-6 text-center group">
                <div className="relative w-28 h-28 mx-auto mb-4">
                  <img src={doctor.image} alt={doctor.name} className="w-full h-full rounded-full object-cover ring-2 ring-primary/30" />
                  {doctor.available && (
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-success border-2 border-bg-dark flex items-center justify-center">
                      <BadgeCheck className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white">{doctor.name}</h3>
                <p className="text-sm text-text-secondary mt-1">{doctor.specialty}</p>
                <div className="flex items-center justify-center gap-4 mt-3 text-sm text-text-secondary">
                  <span>{doctor.experience}</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400 fill-current" />{doctor.rating}</span>
                  <span>{doctor.patients.toLocaleString()} patients</span>
                </div>
                {doctor.available ? (
                  <span className="inline-block mt-3 text-xs text-success bg-success/10 px-3 py-1 rounded-full">Available for consultation</span>
                ) : (
                  <span className="inline-block mt-3 text-xs text-text-secondary bg-white/5 px-3 py-1 rounded-full">Currently unavailable</span>
                )}
                <hr className="my-4 border-white/5" />
                <Link to="/appointments">
                  <AnimatedButton variant="secondary" size="sm" className="w-full">
                    <Calendar className="w-4 h-4" /> Book Appointment
                  </AnimatedButton>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
