import { motion } from 'framer-motion';
import { Bell, Calendar, FileText, Pill, CreditCard, Megaphone, ChevronRight, CheckCheck } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import GlassCard from '../components/ui/GlassCard';
import { notifications } from '../data/mockData';

const typeIcons = {
  appointment: Calendar,
  medical: FileText,
  prescription: Pill,
  payment: CreditCard,
  promo: Megaphone,
};

const typeColors = {
  appointment: 'text-primary bg-primary/10',
  medical: 'text-success bg-success/10',
  prescription: 'text-accent bg-accent/10',
  payment: 'text-warning bg-warning/10',
  promo: 'text-info bg-info/10',
};

export default function Notifications() {
  return (
    <DashboardLayout title="Notifications" role="patient">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-text-secondary mb-1">
              <span className="text-primary">Notifications</span>
              <ChevronRight className="w-3 h-3" />
              <span>All</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Notifications</h2>
          </div>
          <button className="flex items-center gap-2 text-sm text-primary hover:text-primary-light">
            <CheckCheck className="w-4 h-4" /> Mark All Read
          </button>
        </div>

        <div className="space-y-3">
          {notifications.map((n, i) => {
            const Icon = typeIcons[n.type];
            return (
              <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <GlassCard className={`p-5 flex items-start gap-4 ${!n.read ? 'ring-1 ring-primary/20' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl ${typeColors[n.type]} flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={`text-sm ${n.read ? 'text-text-secondary' : 'text-white font-semibold'}`}>{n.title}</h3>
                        <p className="text-sm text-text-secondary mt-0.5">{n.message}</p>
                      </div>
                      {!n.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                    </div>
                    <p className="text-xs text-text-secondary mt-2">{n.time}</p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
