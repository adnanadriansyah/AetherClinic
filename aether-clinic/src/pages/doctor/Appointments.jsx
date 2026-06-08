import { motion } from 'framer-motion';
import { Calendar, Clock, Video, ChevronRight, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import GlassCard from '../../components/ui/GlassCard';
import StatCard from '../../components/ui/StatCard';
import { toast } from '../../components/ui/Toast';
import { useSupabase } from '../../context/SupabaseContext';

function normalizeApt(a) {
  return {
    id: a.id,
    patient: a.patients?.full_name || a.patient || '',
    doctor: a.doctors?.full_name || a.doctor || '',
    treatment: a.treatments?.name || a.treatment || '',
    date: a.appointment_date || a.date || '',
    time: a.appointment_time ? a.appointment_time.slice(0, 5) : (a.time || ''),
    status: (a.status || '').toLowerCase(),
    type: a.type || 'In-Clinic',
  };
}

export default function DoctorAppointments() {
  const supabaseCtx = useSupabase();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [filter, setFilter] = useState('all');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await supabaseCtx.getAppointments('all');
      if (result) setAppointments(result.map(normalizeApt));
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
    }
    setLoading(false);
  }, [supabaseCtx]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const today = new Date().toISOString().split('T')[0];
  const todayAppts = appointments.filter(a => a.date === today || a.date === '2026-05-28');
  const upcomingAppts = appointments.filter(a => a.status === 'confirmed' || a.status === 'scheduled' || a.status === 'pending');

  const filtered = filter === 'today' ? todayAppts
    : filter === 'upcoming' ? upcomingAppts
    : appointments;

  async function updateStatus(apt, newStatus) {
    setUpdating(apt.id);
    try {
      await supabaseCtx.updateAppointment(apt.id, { status: newStatus });
      toast({ type: 'success', title: 'Updated', message: `Appointment ${newStatus}` });
      fetchData();
    } catch (err) {
      toast({ type: 'error', title: 'Error', message: err.message || 'Update failed' });
    }
    setUpdating(null);
  }

  return (
    <DashboardLayout title="Appointments" role="doctor">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="text-primary">Doctor</span>
          <ChevronRight className="w-3 h-3" />
          <span>Appointments</span>
        </div>

        <h2 className="text-2xl font-bold text-white">Appointments</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard icon={Calendar} label="Today" value={todayAppts.length.toString()} color="primary" />
          <StatCard icon={Clock} label="Upcoming" value={upcomingAppts.length.toString()} color="warning" />
          <StatCard icon={Video} label="Virtual" value={appointments.filter(a => a.type === 'Virtual').length.toString()} color="accent" />
        </div>

        <div className="flex gap-2">
          {['all', 'today', 'upcoming'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                filter === f ? 'bg-primary text-white' : 'bg-white/5 text-text-secondary hover:bg-white/10'
              }`}>
              {f === 'today' ? "Today's" : f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-text-secondary">Loading appointments...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((apt, i) => (
              <motion.div key={apt.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <GlassCard className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-bold text-sm">
                        {apt.patient.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{apt.patient}</h3>
                        <p className="text-sm text-text-secondary">{apt.treatment}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-text-secondary">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{apt.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{apt.time}</span>
                          <span className={`px-2 py-0.5 rounded-full ${
                            apt.type === 'Virtual' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
                          }`}>{apt.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        apt.status === 'confirmed' ? 'bg-success/20 text-success' :
                        apt.status === 'scheduled' ? 'bg-success/20 text-success' :
                        apt.status === 'pending' ? 'bg-warning/20 text-warning' :
                        apt.status === 'completed' ? 'bg-info/20 text-info' :
                        'bg-danger/20 text-danger'
                      }`}>{apt.status}</span>
                      {(apt.status === 'confirmed' || apt.status === 'scheduled') && (
                        <div className="flex gap-1">
                          <button onClick={() => updateStatus(apt, 'completed')} disabled={updating === apt.id}
                            className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center hover:bg-success/30 transition-colors disabled:opacity-50">
                            {updating === apt.id ? <Loader2 className="w-4 h-4 text-success animate-spin" /> : <CheckCircle className="w-4 h-4 text-success" />}
                          </button>
                          <button onClick={() => updateStatus(apt, 'cancelled')} disabled={updating === apt.id}
                            className="w-8 h-8 rounded-lg bg-danger/20 flex items-center justify-center hover:bg-danger/30 transition-colors disabled:opacity-50">
                            {updating === apt.id ? <Loader2 className="w-4 h-4 text-danger animate-spin" /> : <XCircle className="w-4 h-4 text-danger" />}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-text-secondary mx-auto mb-3" />
                <p className="text-text-secondary">No appointments found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
