export const adminOverviewStats = {
  totalPatients: 2847,
  activeDoctors: 24,
  appointments: 156,
  revenueMTD: 384500,
  patientGrowth: 8.3,
  revenueGrowth: 12.5,
  activePatients: 2431,
  newThisMonth: 186,
  inactivePatients: 416,
  doctorsOnDuty: 18,
  doctorsOnLeave: 4,
  newDoctors: 2,
};

export const revenueMonthly = [
  { month: 'Jan', revenue: 240000, target: 220000, consultations: 112 },
  { month: 'Feb', revenue: 250000, target: 235000, consultations: 128 },
  { month: 'Mar', revenue: 300000, target: 280000, consultations: 145 },
  { month: 'Apr', revenue: 310000, target: 295000, consultations: 138 },
  { month: 'May', revenue: 385000, target: 350000, consultations: 172 },
  { month: 'Jun', revenue: 360000, target: 340000, consultations: 160 },
];

export const treatmentDonut = [
  { name: 'Aesthetic', value: 35, color: '#3b82f6' },
  { name: 'Laser', value: 25, color: '#06b6d4' },
  { name: 'Wellness', value: 20, color: '#8b5cf6' },
  { name: 'Skin', value: 12, color: '#10b981' },
  { name: 'Body', value: 8, color: '#f59e0b' },
];

export const recentAppointments = [
  { id: 1, patient: 'Amanda Foster', doctor: 'Dr. Sarah Chen', treatment: 'Botox & Fillers', date: '2026-05-28', time: '09:00', status: 'Scheduled' },
  { id: 2, patient: 'Robert Chen', doctor: 'Dr. James Park', treatment: 'Laser Resurfacing', date: '2026-05-28', time: '10:30', status: 'Completed' },
  { id: 3, patient: 'Mei Lin', doctor: 'Dr. Emily Rodriguez', treatment: 'IV Therapy', date: '2026-05-28', time: '13:00', status: 'Completed' },
  { id: 4, patient: 'Carlos Garcia', doctor: 'Dr. Michael Park', treatment: 'PRP Hair Restoration', date: '2026-05-29', time: '11:00', status: 'Scheduled' },
  { id: 5, patient: 'Priya Sharma', doctor: 'Dr. Olivia Bennett', treatment: 'Microneedling', date: '2026-05-29', time: '14:30', status: 'Cancelled' },
];

export const todaySchedule = [
  { time: '09:00', patient: 'Amanda Foster', doctor: 'Dr. Sarah Chen', type: 'Botox & Fillers', room: '101' },
  { time: '10:30', patient: 'Robert Chen', doctor: 'Dr. James Park', type: 'Laser Resurfacing', room: '202' },
  { time: '13:00', patient: 'Mei Lin', doctor: 'Dr. Emily Rodriguez', type: 'IV Therapy', room: '103' },
  { time: '15:00', patient: 'Sophia Lin', doctor: 'Dr. Sarah Chen', type: 'Consultation', room: '105' },
];

export const patientsList = [
  { id: 1, name: 'Amanda Foster', age: 34, gender: 'F', email: 'amanda.f@email.com', phone: '(555) 123-4567', treatment: 'Botox & Fillers', lastVisit: '2026-05-28', status: 'Active', avatar: null, city: 'Los Angeles' },
  { id: 2, name: 'Robert Chen', age: 42, gender: 'M', email: 'robert.c@email.com', phone: '(555) 234-5678', treatment: 'Laser Resurfacing', lastVisit: '2026-05-28', status: 'Active', avatar: null, city: 'Beverly Hills' },
  { id: 3, name: 'Mei Lin', age: 28, gender: 'F', email: 'mei.l@email.com', phone: '(555) 345-6789', treatment: 'IV Therapy', lastVisit: '2026-05-27', status: 'Active', avatar: null, city: 'Santa Monica' },
  { id: 4, name: 'Carlos Garcia', age: 39, gender: 'M', email: 'carlos.g@email.com', phone: '(555) 456-7890', treatment: 'PRP Hair Restoration', lastVisit: '2026-05-25', status: 'Active', avatar: null, city: 'Hollywood' },
  { id: 5, name: 'Priya Sharma', age: 31, gender: 'F', email: 'priya.s@email.com', phone: '(555) 567-8901', treatment: 'Microneedling', lastVisit: '2026-05-22', status: 'Inactive', avatar: null, city: 'Pasadena' },
  { id: 6, name: 'James Wilson', age: 47, gender: 'M', email: 'james.w@email.com', phone: '(555) 678-9012', treatment: 'Chemical Peels', lastVisit: '2026-05-20', status: 'Active', avatar: null, city: 'Malibu' },
  { id: 7, name: 'Sophia Lin', age: 26, gender: 'F', email: 'sophia.l@email.com', phone: '(555) 789-0123', treatment: 'LED Light Therapy', lastVisit: '2026-05-18', status: 'Active', avatar: null, city: 'Long Beach' },
  { id: 8, name: 'Marcus Williams', age: 52, gender: 'M', email: 'marcus.w@email.com', phone: '(555) 890-1234', treatment: 'CoolSculpting', lastVisit: '2026-05-15', status: 'Inactive', avatar: null, city: 'Irvine' },
];

export const adminDoctors = [
  { id: 1, name: 'Dr. Sarah Chen', specialty: 'Aesthetic Medicine', experience: '15 yrs', rating: 4.9, patients: 3400, status: 'On Duty', initials: 'SC', revenue: '$1.2M' },
  { id: 2, name: 'Dr. James Park', specialty: 'Laser Surgery', experience: '12 yrs', rating: 4.8, patients: 2800, status: 'On Duty', initials: 'JP', revenue: '$980K' },
  { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Wellness & Anti-Aging', experience: '10 yrs', rating: 4.9, patients: 2200, status: 'On Duty', initials: 'ER', revenue: '$850K' },
  { id: 4, name: 'Dr. Michael Park', specialty: 'Dermatology', experience: '14 yrs', rating: 4.7, patients: 3100, status: 'On Leave', initials: 'MP', revenue: '$1.1M' },
  { id: 5, name: 'Dr. Olivia Bennett', specialty: 'Regenerative Medicine', experience: '8 yrs', rating: 4.8, patients: 1900, status: 'On Duty', initials: 'OB', revenue: '$720K' },
  { id: 6, name: 'Dr. Alexander Kim', specialty: 'Hair Restoration', experience: '11 yrs', rating: 4.6, patients: 2600, status: 'On Leave', initials: 'AK', revenue: '$890K' },
];

export const appointmentsList = [
  { id: 1, patient: 'Amanda Foster', doctor: 'Dr. Sarah Chen', type: 'Botox & Fillers', date: '2026-05-28', time: '09:00', room: '101', status: 'Scheduled' },
  { id: 2, patient: 'Robert Chen', doctor: 'Dr. James Park', type: 'Laser Resurfacing', date: '2026-05-28', time: '10:30', room: '202', status: 'Completed' },
  { id: 3, patient: 'Mei Lin', doctor: 'Dr. Emily Rodriguez', type: 'IV Therapy', date: '2026-05-28', time: '13:00', room: '103', status: 'Completed' },
  { id: 4, patient: 'Carlos Garcia', doctor: 'Dr. Michael Park', type: 'PRP Hair Restoration', date: '2026-05-29', time: '11:00', room: '301', status: 'Scheduled' },
  { id: 5, patient: 'Priya Sharma', doctor: 'Dr. Olivia Bennett', type: 'Microneedling', date: '2026-05-29', time: '14:30', room: '204', status: 'Cancelled' },
  { id: 6, patient: 'James Wilson', doctor: 'Dr. Alexander Kim', type: 'Chemical Peels', date: '2026-05-30', time: '10:00', room: '105', status: 'Scheduled' },
  { id: 7, patient: 'Sophia Lin', doctor: 'Dr. Sarah Chen', type: 'LED Light Therapy', date: '2026-05-30', time: '15:00', room: '102', status: 'Scheduled' },
  { id: 8, patient: 'Marcus Williams', doctor: 'Dr. James Park', type: 'CoolSculpting', date: '2026-05-31', time: '09:30', room: '201', status: 'Completed' },
];

export const treatmentCategories = [
  { name: 'Aesthetic', icon: 'Sparkles', count: 486, revenue: 245000, trend: '+12%', color: 'blue' },
  { name: 'Laser', icon: 'Zap', count: 312, revenue: 189000, trend: '+8%', color: 'cyan' },
  { name: 'Wellness', icon: 'Heart', count: 256, revenue: 98000, trend: '+15%', color: 'purple' },
  { name: 'Skin', icon: 'Droplets', count: 198, revenue: 72000, trend: '+5%', color: 'green' },
  { name: 'Body', icon: 'Activity', count: 124, revenue: 85000, trend: '+10%', color: 'amber' },
];

export const treatmentsByMonth = [
  { month: 'Jan', Aesthetic: 38, Laser: 22, Wellness: 18, Skin: 14, Body: 8 },
  { month: 'Feb', Aesthetic: 42, Laser: 25, Wellness: 20, Skin: 12, Body: 9 },
  { month: 'Mar', Aesthetic: 48, Laser: 28, Wellness: 22, Skin: 16, Body: 10 },
  { month: 'Apr', Aesthetic: 45, Laser: 26, Wellness: 24, Skin: 15, Body: 11 },
  { month: 'May', Aesthetic: 52, Laser: 30, Wellness: 26, Skin: 18, Body: 12 },
  { month: 'Jun', Aesthetic: 50, Laser: 28, Wellness: 25, Skin: 16, Body: 10 },
];

export const treatmentDetails = [
  { id: 1, name: 'Botox & Fillers', category: 'Aesthetic', duration: '30-60m', price: 350, sessions: 486, revenue: 170100 },
  { id: 2, name: 'Laser Skin Resurfacing', category: 'Laser', duration: '45-90m', price: 500, sessions: 312, revenue: 156000 },
  { id: 3, name: 'IV Vitamin Therapy', category: 'Wellness', duration: '45-60m', price: 200, sessions: 256, revenue: 51200 },
  { id: 4, name: 'PRP Hair Restoration', category: 'Aesthetic', duration: '60m', price: 650, sessions: 124, revenue: 80600 },
  { id: 5, name: 'CoolSculpting Elite', category: 'Body', duration: '35-75m', price: 750, sessions: 98, revenue: 73500 },
  { id: 6, name: 'Microneedling', category: 'Skin', duration: '60m', price: 400, sessions: 198, revenue: 79200 },
  { id: 7, name: 'Chemical Peels', category: 'Skin', duration: '30-45m', price: 250, sessions: 156, revenue: 39000 },
  { id: 8, name: 'LED Light Therapy', category: 'Wellness', duration: '20-30m', price: 150, sessions: 178, revenue: 26700 },
];

export const monthlyBreakdown = [
  { month: 'Jan', revenue: 240000, patients: 112, appointments: 134, growth: 0 },
  { month: 'Feb', revenue: 250000, patients: 128, appointments: 142, growth: 4.2 },
  { month: 'Mar', revenue: 300000, patients: 145, appointments: 158, growth: 20 },
  { month: 'Apr', revenue: 310000, patients: 138, appointments: 152, growth: 3.3 },
  { month: 'May', revenue: 385000, patients: 172, appointments: 186, growth: 24.2 },
  { month: 'Jun', revenue: 360000, patients: 160, appointments: 175, growth: -6.5 },
];

export const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const weekDates = ['May 25', 'May 26', 'May 27', 'May 28', 'May 29', 'May 30', 'May 31'];

export const weekAppointments = [
  { day: 0, slots: [
    { time: '09:00', patient: 'Amanda Foster', type: 'Botox', room: '101', doctor: 'Dr. Chen' },
    { time: '11:00', patient: 'Sophia Lin', type: 'Consultation', room: '105', doctor: 'Dr. Chen' },
  ]},
  { day: 1, slots: [
    { time: '10:00', patient: 'James Wilson', type: 'Chemical Peel', room: '202', doctor: 'Dr. Park' },
  ]},
  { day: 2, slots: [
    { time: '09:30', patient: 'Mei Lin', type: 'IV Therapy', room: '103', doctor: 'Dr. Rodriguez' },
    { time: '14:00', patient: 'Carlos Garcia', type: 'PRP', room: '301', doctor: 'Dr. Park' },
  ]},
  { day: 3, slots: [
    { time: '09:00', patient: 'Amanda Foster', type: 'Botox', room: '101', doctor: 'Dr. Chen' },
    { time: '10:30', patient: 'Robert Chen', type: 'Laser', room: '202', doctor: 'Dr. Park' },
    { time: '13:00', patient: 'Mei Lin', type: 'IV Therapy', room: '103', doctor: 'Dr. Rodriguez' },
  ]},
  { day: 4, slots: [
    { time: '11:00', patient: 'Carlos Garcia', type: 'PRP', room: '301', doctor: 'Dr. Park' },
    { time: '14:30', patient: 'Priya Sharma', type: 'Microneedling', room: '204', doctor: 'Dr. Bennett' },
  ]},
  { day: 5, slots: [
    { time: '10:00', patient: 'James Wilson', type: 'Chemical Peel', room: '105', doctor: 'Dr. Kim' },
    { time: '15:00', patient: 'Sophia Lin', type: 'LED', room: '102', doctor: 'Dr. Chen' },
  ]},
  { day: 6, slots: [] },
];
