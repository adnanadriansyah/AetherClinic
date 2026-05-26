import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Plus, ChevronRight, Star, Users, CalendarCheck } from 'lucide-react';
import { adminDoctors, adminOverviewStats } from '../../data/adminMockData';

function getInitials(name) {
  return name.replace('Dr. ', '').split(' ').map(n => n[0]).join('');
}

const avatarColors = ['#3b82f6', '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];

export default function Doctors() {
  const { isDark } = useTheme();
  const [filter, setFilter] = useState('All');

  const cardTheme = isDark ? 'bg-[#151e30] border-white/5' : 'bg-white border-gray-200';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const mutedText = isDark ? 'text-[#94A3B8]' : 'text-gray-500';
  const borderColor = isDark ? 'border-white/5' : 'border-gray-200';

  const filtered = filter === 'All' ? adminDoctors : adminDoctors.filter(d => d.status === filter);

  const statusCounts = {
    All: adminDoctors.length,
    'On Duty': adminDoctors.filter(d => d.status === 'On Duty').length,
    'On Leave': adminDoctors.filter(d => d.status === 'On Leave').length,
  };

  return (
    <div className="space-y-6">
      <div className={`flex items-center gap-2 text-sm ${mutedText}`}>
        <span className="text-blue-400">Admin</span>
        <ChevronRight className="w-3 h-3" />
        <span>Doctors</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Doctors', value: adminOverviewStats.activeDoctors, color: 'blue' },
          { label: 'On Duty', value: adminDoctors.filter(d => d.status === 'On Duty').length, color: 'green' },
          { label: 'On Leave', value: adminDoctors.filter(d => d.status === 'On Leave').length, color: 'amber' },
          { label: 'New This Month', value: adminOverviewStats.newDoctors, color: 'cyan' },
        ].map((s, i) => (
          <div key={i} className={`rounded-xl p-4 border ${cardTheme}`}>
            <p className={`text-sm ${mutedText}`}>{s.label}</p>
            <p className={`text-xl font-bold mt-1 ${textColor}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className={`flex gap-1 rounded-lg p-1 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
          {Object.entries(statusCounts).map(([key, count]) => (
            <button key={key} onClick={() => setFilter(key)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                filter === key
                  ? 'bg-blue-600 text-white'
                  : `${mutedText} hover:${isDark ? 'text-white' : 'text-gray-700'}`
              }`}>
              {key} ({count})
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" /> Add Doctor
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((doc, i) => (
          <div key={doc.id} className={`rounded-xl border p-5 ${cardTheme}`}>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold shrink-0"
                style={{ background: avatarColors[i % avatarColors.length] }}>
                {getInitials(doc.name)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold ${textColor}`}>{doc.name}</h3>
                <p className={`text-sm ${mutedText}`}>{doc.specialty}</p>
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <span className={`flex items-center gap-1 ${mutedText}`}>
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {doc.rating}
                  </span>
                  <span className={`flex items-center gap-1 ${mutedText}`}>
                    <Users className="w-3.5 h-3.5" /> {doc.patients.toLocaleString()}
                  </span>
                </div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                doc.status === 'On Duty' ? 'bg-green-500/15 text-green-400' : 'bg-amber-500/15 text-amber-400'
              }`}>{doc.status}</span>
            </div>
            <div className={`mt-4 pt-4 border-t ${borderColor} flex items-center justify-between`}>
              <span className={`text-sm ${mutedText}`}>
                Exp: <span className={`font-medium ${textColor}`}>{doc.experience}</span>
              </span>
              <span className={`text-sm ${mutedText}`}>
                Revenue: <span className={`font-medium text-green-400`}>{doc.revenue}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
