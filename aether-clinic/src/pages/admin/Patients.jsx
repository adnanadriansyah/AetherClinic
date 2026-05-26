import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useSupabase } from '../../context/SupabaseContext';
import Modal from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { Search, Plus, ChevronRight, ChevronLeft, ChevronDown, Eye, Edit2, Trash2, Loader2 } from 'lucide-react';
import { patientsList as mockPatients } from '../../data/adminMockData';

function StatusBadge({ status }) {
  const styles = {
    Active: 'bg-green-500/15 text-green-400',
    Inactive: 'bg-red-500/15 text-red-400',
  };
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[status] || ''}`}>{status}</span>;
}

function getInitials(name) {
  if (!name || typeof name !== 'string') return '?';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function patientName(p) { return p?.name || p?.full_name || 'Unknown'; }
function patientEmail(p) { return p?.email || ''; }

const colors = ['#3b82f6', '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6'];

const emptyForm = {
  name: '', email: '', age: '', gender: 'Female', phone: '', city: '', treatment: '', status: 'Active',
};

export default function Patients() {
  const supabaseCtx = useSupabase();
  const { isDark } = useTheme();
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchData = useCallback(async () => {
    if (supabaseCtx?.connected && supabaseCtx?.getPatients) {
      try {
        const result = await supabaseCtx.getPatients();
        if (result) { setPatients(result.data); return; }
      } catch {}
    }
    setPatients(mockPatients);
  }, [supabaseCtx]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = patients.filter(p => {
    if (!p) return false;
    const name = (p.name || p.full_name || '').toLowerCase();
    const email = (p.email || '').toLowerCase();
    const matchSearch = name.includes(search.toLowerCase()) || email.includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  function openAdd() {
    setEditing(null);
    setFormData(emptyForm);
    setShowModal(true);
  }

  function openEdit(patient) {
    if (!patient) return;
    setEditing(patient);
    setFormData({
      name: patient.name || patient.full_name || '',
      email: patient.email || '',
      age: String(patient.age || ''),
      gender: patient.gender || 'Female',
      phone: patient.phone || '',
      city: patient.city || '',
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
    if (!formData.age || isNaN(Number(formData.age))) errors.push('Valid age is required');
    if (errors.length) {
      errors.forEach(msg => toast({ type: 'error', title: 'Validation Error', message: msg }));
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        full_name: formData.name.trim(),
        email: formData.email.trim(),
        age: Number(formData.age),
        gender: formData.gender,
        phone: formData.phone.trim(),
        city: formData.city.trim(),
        treatment: formData.treatment.trim(),
        status: formData.status,
      };
      if (editing) {
        if (supabaseCtx?.connected && supabaseCtx?.updatePatient) {
          await supabaseCtx.updatePatient(editing.id, payload);
        } else {
          setPatients(prev => prev.map(p => p.id === editing.id ? { ...p, ...payload, name: payload.full_name } : p));
        }
        toast({ type: 'success', title: 'Updated', message: `${formData.name} updated successfully` });
      } else {
        if (supabaseCtx?.connected && supabaseCtx?.createPatient) {
          await supabaseCtx.createPatient(payload);
        } else {
          const newId = Math.max(...patients.map(p => p.id), 0) + 1;
          setPatients(prev => [...prev, { id: newId, ...payload, name: payload.full_name, lastVisit: '-' }]);
        }
        toast({ type: 'success', title: 'Added', message: `${formData.name} added successfully` });
      }
      setShowModal(false);
      if (supabaseCtx?.connected) fetchData();
    } catch (err) {
      toast({ type: 'error', title: 'Error', message: err.message || 'Operation failed' });
    }
    setSubmitting(false);
  }

  async function handleDelete(id) {
    setDeleteTarget(null);
    try {
      if (supabaseCtx?.connected) {
        const { error } = await supabaseCtx.supabase.from('patients').delete().eq('id', id);
        if (error) throw error;
        await fetchData();
      } else {
        setPatients(prev => prev.filter(p => p.id !== id));
      }
      toast({ type: 'success', title: 'Deleted', message: 'Patient removed successfully' });
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
        <span>Patients</span>
      </div>

      <div className={`rounded-xl border ${cardTheme} p-5`}>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-5">
          <h3 className={`text-base font-semibold ${textColor}`}>Patient Records ({patients.length})</h3>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${mutedText}`} />
              <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search patients..."
                className={`pl-9 pr-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} placeholder:text-gray-400 focus:outline-none focus:border-blue-500/50 w-full sm:w-56`} />
            </div>
            <div className="relative">
              <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
                className={`appearance-none pl-3 pr-8 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`}>
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <ChevronDown className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 ${mutedText} pointer-events-none`} />
            </div>
            <button onClick={openAdd} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b ${borderColor}`}>
                <th className={`text-left py-3 pr-2 font-medium ${mutedText}`}>Patient</th>
                <th className={`text-left py-3 px-2 font-medium ${mutedText}`}>Age</th>
                <th className={`text-left py-3 px-2 font-medium ${mutedText} hidden md:table-cell`}>Treatment</th>
                <th className={`text-left py-3 px-2 font-medium ${mutedText} hidden lg:table-cell`}>Last Visit</th>
                <th className={`text-left py-3 px-2 font-medium ${mutedText}`}>Status</th>
                <th className={`text-right py-3 pl-2 font-medium ${mutedText}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length > 0 ? paginated.map((p, i) => p ? (
                <tr key={p.id} className={`border-b ${borderColor} ${hoverBg} transition-colors`}>
                  <td className="py-3 pr-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ background: colors[i % colors.length] }}>
                        {getInitials(patientName(p))}
                      </div>
                      <div>
                        <p className={`font-medium ${textColor}`}>{patientName(p)}</p>
                        <p className={`text-xs ${mutedText}`}>{patientEmail(p)}</p>
                      </div>
                    </div>
                  </td>
                  <td className={`py-3 px-2 ${mutedText}`}>{p.age ?? '-'}</td>
                  <td className={`py-3 px-2 ${mutedText} hidden md:table-cell`}>{p.treatment || '-'}</td>
                  <td className={`py-3 px-2 ${mutedText} hidden lg:table-cell`}>{p.lastVisit || p.last_visit || '-'}</td>
                  <td className="py-3 px-2"><StatusBadge status={p.status} /></td>
                  <td className="py-3 pl-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className={`p-1.5 rounded-lg ${hoverBg} ${mutedText} hover:text-blue-400`}><Eye className="w-4 h-4" /></button>
                      <button onClick={() => openEdit(p)} className={`p-1.5 rounded-lg ${hoverBg} ${mutedText} hover:text-blue-400`}><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteTarget(p)} className={`p-1.5 rounded-lg ${hoverBg} ${mutedText} hover:text-red-400`}><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ) : null) : (
                <tr><td colSpan={6} className={`py-8 text-center ${mutedText}`}>No patients found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
            <p className={`text-xs ${mutedText}`}>Showing {(page - 1) * perPage + 1}-{Math.min(page * perPage, filtered.length)} of {filtered.length}</p>
            <div className="flex items-center gap-1">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                className={`p-1.5 rounded-lg ${page === 1 ? 'opacity-30 cursor-not-allowed' : `${hoverBg} ${mutedText} hover:text-blue-400`}`}>
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={`w-7 h-7 rounded-lg text-xs font-medium ${page === i + 1 ? 'bg-blue-600 text-white' : `${mutedText} ${hoverBg}`}`}>
                  {i + 1}
                </button>
              ))}
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
                className={`p-1.5 rounded-lg ${page === totalPages ? 'opacity-30 cursor-not-allowed' : `${hoverBg} ${mutedText} hover:text-blue-400`}`}>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Patient' : 'Add Patient'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Full Name *</label>
              <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Email *</label>
              <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Age *</label>
              <input type="number" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Gender</label>
              <select value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`}>
                <option>Female</option>
                <option>Male</option>
              </select>
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Phone</label>
              <input type="text" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>City</label>
              <input type="text" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Treatment</label>
              <input type="text" value={formData.treatment} onChange={e => setFormData({ ...formData, treatment: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Status</label>
              <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${mutedText} ${hoverBg} transition-colors`}>Cancel</button>
            <button type="submit" disabled={submitting}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50 flex items-center gap-2">
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
            className={`px-4 py-2 text-sm font-medium rounded-lg ${mutedText} ${hoverBg} transition-colors`}>Cancel</button>
          <button onClick={() => handleDelete(deleteTarget.id)}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors">Delete</button>
        </div>
      </Modal>
    </div>
  );
}
