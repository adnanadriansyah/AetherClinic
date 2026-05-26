import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useSupabase } from '../../context/SupabaseContext';
import Modal from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { Plus, ChevronRight, Edit2, Trash2, Loader2 } from 'lucide-react';
import { appointmentsList as mockAppointments, weekDays, weekDates, weekAppointments } from '../../data/adminMockData';

function StatusBadge({ status }) {
  const styles = {
    Scheduled: 'bg-blue-500/15 text-blue-400',
    Completed: 'bg-green-500/15 text-green-400',
    Cancelled: 'bg-red-500/15 text-red-400',
  };
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[status] || ''}`}>{status}</span>;
}

const emptyForm = {
  patient: '', doctor: '', type: '', date: '', time: '', room: '', status: 'Scheduled',
};

export default function Appointments() {
  const supabaseCtx = useSupabase();
  const { isDark } = useTheme();
  const [appointments, setAppointments] = useState([]);
  const [tab, setTab] = useState('Today');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchData = useCallback(async () => {
    if (supabaseCtx?.connected && supabaseCtx?.getAppointments) {
      try {
        const result = await supabaseCtx.getAppointments();
        if (result) {
          const mapped = result.map(a => ({
            id: a.id,
            patient: a.patients?.full_name || a.patient_name || '',
            doctor: a.doctors?.full_name || a.doctor_name || '',
            type: a.treatments?.name || a.treatment_name || a.type || '',
            date: a.appointment_date || a.date,
            time: a.appointment_time || a.time,
            room: a.room || '',
            status: a.status || 'Scheduled',
          }));
          setAppointments(mapped);
          return;
        }
      } catch {}
    }
    setAppointments(mockAppointments);
  }, [supabaseCtx]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const todayStr = new Date().toISOString().split('T')[0];

  const filteredList = tab === 'Today'
    ? appointments.filter(a => (a.date || '').startsWith(todayStr))
    : tab === 'Week'
    ? appointments.filter(a => {
        const d = new Date(a.date);
        const now = new Date();
        const weekEnd = new Date(now); weekEnd.setDate(now.getDate() + 7);
        return d >= new Date(now.getFullYear(), now.getMonth(), now.getDate()) && d <= weekEnd;
      })
    : appointments;

  function openAdd() {
    setEditing(null);
    setFormData({ ...emptyForm, date: todayStr });
    setShowModal(true);
  }

  function openEdit(apt) {
    if (!apt) return;
    setEditing(apt);
    setFormData({
      patient: apt.patient || '',
      doctor: apt.doctor || '',
      type: apt.type || '',
      date: apt.date || '',
      time: apt.time || '',
      room: String(apt.room || ''),
      status: apt.status || 'Scheduled',
    });
    setShowModal(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.patient.trim() || !formData.doctor.trim()) {
      toast({ type: 'error', title: 'Validation Error', message: 'Patient and Doctor are required' });
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        patient_name: formData.patient.trim(),
        doctor_name: formData.doctor.trim(),
        type: formData.type.trim(),
        appointment_date: formData.date,
        appointment_time: formData.time,
        room: formData.room,
        status: formData.status,
      };
      if (editing) {
        if (supabaseCtx?.connected) {
          const { error: updErr } = await supabaseCtx.supabase.from('appointments').update(payload).eq('id', editing.id);
          if (updErr) throw updErr;
          await fetchData();
        } else {
          setAppointments(prev => prev.map(a => a.id === editing.id ? { ...a, ...payload, patient: payload.patient_name, doctor: payload.doctor_name, date: payload.appointment_date, time: payload.appointment_time, room: Number(payload.room) || payload.room } : a));
        }
        toast({ type: 'success', title: 'Updated', message: `Appointment updated successfully` });
      } else {
        if (supabaseCtx?.connected) {
          const { error: insErr } = await supabaseCtx.supabase.from('appointments').insert([payload]);
          if (insErr) throw insErr;
          await fetchData();
        } else {
          const newId = Math.max(...appointments.map(a => a.id), 0) + 1;
          setAppointments(prev => [...prev, { id: newId, ...payload, patient: payload.patient_name, doctor: payload.doctor_name, date: payload.appointment_date, time: payload.appointment_time, room: payload.room }]);
        }
        toast({ type: 'success', title: 'Added', message: `Appointment added successfully` });
      }
      setShowModal(false);
    } catch (err) {
      toast({ type: 'error', title: 'Error', message: err.message || 'Operation failed' });
    }
    setSubmitting(false);
  }

  async function handleDelete(id) {
    setDeleteTarget(null);
    try {
      if (supabaseCtx?.connected) {
        const { error } = await supabaseCtx.supabase.from('appointments').delete().eq('id', id);
        if (error) throw error;
        await fetchData();
      } else {
        setAppointments(prev => prev.filter(a => a.id !== id));
      }
      toast({ type: 'success', title: 'Deleted', message: 'Appointment cancelled successfully' });
    } catch (err) {
      toast({ type: 'error', title: 'Error', message: err.message || 'Delete failed' });
    }
  }

  const cardTheme = isDark ? 'bg-[#151e30] border-white/5' : 'bg-white border-gray-200';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const mutedText = isDark ? 'text-[#94A3B8]' : 'text-gray-500';
  const borderColor = isDark ? 'border-white/5' : 'border-gray-200';
  const inputBg = isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200';
  const hoverBg = isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50';

  return (
    <div className="space-y-6">
      <div className={`flex items-center gap-2 text-sm ${mutedText}`}>
        <span className="text-blue-400">Admin</span>
        <ChevronRight className="w-3 h-3" />
        <span>Appointments</span>
      </div>

      <div className="flex items-center justify-between">
        <div className={`flex gap-1 rounded-lg p-1 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
          {['Today', 'Week', 'Month'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                tab === t ? 'bg-blue-600 text-white' : `${mutedText} hover:${isDark ? 'text-white' : 'text-gray-700'}`
              }`}>{t}</button>
          ))}
        </div>
        <button onClick={openAdd} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" /> New Appointment
        </button>
      </div>

      <div className={`rounded-xl border ${cardTheme} p-5`}>
        <h3 className={`text-base font-semibold mb-4 ${textColor}`}>Weekly Calendar</h3>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((d, i) => (
            <div key={i} className="text-center">
              <p className={`text-xs font-medium ${mutedText} mb-1`}>{d}</p>
              <p className={`text-sm font-semibold ${textColor} mb-2`}>{weekDates[i]}</p>
              <div className="space-y-1">
                {weekAppointments.find(wa => wa.day === i)?.slots?.map((slot, j) => slot ? (
                  <div key={j} className={`text-[10px] p-1 rounded ${isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'} leading-tight truncate`}>
                    {slot.time}<br/>{(slot.patient || '?').split(' ')[0]}
                  </div>
                ) : null) || null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`rounded-xl border ${cardTheme} p-5`}>
        <h3 className={`text-base font-semibold mb-4 ${textColor}`}>Appointment List ({filteredList.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b ${borderColor}`}>
                <th className={`text-left py-3 pr-2 font-medium ${mutedText}`}>Patient</th>
                <th className={`text-left py-3 px-2 font-medium ${mutedText}`}>Doctor</th>
                <th className={`text-left py-3 px-2 font-medium ${mutedText} hidden md:table-cell`}>Type</th>
                <th className={`text-left py-3 px-2 font-medium ${mutedText} hidden md:table-cell`}>Time</th>
                <th className={`text-left py-3 px-2 font-medium ${mutedText}`}>Room</th>
                <th className={`text-left py-3 px-2 font-medium ${mutedText}`}>Status</th>
                <th className={`text-right py-3 pl-2 font-medium ${mutedText}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length > 0 ? filteredList.map((apt) => apt ? (
                <tr key={apt.id} className={`border-b ${borderColor} ${hoverBg} transition-colors`}>
                  <td className={`py-3 pr-2 font-medium ${textColor}`}>{apt.patient || '-'}</td>
                  <td className={`py-3 px-2 ${mutedText}`}>{apt.doctor || '-'}</td>
                  <td className={`py-3 px-2 ${mutedText} hidden md:table-cell`}>{apt.type || '-'}</td>
                  <td className={`py-3 px-2 ${mutedText} hidden md:table-cell`}>{apt.time || '-'} {apt.date ? apt.date.slice(5) : ''}</td>
                  <td className={`py-3 px-2 ${mutedText}`}>Room {apt.room || '-'}</td>
                  <td className="py-3 px-2"><StatusBadge status={apt.status} /></td>
                  <td className="py-3 pl-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(apt)} className={`p-1.5 rounded-lg ${hoverBg} ${mutedText} hover:text-blue-400`}><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteTarget(apt)} className={`p-1.5 rounded-lg ${hoverBg} ${mutedText} hover:text-red-400`}><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ) : null) : (
                <tr><td colSpan={7} className={`py-8 text-center ${mutedText}`}>No appointments found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Appointment' : 'New Appointment'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Patient Name *</label>
              <input type="text" value={formData.patient} onChange={e => setFormData({ ...formData, patient: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Doctor *</label>
              <input type="text" value={formData.doctor} onChange={e => setFormData({ ...formData, doctor: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Treatment Type</label>
              <input type="text" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Date</label>
              <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Time</label>
              <input type="time" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Room</label>
              <input type="text" value={formData.room} onChange={e => setFormData({ ...formData, room: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Status</label>
              <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`}>
                <option>Scheduled</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${mutedText} ${hoverBg} transition-colors`}>Cancel</button>
            <button type="submit" disabled={submitting}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50 flex items-center gap-2">
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {editing ? 'Update' : 'Create'} Appointment
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Cancel Appointment" size="sm">
        <p className={`text-sm ${mutedText} mb-6`}>
          Cancel appointment for <span className={`font-semibold ${textColor}`}>{deleteTarget?.patient}</span> with {deleteTarget?.doctor}? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setDeleteTarget(null)}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${mutedText} ${hoverBg} transition-colors`}>Keep</button>
          <button onClick={() => handleDelete(deleteTarget.id)}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors">Cancel Appointment</button>
        </div>
      </Modal>
    </div>
  );
}
