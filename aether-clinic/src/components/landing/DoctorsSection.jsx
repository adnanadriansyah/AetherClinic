import { motion } from 'framer-motion';
import { Star, BadgeCheck, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTitle from '../ui/SectionTitle';
import AnimatedButton from '../ui/AnimatedButton';
import { doctors } from '../../data/mockData';

export default function DoctorsSection() {
  return (
    <section className="py-20 relative" id="doctors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Meet Our Specialists"
          subtitle="World-class physicians dedicated to your aesthetic journey"
          light
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.slice(0, 3).map((doctor, i) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 text-center group"
            >
              <div className="relative w-24 h-24 mx-auto mb-4">
                <img src={doctor.image} alt={doctor.name}
                  className="w-full h-full rounded-full object-cover ring-2 ring-primary/30" />
                {doctor.available && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-success border-2 border-bg-dark flex items-center justify-center">
                    <BadgeCheck className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-white">{doctor.name}</h3>
              <p className="text-sm text-text-secondary mt-1">{doctor.specialty}</p>
              <div className="flex items-center justify-center gap-4 mt-3 text-sm text-text-secondary">
                <span>{doctor.experience}</span>
                <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400 fill-current" />{doctor.rating}</span>
                <span>{doctor.patients.toLocaleString()} patients</span>
              </div>
              <hr className="my-4 border-white/5" />
              <Link to="/appointments">
                <AnimatedButton variant="secondary" size="sm" className="w-full">
                  <Calendar className="w-4 h-4" /> Book Consultation
                </AnimatedButton>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/doctors">
            <AnimatedButton variant="outline">View All Specialists</AnimatedButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
