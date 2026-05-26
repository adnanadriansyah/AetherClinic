import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useSupabase } from '../../context/SupabaseContext';
import Modal from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { ChevronRight, Sparkles, Zap, Heart, Droplets, Activity, Plus, Edit2, Trash2, Loader2, ArrowUp, ArrowDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { treatmentCategories as mockCategories, treatmentsByMonth, treatmentDetails as mockDetails } from '../../data/adminMockData';

const iconMap = { Sparkles, Zap, Heart, Droplets, Activity };
const barColors = { Aesthetic: '#3b82f6', Laser: '#06b6d4', Wellness: '#8b5cf6', Skin: '#10b981', Body: '#f59e0b' };

const emptyForm = {
  name: '', category: 'Aesthetic', duration: '', price: '', sessions: '', revenue: '',
};

export default function Treatments() {
  const supabaseCtx = useSupabase();
  const { isDark } = useTheme();
  const [treatments, setTreatments] = useState([]);
  const [categories, setCategories] = useState(mockCategories);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchData = useCallback(async () => {
    if (supabaseCtx?.connected && supabaseCtx?.getTreatments) {
      try {
        const result = await supabaseCtx.getTreatments();
        if (result) { setTreatments(result); return; }
      } catch {}
    }
    setTreatments(mockDetails);
  }, [supabaseCtx]);

  useEffect(() => { fetchData(); }, [fetchData]);

  function openAdd() {
    setEditing(null);
    setFormData(emptyForm);
    setShowModal(true);
  }

  function openEdit(t) {
    if (!t) return;
    setEditing(t);
    setFormData({
      name: t.name || '',
      category: t.category || 'Aesthetic',
      duration: t.duration || '',
      price: String(t.price || ''),
      sessions: String(t.sessions || ''),
      revenue: String(t.revenue || ''),
    });
    setShowModal(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast({ type: 'error', title: 'Validation Error', message: 'Treatment name is required' });
      return;
    }
    setSubmitting(true);
    try {
      if (editing) {
        if (supabaseCtx?.connected) {
          const { error: updErr } = await supabaseCtx.supabase.from('treatments').update({
            name: formData.name.trim(),
            category: formData.category,
            duration: formData.duration.trim(),
            price: Number(formData.price) || 0,
            sessions: Number(formData.sessions) || 0,
            revenue: Number(formData.revenue) || 0,
          }).eq('id', editing.id);
          if (updErr) throw updErr;
          await fetchData();
        } else {
          setTreatments(prev => prev.map(t => t.id === editing.id ? {
            ...t,
            name: formData.name.trim(),
            category: formData.category,
            duration: formData.duration.trim(),
            price: Number(formData.price) || 0,
            sessions: Number(formData.sessions) || 0,
            revenue: Number(formData.revenue) || 0,
          } : t));
        }
        toast({ type: 'success', title: 'Updated', message: `${formData.name} updated` });
      } else {
        if (supabaseCtx?.connected) {
          const { error: insErr } = await supabaseCtx.supabase.from('treatments').insert([{
            name: formData.name.trim(),
            category: formData.category,
            duration: formData.duration.trim(),
            price: Number(formData.price) || 0,
            sessions: Number(formData.sessions) || 0,
            revenue: Number(formData.revenue) || 0,
          }]);
          if (insErr) throw insErr;
          await fetchData();
        } else {
          const newId = Math.max(...treatments.map(t => t.id), 0) + 1;
          setTreatments(prev => [...prev, {
            id: newId,
            name: formData.name.trim(),
            category: formData.category,
            duration: formData.duration.trim(),
            price: Number(formData.price) || 0,
            sessions: Number(formData.sessions) || 0,
            revenue: Number(formData.revenue) || 0,
          }]);
        }
        toast({ type: 'success', title: 'Added', message: `${formData.name} added` });
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
        const { error } = await supabaseCtx.supabase.from('treatments').delete().eq('id', id);
        if (error) throw error;
        await fetchData();
      } else {
        setTreatments(prev => prev.filter(t => t.id !== id));
      }
      toast({ type: 'success', title: 'Deleted', message: 'Treatment removed' });
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

  const tooltipStyle = {
    contentStyle: {
      background: isDark ? '#151e30' : '#ffffff',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e5e7eb'}`,
      borderRadius: '8px',
      color: isDark ? '#F8FAFC' : '#1e293b',
      fontSize: '12px',
    }
  };

  return (
    <div className="space-y-6">
      <div className={`flex items-center gap-2 text-sm ${mutedText}`}>
        <span className="text-blue-400">Admin</span>
        <ChevronRight className="w-3 h-3" />
        <span>Treatments</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {categories.map((cat, i) => {
          const Icon = iconMap[cat.icon];
          const colorMap = { blue: 'bg-blue-500/15 text-blue-400', cyan: 'bg-cyan-500/15 text-cyan-400', purple: 'bg-purple-500/15 text-purple-400', green: 'bg-green-500/15 text-green-400', amber: 'bg-amber-500/15 text-amber-400' };
          const isUp = cat.trend.startsWith('+');
          return (
            <div key={i} className={`rounded-xl border p-4 ${cardTheme}`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${colorMap[cat.color]}`}>
                  {Icon && <Icon className="w-5 h-5" />}
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-medium ${isUp ? 'text-green-400' : 'text-red-400'}`}>
                  {isUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}{cat.trend}
                </span>
              </div>
              <h3 className={`font-semibold ${textColor}`}>{cat.name}</h3>
              <div className="flex items-center justify-between mt-2 text-sm">
                <span className={mutedText}>{cat.count} sessions</span>
                <span className="font-medium text-green-400">${(cat.revenue / 1000).toFixed(0)}k</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`rounded-xl border p-5 ${cardTheme}`}>
        <h3 className={`text-base font-semibold mb-4 ${textColor}`}>Treatments by Month</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={treatmentsByMonth} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.05)' : '#e5e7eb'} />
              <XAxis dataKey="month" stroke={isDark ? '#64748B' : '#9ca3af'} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke={isDark ? '#64748B' : '#9ca3af'} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }} />
              {Object.keys(barColors).map(key => (
                <Bar key={key} dataKey={key} stackId="a" fill={barColors[key]} radius={[2, 2, 0, 0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`rounded-xl border p-5 ${cardTheme}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-base font-semibold ${textColor}`}>Treatment Details ({treatments.length})</h3>
          <button onClick={openAdd} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b ${borderColor}`}>
                <th className={`text-left py-3 pr-2 font-medium ${mutedText}`}>Treatment</th>
                <th className={`text-left py-3 px-2 font-medium ${mutedText}`}>Category</th>
                <th className={`text-left py-3 px-2 font-medium ${mutedText} hidden md:table-cell`}>Duration</th>
                <th className={`text-right py-3 px-2 font-medium ${mutedText}`}>Price</th>
                <th className={`text-right py-3 px-2 font-medium ${mutedText}`}>Sessions</th>
                <th className={`text-right py-3 px-2 font-medium ${mutedText}`}>Revenue</th>
                <th className={`text-right py-3 pl-2 font-medium ${mutedText}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {treatments.length > 0 ? treatments.map((t) => t ? (
                <tr key={t.id} className={`border-b ${borderColor} ${hoverBg} transition-colors`}>
                  <td className={`py-3 pr-2 font-medium ${textColor}`}>{t.name || '-'}</td>
                  <td className={`py-3 px-2`}>
                    <span className={`text-xs px-2 py-0.5 rounded-full`}
                      style={{ background: (barColors[t.category] || '#6b7280') + '20', color: barColors[t.category] || '#6b7280' }}>
                      {t.category || '-'}
                    </span>
                  </td>
                  <td className={`py-3 px-2 ${mutedText} hidden md:table-cell`}>{t.duration || '-'}</td>
                  <td className={`py-3 px-2 text-right font-medium ${textColor}`}>${t.price ?? '0'}</td>
                  <td className={`py-3 px-2 text-right ${mutedText}`}>{t.sessions ?? '0'}</td>
                  <td className={`py-3 px-2 text-right font-medium text-green-400`}>${(t.revenue || 0).toLocaleString()}</td>
                  <td className="py-3 pl-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(t)} className={`p-1.5 rounded-lg ${hoverBg} ${mutedText} hover:text-blue-400`}><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteTarget(t)} className={`p-1.5 rounded-lg ${hoverBg} ${mutedText} hover:text-red-400`}><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ) : null) : (
                <tr><td colSpan={7} className={`py-8 text-center ${mutedText}`}>No treatments found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Treatment' : 'Add Treatment'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Treatment Name *</label>
              <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Category</label>
              <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`}>
                <option>Aesthetic</option>
                <option>Laser</option>
                <option>Wellness</option>
                <option>Skin</option>
                <option>Body</option>
              </select>
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Duration</label>
              <input type="text" value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g. 30-60m"
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Price ($)</label>
              <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Sessions</label>
              <input type="number" value={formData.sessions} onChange={e => setFormData({ ...formData, sessions: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${mutedText}`}>Revenue ($)</label>
              <input type="number" value={formData.revenue} onChange={e => setFormData({ ...formData, revenue: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${mutedText} ${hoverBg} transition-colors`}>Cancel</button>
            <button type="submit" disabled={submitting}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50 flex items-center gap-2">
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {editing ? 'Update' : 'Add'} Treatment
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
