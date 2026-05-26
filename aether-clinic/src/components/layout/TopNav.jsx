import { useState } from 'react';
import { Menu, Moon, Sun, Bell, Search, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function TopNav({ onMenuClick, title = 'Dashboard' }) {
  const { isDark, toggleTheme } = useTheme();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-30 glass border-b border-white/5 px-4 lg:px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="lg:hidden w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
            <Menu className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-text-secondary" />
            <input type="text" placeholder="Search..." className="bg-transparent text-sm text-white placeholder-text-secondary focus:outline-none w-40" />
          </div>

          <button onClick={toggleTheme} className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
            {isDark ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-text-secondary" />}
          </button>

          <div className="relative">
            <button onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors relative">
              <Bell className="w-4 h-4 text-white" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-danger text-white text-[10px] font-bold flex items-center justify-center">3</span>
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 glass-card p-4">
                <p className="text-sm font-semibold text-white mb-3">Notifications</p>
                <div className="space-y-2">
                  {['Appointment with Dr. Mitchell tomorrow', 'Lab results ready', 'Prescription refill available'].map((msg, i) => (
                    <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                      <p className="text-sm text-text-secondary">{msg}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
              className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                JD
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white leading-tight">John Doe</p>
                <p className="text-xs text-text-secondary">Patient</p>
              </div>
              <ChevronDown className="w-4 h-4 text-text-secondary hidden md:block" />
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 glass-card p-2">
                {['Profile', 'Settings', 'Help'].map((item) => (
                  <button key={item} className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
