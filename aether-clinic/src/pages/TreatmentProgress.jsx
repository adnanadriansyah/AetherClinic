import { motion } from 'framer-motion';
import { Activity, CheckCircle, Clock, ChevronRight, Camera } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import GlassCard from '../components/ui/GlassCard';
import StatCard from '../components/ui/StatCard';
import ProgressChart from '../components/charts/ProgressChart';
import { patientHealthData } from '../data/mockData';

const timeline = [
  { week: 'Week 1', date: 'Apr 15', status: 'completed', treatments: ['Initial Consultation', 'Skin Analysis'], notes: 'Baseline measurements taken. Recommended treatment plan developed.' },
  { week: 'Week 2', date: 'Apr 22', status: 'completed', treatments: ['Microneedling Session 1'], notes: 'First treatment session. Mild redness post-procedure, resolved within 24h.' },
  { week: 'Week 3', date: 'Apr 29', status: 'completed', treatments: ['LED Therapy', 'Topical Assessment'], notes: 'Collagen response visible. Skin texture improving.' },
  { week: 'Week 4', date: 'May 6', status: 'completed', treatments: ['Microneedling Session 2', 'PRP Boost'], notes: 'Significant improvement in skin tone and elasticity.' },
  { week: 'Week 5', date: 'May 13', status: 'in-progress', treatments: ['LED Therapy'], notes: 'Ongoing progress. 78% toward target results.' },
  { week: 'Week 6', date: 'May 20', status: 'pending', treatments: ['Final Assessment'], notes: 'Final evaluation and maintenance plan.' },
];

export default function TreatmentProgress() {
  return (
    <DashboardLayout title="Treatment Progress" role="patient">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="text-primary">Progress</span>
          <ChevronRight className="w-3 h-3" />
          <span>Treatment Timeline</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard icon={Activity} label="Overall Progress" value="78%" color="primary" />
          <StatCard icon={CheckCircle} label="Sessions Completed" value="4/6" color="success" />
          <StatCard icon={Clock} label="Weeks Remaining" value="2" color="warning" />
        </div>

        <GlassCard className="p-6">
          <ProgressChart data={patientHealthData} title="Progress &amp; Satisfaction Over Time" />
        </GlassCard>

        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary" />
          <div className="space-y-6 pl-14">
            {timeline.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className={`absolute left-3.5 w-3.5 h-3.5 rounded-full border-2 ${
                  item.status === 'completed' ? 'bg-success border-success' :
                  item.status === 'in-progress' ? 'bg-primary border-primary animate-pulse' :
                  'bg-bg-dark border-text-secondary'
                }`} />
                <GlassCard className={`p-5 ${item.status === 'pending' ? 'opacity-50' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-white font-semibold">{item.week}</h3>
                      <span className="text-xs text-text-secondary">{item.date}</span>
                    </div>
                    {item.status === 'completed' && <CheckCircle className="w-5 h-5 text-success" />}
                    {item.status === 'in-progress' && <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">In Progress</span>}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {item.treatments.map((t, j) => (
                      <span key={j} className="text-xs bg-white/5 text-text-secondary px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                  <p className="text-sm text-text-secondary">{item.notes}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
