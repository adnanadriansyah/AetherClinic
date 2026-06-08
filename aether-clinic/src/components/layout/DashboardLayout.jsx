import { useState } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { useTheme } from '../../context/ThemeContext';

export default function DashboardLayout({ children, role = 'patient', title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <div className={`flex h-screen ${isDark ? 'bg-[#0f1624]' : 'bg-gray-50'} overflow-hidden`}>
      <Sidebar role={role} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopNav onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className={`flex-1 overflow-y-auto p-4 lg:p-6 ${isDark ? '' : 'bg-gray-50'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
