import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, Stethoscope, CalendarCheck, Activity,
  BarChart3, Settings, ChevronLeft, ChevronRight, LogOut, Sparkles,
  MessageSquare, FileText, CreditCard, Bell, Shield, UserCircle
} from 'lucide-react';

const adminLinks = [
  { to: '/admin', icon: LayoutDashboard, label: 'Overview' },
  { to: '/admin/patients', icon: Users, label: 'Patients' },
  { to: '/admin/doctors', icon: Stethoscope, label: 'Doctors' },
  { to: '/admin/appointments', icon: CalendarCheck, label: 'Appointments' },
  { to: '/admin/treatments', icon: Activity, label: 'Treatments' },
  { to: '/admin/reports', icon: BarChart3, label: 'Reports' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

const patientLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/appointments', icon: CalendarCheck, label: 'Appointments' },
  { to: '/medical-history', icon: FileText, label: 'Medical History' },
  { to: '/treatment-progress', icon: Activity, label: 'Treatments' },
  { to: '/doctors', icon: Stethoscope, label: 'Doctors' },
  { to: '/consultation', icon: MessageSquare, label: 'Consultation' },
  { to: '/payment', icon: CreditCard, label: 'Payment' },
  { to: '/notifications', icon: Bell, label: 'Notifications' },
];

const doctorLinks = [
  { to: '/doctor', icon: LayoutDashboard, label: 'Overview' },
  { to: '/doctor/appointments', icon: CalendarCheck, label: 'Appointments' },
  { to: '/doctor/patients', icon: Users, label: 'Patients' },
  { to: '/doctor/records', icon: FileText, label: 'Records' },
  { to: '/doctor/settings', icon: Settings, label: 'Settings' },
];

const roleProfile = {
  admin: { name: 'John Doe', role: 'Admin', initials: 'JD' },
  patient: { name: 'John Doe', role: 'Patient', initials: 'JD' },
  doctor: { name: 'Dr. Sarah Mitchell', role: 'Doctor', initials: 'SM' },
};

export default function Sidebar({ role = 'patient', isOpen, setIsOpen }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) setCollapsed(true);
  }, [isMobile]);

  const links = role === 'admin' ? adminLinks
    : role === 'doctor' ? doctorLinks
    : patientLinks;

  const profile = roleProfile[role] || roleProfile.patient;

  const sidebarWidth = collapsed ? 64 : 240;

  function isActiveLink(to) {
    if (to === '/admin' || to === '/dashboard' || to === '/doctor') {
      return location.pathname === to;
    }
    return location.pathname.startsWith(to);
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.aside
        initial={false}
        animate={{
          width: sidebarWidth,
          x: isMobile ? (isOpen ? 0 : -sidebarWidth) : 0,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className={`h-screen bg-[#0f1624] border-r border-white/5 flex flex-col shrink-0 overflow-hidden z-50 ${isMobile ? 'fixed' : 'relative'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#06B6D4] flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <motion.span
              animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto' }}
              className="font-bold text-lg text-white whitespace-nowrap overflow-hidden"
            >
              Aether<span className="text-[#3b82f6]">Clinic</span>
            </motion.span>
          </div>
          <motion.button
            animate={{ opacity: collapsed || isMobile ? 0 : 1, width: collapsed || isMobile ? 0 : 'auto' }}
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 items-center justify-center transition-colors shrink-0"
          >
            {collapsed
              ? <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
              : <ChevronLeft className="w-4 h-4 text-[#94A3B8]" />}
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-0.5 scrollbar-thin">
          {links.map((link) => {
            const Icon = link.icon;
            const active = isActiveLink(link.to);
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => { if (isMobile) setIsOpen(false); }}
                className="group relative block"
              >
                {active && (
                  <motion.div
                    layoutId="activeBorder"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full bg-gradient-to-b from-[#3b82f6] to-[#06B6D4]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <div
                  className={`flex items-center gap-3 mx-1 px-3 py-2.5 rounded-xl transition-all duration-200 relative
                    ${active
                      ? 'bg-gradient-to-r from-[#3b82f6]/15 to-transparent text-white'
                      : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                    }`}
                >
                  <div className={`w-5 h-5 shrink-0 flex items-center justify-center transition-colors duration-200
                    ${active ? 'text-[#3b82f6]' : 'text-[#94A3B8] group-hover:text-white'}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <motion.span
                    animate={{
                      opacity: collapsed ? 0 : 1,
                      width: collapsed ? 0 : 'auto',
                      marginLeft: collapsed ? 0 : 0,
                    }}
                    className="text-sm font-medium whitespace-nowrap overflow-hidden"
                  >
                    {link.label}
                  </motion.span>

                  {active && !collapsed && (
                    <motion.div
                      layoutId="activeDot"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-[#3b82f6] shrink-0"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>

                {/* Tooltip on collapsed */}
                {collapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg bg-[#1E293B] border border-white/10 text-white text-xs font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl pointer-events-none">
                    {link.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1E293B] border-l border-t border-white/10 -rotate-45" />
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Profile Section */}
        <div className="border-t border-white/5 p-3">
          <div className="flex items-center gap-3 px-1 py-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8B5CF6] flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-lg shadow-purple-500/20">
              {profile.initials}
            </div>
            <motion.div
              animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto' }}
              className="overflow-hidden min-w-0"
            >
              <p className="text-sm font-medium text-white truncate">{profile.name}</p>
              <p className="text-xs text-[#94A3B8] truncate">{profile.role}</p>
            </motion.div>
          </div>

          <button
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/5 transition-all duration-200 mt-1 group"
          >
            <LogOut className="w-5 h-5 shrink-0 group-hover:text-red-400 transition-colors" />
            <motion.span
              animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto' }}
              className="text-sm font-medium whitespace-nowrap overflow-hidden"
            >
              Sign Out
            </motion.span>
            {collapsed && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg bg-[#1E293B] border border-white/10 text-white text-xs font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl pointer-events-none">
                Sign Out
                <div className="absolute right-full top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1E293B] border-l border-t border-white/10 -rotate-45" />
              </div>
            )}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
