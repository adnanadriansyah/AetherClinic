import { motion } from 'framer-motion';
import { Calendar, Clock, Users, FileText, Activity, Star, ChevronRight, MessageSquare, Pill, Video } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatCard from '../components/ui/StatCard';
import GlassCard from '../components/ui/GlassCard';
import { appointments } from '../data/mockData';

export default function DoctorDashboard() {
  const todayAppointments = appointments.filter(a => a.date === '2026-05-28');

  return (
    <DashboardLayout title="Doctor Dashboard" role="doctor">
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
          <span className="text-primary">Doctor</span>
          <ChevronRight className="w-3 h-3" />
          <span>Dashboard</span>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-bold text-lg">SM</div>
          <div>
            <h2 className="text-xl font-bold text-white">Dr. Sarah Mitchell</h2>
            <p className="text-sm text-text-secondary">Medical Director, Cosmetic Dermatology</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Calendar} label="Today's Appointments" value="4" color="primary" />
          <StatCard icon={Clock} label="Pending Reviews" value="3" color="warning" />
          <StatCard icon={Users} label="Total Patients" value={1247} color="success" />
          <StatCard icon={Star} label="Rating" value="4.9" color="accent" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Today's Schedule</h3>
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-3">
              {todayAppointments.map((apt) => (
                <div key={apt.id} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{apt.patient}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      apt.status === 'confirmed' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                    }`}>{apt.status}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-text-secondary">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{apt.time}</span>
                    <span>{apt.treatment}</span>
                    <span className={`flex items-center gap-1 ${apt.type === 'Virtual' ? 'text-accent' : 'text-info'}`}>
                      {apt.type === 'Virtual' ? <Video className="w-3 h-3" /> : null}
                      {apt.type}
                    </span>
                  </div>
                </div>
              ))}
              <button className="w-full text-center text-sm text-primary hover:text-primary-light transition-colors py-2">View Full Schedule</button>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Recent Patients</h3>
              <Users className="w-5 h-5 text-accent" />
            </div>
            <div className="space-y-3">
              {[
                { name: 'Amanda Foster', lastVisit: '2 days ago', treatment: 'Botox & Fillers' },
                { name: 'Robert Chen', lastVisit: 'Today', treatment: 'Laser Resurfacing' },
                { name: 'Sophia Lin', lastVisit: '1 week ago', treatment: 'Microneedling' },
                { name: 'James Wilson', lastVisit: '3 days ago', treatment: 'Chemical Peel' },
              ].map((patient, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{patient.name}</p>
                      <p className="text-xs text-text-secondary">{patient.treatment}</p>
                    </div>
                  </div>
                  <span className="text-xs text-text-secondary">{patient.lastVisit}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Pending Tasks</h3>
              <Activity className="w-5 h-5 text-warning" />
            </div>
            <div className="space-y-2">
              {[
                { task: 'Review lab results', priority: 'High' },
                { task: 'Complete treatment notes', priority: 'Medium' },
                { task: 'Prescription renewals', priority: 'Medium' },
                { task: 'Follow-up calls', priority: 'Low' },
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <span className="text-sm text-white">{task.task}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    task.priority === 'High' ? 'bg-danger/20 text-danger' :
                    task.priority === 'Medium' ? 'bg-warning/20 text-warning' :
                    'bg-success/20 text-success'
                  }`}>{task.priority}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Recent Consultations</h3>
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-3">
              {[
                { patient: 'Priya Sharma', type: 'Video Call', time: '1 hour ago' },
                { patient: 'Carlos Garcia', type: 'Follow-up', time: '3 hours ago' },
                { patient: 'Mei Lin', type: 'Virtual', time: 'Yesterday' },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <MessageSquare className="w-4 h-4 text-primary shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-white">{c.patient}</p>
                    <p className="text-xs text-text-secondary">{c.type} &middot; {c.time}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-secondary" />
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Prescriptions</h3>
              <Pill className="w-5 h-5 text-success" />
            </div>
            <div className="space-y-3">
              {[
                { drug: 'Tretinoin 0.05%', patient: 'Amanda F.', status: 'Active' },
                { drug: 'Vitamin D3 5000', patient: 'Robert C.', status: 'Active' },
                { drug: 'Hydroquinone 4%', patient: 'Sophia L.', status: 'Expired' },
              ].map((rx, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <div>
                    <p className="text-sm text-white">{rx.drug}</p>
                    <p className="text-xs text-text-secondary">{rx.patient}</p>
                  </div>
                  <span className={`text-xs ${rx.status === 'Active' ? 'text-success' : 'text-danger'}`}>{rx.status}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
