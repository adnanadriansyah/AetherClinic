import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useSupabase } from '../../context/SupabaseContext';
import { useAuth } from '../../context/AuthContext';
import Overview from './Overview';
import Patients from './Patients';
import Doctors from './Doctors';
import Appointments from './Appointments';
import Treatments from './Treatments';
import Reports from './Reports';
import Settings from './Settings';

import {
  LayoutDashboard, Users, Stethoscope, CalendarDays, Activity, BarChart2, Settings as SettingsIcon,
  ChevronLeft, ChevronRight, LogOut, Shield, Search, Sun, Moon, Bell, ChevronDown, Menu, X
} from 'lucide-react';

const navItems = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { id: 'patients', icon: Users, label: 'Patients' },
  { id: 'doctors', icon: Stethoscope, label: 'Doctors' },
  { id: 'appointments', icon: CalendarDays, label: 'Appointments' },
  { id: 'treatments', icon: Activity, label: 'Treatments' },
  { id: 'reports', icon: BarChart2, label: 'Reports' },
  { id: 'settings', icon: SettingsIcon, label: 'Settings' },
];

const pageTitles = {
  overview: 'Overview',
  patients: 'Patients',
  doctors: 'Doctors',
  appointments: 'Appointments',
  treatments: 'Treatments',
  reports: 'Reports',
  settings: 'Settings',
};

export default function AdminPortal() {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const supabaseCtx = useSupabase();
  const { logout: authLogout } = useAuth();
  const [currentPage, setCurrentPage] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = async () => {
    try {
      if (supabaseCtx?.signOut) await supabaseCtx.signOut();
      if (authLogout) authLogout();
    } catch (e) {
      console.warn('Logout fallback:', e);
    }
    navigate('/login');
  };

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarCollapsed(true);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const sidebarWidth = sidebarCollapsed ? 64 : 240;

  const renderPage = () => {
    const props = { isDark };
    switch (currentPage) {
      case 'overview': return <Overview />;
      case 'patients': return <Patients />;
      case 'doctors': return <Doctors />;
      case 'appointments': return <Appointments />;
      case 'treatments': return <Treatments />;
      case 'reports': return <Reports />;
      case 'settings': return <Settings />;
      default: return <Overview />;
    }
  };

  return (
    <div className={`h-screen flex overflow-hidden ${isDark ? 'bg-[#0f1624]' : 'bg-[#f0f4f8]'}`}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        style={{ width: sidebarWidth }}
        className={`h-screen bg-[#0b1120] border-r border-white/5 flex flex-col shrink-0 overflow-hidden z-50 transition-all duration-300 ease-in-out
          ${isMobile ? (mobileOpen ? 'fixed left-0' : 'fixed -left-64') : 'relative'}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
              <p className="font-bold text-sm text-white whitespace-nowrap leading-tight">AetherClinic</p>
              <p className="text-[10px] text-blue-400 whitespace-nowrap">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => { if (!isMobile) setSidebarCollapsed(!sidebarCollapsed); else setMobileOpen(false); }}
            className={`hidden md:flex w-6 h-6 rounded-md bg-white/5 hover:bg-white/10 items-center justify-center transition-colors shrink-0 ${sidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}
          >
            {sidebarCollapsed ? <ChevronRight className="w-3 h-3 text-gray-400" /> : <ChevronLeft className="w-3 h-3 text-gray-400" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.id;
            return (
              <button key={item.id} onClick={() => { setCurrentPage(item.id); if (isMobile) setMobileOpen(false); }}
                className="group relative w-full text-left">
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-gradient-to-b from-blue-500 to-cyan-500" />
                )}
                <div className={`flex items-center gap-3 mx-1 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${active ? 'bg-blue-500/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                  <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'}`} />
                  <span className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                    {item.label}
                  </span>
                  {active && !sidebarCollapsed && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  )}
                </div>
                {sidebarCollapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 rounded-md bg-gray-800 border border-white/10 text-white text-xs font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl pointer-events-none">
                    {item.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 border-l border-t border-white/10 -rotate-45" />
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Collapsed toggle button at bottom */}
        {!isMobile && (
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="flex items-center justify-center h-10 mx-2 mb-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4 text-gray-400" /> : <ChevronLeft className="w-4 h-4 text-gray-400" />}
          </button>
        )}

        {/* Profile */}
        <div className="border-t border-white/5 p-3 shrink-0">
          <div className="flex items-center gap-3 px-1 py-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-lg shadow-purple-500/20">
              JD
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
              <p className="text-sm font-medium text-white truncate">John Doe</p>
              <p className="text-xs text-gray-400 truncate">Admin</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 mt-1 group">
            <LogOut className="w-5 h-5 shrink-0 group-hover:text-red-400 transition-colors" />
            <span className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
              Sign Out
            </span>
            {sidebarCollapsed && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 rounded-md bg-gray-800 border border-white/10 text-white text-xs font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl pointer-events-none">
                Sign Out
                <div className="absolute right-full top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 border-l border-t border-white/10 -rotate-45" />
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top navbar */}
        <header className={`sticky top-0 z-30 border-b ${isDark ? 'bg-[#0f1624]/95 backdrop-blur-md border-white/5' : 'bg-white/95 backdrop-blur-md border-gray-200'}`}>
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <div className="flex items-center gap-4">
              <button onClick={() => setMobileOpen(true)} className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5">
                <Menu className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-700'}`} />
              </button>
              <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {pageTitles[currentPage]}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                <Search className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <input type="text" placeholder="Search..."
                  className={`bg-transparent text-sm focus:outline-none w-36 lg:w-48 ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-400'}`} />
              </div>

              {/* Theme toggle */}
              <button onClick={toggleTheme}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${isDark ? 'hover:bg-white/5 text-yellow-400' : 'hover:bg-gray-100 text-amber-500'}`}>
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors relative ${isDark ? 'hover:bg-white/5 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">3</span>
                </button>
                {showNotif && (
                  <div className={`absolute right-0 mt-2 w-72 rounded-xl border shadow-xl ${isDark ? 'bg-[#151e30] border-white/10' : 'bg-white border-gray-200'}`}>
                    <div className={`px-4 py-3 border-b ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                      <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Notifications</p>
                    </div>
                    <div className="p-2 space-y-1">
                      {[
                        'Appointment with Dr. Mitchell tomorrow',
                        'Lab results ready for review',
                        'New patient registration',
                      ].map((msg, i) => (
                        <div key={i} className={`flex items-start gap-3 p-2 rounded-lg ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'} transition-colors cursor-pointer`}>
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{msg}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative">
                <button onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">JD</div>
                  <div className="hidden md:block text-left">
                    <p className={`text-sm font-medium leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>John Doe</p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Admin</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 hidden md:block ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>
                {showProfile && (
                  <div className={`absolute right-0 mt-2 w-44 rounded-xl border shadow-xl ${isDark ? 'bg-[#151e30] border-white/10' : 'bg-white border-gray-200'}`}>
                    <div className="p-2 space-y-0.5">
                      {['Profile', 'Account', 'Help Center'].map((item) => (
                        <button key={item}
                          className={`w-full text-left px-3 py-2 text-sm rounded-lg ${isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-50'} transition-colors`}>
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto animate-fadeIn">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}
