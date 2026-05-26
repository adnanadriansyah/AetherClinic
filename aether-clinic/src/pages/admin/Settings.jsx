import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ChevronRight, Save, Sun, Moon, Eye, EyeOff, Download, AlertTriangle, Bell, Mail, Smartphone, FileText } from 'lucide-react';

function Toggle({ enabled, onChange }) {
  return (
    <button onClick={onChange}
      className={`relative w-10 h-5 rounded-full transition-colors ${enabled ? 'bg-blue-600' : 'bg-gray-600'}`}>
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
}

export default function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const [showPwd, setShowPwd] = useState(false);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSms, setNotifSms] = useState(false);
  const [notifReports, setNotifReports] = useState(true);
  const [twoFA, setTwoFA] = useState(false);
  const [accentColor, setAccentColor] = useState('blue');

  const cardTheme = isDark ? 'bg-[#151e30] border-white/5' : 'bg-white border-gray-200';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const mutedText = isDark ? 'text-[#94A3B8]' : 'text-gray-500';
  const inputBg = isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200';

  const Section = ({ title, children }) => (
    <div className={`rounded-xl border ${cardTheme} p-5`}>
      <h3 className={`text-base font-semibold mb-5 ${textColor}`}>{title}</h3>
      {children}
    </div>
  );

  const swatches = [
    { name: 'blue', class: 'bg-blue-500' },
    { name: 'cyan', class: 'bg-cyan-500' },
    { name: 'purple', class: 'bg-purple-500' },
    { name: 'green', class: 'bg-green-500' },
    { name: 'amber', class: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className={`flex items-center gap-2 text-sm ${mutedText}`}>
        <span className="text-blue-400">Admin</span>
        <ChevronRight className="w-3 h-3" />
        <span>Settings</span>
      </div>

      <Section title="Clinic Profile">
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: 'Clinic Name', val: 'Aether Clinic Beverly Hills' },
            { label: 'Address', val: '123 Wellness Ave, Suite 100, Beverly Hills, CA 90210' },
            { label: 'Phone', val: '(555) 123-4567' },
            { label: 'Email', val: 'hello@aetherclinic.com' },
          ].map((f, i) => (
            <div key={i} className={i === 1 ? 'sm:col-span-2' : ''}>
              <label className={`block text-sm font-medium mb-1.5 ${textColor}`}>{f.label}</label>
              <input defaultValue={f.val} className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50`} />
            </div>
          ))}
        </div>
        <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors mt-4">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </Section>

      <Section title="Appearance">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isDark ? <Moon className="w-5 h-5 text-yellow-400" /> : <Sun className="w-5 h-5 text-amber-400" />}
              <div>
                <p className={`text-sm font-medium ${textColor}`}>Theme Mode</p>
                <p className={`text-xs ${mutedText}`}>{isDark ? 'Dark mode is active' : 'Light mode is active'}</p>
              </div>
            </div>
            <Toggle enabled={isDark} onChange={toggleTheme} />
          </div>
          <div className={`pt-4 border-t ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
            <p className={`text-sm font-medium mb-3 ${textColor}`}>Accent Color</p>
            <div className="flex gap-3">
              {swatches.map(s => (
                <button key={s.name} onClick={() => setAccentColor(s.name)}
                  className={`w-8 h-8 rounded-full ${s.class} transition-all ${accentColor === s.name ? 'ring-2 ring-offset-2 ring-offset-transparent ring-white scale-110' : 'opacity-60 hover:opacity-100'}`} />
              ))}
            </div>
          </div>
        </div>
        <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors mt-4">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </Section>

      <Section title="Notifications">
        <div className="space-y-4">
          {[
            { icon: Mail, label: 'Email Notifications', desc: 'Receive email updates about appointments', state: notifEmail, set: setNotifEmail },
            { icon: Smartphone, label: 'SMS Reminders', desc: 'Get text message reminders 24h before', state: notifSms, set: setNotifSms },
            { icon: FileText, label: 'Weekly Reports', desc: 'Weekly summary of clinic activity', state: notifReports, set: setNotifReports },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${mutedText}`} />
                <div>
                  <p className={`text-sm font-medium ${textColor}`}>{item.label}</p>
                  <p className={`text-xs ${mutedText}`}>{item.desc}</p>
                </div>
              </div>
              <Toggle enabled={item.state} onChange={() => item.set(!item.state)} />
            </div>
          ))}
        </div>
        <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors mt-4">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </Section>

      <Section title="Security">
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'Current Password', type: 'password' },
              { label: 'New Password', type: 'password' },
              { label: 'Confirm New Password', type: 'password' },
            ].map((f, i) => (
              <div key={i}>
                <label className={`block text-sm font-medium mb-1.5 ${textColor}`}>{f.label}</label>
                <div className="relative">
                  <input type={showPwd ? 'text' : f.type} className={`w-full px-3 py-2 text-sm rounded-lg border ${inputBg} ${textColor} focus:outline-none focus:border-blue-500/50 pr-9`} placeholder="••••••••" />
                  {i === 1 && (
                    <button onClick={() => setShowPwd(!showPwd)} className={`absolute right-2.5 top-1/2 -translate-y-1/2 ${mutedText} hover:text-blue-400`}>
                      {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className={`pt-4 border-t ${isDark ? 'border-white/5' : 'border-gray-200'} flex items-center justify-between`}>
            <div>
              <p className={`text-sm font-medium ${textColor}`}>Two-Factor Authentication</p>
              <p className={`text-xs ${mutedText}`}>Add an extra layer of security</p>
            </div>
            <Toggle enabled={twoFA} onChange={() => setTwoFA(!twoFA)} />
          </div>
        </div>
        <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors mt-4">
          <Save className="w-4 h-4" /> Update Password
        </button>
      </Section>

      <Section title="Data & Privacy">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${textColor}`}>Export Clinic Data</p>
              <p className={`text-xs ${mutedText}`}>Download all patient and treatment records</p>
            </div>
            <button className="flex items-center gap-1.5 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
          <div className={`rounded-lg border border-red-500/30 p-4 ${isDark ? 'bg-red-500/5' : 'bg-red-50'}`}>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-400">Danger Zone</p>
                <p className={`text-xs mt-1 ${isDark ? 'text-red-300/70' : 'text-red-600/70'}`}>
                  Once you delete your clinic data, there is no going back. Please be certain.
                </p>
                <button className="mt-3 flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                  <AlertTriangle className="w-4 h-4" /> Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
