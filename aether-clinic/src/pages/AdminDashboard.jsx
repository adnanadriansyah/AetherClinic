import { motion } from 'framer-motion';
import { Users, UserPlus, CalendarCheck, DollarSign, TrendingUp, Activity, Star, Bell, ChevronRight, Settings, Shield } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatCard from '../components/ui/StatCard';
import GlassCard from '../components/ui/GlassCard';
import AreaChartWidget from '../components/charts/AreaChartWidget';
import PieChartWidget from '../components/charts/PieChartWidget';
import BarChartWidget from '../components/charts/BarChartWidget';
import { adminStats, revenueData, treatmentCategoryData, appointments } from '../data/mockData';

export default function AdminDashboard() {
  return (
    <DashboardLayout title="Admin Dashboard" role="admin">
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
          <span className="text-primary">Admin</span>
          <ChevronRight className="w-3 h-3" />
          <span>Overview</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users} label="Total Patients" value={adminStats.totalPatients.toLocaleString()} color="primary" change={adminStats.patientGrowth} />
          <StatCard icon={UserPlus} label="Active Doctors" value={adminStats.totalDoctors} color="accent" />
          <StatCard icon={CalendarCheck} label="Appointments" value={adminStats.totalAppointments} color="success" />
          <StatCard icon={DollarSign} label="Revenue (MTD)" value={`$${adminStats.revenueThisMonth.toLocaleString()}`} color="warning" change={adminStats.revenueGrowth} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AreaChartWidget data={revenueData} title="Revenue Overview" dataKey="revenue" color="#2563EB" />
          </div>
          <PieChartWidget data={treatmentCategoryData} title="Treatment Distribution" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <BarChartWidget data={revenueData} title="Monthly Consultations" dataKey="consultations" color="#8B5CF6" />

          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Today's Appointments</h3>
              <CalendarCheck className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-3">
              {appointments.slice(0, 5).map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{apt.patient}</p>
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <span>{apt.treatment}</span>
                      <span>&middot;</span>
                      <span>{apt.time}</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                    apt.status === 'confirmed' ? 'bg-success/20 text-success' :
                    apt.status === 'pending' ? 'bg-warning/20 text-warning' :
                    apt.status === 'completed' ? 'bg-info/20 text-info' :
                    'bg-danger/20 text-danger'
                  }`}>{apt.status}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="grid lg:grid-cols-4 gap-4">
          {[
            { label: 'Satisfaction Rate', value: `${adminStats.satisfaction}%`, icon: Star, color: 'success' },
            { label: 'Monthly Growth', value: `${adminStats.patientGrowth}%`, icon: TrendingUp, color: 'primary' },
            { label: 'Avg Treatment Score', value: '4.8/5', icon: Activity, color: 'accent' },
            { label: 'Staff Members', value: '48', icon: Users, color: 'warning' },
          ].map((item, i) => (
            <GlassCard key={i} className="p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-${item.color}/20 to-${item.color}/10 flex items-center justify-center`}>
                <item.icon className={`w-5 h-5 text-${item.color}`} />
              </div>
              <div>
                <p className="text-sm text-text-secondary">{item.label}</p>
                <p className="text-lg font-bold text-white">{item.value}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
            <Settings className="w-5 h-5 text-text-secondary" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Add Patient', icon: Users },
              { label: 'Schedule', icon: CalendarCheck },
              { label: 'Generate Report', icon: Activity },
              { label: 'Manage Staff', icon: Shield },
            ].map((action, i) => (
              <button key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left">
                <action.icon className="w-5 h-5 text-primary" />
                <span className="text-sm text-white font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}
