import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { SupabaseProvider } from './context/SupabaseContext';
import MainLayout from './components/layout/MainLayout';
import ToastContainer from './components/ui/Toast';

import Landing from './pages/Landing';
import Services from './pages/Services';
import Doctors from './pages/Doctors';
import Consultation from './pages/Consultation';
import Appointment from './pages/Appointment';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PatientDashboard from './pages/PatientDashboard';
import AdminPortal from './pages/admin/AdminPortal';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import MedicalHistory from './pages/MedicalHistory';
import TreatmentProgress from './pages/TreatmentProgress';
import PaymentBilling from './pages/PaymentBilling';
import Notifications from './pages/Notifications';
import PatientAppointments from './pages/patient/Appointments';
import PatientDoctors from './pages/patient/Doctors';
import PatientConsultation from './pages/patient/Consultation';
import DoctorAppointments from './pages/doctor/Appointments';
import DoctorPatients from './pages/doctor/Patients';
import DoctorRecords from './pages/doctor/Records';
import DoctorSettings from './pages/doctor/Settings';

function AppRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<MainLayout><Landing /></MainLayout>} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/appointments" element={<Appointment />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/admin-old" element={<AdminDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/medical-history" element={<MedicalHistory />} />
        <Route path="/treatment-progress" element={<TreatmentProgress />} />
        <Route path="/payment" element={<PaymentBilling />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/dashboard/appointments" element={<PatientAppointments />} />
        <Route path="/dashboard/doctors" element={<PatientDoctors />} />
        <Route path="/dashboard/consultation" element={<PatientConsultation />} />
        <Route path="/doctor/appointments" element={<DoctorAppointments />} />
        <Route path="/doctor/patients" element={<DoctorPatients />} />
        <Route path="/doctor/records" element={<DoctorRecords />} />
        <Route path="/doctor/settings" element={<DoctorSettings />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SupabaseProvider>
          <AuthProvider>
            <AppRoutes />
            <ToastContainer />
          </AuthProvider>
        </SupabaseProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
