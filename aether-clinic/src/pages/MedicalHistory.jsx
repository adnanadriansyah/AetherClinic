import { motion } from 'framer-motion';
import { FileText, Download, Filter, Search, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import GlassCard from '../components/ui/GlassCard';
import SearchInput from '../components/ui/SearchInput';
import { medicalRecords } from '../data/mockData';

export default function MedicalHistory() {
  const [search, setSearch] = useState('');

  const filtered = medicalRecords.filter(r =>
    r.description.toLowerCase().includes(search.toLowerCase()) ||
    r.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Medical History" role="patient">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="text-primary">Medical Records</span>
          <ChevronRight className="w-3 h-3" />
          <span>History</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Medical History</h2>
          <SearchInput value={search} onChange={e => setSearch(e.target.value)} placeholder="Search records..." className="w-full sm:w-64" />
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-secondary rounded-full" />
          <div className="space-y-4 pl-8">
            {filtered.map((record, i) => (
              <motion.div key={record.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <GlassCard className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs text-text-secondary">{record.date}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          record.type === 'Treatment' ? 'bg-primary/20 text-primary' :
                          record.type === 'Procedure' ? 'bg-accent/20 text-accent' :
                          record.type === 'Lab Results' ? 'bg-success/20 text-success' :
                          'bg-info/20 text-info'
                        }`}>{record.type}</span>
                      </div>
                      <h3 className="text-white font-semibold">{record.description}</h3>
                      <p className="text-sm text-text-secondary mt-1">Doctor: {record.doctor}</p>
                      <p className="text-sm text-text-secondary mt-2 bg-white/5 rounded-lg p-3">{record.notes}</p>
                    </div>
                    <button className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center shrink-0 transition-colors">
                      <Download className="w-4 h-4 text-text-secondary" />
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
