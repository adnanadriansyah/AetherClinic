import { useState, useEffect, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

let toastId = 0;
let addToastFn = null;

export function toast({ type = 'success', title, message, duration = 4000 }) {
  if (addToastFn) addToastFn({ id: ++toastId, type, title, message, duration });
}

const icons = {
  success: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/30' },
  error: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' },
  info: { icon: AlertCircle, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
};

export default function ToastContainer() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    addToastFn = (item) => setItems(prev => [...prev, item]);
    return () => { addToastFn = null; };
  }, []);

  const remove = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {items.map((item) => (
        <ToastItem key={item.id} item={item} onRemove={remove} />
      ))}
    </div>
  );
}

function ToastItem({ item, onRemove }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onRemove(item.id), 300);
    }, item.duration);
    return () => clearTimeout(timer);
  }, [item, onRemove]);

  const cfg = icons[item.type] || icons.info;
  const Icon = cfg.icon;

  return (
    <div
      className={`pointer-events-auto rounded-xl border shadow-xl p-4 transition-all duration-300 ${cfg.bg} backdrop-blur-md ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${cfg.color}`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white">{item.title}</p>
          {item.message && <p className="text-xs text-gray-300 mt-0.5">{item.message}</p>}
        </div>
        <button onClick={() => { setVisible(false); setTimeout(() => onRemove(item.id), 300); }} className="text-gray-400 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
