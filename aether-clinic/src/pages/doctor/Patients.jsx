import { motion } from 'framer-motion';
import { Users, Search, ChevronRight, Calendar, Star, Phone, Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import GlassCard from '../../components/ui/GlassCard';
import StatCard from '../../components/ui/StatCard';
import SearchInput from '../../components/ui/SearchInput';
import Modal from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { useSupabase } from '../../context/SupabaseContext';
import { useTheme } from '../../context/ThemeContext';

const emptyForm = {
  name: '', email: '', phone: '', age: '', gender: 'Female', treatment: '', status: 'Active',
};

function normalizePatient(p) {
  return {
    id: p.id,
    name: p.full_name || p.name || '',
    email: p.email || '',
    lastVisit: p.last_visit || p.lastVisit || '-',
    treatment: p.treatment || '-',
    phone: p.phone || '-',
    age: p.age || '',
    gender: p.gender || '',
    status: p.status || 'Active',
  };
}

export default function DoctorPatients() {
  const supabaseCtx = useSupabase();
  const { isDark } = useTheme();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
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
      const result = await supabaseCtx.getPatients();
      if (result?.data) setPatients(result.data.map(normalizePatient));
    } catch (err) {
      console.error('Failed to fetch patients:', err);
    }
    setLoading(false);
  }, [supabaseCtx]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.treatment.toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() {
    setEditing(null);
    setFormData(emptyForm);
    setShowModal(true);
  }

  function openEdit(patient) {
    if (!patient) return;
    setEditing(patient);
    setFormData({
      name: patient.name || '',
      email: patient.email || '',
      phone: patient.phone || '',
      age: String(patient.age || ''),
      gender: patient.gender || 'Female',
      treatment: patient.treatment || '',
      status: patient.status || 'Active',
    });
    setShowModal(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = [];
    if (!formData.name.trim()) errors.push('Name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (errors.length) {
      errors.forEach(msg => toast({ type: 'error', title: 'Validation Error', message: msg }));
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        full_name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        age: formData.age ? Number(formData.age) : null,
        gender: formData.gender,
        treatment: formData.treatment.trim(),
        status: formData.status,
      };
      if (editing) {
        await supabaseCtx.updatePatient(editing.id, payload);
        toast({ type: 'success', title: 'Updated', message: `${formData.name} updated` });
      } else {
        await supabaseCtx.createPatient(payload);
        toast({ type: 'success', title: 'Added', message: `${formData.name} added` });
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
      await supabaseCtx.supabase.from('patients').delete().eq('id', id);
      toast({ type: 'success', title: 'Deleted', message: 'Patient removed' });
      fetchData();
    } catch (err) {
      toast({ type: 'error', title: 'Error', message: err.message || 'Delete failed' });
    }
  }

  return (
    <DashboardLayout title="Patients" role="doctor">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="text-primary">Doctor</span>
          <ChevronRight className="w-3 h-3" />
          <span>Patients</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Patients</h2>
          <div className="flex items-center gap-3">
            <SearchInput value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patients..." className="w-full sm:w-64" />
            <button onClick={openAdd} className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard icon={Users} label="Total Patients" value={patients.length.toString()} color="primary" />
          <StatCard icon={Calendar} label="Active" value={patients.filter(p => p.status === 'Active').length.toString()} color="success" />
          <StatCard icon={Star} label="Avg. Rating" value="4.9" color="accent" />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-text-secondary">Loading patients...</p>
          </div>
        ) : (
          <GlassCard className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-text-secondary border-b border-white/5">
                    <th className="text-left py-3 px-2 font-medium">Patient</th>
                    <th className="text-left py-3 px-2 font-medium">Last Visit</th>
                    <th className="text-left py-3 px-2 font-medium">Treatment</th>
                    <th className="text-left py-3 px-2 font-medium hidden md:table-cell">Contact</th>
                    <th className="text-center py-3 px-2 font-medium">Status</th>
                    <th className="text-right py-3 px-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => (
                    <motion.tr key={p.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                            {p.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <span className="text-white font-medium">{p.name}</span>
                            <p className={`text-xs ${mutedText}`}>{p.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className={`py-3 px-2 ${mutedText}`}>{p.lastVisit}</td>
                      <td className={`py-3 px-2 ${mutedText}`}>{p.treatment}</td>
                      <td className={`py-3 px-2 ${mutedText} hidden md:table-cell`}>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {p.phone}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          p.status === 'Active' ? 'bg-success/20 text-success' : 'bg-text-secondary/20 text-text-secondary'
                        }`}>{p.status}</span>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEdit(p)} className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'} ${mutedText} hover:text-primary transition-colors`}>
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => setDeleteTarget(p)} className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'} ${mutedText} hover:text-red-400 transition-colors`}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Patient' : 'Add Patient'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Full Name *</label>
              <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-primary/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Email *</label>
              <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-primary/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Phone</label>
              <input type="text" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-primary/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Age</label>
              <input type="number" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-primary/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Gender</label>
              <select value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-primary/50`}>
                <option>Female</option>
                <option>Male</option>
              </select>
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Treatment</label>
              <input type="text" value={formData.treatment} onChange={e => setFormData({ ...formData, treatment: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-primary/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Status</label>
              <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-primary/50`}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${mutedText} ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'} transition-colors`}>Cancel</button>
            <button type="submit" disabled={submitting}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-primary hover:bg-primary/90 text-white transition-colors disabled:opacity-50 flex items-center gap-2">
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {editing ? 'Update' : 'Add'} Patient
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
            className={`px-4 py-2 text-sm font-medium rounded-lg ${mutedText} ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'} transition-colors`}>Cancel</button>
          <button onClick={() => handleDelete(deleteTarget.id)}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors">Delete</button>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
