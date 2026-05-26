import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import GlassCard from '../components/ui/GlassCard';
import AnimatedButton from '../components/ui/AnimatedButton';
import { doctors, treatments } from '../data/mockData';

export default function Appointment() {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const timeSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'];

  const dates = ['2026-05-28', '2026-05-29', '2026-05-30', '2026-06-01', '2026-06-02', '2026-06-03', '2026-06-04'];

  return (
    <MainLayout>
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Book Your Appointment</h1>
            <p className="text-lg text-text-secondary">Select your preferred doctor, treatment, and time</p>
          </motion.div>

          <div className="flex items-center justify-center gap-4 mb-12">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= s ? 'gradient-bg text-white' : 'bg-white/5 text-text-secondary'
                }`}>{s}</div>
                <span className={`text-sm hidden sm:block ${step >= s ? 'text-white' : 'text-text-secondary'}`}>
                  {['Doctor', 'Treatment', 'Date & Time', 'Confirm'][s - 1]}
                </span>
                {s < 4 && <ChevronRight className="w-4 h-4 text-text-secondary" />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-xl font-bold text-white mb-6">Choose Your Doctor</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {doctors.map((doctor) => (
                  <button key={doctor.id} onClick={() => { setSelectedDoctor(doctor.id); setStep(2); }}
                    className={`glass-card p-4 text-left transition-all ${selectedDoctor === doctor.id ? 'ring-2 ring-primary' : ''}`}>
                    <div className="flex items-center gap-3">
                      <img src={doctor.image} alt={doctor.name} className="w-14 h-14 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-white">{doctor.name}</p>
                        <p className="text-xs text-text-secondary">{doctor.specialty}</p>
                        <p className="text-xs text-text-secondary mt-0.5">{doctor.experience} &middot; {doctor.rating} rating</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-xl font-bold text-white mb-6">Select Treatment</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {treatments.map((t) => (
                  <button key={t.id} onClick={() => { setSelectedTreatment(t.id); setStep(3); }}
                    className={`glass-card p-4 text-left transition-all ${selectedTreatment === t.id ? 'ring-2 ring-primary' : ''}`}>
                    <h3 className="font-semibold text-white">{t.name}</h3>
                    <p className="text-xs text-text-secondary mt-1">{t.description.substring(0, 80)}...</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-text-secondary">
                      <span>{t.duration}</span>
                      <span>{t.price}</span>
                      <span className="text-yellow-400">{t.rating}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-xl font-bold text-white mb-6">Choose Date & Time</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-8">
                {dates.map((date) => (
                  <button key={date} onClick={() => setSelectedDate(date)}
                    className={`glass-card p-3 text-center transition-all ${selectedDate === date ? 'ring-2 ring-primary gradient-bg-subtle' : ''}`}>
                    <p className="text-xs text-text-secondary">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                    <p className="text-lg font-bold text-white">{new Date(date).getDate()}</p>
                    <p className="text-xs text-text-secondary">{new Date(date).toLocaleDateString('en-US', { month: 'short' })}</p>
                  </button>
                ))}
              </div>
              {selectedDate && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Available Times</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {timeSlots.map((time) => (
                      <button key={time} onClick={() => { setSelectedTime(time); setStep(4); }}
                        className={`glass-card p-3 text-center transition-all ${selectedTime === time ? 'ring-2 ring-primary gradient-bg-subtle' : ''}`}>
                        <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                        <span className="text-sm text-white">{time}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {step === 4 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <GlassCard className="p-8 max-w-lg mx-auto text-center">
                <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Confirm Appointment</h2>
                <div className="space-y-3 text-left mt-6">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-text-secondary">Doctor</span>
                    <span className="text-white font-medium">{doctors.find(d => d.id === selectedDoctor)?.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-text-secondary">Treatment</span>
                    <span className="text-white font-medium">{treatments.find(t => t.id === selectedTreatment)?.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-text-secondary">Date</span>
                    <span className="text-white font-medium">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-text-secondary">Time</span>
                    <span className="text-white font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-text-secondary">Price</span>
                    <span className="text-white font-bold">{treatments.find(t => t.id === selectedTreatment)?.price}</span>
                  </div>
                </div>
                <AnimatedButton variant="primary" size="lg" className="w-full mt-6" icon>
                  Confirm Booking
                </AnimatedButton>
              </GlassCard>
            </motion.div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
