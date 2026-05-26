import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#2563EB', '#06B6D4', '#8B5CF6', '#10B981', '#F59E0B'];

export default function PieChartWidget({ data, title }) {
  return (
    <div className="glass-card p-6">
      {title && <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#F8FAFC',
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', color: '#94A3B8' }}
              formatter={(value) => <span style={{ color: '#94A3B8' }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
