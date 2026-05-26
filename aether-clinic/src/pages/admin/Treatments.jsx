import { useTheme } from '../../context/ThemeContext';
import { ChevronRight, Sparkles, Zap, Heart, Droplets, Activity, ArrowUp, ArrowDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { treatmentCategories, treatmentsByMonth, treatmentDetails } from '../../data/adminMockData';

const iconMap = { Sparkles, Zap, Heart, Droplets, Activity };

const barColors = { Aesthetic: '#3b82f6', Laser: '#06b6d4', Wellness: '#8b5cf6', Skin: '#10b981', Body: '#f59e0b' };

export default function Treatments() {
  const { isDark } = useTheme();

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

  return (
    <div className="space-y-6">
      <div className={`flex items-center gap-2 text-sm ${mutedText}`}>
        <span className="text-blue-400">Admin</span>
        <ChevronRight className="w-3 h-3" />
        <span>Treatments</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {treatmentCategories.map((cat, i) => {
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
        <h3 className={`text-base font-semibold mb-4 ${textColor}`}>Treatment Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b ${borderColor}`}>
                <th className={`text-left py-3 pr-2 font-medium ${mutedText}`}>Treatment</th>
                <th className={`text-left py-3 px-2 font-medium ${mutedText}`}>Category</th>
                <th className={`text-left py-3 px-2 font-medium ${mutedText} hidden md:table-cell`}>Duration</th>
                <th className={`text-right py-3 px-2 font-medium ${mutedText}`}>Price</th>
                <th className={`text-right py-3 px-2 font-medium ${mutedText}`}>Sessions</th>
                <th className={`text-right py-3 pl-2 font-medium ${mutedText}`}>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {treatmentDetails.map((t) => (
                <tr key={t.id} className={`border-b ${borderColor} ${hoverBg} transition-colors`}>
                  <td className={`py-3 pr-2 font-medium ${textColor}`}>{t.name}</td>
                  <td className={`py-3 px-2`}>
                    <span className={`text-xs px-2 py-0.5 rounded-full`}
                      style={{ background: barColors[t.category] + '20', color: barColors[t.category] }}>
                      {t.category}
                    </span>
                  </td>
                  <td className={`py-3 px-2 ${mutedText} hidden md:table-cell`}>{t.duration}</td>
                  <td className={`py-3 px-2 text-right font-medium ${textColor}`}>${t.price}</td>
                  <td className={`py-3 px-2 text-right ${mutedText}`}>{t.sessions}</td>
                  <td className={`py-3 pl-2 text-right font-medium text-green-400`}>${t.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
