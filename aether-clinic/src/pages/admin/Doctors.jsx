import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useSupabase } from '../../context/SupabaseContext';
import Modal from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { Plus, ChevronRight, Star, Users, Edit2, Trash2, Loader2 } from 'lucide-react';
import { adminDoctors as mockDoctors } from '../../data/adminMockData';

function getInitials(name) {
  if (!name || typeof name !== 'string') return '?';
  return name.replace('Dr. ', '').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function doctorName(d) { return d?.name || d?.full_name || 'Unknown'; }

const avatarColors = ['#3b82f6', '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];

const emptyForm = {
  name: '', specialty: '', experience: '', rating: '', patients: '', status: 'On Duty', revenue: '',
};

export default function Doctors() {
  const supabaseCtx = useSupabase();
  const { isDark } = useTheme();
  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchData = useCallback(async () => {
    if (supabaseCtx?.connected && supabaseCtx?.getDoctors) {
      try {
        const result = await supabaseCtx.getDoctors();
        if (result) { setDoctors(result); return; }
      } catch {}
    }
    setDoctors(mockDoctors);
  }, [supabaseCtx]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = filter === 'All' ? doctors : doctors.filter(d => d?.status === filter);

  const statusCounts = {
    All: doctors.length,
    'On Duty': doctors.filter(d => d?.status === 'On Duty').length,
    'On Leave': doctors.filter(d => d?.status === 'On Leave').length,
  };

  function openAdd() {
    setEditing(null);
    setFormData(emptyForm);
    setShowModal(true);
  }

  function openEdit(doc) {
    if (!doc) return;
    setEditing(doc);
    setFormData({
      name: doc.name || doc.full_name || '',
      specialty: doc.specialty || '',
      experience: doc.experience || '',
      rating: String(doc.rating || ''),
      patients: String(doc.patients || doc.patients_count || ''),
      status: doc.status || 'On Duty',
      revenue: doc.revenue || '',
    });
    setShowModal(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast({ type: 'error', title: 'Validation Error', message: 'Doctor name is required' });
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        full_name: formData.name.startsWith('Dr. ') ? formData.name.trim() : `Dr. ${formData.name.trim()}`,
        specialty: formData.specialty.trim(),
        experience: formData.experience.trim(),
        rating: parseFloat(formData.rating) || 0,
        patients_count: parseInt(formData.patients) || 0,
        status: formData.status,
        revenue: formData.revenue,
      };
      const displayName = payload.full_name;
      if (editing) {
        if (supabaseCtx?.connected) {
          const { error: updErr } = await supabaseCtx.supabase.from('doctors').update(payload).eq('id', editing.id);
          if (updErr) throw updErr;
          await fetchData();
        } else {
          setDoctors(prev => prev.map(d => d.id === editing.id ? { ...d, ...payload, name: displayName } : d));
        }
        toast({ type: 'success', title: 'Updated', message: `${displayName} updated successfully` });
      } else {
        if (supabaseCtx?.connected) {
          const { error: insErr } = await supabaseCtx.supabase.from('doctors').insert([payload]);
          if (insErr) throw insErr;
          await fetchData();
        } else {
          const newId = Math.max(...doctors.map(d => d.id), 0) + 1;
          setDoctors(prev => [...prev, {
            id: newId, ...payload, name: displayName,
            rating: payload.rating, patients: payload.patients_count,
            initials: getInitials(displayName),
          }]);
        }
        toast({ type: 'success', title: 'Added', message: `${displayName} added successfully` });
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
        const { error } = await supabaseCtx.supabase.from('doctors').delete().eq('id', id);
        if (error) throw error;
        await fetchData();
      } else {
        setDoctors(prev => prev.filter(d => d.id !== id));
      }
      toast({ type: 'success', title: 'Deleted', message: 'Doctor removed successfully' });
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
        <span>Doctors</span>
      </div>

      <div className="flex items-center justify-between">
        <div className={`flex gap-1 rounded-lg p-1 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
          {Object.entries(statusCounts).map(([key, count]) => (
            <button key={key} onClick={() => setFilter(key)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                filter === key ? 'bg-blue-600 text-white' : `${mutedText} hover:${isDark ? 'text-white' : 'text-gray-700'}`
              }`}>
              {key} ({count})
            </button>
          ))}
        </div>
        <button onClick={openAdd} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" /> Add Doctor
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length > 0 ? filtered.map((doc, i) => doc ? (
          <div key={doc.id} className={`rounded-xl border p-5 ${cardTheme}`}>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold shrink-0"
                style={{ background: avatarColors[i % avatarColors.length] }}>
                {getInitials(doctorName(doc))}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold ${textColor}`}>{doctorName(doc)}</h3>
                <p className={`text-sm ${mutedText}`}>{doc.specialty || '-'}</p>
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <span className={`flex items-center gap-1 ${mutedText}`}>
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {doc.rating ?? '0.0'}
                  </span>
                  <span className={`flex items-center gap-1 ${mutedText}`}>
                    <Users className="w-3.5 h-3.5" /> {(doc.patients || doc.patients_count || 0).toLocaleString()}
                  </span>
                </div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                doc.status === 'On Duty' ? 'bg-green-500/15 text-green-400' : 'bg-amber-500/15 text-amber-400'
              }`}>{doc.status || 'Unknown'}</span>
            </div>
            <div className={`mt-4 pt-4 border-t ${borderColor} flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${mutedText}`}>
                  Exp: <span className={`font-medium ${textColor}`}>{doc.experience || '-'}</span>
                </span>
                <button onClick={() => openEdit(doc)} className={`p-1.5 rounded-lg ${hoverBg} ${mutedText} hover:text-blue-400`}><Edit2 className="w-3.5 h-3.5" /></button>
                <button onClick={() => setDeleteTarget(doc)} className={`p-1.5 rounded-lg ${hoverBg} ${mutedText} hover:text-red-400`}><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
              <span className={`text-sm ${mutedText}`}>
                Revenue: <span className={`font-medium text-green-400`}>{doc.revenue || '$0'}</span>
              </span>
            </div>
          </div>
        ) : null) : (
          <div className={`col-span-full py-8 text-center ${mutedText}`}>No doctors found</div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Doctor' : 'Add Doctor'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Full Name *</label>
              <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Specialty</label>
              <input type="text" value={formData.specialty} onChange={e => setFormData({ ...formData, specialty: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Experience</label>
              <input type="text" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })}
                placeholder="e.g. 15 yrs"
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Rating</label>
              <input type="number" step="0.1" min="0" max="5" value={formData.rating} onChange={e => setFormData({ ...formData, rating: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Patients Count</label>
              <input type="number" value={formData.patients} onChange={e => setFormData({ ...formData, patients: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Revenue</label>
              <input type="text" value={formData.revenue} onChange={e => setFormData({ ...formData, revenue: e.target.value })}
                placeholder="e.g. $1.2M"
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Status</label>
              <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`}>
                <option>On Duty</option>
                <option>On Leave</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${mutedText} ${hoverBg} transition-colors`}>Cancel</button>
            <button type="submit" disabled={submitting}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50 flex items-center gap-2">
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {editing ? 'Update' : 'Add'} Doctor
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Confirm Delete" size="sm">
        <p className={`text-sm ${mutedText} mb-6`}>
          Are you sure you want to delete <span className={`font-semibold ${textColor}`}>{deleteTarget?.name}</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setDeleteTarget(null)}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${mutedText} ${hoverBg} transition-colors`}>Cancel</button>
          <button onClick={() => handleDelete(deleteTarget.id)}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors">Delete</button>
        </div>
      </Modal>
    </div>
  );
}
