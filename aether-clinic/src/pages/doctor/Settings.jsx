import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Shield, ChevronRight, Eye, EyeOff, Clock } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import GlassCard from '../../components/ui/GlassCard';

export default function DoctorSettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    app: true,
    reminders: true,
  });

  return (
    <DashboardLayout title="Settings" role="doctor">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="text-primary">Doctor</span>
          <ChevronRight className="w-3 h-3" />
          <span>Settings</span>
        </div>

        <h2 className="text-2xl font-bold text-white">Settings</h2>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-white">Profile Information</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">Full Name</label>
              <input type="text" defaultValue="Dr. Sarah Mitchell" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-all" />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">Specialty</label>
              <input type="text" defaultValue="Cosmetic Dermatology" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-all" />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">Email</label>
              <input type="email" defaultValue="sarah.mitchell@aetherclinic.com" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-all" />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">Phone</label>
              <input type="tel" defaultValue="(310) 555-0001" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-all" />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">Save Changes</button>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-warning" />
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
          </div>
          <div className="space-y-4">
            {[
              { key: 'email', label: 'Email Notifications', desc: 'Receive appointment updates via email' },
              { key: 'sms', label: 'SMS Notifications', desc: 'Get text messages for urgent updates' },
              { key: 'app', label: 'In-App Notifications', desc: 'Push notifications within the dashboard' },
              { key: 'reminders', label: 'Appointment Reminders', desc: 'Reminders before scheduled appointments' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-sm text-white font-medium">{item.label}</p>
                  <p className="text-xs text-text-secondary">{item.desc}</p>
                </div>
                <button onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                  className={`w-12 h-6 rounded-full transition-colors relative ${notifications[item.key] ? 'bg-primary' : 'bg-white/10'}`}>
                  <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${notifications[item.key] ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-success" />
            <h3 className="text-lg font-semibold text-white">Security</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">Current Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} placeholder="Enter current password" className="w-full px-4 py-2.5 pr-10 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-all" />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff className="w-4 h-4 text-text-secondary" /> : <Eye className="w-4 h-4 text-text-secondary" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">New Password</label>
              <input type="password" placeholder="Enter new password" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-all" />
            </div>
            <div className="flex justify-end">
              <button className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">Update Password</button>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-white">Availability</h3>
          </div>
          <div className="space-y-3">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
              <div key={day} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-sm text-white">{day}</span>
                <div className="flex items-center gap-3">
                  <select className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50">
                    <option>09:00 AM</option>
                    <option>10:00 AM</option>
                  </select>
                  <span className="text-text-secondary text-xs">to</span>
                  <select className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50">
                    <option>05:00 PM</option>
                    <option>06:00 PM</option>
                    <option>07:00 PM</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}
