import { motion } from 'framer-motion';
import { Video, MessageSquare, Calendar, Clock, Star, ChevronRight, Send } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import GlassCard from '../../components/ui/GlassCard';
import AnimatedButton from '../../components/ui/AnimatedButton';
import { useSupabase } from '../../context/SupabaseContext';

const consultationTypes = [
  { icon: Video, title: 'Video Consultation', desc: 'Face-to-face virtual consultation', duration: '30 min', price: '$75' },
  { icon: MessageSquare, title: 'Chat Consultation', desc: 'Secure messaging for follow-ups', duration: '48 hrs', price: '$35' },
  { icon: Calendar, title: 'In-Clinic Visit', desc: 'In-person consultation', duration: '60 min', price: '$150' },
];

const chatHistory = [
  { id: 1, from: 'doctor', text: 'Good morning! How are you feeling after the treatment?', time: '10:30 AM' },
  { id: 2, from: 'patient', text: 'Much better! The redness has subsided significantly.', time: '10:45 AM' },
  { id: 3, from: 'doctor', text: 'That\'s great to hear. Keep using the prescribed cream.', time: '10:46 AM' },
];

function normalizeDoc(d) {
  return {
    id: d.id,
    name: d.full_name || d.name || '',
    specialty: d.specialty || '',
    rating: d.rating || 0,
    image: d.image_url || d.image || '',
    available: d.available !== undefined ? d.available : true,
  };
}

export default function PatientConsultation() {
  const supabaseCtx = useSupabase();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('types');
  const [selectedType, setSelectedType] = useState(0);
  const [message, setMessage] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await supabaseCtx.getDoctors();
      if (result) setDoctors(result.map(normalizeDoc));
    } catch (err) {
      console.error('Failed to fetch doctors:', err);
    }
    setLoading(false);
  }, [supabaseCtx]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <DashboardLayout title="Consultation" role="patient">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="text-primary">Consultation</span>
          <ChevronRight className="w-3 h-3" />
          <span>{activeTab === 'types' ? 'Book a Session' : 'My Messages'}</span>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Consultation</h2>
          <div className="flex gap-2">
            {['types', 'chat'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab ? 'bg-primary text-white' : 'bg-white/5 text-text-secondary hover:bg-white/10'
                }`}>
                {tab === 'types' ? 'Book Session' : 'Messages'}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'types' && (
          <>
            <div className="grid md:grid-cols-3 gap-4">
              {consultationTypes.map((type, i) => (
                <button key={i} onClick={() => setSelectedType(i)}
                  className={`glass-card p-6 text-left transition-all ${selectedType === i ? 'ring-2 ring-primary' : ''}`}>
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

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Available Specialists</h3>
              {loading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-text-secondary">Loading doctors...</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {doctors.filter(d => d.available).map((doctor, i) => (
                    <div key={doctor.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                      <img src={doctor.image} alt={doctor.name} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{doctor.name}</p>
                        <p className="text-xs text-text-secondary truncate">{doctor.specialty.split(',')[0]}</p>
                      </div>
                      <Star className="w-4 h-4 text-yellow-400 fill-current shrink-0" />
                      <span className="text-xs text-text-secondary">{doctor.rating}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-6 text-center">
                <AnimatedButton variant="primary" icon>
                  Schedule Consultation
                </AnimatedButton>
              </div>
            </GlassCard>
          </>
        )}

        {activeTab === 'chat' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <GlassCard className="p-5 lg:col-span-2">
              <h3 className="text-lg font-semibold text-white mb-4">Dr. Sarah Mitchell</h3>
              <div className="space-y-4 mb-4 max-h-80 overflow-y-auto">
                {chatHistory.map(msg => (
                  <div key={msg.id} className={`flex ${msg.from === 'patient' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] p-3 rounded-xl ${
                      msg.from === 'patient' ? 'bg-primary/20 text-white' : 'bg-white/5 text-text-secondary'
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs mt-1 opacity-60">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <input type="text" value={message} onChange={e => setMessage(e.target.value)}
                  placeholder="Type your message..." className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-all" />
                <button className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </GlassCard>
            <GlassCard className="p-5">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Conversations</h3>
              <div className="space-y-3">
                {doctors.slice(0, 3).map(doc => (
                  <div key={doc.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <img src={doc.image} alt={doc.name} className="w-8 h-8 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{doc.name}</p>
                      <p className="text-xs text-text-secondary truncate">Last message 2h ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
