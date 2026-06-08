import { motion } from 'framer-motion';
import { Calendar, Clock, Video, ChevronRight, Filter, Search, Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import GlassCard from '../../components/ui/GlassCard';
import StatCard from '../../components/ui/StatCard';
import SearchInput from '../../components/ui/SearchInput';
import Modal from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { useSupabase } from '../../context/SupabaseContext';
import { useTheme } from '../../context/ThemeContext';

const tabs = ['Upcoming', 'Completed', 'Cancelled'];

const emptyForm = {
  doctor: '', treatment: '', date: '', time: '', type: 'In-Clinic',
};

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

const statusGroups = {
  upcoming: ['confirmed', 'scheduled', 'pending'],
  completed: ['completed'],
  cancelled: ['cancelled', 'no-show'],
};

export default function PatientAppointments() {
  const supabaseCtx = useSupabase();
  const { isDark } = useTheme();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const inputBg = isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const mutedText = isDark ? 'text-[#94A3B8]' : 'text-gray-500';

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

  const fetchDoctors = useCallback(async () => {
    try {
      const result = await supabaseCtx.getDoctors();
      if (result) setDoctors(result);
    } catch {}
  }, [supabaseCtx]);

  const fetchTreatments = useCallback(async () => {
    try {
      const result = await supabaseCtx.getTreatments();
      if (result) setTreatments(result);
    } catch {}
  }, [supabaseCtx]);

  useEffect(() => { fetchData(); fetchDoctors(); fetchTreatments(); }, [fetchData, fetchDoctors, fetchTreatments]);

  const filtered = appointments.filter(a => {
    const group = statusGroups[activeTab.toLowerCase()] || [];
    return group.includes(a.status);
  }).filter(a =>
    a.patient.toLowerCase().includes(search.toLowerCase()) ||
    a.treatment.toLowerCase().includes(search.toLowerCase())
  );

  const upcoming = appointments.filter(a => statusGroups.upcoming.includes(a.status));

  function openAdd() {
    setEditing(null);
    setFormData(emptyForm);
    setShowModal(true);
  }

  function openEdit(apt) {
    setEditing(apt);
    setFormData({
      doctor: apt.doctor || '',
      treatment: apt.treatment || '',
      date: apt.date || '',
      time: apt.time || '',
      type: apt.type || 'In-Clinic',
    });
    setShowModal(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = [];
    if (!formData.date) errors.push('Date is required');
    if (!formData.time) errors.push('Time is required');
    if (errors.length) {
      errors.forEach(msg => toast({ type: 'error', title: 'Validation Error', message: msg }));
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        appointment_date: formData.date,
        appointment_time: formData.time,
        type: formData.type,
        status: 'scheduled',
      };
      if (editing) {
        await supabaseCtx.updateAppointment(editing.id, payload);
        toast({ type: 'success', title: 'Updated', message: 'Appointment updated successfully' });
      } else {
        await supabaseCtx.createAppointment(payload);
        toast({ type: 'success', title: 'Added', message: 'Appointment created successfully' });
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      toast({ type: 'error', title: 'Error', message: err.message || 'Operation failed' });
    }
    setSubmitting(false);
  }

  async function handleDelete(id) {
    setDeleteTarget(null);
    try {
      await supabaseCtx.supabase.from('appointments').delete().eq('id', id);
      toast({ type: 'success', title: 'Deleted', message: 'Appointment removed' });
      fetchData();
    } catch (err) {
      toast({ type: 'error', title: 'Error', message: err.message || 'Delete failed' });
    }
  }

  return (
    <DashboardLayout title="My Appointments" role="patient">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="text-primary">Appointments</span>
          <ChevronRight className="w-3 h-3" />
          <span>My Schedule</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h2 className="text-2xl font-bold text-white">My Appointments</h2>
          <div className="flex items-center gap-3">
            <SearchInput value={search} onChange={e => setSearch(e.target.value)} placeholder="Search appointments..." className="w-full sm:w-56" />
            <button onClick={openAdd} className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard icon={Calendar} label="Total Appointments" value={appointments.length.toString()} color="primary" />
          <StatCard icon={Clock} label="Upcoming" value={upcoming.length.toString()} color="warning" />
          <StatCard icon={Video} label="Virtual" value={appointments.filter(a => a.type === 'Virtual').length.toString()} color="accent" />
        </div>

        <div className="flex gap-2">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab ? 'bg-primary text-white' : 'bg-white/5 text-text-secondary hover:bg-white/10'
              }`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-text-secondary">Loading appointments...</p>
            </div>
          ) : filtered.map((apt, i) => (
            <motion.div key={apt.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <GlassCard className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      apt.type === 'Virtual' ? 'bg-accent/20' : 'bg-primary/20'
                    }`}>
                      {apt.type === 'Virtual' ? <Video className="w-5 h-5 text-accent" /> : <Calendar className="w-5 h-5 text-primary" />}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{apt.treatment}</h3>
                      <p className="text-sm text-text-secondary">{apt.doctor?.replace('Dr. ', '')}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-text-secondary">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{apt.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{apt.time}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
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
                    {statusGroups.upcoming.includes(apt.status) && (
                      <>
                        <button onClick={() => openEdit(apt)} className="p-1.5 rounded-lg hover:bg-white/10 text-text-secondary hover:text-primary transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteTarget(apt)} className="p-1.5 rounded-lg hover:bg-white/10 text-text-secondary hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-text-secondary mx-auto mb-3" />
              <p className="text-text-secondary">No {activeTab.toLowerCase()} appointments found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Appointment' : 'New Appointment'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Doctor</label>
              <select value={formData.doctor} onChange={e => setFormData({ ...formData, doctor: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-primary/50`}>
                <option value="">Select doctor</option>
                {doctors.map(d => (
                  <option key={d.id} value={d.full_name || d.name}>{d.full_name || d.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Treatment</label>
              <select value={formData.treatment} onChange={e => setFormData({ ...formData, treatment: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-primary/50`}>
                <option value="">Select treatment</option>
                {treatments.map(t => (
                  <option key={t.id} value={t.name}>{t.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Date *</label>
              <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-primary/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Time *</label>
              <input type="time" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-primary/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Type</label>
              <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-primary/50`}>
                <option value="In-Clinic">In-Clinic</option>
                <option value="Virtual">Virtual</option>
                <option value="Chat">Chat</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${mutedText} ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'} transition-colors`}>Cancel</button>
            <button type="submit" disabled={submitting}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-primary hover:bg-primary/90 text-white transition-colors disabled:opacity-50 flex items-center gap-2">
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {editing ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Cancel Appointment" size="sm">
        <p className={`text-sm ${mutedText} mb-6`}>
          Are you sure you want to cancel this appointment?
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setDeleteTarget(null)}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${mutedText} ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'} transition-colors`}>No</button>
          <button onClick={() => handleDelete(deleteTarget.id)}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors">Yes, Cancel</button>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
