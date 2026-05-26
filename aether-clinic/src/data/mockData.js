export const treatments = [
  { id: 1, name: 'Botox & Fillers', description: 'Non-surgical facial rejuvenation with premium dermal fillers and neuromodulators.', category: 'Aesthetic', duration: '30-60 min', price: '$350+', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80', rating: 4.9 },
  { id: 2, name: 'Laser Skin Resurfacing', description: 'Advanced fractional laser technology for skin texture, tone, and collagen renewal.', category: 'Laser', duration: '45-90 min', price: '$500+', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80', rating: 4.8 },
  { id: 3, name: 'IV Vitamin Therapy', description: 'Customized intravenous nutrient formulations for wellness, recovery, and vitality.', category: 'Wellness', duration: '45-60 min', price: '$200+', image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80', rating: 4.7 },
  { id: 4, name: 'PRP Hair Restoration', description: 'Platelet-rich plasma therapy for natural hair regrowth and scalp health.', category: 'Hair', duration: '60 min', price: '$650+', image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80', rating: 4.8 },
  { id: 5, name: 'CoolSculpting Elite', description: 'Non-invasive fat reduction and body contouring with advanced cooling technology.', category: 'Body', duration: '35-75 min', price: '$750+', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80', rating: 4.6 },
  { id: 6, name: 'Microneedling', description: 'Collagen induction therapy for scar reduction, texture improvement, and skin tightening.', category: 'Skin', duration: '60 min', price: '$400+', image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&q=80', rating: 4.7 },
  { id: 7, name: 'Chemical Peels', description: 'Medical-grade chemical exfoliation for skin renewal, brightening, and acne control.', category: 'Skin', duration: '30-45 min', price: '$250+', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=80', rating: 4.5 },
  { id: 8, name: 'LED Light Therapy', description: 'Photobiomodulation for anti-aging, inflammation reduction, and skin healing.', category: 'Wellness', duration: '20-30 min', price: '$150+', image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&q=80', rating: 4.4 },
];

export const doctors = [
  { id: 1, name: 'Dr. Sarah Mitchell', specialty: 'Medical Director, Cosmetic Dermatology', experience: '15+ years', rating: 4.9, patients: 3400, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80', available: true },
  { id: 2, name: 'Dr. James Chen', specialty: 'Plastic & Reconstructive Surgery', experience: '12+ years', rating: 4.8, patients: 2800, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80', available: true },
  { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Aesthetic Medicine & Wellness', experience: '10+ years', rating: 4.9, patients: 2200, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80', available: true },
  { id: 4, name: 'Dr. Michael Park', specialty: 'Laser Surgery & Dermatology', experience: '14+ years', rating: 4.7, patients: 3100, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80', available: false },
  { id: 5, name: 'Dr. Olivia Bennett', specialty: 'Anti-Aging & Regenerative Medicine', experience: '8+ years', rating: 4.8, patients: 1900, image: 'https://images.unsplash.com/photo-1622902046580-2b47b79f5ac1?w=400&q=80', available: true },
  { id: 6, name: 'Dr. Alexander Kim', specialty: 'Hair Restoration & Transplant Surgery', experience: '11+ years', rating: 4.6, patients: 2600, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80', available: true },
];

export const testimonials = [
  { id: 1, name: 'Jessica M.', role: 'Verified Patient', rating: 5, text: 'The most luxurious medical experience I\'ve ever had. From the moment I walked in, the care was impeccable. My results exceeded expectations.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
  { id: 2, name: 'David R.', role: 'Verified Patient', rating: 5, text: 'After years of struggling with my skin, Aether completely transformed my confidence. The team is world-class and genuinely cares.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
  { id: 3, name: 'Sophia L.', role: 'Verified Patient', rating: 5, text: 'The PRP treatment exceeded all expectations. Dr. Mitchell is an artist. The facility is stunning and the staff makes you feel like royalty.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
  { id: 4, name: 'Marcus W.', role: 'Verified Patient', rating: 5, text: 'CoolSculpting at Aether was a game changer. The results are incredible and the process was so comfortable. Highly recommend!', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' },
];

export const appointments = [
  { id: 1, patient: 'Amanda Foster', doctor: 'Dr. Sarah Mitchell', treatment: 'Botox & Fillers', date: '2026-05-28', time: '09:00 AM', status: 'confirmed', type: 'In-Clinic' },
  { id: 2, patient: 'Robert Chen', doctor: 'Dr. James Chen', treatment: 'Laser Skin Resurfacing', date: '2026-05-28', time: '10:30 AM', status: 'completed', type: 'In-Clinic' },
  { id: 3, patient: 'Mei Lin', doctor: 'Dr. Emily Rodriguez', treatment: 'IV Vitamin Therapy', date: '2026-05-28', time: '01:00 PM', status: 'pending', type: 'Virtual' },
  { id: 4, patient: 'Carlos Garcia', doctor: 'Dr. Michael Park', treatment: 'PRP Hair Restoration', date: '2026-05-29', time: '11:00 AM', status: 'confirmed', type: 'In-Clinic' },
  { id: 5, patient: 'Priya Sharma', doctor: 'Dr. Olivia Bennett', treatment: 'Microneedling', date: '2026-05-29', time: '02:30 PM', status: 'cancelled', type: 'In-Clinic' },
  { id: 6, patient: 'James Wilson', doctor: 'Dr. Alexander Kim', treatment: 'Chemical Peels', date: '2026-05-30', time: '10:00 AM', status: 'confirmed', type: 'Virtual' },
];

export const patientStats = {
  totalVisits: 24,
  upcomingAppointments: 3,
  completedTreatments: 18,
  prescriptions: 5,
  totalSpent: 12450,
  loyaltyPoints: 2450,
};

export const adminStats = {
  totalPatients: 2847,
  totalDoctors: 24,
  totalAppointments: 156,
  revenueThisMonth: 384500,
  revenueGrowth: 12.5,
  patientGrowth: 8.3,
  satisfaction: 97,
};

export const revenueData = [
  { month: 'Jan', revenue: 245000, consultations: 120 },
  { month: 'Feb', revenue: 268000, consultations: 135 },
  { month: 'Mar', revenue: 312000, consultations: 148 },
  { month: 'Apr', revenue: 289000, consultations: 142 },
  { month: 'May', revenue: 384500, consultations: 178 },
  { month: 'Jun', revenue: 356000, consultations: 165 },
];

export const treatmentCategoryData = [
  { name: 'Aesthetic', value: 35 },
  { name: 'Laser', value: 25 },
  { name: 'Wellness', value: 20 },
  { name: 'Skin', value: 12 },
  { name: 'Body', value: 8 },
];

export const patientHealthData = [
  { date: 'Week 1', progress: 20, satisfaction: 85 },
  { date: 'Week 2', progress: 35, satisfaction: 88 },
  { date: 'Week 3', progress: 50, satisfaction: 90 },
  { date: 'Week 4', progress: 65, satisfaction: 92 },
  { date: 'Week 5', progress: 78, satisfaction: 94 },
  { date: 'Week 6', progress: 90, satisfaction: 96 },
];

export const faqs = [
  { q: 'What should I expect during my first consultation?', a: 'Your first visit includes a comprehensive skin assessment, discussion of your aesthetic goals, and a personalized treatment plan developed by our expert physicians.' },
  { q: 'How long do treatments typically take?', a: 'Treatment duration varies from 20 minutes for quick procedures like LED therapy to 90 minutes for advanced laser treatments. Most treatments fall within 30-60 minutes.' },
  { q: 'Is there any downtime after treatments?', a: 'Recovery time depends on the procedure. Many treatments have zero downtime, while others like laser resurfacing may require 3-7 days of recovery.' },
  { q: 'What payment options are available?', a: 'We accept all major credit cards, HSA/FSA cards, CareCredit financing, and offer membership packages for regular clients.' },
  { q: 'How do I prepare for my appointment?', a: 'Instructions will be provided based on your specific treatment. Generally, we recommend staying hydrated, avoiding alcohol 24h prior, and arriving with clean skin.' },
  { q: 'Can I combine multiple treatments?', a: 'Yes! Many patients opt for combination therapies. Our physicians will curate the optimal sequence for your goals and skin type.' },
];

export const notifications = [
  { id: 1, title: 'Appointment Reminder', message: 'Your consultation with Dr. Mitchell is tomorrow at 9:00 AM.', time: '2 hours ago', type: 'appointment', read: false },
  { id: 2, title: 'Treatment Results Ready', message: 'Your latest lab results and progress report are now available.', time: '5 hours ago', type: 'medical', read: false },
  { id: 3, title: 'Prescription Refill', message: 'Your Vitamin B12 prescription is ready for refill.', time: '1 day ago', type: 'prescription', read: true },
  { id: 4, title: 'Payment Confirmed', message: 'Your payment of $450 for CoolSculpting has been processed.', time: '2 days ago', type: 'payment', read: true },
  { id: 5, title: 'New Treatment Available', message: 'We\'ve added RF Microneedling — a revolutionary skin tightening treatment.', time: '3 days ago', type: 'promo', read: true },
];

export const medicalRecords = [
  { id: 1, date: '2026-05-15', type: 'Treatment', description: 'Botox & Fillers — Forehead, Crow\'s Feet', doctor: 'Dr. Sarah Mitchell', notes: 'Excellent response. Patient satisfied with results.' },
  { id: 2, date: '2026-04-28', type: 'Consultation', description: 'Annual skin assessment and treatment planning', doctor: 'Dr. Emily Rodriguez', notes: 'Skin health improving. Recommend continued LED therapy.' },
  { id: 3, date: '2026-03-10', type: 'Procedure', description: 'Microneedling with PRP — Full Face', doctor: 'Dr. Sarah Mitchell', notes: 'Good collagen response. Minimal downtime.' },
  { id: 4, date: '2026-02-05', type: 'Lab Results', description: 'Comprehensive blood panel & vitamin analysis', doctor: 'Dr. Olivia Bennett', notes: 'Vitamin D deficiency detected. Supplementation prescribed.' },
  { id: 5, date: '2026-01-12', type: 'Treatment', description: 'IV Vitamin Therapy — Myers Cocktail', doctor: 'Dr. Emily Rodriguez', notes: 'Patient reported significant energy improvement.' },
];

export const invoices = [
  { id: 'INV-2026-001', date: '2026-05-15', description: 'Botox & Fillers', amount: 450, status: 'paid' },
  { id: 'INV-2026-002', date: '2026-04-28', description: 'Consultation Fee', amount: 150, status: 'paid' },
  { id: 'INV-2026-003', date: '2026-03-10', description: 'Microneedling with PRP', amount: 800, status: 'paid' },
  { id: 'INV-2026-004', date: '2026-02-05', description: 'Lab Panel', amount: 275, status: 'paid' },
  { id: 'INV-2026-005', date: '2026-01-12', description: 'IV Vitamin Therapy', amount: 200, status: 'paid' },
  { id: 'INV-2026-006', date: '2026-06-01', description: 'CoolSculpting Elite', amount: 750, status: 'pending' },
];

export const prescriptions = [
  { id: 1, name: 'Tretinoin 0.05% Cream', dosage: 'Apply nightly', prescribed: 'Dr. Sarah Mitchell', date: '2026-05-15', refills: 2, status: 'active' },
  { id: 2, name: 'Vitamin D3 5000 IU', dosage: '1 capsule daily', prescribed: 'Dr. Olivia Bennett', date: '2026-02-05', refills: 5, status: 'active' },
  { id: 3, name: 'Hydroquinone 4%', dosage: 'Apply to hyperpigmentation', prescribed: 'Dr. Sarah Mitchell', date: '2026-01-20', refills: 0, status: 'expired' },
  { id: 4, name: 'Vitamin B12 Injection', dosage: '1 injection monthly', prescribed: 'Dr. Emily Rodriguez', date: '2026-04-01', refills: 3, status: 'active' },
  { id: 5, name: 'Azelaic Acid 15% Gel', dosage: 'Apply twice daily', prescribed: 'Dr. Emily Rodriguez', date: '2026-03-15', refills: 1, status: 'active' },
];
