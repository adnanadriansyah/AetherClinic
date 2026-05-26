import { motion } from 'framer-motion';
import { Calendar, Clock, FileText, DollarSign, Activity, TrendingUp, Bell, Pill, ChevronRight, Video, User, Star, MessageSquare } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import GlassCard from '../components/ui/GlassCard';
import StatCard from '../components/ui/StatCard';
import ProgressChart from '../components/charts/ProgressChart';
import { patientStats, appointments, patientHealthData, prescriptions, notifications, invoices, medicalRecords } from '../data/mockData';
import { useState } from 'react';

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <DashboardLayout title="Patient Dashboard" role="patient">
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
          <span className="text-primary">Dashboard</span>
          <ChevronRight className="w-3 h-3" />
          <span>Overview</span>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">JD</div>
          <div>
            <h2 className="text-xl font-bold text-white">Welcome back, John!</h2>
            <p className="text-sm text-text-secondary">Your next appointment is tomorrow at 9:00 AM</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Calendar} label="Total Visits" value={patientStats.totalVisits} color="primary" />
          <StatCard icon={Clock} label="Upcoming" value={patientStats.upcomingAppointments} color="warning" />
          <StatCard icon={Activity} label="Treatments" value={patientStats.completedTreatments} color="success" />
          <StatCard icon={DollarSign} label="Total Spent" value={`$${patientStats.totalSpent.toLocaleString()}`} color="accent" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProgressChart data={patientHealthData} title="Treatment Progress" />
          </div>
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Upcoming Appointments</h3>
            <div className="space-y-3">
              {appointments.filter(a => a.status === 'confirmed').slice(0, 3).map((apt) => (
                <div key={apt.id} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{apt.treatment}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      apt.status === 'confirmed' ? 'bg-success/20 text-success' :
                      apt.status === 'pending' ? 'bg-warning/20 text-warning' :
                      'bg-danger/20 text-danger'
                    }`}>{apt.status}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-secondary">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{apt.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{apt.time}</span>
                  </div>
                  <p className="text-xs text-text-secondary mt-1">{apt.doctor} &middot; {apt.type}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Active Prescriptions</h3>
              <Pill className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-3">
              {prescriptions.filter(p => p.status === 'active').map((rx) => (
                <div key={rx.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <div>
                    <p className="text-sm font-medium text-white">{rx.name}</p>
                    <p className="text-xs text-text-secondary">{rx.dosage}</p>
                  </div>
                  <span className="text-xs text-primary">{rx.refills} refills</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Recent Invoices</h3>
              <DollarSign className="w-5 h-5 text-success" />
            </div>
            <div className="space-y-3">
              {invoices.slice(0, 3).map((inv) => (
                <div key={inv.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <div>
                    <p className="text-sm text-white">{inv.description}</p>
                    <p className="text-xs text-text-secondary">{inv.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">${inv.amount}</p>
                    <span className={`text-xs ${inv.status === 'paid' ? 'text-success' : 'text-warning'}`}>{inv.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Recent Medical Records</h3>
            <FileText className="w-5 h-5 text-accent" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-text-secondary border-b border-white/5">
                  <th className="text-left py-3 px-2 font-medium">Date</th>
                  <th className="text-left py-3 px-2 font-medium">Type</th>
                  <th className="text-left py-3 px-2 font-medium">Description</th>
                  <th className="text-left py-3 px-2 font-medium">Doctor</th>
                </tr>
              </thead>
              <tbody>
                {medicalRecords.map((rec) => (
                  <tr key={rec.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-2 text-white">{rec.date}</td>
                    <td className="py-3 px-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        rec.type === 'Treatment' ? 'bg-primary/20 text-primary' :
                        rec.type === 'Procedure' ? 'bg-accent/20 text-accent' :
                        rec.type === 'Lab Results' ? 'bg-success/20 text-success' :
                        'bg-info/20 text-info'
                      }`}>{rec.type}</span>
                    </td>
                    <td className="py-3 px-2 text-text-secondary">{rec.description}</td>
                    <td className="py-3 px-2 text-text-secondary">{rec.doctor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <div className="grid lg:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
              <Bell className="w-5 h-5 text-warning" />
            </div>
            <div className="space-y-2">
              {notifications.slice(0, 3).map((n) => (
                <div key={n.id} className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${!n.read ? 'bg-primary/5' : 'hover:bg-white/5'}`}>
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${!n.read ? 'bg-primary' : 'bg-transparent'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium">{n.title}</p>
                    <p className="text-xs text-text-secondary truncate">{n.message}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">AI Health Recommendations</h3>
              <Star className="w-5 h-5 text-accent" />
            </div>
            <div className="space-y-3">
              {[
                { title: 'Vitamin D Level Check', desc: 'Based on your last lab results, a follow-up check is recommended.', icon: Activity },
                { title: 'Skin Care Routine', desc: 'Your current tretinoin regimen is showing excellent results. Continue as prescribed.', icon: Star },
                { title: 'Hydration Reminder', desc: 'Increase water intake before your next IV therapy session for optimal results.', icon: MessageSquare },
              ].map((rec, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                  <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                    <rec.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{rec.title}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{rec.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
