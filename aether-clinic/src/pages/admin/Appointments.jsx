import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Plus, ChevronRight, CalendarDays } from 'lucide-react';
import { appointmentsList, weekDays, weekDates, weekAppointments } from '../../data/adminMockData';

function StatusBadge({ status }) {
  const styles = {
    Scheduled: 'bg-blue-500/15 text-blue-400',
    Completed: 'bg-green-500/15 text-green-400',
    Cancelled: 'bg-red-500/15 text-red-400',
  };
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[status] || ''}`}>{status}</span>;
}

export default function Appointments() {
  const { isDark } = useTheme();
  const [tab, setTab] = useState('Today');

  const cardTheme = isDark ? 'bg-[#151e30] border-white/5' : 'bg-white border-gray-200';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const mutedText = isDark ? 'text-[#94A3B8]' : 'text-gray-500';
  const borderColor = isDark ? 'border-white/5' : 'border-gray-200';
  const hoverBg = isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50';

  const filteredList = tab === 'Today'
    ? appointmentsList.filter(a => a.date === '2026-05-28')
    : tab === 'Week'
    ? appointmentsList.filter(a => a.date >= '2026-05-28' && a.date <= '2026-05-31')
    : appointmentsList;

  return (
    <div className="space-y-6">
      <div className={`flex items-center gap-2 text-sm ${mutedText}`}>
        <span className="text-blue-400">Admin</span>
        <ChevronRight className="w-3 h-3" />
        <span>Appointments</span>
      </div>

      <div className="flex items-center justify-between">
        <div className={`flex gap-1 rounded-lg p-1 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
          {['Today', 'Week', 'Month'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                tab === t ? 'bg-blue-600 text-white' : `${mutedText} hover:${isDark ? 'text-white' : 'text-gray-700'}`
              }`}>{t}</button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" /> New Appointment
        </button>
      </div>

      <div className={`rounded-xl border ${cardTheme} p-5`}>
        <h3 className={`text-base font-semibold mb-4 ${textColor}`}>Weekly Calendar</h3>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((d, i) => (
            <div key={i} className="text-center">
              <p className={`text-xs font-medium ${mutedText} mb-1`}>{d}</p>
              <p className={`text-sm font-semibold ${textColor} mb-2`}>{weekDates[i]}</p>
              <div className="space-y-1">
                {weekAppointments.find(wa => wa.day === i)?.slots.map((slot, j) => (
                  <div key={j} className={`text-[10px] p-1 rounded ${isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'} leading-tight truncate`}>
                    {slot.time}<br/>{slot.patient.split(' ')[0]}
                  </div>
                )) || null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`rounded-xl border ${cardTheme} p-5`}>
        <h3 className={`text-base font-semibold mb-4 ${textColor}`}>Appointment List</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b ${borderColor}`}>
                <th className={`text-left py-3 pr-2 font-medium ${mutedText}`}>Patient</th>
                <th className={`text-left py-3 px-2 font-medium ${mutedText}`}>Doctor</th>
                <th className={`text-left py-3 px-2 font-medium ${mutedText} hidden md:table-cell`}>Type</th>
                <th className={`text-left py-3 px-2 font-medium ${mutedText} hidden md:table-cell`}>Time</th>
                <th className={`text-left py-3 px-2 font-medium ${mutedText}`}>Room</th>
                <th className={`text-right py-3 pl-2 font-medium ${mutedText}`}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((apt) => (
                <tr key={apt.id} className={`border-b ${borderColor} ${hoverBg} transition-colors`}>
                  <td className={`py-3 pr-2 font-medium ${textColor}`}>{apt.patient}</td>
                  <td className={`py-3 px-2 ${mutedText}`}>{apt.doctor}</td>
                  <td className={`py-3 px-2 ${mutedText} hidden md:table-cell`}>{apt.type}</td>
                  <td className={`py-3 px-2 ${mutedText} hidden md:table-cell`}>{apt.time}</td>
                  <td className={`py-3 px-2 ${mutedText}`}>Room {apt.room}</td>
                  <td className="py-3 pl-2 text-right"><StatusBadge status={apt.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
