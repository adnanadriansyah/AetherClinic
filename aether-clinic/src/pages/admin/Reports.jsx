import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ChevronRight, Download, DollarSign, TrendingUp, Users, Award } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { revenueMonthly, monthlyBreakdown, treatmentDonut } from '../../data/adminMockData';

export default function Reports() {
  const { isDark } = useTheme();
  const [range, setRange] = useState('This Month');

  const cardTheme = isDark ? 'bg-[#151e30] border-white/5' : 'bg-white border-gray-200';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const mutedText = isDark ? 'text-[#94A3B8]' : 'text-gray-500';
  const borderColor = isDark ? 'border-white/5' : 'border-gray-200';
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

  const kpis = [
    { icon: DollarSign, label: 'Total Revenue', value: '$384,500', change: '+12.5%', color: 'blue' },
    { icon: TrendingUp, label: 'Growth Rate', value: '+12.5%', change: '+2.3%', color: 'green' },
    { icon: Users, label: 'Avg per Patient', value: '$135', change: '+5.2%', color: 'purple' },
    { icon: Award, label: 'Top Treatment', value: 'Aesthetic', change: '$245k', color: 'amber' },
  ];

  return (
    <div className="space-y-6">
      <div className={`flex items-center gap-2 text-sm ${mutedText}`}>
        <span className="text-blue-400">Admin</span>
        <ChevronRight className="w-3 h-3" />
        <span>Reports</span>
      </div>

      <div className="flex items-center justify-between">
        <div className={`flex gap-1 rounded-lg p-1 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
          {['This Month', 'Last 3 Months', 'This Year'].map(r => (
            <button key={r} onClick={() => setRange(r)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                range === r ? 'bg-blue-600 text-white' : `${mutedText} hover:${isDark ? 'text-white' : 'text-gray-700'}`
              }`}>{r}</button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <div key={i} className={`rounded-xl border p-4 ${cardTheme}`}>
            <div className="flex items-center justify-between mb-2">
              <p className={`text-sm ${mutedText}`}>{k.label}</p>
              <k.icon className="w-4 h-4 text-blue-400" />
            </div>
            <p className={`text-xl font-bold ${textColor}`}>{k.value}</p>
            <p className="text-xs text-green-400 mt-1">{k.change}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className={`rounded-xl border p-5 ${cardTheme}`}>
          <h3 className={`text-base font-semibold mb-4 ${textColor}`}>Revenue vs Target</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueMonthly} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.05)' : '#e5e7eb'} />
                <XAxis dataKey="month" stroke={isDark ? '#64748B' : '#9ca3af'} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke={isDark ? '#64748B' : '#9ca3af'} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip {...tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }} />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
                <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#10b981', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`rounded-xl border p-5 ${cardTheme}`}>
          <h3 className={`text-base font-semibold mb-4 ${textColor}`}>Patients by Treatment</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={treatmentDonut} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.05)' : '#e5e7eb'} vertical={false} />
                <XAxis dataKey="name" stroke={isDark ? '#64748B' : '#9ca3af'} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke={isDark ? '#64748B' : '#9ca3af'} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="value" name="Patients" radius={[6, 6, 0, 0]}>
                  {treatmentDonut.map((entry, i) => (
                    <rect key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className={`rounded-xl border p-5 ${cardTheme}`}>
        <h3 className={`text-base font-semibold mb-4 ${textColor}`}>Monthly Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b ${borderColor}`}>
                <th className={`text-left py-3 pr-2 font-medium ${mutedText}`}>Month</th>
                <th className={`text-right py-3 px-2 font-medium ${mutedText}`}>Revenue</th>
                <th className={`text-right py-3 px-2 font-medium ${mutedText}`}>Patients</th>
                <th className={`text-right py-3 px-2 font-medium ${mutedText} hidden md:table-cell`}>Appointments</th>
                <th className={`text-right py-3 pl-2 font-medium ${mutedText}`}>Growth</th>
              </tr>
            </thead>
            <tbody>
              {monthlyBreakdown.map((m, i) => (
                <tr key={i} className={`border-b ${borderColor} ${hoverBg} transition-colors`}>
                  <td className={`py-3 pr-2 font-medium ${textColor}`}>{m.month}</td>
                  <td className={`py-3 px-2 text-right font-medium ${textColor}`}>${m.revenue.toLocaleString()}</td>
                  <td className={`py-3 px-2 text-right ${mutedText}`}>{m.patients}</td>
                  <td className={`py-3 px-2 text-right ${mutedText} hidden md:table-cell`}>{m.appointments}</td>
                  <td className={`py-3 pl-2 text-right font-medium ${m.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {m.growth > 0 ? '+' : ''}{m.growth}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
