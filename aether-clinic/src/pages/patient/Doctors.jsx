import { motion } from 'framer-motion';
import { Star, BadgeCheck, Calendar, Search, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import GlassCard from '../../components/ui/GlassCard';
import SearchInput from '../../components/ui/SearchInput';
import AnimatedButton from '../../components/ui/AnimatedButton';
import { useSupabase } from '../../context/SupabaseContext';

function normalizeDoc(d) {
  return {
    id: d.id,
    name: d.full_name || d.name || '',
    specialty: d.specialty || '',
    experience: d.experience || '',
    rating: d.rating || 0,
    patients: d.patients_count || d.patients || 0,
    image: d.image_url || d.image || '',
    available: d.available !== undefined ? d.available : true,
  };
}

export default function PatientDoctors() {
  const supabaseCtx = useSupabase();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await supabaseCtx.getDoctors();
      if (result) setDoctors(result.map(normalizeDoc));
    } catch (err) {
      console.error('Failed to fetch doctors:', err);
    }
    setLoading(false);
  }, [supabaseCtx]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Doctors" role="patient">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="text-primary">Doctors</span>
          <ChevronRight className="w-3 h-3" />
          <span>Our Specialists</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Our Specialists</h2>
          <SearchInput value={search} onChange={e => setSearch(e.target.value)} placeholder="Search doctors..." className="w-full sm:w-64" />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-text-secondary">Loading doctors...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((doctor, i) => (
              <motion.div key={doctor.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <GlassCard className="p-6 text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full rounded-full object-cover ring-2 ring-primary/30" />
                    {doctor.available && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-success border-2 border-[#0f1624] flex items-center justify-center">
                        <BadgeCheck className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{doctor.name}</h3>
                  <p className="text-sm text-text-secondary mt-1">{doctor.specialty}</p>
                  <div className="flex items-center justify-center gap-3 mt-3 text-sm text-text-secondary">
                    <span>{doctor.experience}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400 fill-current" />{doctor.rating}</span>
                    <span>{doctor.patients.toLocaleString()} patients</span>
                  </div>
                  {doctor.available ? (
                    <span className="inline-block mt-3 text-xs text-success bg-success/10 px-3 py-1 rounded-full">Available</span>
                  ) : (
                    <span className="inline-block mt-3 text-xs text-text-secondary bg-white/5 px-3 py-1 rounded-full">Unavailable</span>
                  )}
                  <hr className="my-4 border-white/5" />
                  <Link to="/dashboard/appointments">
                    <AnimatedButton variant="secondary" size="sm" className="w-full">
                      <Calendar className="w-4 h-4" /> Book Appointment
                    </AnimatedButton>
                  </Link>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
