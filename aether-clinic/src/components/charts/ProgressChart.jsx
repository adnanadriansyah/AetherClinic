import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function ProgressChart({ data, title }) {
  return (
    <div className="glass-card p-6">
      {title && <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="date" stroke="#94A3B8" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#94A3B8" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#F8FAFC',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', color: '#94A3B8' }} />
            <Line type="monotone" dataKey="progress" stroke="#2563EB" strokeWidth={2} dot={{ fill: '#2563EB' }} />
            <Line type="monotone" dataKey="satisfaction" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
