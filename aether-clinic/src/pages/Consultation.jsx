import { motion } from 'framer-motion';
import { Video, MessageSquare, Calendar, CheckCircle, ArrowRight, Shield, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import GlassCard from '../components/ui/GlassCard';
import AnimatedButton from '../components/ui/AnimatedButton';
import { doctors } from '../data/mockData';
import { useState } from 'react';

const consultationTypes = [
  { icon: Video, title: 'Video Consultation', desc: 'Face-to-face virtual consultation with your specialist', duration: '30 min', price: '$75' },
  { icon: MessageSquare, title: 'Chat Consultation', desc: 'Secure messaging with your doctor for follow-ups', duration: '48 hrs', price: '$35' },
  { icon: Calendar, title: 'In-Clinic Visit', desc: 'Premium in-person consultation at our Beverly Hills clinic', duration: '60 min', price: '$150' },
];

export default function Consultation() {
  const [selectedType, setSelectedType] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <MainLayout>
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-white/80 mb-4">
              <Video className="w-4 h-4 text-primary" /> Online Consultations
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Consult from Anywhere</h1>
            <p className="text-lg text-text-secondary">Connect with our specialists virtually or in person</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {consultationTypes.map((type, i) => (
              <button key={i} onClick={() => setSelectedType(i)}
                className={`glass-card p-6 text-left transition-all ${selectedType === i ? 'ring-2 ring-primary border-primary/50' : ''}`}>
                <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${selectedType === i ? 'gradient-bg' : 'bg-white/5'}`}>
                  <type.icon className={`w-6 h-6 ${selectedType === i ? 'text-white' : 'text-primary'}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{type.title}</h3>
                <p className="text-sm text-text-secondary mb-3">{type.desc}</p>
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{type.duration}</span>
                  <span className="font-semibold text-primary">{type.price}</span>
                </div>
              </button>
            ))}
          </div>

          <GlassCard className="p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Select Your Specialist</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {doctors.filter(d => d.available).map((doctor, i) => (
                <button key={doctor.id} onClick={() => setSelectedDoctor(doctor.id)}
                  className={`p-4 rounded-xl transition-all text-left ${selectedDoctor === doctor.id ? 'bg-primary/20 ring-2 ring-primary border-primary/50' : 'bg-white/5 hover:bg-white/10'}`}>
                  <div className="flex items-center gap-3">
                    <img src={doctor.image} alt={doctor.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-white">{doctor.name}</p>
                      <p className="text-xs text-text-secondary">{doctor.specialty.split(',')[0]}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-text-secondary">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span>{doctor.rating}</span>
                    <span>&middot;</span>
                    <span>{doctor.patients} patients</span>
                  </div>
                </button>
              ))}
            </div>
          </GlassCard>

          <div className="text-center">
            <Link to="/appointments">
              <AnimatedButton variant="primary" size="lg" icon>
                Schedule Consultation
              </AnimatedButton>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              { icon: Shield, title: 'HIPAA Compliant', desc: 'Your data is protected with enterprise-grade security' },
              { icon: Clock, title: 'Flexible Scheduling', desc: 'Book 24/7 with real-time availability' },
              { icon: Star, title: 'Premium Experience', desc: 'Concierge-level care from check-in to follow-up' },
            ].map((item, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
