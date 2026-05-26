import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Search, Plus, ChevronRight, Filter, ChevronLeft, ChevronDown, Eye, Edit2 } from 'lucide-react';
import { patientsList, adminOverviewStats } from '../../data/adminMockData';

function StatusBadge({ status }) {
  const styles = {
    Active: 'bg-green-500/15 text-green-400',
    Inactive: 'bg-red-500/15 text-red-400',
  };
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[status] || ''}`}>{status}</span>;
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('');
}

const colors = ['#3b82f6', '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6'];

export default function Patients() {
  const { isDark } = useTheme();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const perPage = 5;

  const cardTheme = isDark ? 'bg-[#151e30] border-white/5' : 'bg-white border-gray-200';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const mutedText = isDark ? 'text-[#94A3B8]' : 'text-gray-500';
  const borderColor = isDark ? 'border-white/5' : 'border-gray-200';
  const inputBg = isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200';
  const hoverBg = isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50';

  const filtered = patientsList.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-6">
      <div className={`flex items-center gap-2 text-sm ${mutedText}`}>
        <span className="text-blue-400">Admin</span>
        <ChevronRight className="w-3 h-3" />
        <span>Patients</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: adminOverviewStats.totalPatients, color: 'blue' },
          { label: 'Active', value: adminOverviewStats.activePatients, color: 'green' },
          { label: 'New This Month', value: adminOverviewStats.newThisMonth, color: 'cyan' },
          { label: 'Inactive', value: adminOverviewStats.inactivePatients, color: 'red' },
        ].map((s, i) => (
          <div key={i} className={`rounded-xl p-4 border ${cardTheme}`}>
            <p className={`text-sm ${mutedText}`}>{s.label}</p>
            <p className={`text-xl font-bold mt-1 ${textColor}`}>{s.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className={`rounded-xl border ${cardTheme} p-5`}>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-5">
          <h3 className={`text-base font-semibold ${textColor}`}>Patient Records</h3>
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
            <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
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
              {paginated.map((p, i) => (
                <tr key={p.id} className={`border-b ${borderColor} ${hoverBg} transition-colors`}>
                  <td className="py-3 pr-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ background: colors[i % colors.length] }}>
                        {getInitials(p.name)}
                      </div>
                      <div>
                        <p className={`font-medium ${textColor}`}>{p.name}</p>
                        <p className={`text-xs ${mutedText}`}>{p.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className={`py-3 px-2 ${mutedText}`}>{p.age}</td>
                  <td className={`py-3 px-2 ${mutedText} hidden md:table-cell`}>{p.treatment}</td>
                  <td className={`py-3 px-2 ${mutedText} hidden lg:table-cell`}>{p.lastVisit}</td>
                  <td className="py-3 px-2"><StatusBadge status={p.status} /></td>
                  <td className="py-3 pl-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className={`p-1.5 rounded-lg ${hoverBg} ${mutedText} hover:text-blue-400`}><Eye className="w-4 h-4" /></button>
                      <button className={`p-1.5 rounded-lg ${hoverBg} ${mutedText} hover:text-blue-400`}><Edit2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
            <p className={`text-xs ${mutedText}`}>Showing {(page - 1) * perPage + 1}&ndash;{Math.min(page * perPage, filtered.length)} of {filtered.length}</p>
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
    </div>
  );
}
