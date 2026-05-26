import { useTheme } from '../../context/ThemeContext';
import { Users, Stethoscope, CalendarCheck, DollarSign, ArrowUp, ArrowDown, ChevronRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { adminOverviewStats, revenueMonthly, treatmentDonut, recentAppointments, todaySchedule } from '../../data/adminMockData';

function StatCard({ icon: Icon, label, value, change, changeLabel, color }) {
  const { isDark } = useTheme();
  const positive = change >= 0;
  return (
    <div className={`rounded-xl p-5 border transition-colors ${isDark ? 'bg-[#151e30] border-white/5' : 'bg-white border-gray-200'}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className={`text-sm font-medium ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}>{label}</p>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 text-xs">
              <span className={`flex items-center gap-0.5 font-medium ${positive ? 'text-green-400' : 'text-red-400'}`}>
                {positive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {Math.abs(change)}%
              </span>
              <span className={isDark ? 'text-[#64748B]' : 'text-gray-400'}>{changeLabel || 'vs last month'}</span>
            </div>
          )}
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
          color === 'blue' ? 'bg-blue-500/15 text-blue-400' :
          color === 'cyan' ? 'bg-cyan-500/15 text-cyan-400' :
          color === 'purple' ? 'bg-purple-500/15 text-purple-400' :
          'bg-amber-500/15 text-amber-400'
        }`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Completed: 'bg-green-500/15 text-green-400',
    Scheduled: 'bg-blue-500/15 text-blue-400',
    Cancelled: 'bg-red-500/15 text-red-400',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[status] || styles.Scheduled}`}>
      {status}
    </span>
  );
}

export default function Overview() {
  const { isDark } = useTheme();

  const cardTheme = isDark ? 'bg-[#151e30] border-white/5' : 'bg-white border-gray-200';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const mutedText = isDark ? 'text-[#94A3B8]' : 'text-gray-500';
  const borderColor = isDark ? 'border-white/5' : 'border-gray-200';

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
        <span>Overview</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Patients" value={adminOverviewStats.totalPatients.toLocaleString()} change={adminOverviewStats.patientGrowth} color="blue" />
        <StatCard icon={Stethoscope} label="Active Doctors" value={adminOverviewStats.activeDoctors} color="cyan" />
        <StatCard icon={CalendarCheck} label="Appointments" value={adminOverviewStats.appointments} color="purple" />
        <StatCard icon={DollarSign} label="Revenue (MTD)" value={`$${adminOverviewStats.revenueMTD.toLocaleString()}`} change={adminOverviewStats.revenueGrowth} color="amber" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className={`rounded-xl p-5 border ${cardTheme}`}>
          <h3 className={`text-base font-semibold mb-4 ${textColor}`}>Revenue Overview</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueMonthly} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.05)' : '#e5e7eb'} />
                <XAxis dataKey="month" stroke={isDark ? '#64748B' : '#9ca3af'} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke={isDark ? '#64748B' : '#9ca3af'} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip {...tooltipStyle} formatter={(v) => [`$${v.toLocaleString()}`, 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`rounded-xl p-5 border ${cardTheme}`}>
          <h3 className={`text-base font-semibold mb-4 ${textColor}`}>Treatment Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={treatmentDonut} cx="50%" cy="50%" innerRadius={65} outerRadius={100} paddingAngle={4} dataKey="value">
                  {treatmentDonut.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {treatmentDonut.map((t, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.color }} />
                  <span className={mutedText}>{t.name} {t.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className={`rounded-xl p-5 border ${cardTheme}`}>
          <h3 className={`text-base font-semibold mb-4 ${textColor}`}>Recent Appointments</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={`border-b ${borderColor}`}>
                  <th className={`text-left py-2.5 pr-2 font-medium ${mutedText}`}>Patient</th>
                  <th className={`text-left py-2.5 px-2 font-medium ${mutedText}`}>Doctor</th>
                  <th className={`text-left py-2.5 px-2 font-medium ${mutedText} hidden md:table-cell`}>Treatment</th>
                  <th className={`text-left py-2.5 px-2 font-medium ${mutedText}`}>Date</th>
                  <th className={`text-right py-2.5 pl-2 font-medium ${mutedText}`}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((apt) => (
                  <tr key={apt.id} className={`border-b ${borderColor} hover:bg-white/5 transition-colors`}>
                    <td className={`py-3 pr-2 font-medium ${textColor}`}>{apt.patient}</td>
                    <td className={`py-3 px-2 ${mutedText}`}>{apt.doctor}</td>
                    <td className={`py-3 px-2 ${mutedText} hidden md:table-cell`}>{apt.treatment}</td>
                    <td className={`py-3 px-2 ${mutedText}`}>{apt.date}</td>
                    <td className="py-3 pl-2 text-right"><StatusBadge status={apt.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={`rounded-xl p-5 border ${cardTheme}`}>
          <h3 className={`text-base font-semibold mb-4 ${textColor}`}>Today's Schedule</h3>
          <div className="space-y-3">
            {todaySchedule.map((item, i) => (
              <div key={i} className={`flex items-center gap-4 p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div className={`text-sm font-semibold w-14 ${textColor}`}>{item.time}</div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${textColor}`}>{item.patient}</p>
                  <p className={`text-xs ${mutedText}`}>{item.type} &middot; Room {item.room}</p>
                </div>
                <span className={`text-xs ${mutedText}`}>{item.doctor}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
