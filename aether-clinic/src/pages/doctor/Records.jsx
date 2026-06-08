import { motion } from 'framer-motion';
import { FileText, Download, Search, ChevronRight, Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
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
  patient_id: '', record_type: 'Treatment', description: '', notes: '',
};

const recordTypes = ['Treatment', 'Consultation', 'Procedure', 'Lab Results', 'Prescription'];

function normalizeRecord(r) {
  return {
    id: r.id,
    patient_id: r.patient_id || '',
    date: r.created_at ? r.created_at.split('T')[0] : r.date || '',
    type: r.record_type || r.type || '',
    description: r.description || '',
    doctor: r.doctors?.full_name || r.doctor || '',
    notes: r.notes || '',
  };
}

export default function DoctorRecords() {
  const supabaseCtx = useSupabase();
  const { isDark } = useTheme();
  const [records, setRecords] = useState([]);
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
      const { data, error } = await supabaseCtx.supabase
        .from('medical_records')
        .select('*, doctors(full_name)')
        .order('created_at', { ascending: false });
      if (!error && data) setRecords(data.map(normalizeRecord));
    } catch (err) {
      console.error('Failed to fetch records:', err);
    }
    setLoading(false);
  }, [supabaseCtx]);

  const fetchPatients = useCallback(async () => {
    try {
      const result = await supabaseCtx.getPatients();
      if (result?.data) setPatients(result.data);
    } catch {}
  }, [supabaseCtx]);

  useEffect(() => { fetchData(); fetchPatients(); }, [fetchData, fetchPatients]);

  const filtered = records.filter(r =>
    r.description.toLowerCase().includes(search.toLowerCase()) ||
    r.type.toLowerCase().includes(search.toLowerCase()) ||
    r.doctor.toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() {
    setEditing(null);
    setFormData(emptyForm);
    setShowModal(true);
  }

  function openEdit(record) {
    if (!record) return;
    setEditing(record);
    setFormData({
      patient_id: record.patient_id || '',
      record_type: record.type || 'Treatment',
      description: record.description || '',
      notes: record.notes || '',
    });
    setShowModal(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = [];
    if (!formData.description.trim()) errors.push('Description is required');
    if (errors.length) {
      errors.forEach(msg => toast({ type: 'error', title: 'Validation Error', message: msg }));
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        patient_id: formData.patient_id || null,
        record_type: formData.record_type,
        description: formData.description.trim(),
        notes: formData.notes.trim(),
      };
      if (editing) {
        await supabaseCtx.updateMedicalRecord(editing.id, payload);
        toast({ type: 'success', title: 'Updated', message: 'Record updated' });
      } else {
        await supabaseCtx.createMedicalRecord(payload);
        toast({ type: 'success', title: 'Added', message: 'Record created' });
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
      await supabaseCtx.supabase.from('medical_records').delete().eq('id', id);
      toast({ type: 'success', title: 'Deleted', message: 'Record removed' });
      fetchData();
    } catch (err) {
      toast({ type: 'error', title: 'Error', message: err.message || 'Delete failed' });
    }
  }

  function patientName(id) {
    const p = patients.find(p => p.id === id);
    return p?.full_name || p?.name || 'Unknown';
  }

  return (
    <DashboardLayout title="Records" role="doctor">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="text-primary">Doctor</span>
          <ChevronRight className="w-3 h-3" />
          <span>Medical Records</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Medical Records</h2>
          <div className="flex items-center gap-3">
            <SearchInput value={search} onChange={e => setSearch(e.target.value)} placeholder="Search records..." className="w-full sm:w-56" />
            <button onClick={openAdd} className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors">
              <Plus className="w-4 h-4" /> New Record
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard icon={FileText} label="Total Records" value={records.length.toString()} color="primary" />
          <StatCard icon={FileText} label="This Month" value={records.filter(r => r.date?.startsWith('2026-05')).length.toString()} color="success" />
          <StatCard icon={Download} label="Recent Uploads" value="5" color="accent" />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-text-secondary">Loading records...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((record, i) => (
              <motion.div key={record.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <GlassCard className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs text-text-secondary">{record.date}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          record.type === 'Treatment' ? 'bg-primary/20 text-primary' :
                          record.type === 'Procedure' ? 'bg-accent/20 text-accent' :
                          record.type === 'Lab Results' ? 'bg-success/20 text-success' :
                          record.type === 'Consultation' ? 'bg-info/20 text-info' :
                          record.type === 'Prescription' ? 'bg-warning/20 text-warning' :
                          'bg-info/20 text-info'
                        }`}>{record.type}</span>
                      </div>
                      <h3 className="text-white font-semibold">{record.description}</h3>
                      <p className="text-sm text-text-secondary mt-1">
                        {record.patient_id && `${patientName(record.patient_id)} · `}
                        Doctor: {record.doctor}
                      </p>
                      <p className="text-sm text-text-secondary mt-2 bg-white/5 rounded-lg p-3">{record.notes}</p>
                    </div>
                    <div className="flex items-center gap-1 ml-4">
                      <button onClick={() => openEdit(record)} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-text-secondary hover:text-primary transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteTarget(record)} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-text-secondary hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-text-secondary mx-auto mb-3" />
                <p className="text-text-secondary">No records found</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Record' : 'New Record'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Patient</label>
              <select value={formData.patient_id} onChange={e => setFormData({ ...formData, patient_id: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-primary/50`}>
                <option value="">Select patient</option>
                {patients.map(p => (
                  <option key={p.id} value={p.id}>{p.full_name || p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Record Type</label>
              <select value={formData.record_type} onChange={e => setFormData({ ...formData, record_type: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-primary/50`}>
                {recordTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Description *</label>
              <input type="text" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-primary/50`} />
            </div>
            <div className="sm:col-span-2">
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Notes</label>
              <textarea value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} rows={3}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-primary/50 resize-none`} />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${mutedText} ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'} transition-colors`}>Cancel</button>
            <button type="submit" disabled={submitting}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-primary hover:bg-primary/90 text-white transition-colors disabled:opacity-50 flex items-center gap-2">
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {editing ? 'Update' : 'Create'} Record
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Confirm Delete" size="sm">
        <p className={`text-sm ${mutedText} mb-6`}>
          Are you sure you want to delete this record? This action cannot be undone.
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
