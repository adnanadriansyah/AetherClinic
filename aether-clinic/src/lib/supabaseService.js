import { supabase, isSupabaseConnected } from './supabase';

// ─── Auth ───────────────────────────────────────────────
export async function signUp(email, password, profile) {
  if (!isSupabaseConnected()) return null;
  const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
  if (authError) throw authError;

  if (authData.user) {
    const { error: profileError } = await supabase.from('profiles').insert([
      { id: authData.user.id, email, ...profile }
    ]);
    if (profileError) throw profileError;
  }
  return authData;
}

export async function signIn(email, password) {
  if (!isSupabaseConnected()) return null;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  if (!isSupabaseConnected()) return;
  await supabase.auth.signOut();
}

export async function getCurrentUser() {
  if (!isSupabaseConnected()) return null;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  return { ...user, profile };
}

// ─── Patients ──────────────────────────────────────────
export async function getPatients(search = '', status = 'All', page = 1, perPage = 10) {
  if (!isSupabaseConnected()) return null;
  let query = supabase.from('patients').select('*', { count: 'exact' });
  if (search) query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
  if (status !== 'All') query = query.eq('status', status);
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  const { data, count, error } = await query.range(from, to).order('created_at', { ascending: false });
  if (error) throw error;
  return { data, count, page, totalPages: Math.ceil(count / perPage) };
}

export async function createPatient(patient) {
  if (!isSupabaseConnected()) return null;
  const { data, error } = await supabase.from('patients').insert([patient]).select().single();
  if (error) throw error;
  return data;
}

export async function updatePatient(id, updates) {
  if (!isSupabaseConnected()) return null;
  const { data, error } = await supabase.from('patients').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

// ─── Doctors ───────────────────────────────────────────
export async function getDoctors(status = 'All') {
  if (!isSupabaseConnected()) return null;
  let query = supabase.from('doctors').select('*');
  if (status !== 'All') query = query.eq('status', status);
  const { data, error } = await query.order('patients_count', { ascending: false });
  if (error) throw error;
  return data;
}

// ─── Appointments ──────────────────────────────────────
export async function getAppointments(filter = 'all') {
  if (!isSupabaseConnected()) return null;
  let query = supabase.from('appointments').select('*, patients(full_name), doctors(full_name), treatments(name)');
  const today = new Date().toISOString().split('T')[0];
  if (filter === 'today') query = query.eq('appointment_date', today);
  else if (filter === 'week') {
    const weekEnd = new Date(); weekEnd.setDate(weekEnd.getDate() + 7);
    query = query.gte('appointment_date', today).lte('appointment_date', weekEnd.toISOString().split('T')[0]);
  }
  const { data, error } = await query.order('appointment_date', { ascending: true }).order('appointment_time', { ascending: true });
  if (error) throw error;
  return data;
}

export async function createAppointment(appointment) {
  if (!isSupabaseConnected()) return null;
  const { data, error } = await supabase.from('appointments').insert([appointment]).select().single();
  if (error) throw error;
  return data;
}

// ─── Treatments ────────────────────────────────────────
export async function getTreatments(category = null) {
  if (!isSupabaseConnected()) return null;
  let query = supabase.from('treatments').select('*');
  if (category) query = query.eq('category', category);
  const { data, error } = await query.order('name');
  if (error) throw error;
  return data;
}

// ─── Medical Records ───────────────────────────────────
export async function getMedicalRecords(patientId) {
  if (!isSupabaseConnected()) return null;
  const { data, error } = await supabase
    .from('medical_records')
    .select('*, doctors(full_name)')
    .eq('patient_id', patientId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

// ─── Invoices ──────────────────────────────────────────
export async function getInvoices(patientId = null) {
  if (!isSupabaseConnected()) return null;
  let query = supabase.from('invoices').select('*, patients(full_name)');
  if (patientId) query = query.eq('patient_id', patientId);
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

// ─── Prescriptions ─────────────────────────────────────
export async function getPrescriptions(patientId = null) {
  if (!isSupabaseConnected()) return null;
  let query = supabase.from('prescriptions').select('*, doctors(full_name)');
  if (patientId) query = query.eq('patient_id', patientId);
  const { data, error } = await query.order('prescribed_at', { ascending: false });
  if (error) throw error;
  return data;
}

// ─── Notifications ─────────────────────────────────────
export async function getNotifications(userId) {
  if (!isSupabaseConnected()) return null;
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function markNotificationRead(id) {
  if (!isSupabaseConnected()) return;
  await supabase.from('notifications').update({ is_read: true }).eq('id', id);
}

// ─── Dashboard Stats ──────────────────────────────────
export async function getAdminStats() {
  if (!isSupabaseConnected()) return null;
  const [
    { count: totalPatients },
    { count: activePatients },
    { count: totalDoctors },
    { count: totalAppointments },
    { data: revenueData },
  ] = await Promise.all([
    supabase.from('patients').select('*', { count: 'exact', head: true }),
    supabase.from('patients').select('*', { count: 'exact', head: true }).eq('status', 'Active'),
    supabase.from('doctors').select('*', { count: 'exact', head: true }),
    supabase.from('appointments').select('*', { count: 'exact', head: true }),
    supabase.from('invoices').select('amount').eq('status', 'paid'),
  ]);

  const revenueMTD = revenueData?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 0;

  return {
    totalPatients,
    activePatients,
    totalDoctors,
    totalAppointments,
    revenueMTD,
  };
}

// ─── Treatment Sessions (Progress) ────────────────────
export async function getTreatmentSessions(patientId) {
  if (!isSupabaseConnected()) return null;
  const { data, error } = await supabase
    .from('treatment_sessions')
    .select('*, treatments(name)')
    .eq('patient_id', patientId)
    .order('session_number', { ascending: true });
  if (error) throw error;
  return data;
}
