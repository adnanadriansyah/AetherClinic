import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Download, CheckCircle, Clock, DollarSign, ChevronRight, FileText } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import GlassCard from '../components/ui/GlassCard';
import StatCard from '../components/ui/StatCard';
import { invoices, patientStats } from '../data/mockData';

export default function PaymentBilling() {
  const [activeTab, setActiveTab] = useState('invoices');

  return (
    <DashboardLayout title="Payment & Billing" role="patient">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="text-primary">Billing</span>
          <ChevronRight className="w-3 h-3" />
          <span>Payment History</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard icon={DollarSign} label="Total Spent" value={`$${patientStats.totalSpent.toLocaleString()}`} color="primary" />
          <StatCard icon={CheckCircle} label="Paid Invoices" value={invoices.filter(i => i.status === 'paid').length.toString()} color="success" />
          <StatCard icon={Clock} label="Pending" value={invoices.filter(i => i.status === 'pending').length.toString()} color="warning" />
        </div>

        <div className="flex gap-2 mb-4">
          {['invoices', 'payment-methods'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab ? 'bg-primary text-white' : 'bg-white/5 text-text-secondary hover:bg-white/10'
              }`}>
              {tab === 'invoices' ? 'Invoices' : 'Payment Methods'}
            </button>
          ))}
        </div>

        {activeTab === 'invoices' && (
          <GlassCard className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-text-secondary border-b border-white/5">
                    <th className="text-left py-3 px-2 font-medium">Invoice</th>
                    <th className="text-left py-3 px-2 font-medium">Date</th>
                    <th className="text-left py-3 px-2 font-medium">Description</th>
                    <th className="text-right py-3 px-2 font-medium">Amount</th>
                    <th className="text-center py-3 px-2 font-medium">Status</th>
                    <th className="text-center py-3 px-2 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-2 text-white font-medium">{inv.id}</td>
                      <td className="py-3 px-2 text-text-secondary">{inv.date}</td>
                      <td className="py-3 px-2 text-text-secondary">{inv.description}</td>
                      <td className="py-3 px-2 text-white text-right font-semibold">${inv.amount}</td>
                      <td className="py-3 px-2 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          inv.status === 'paid' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                        }`}>{inv.status}</span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <button className="text-primary hover:text-primary-light text-xs flex items-center gap-1 mx-auto">
                          <Download className="w-3 h-3" /> PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}

        {activeTab === 'payment-methods' && (
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Saved Cards</h3>
              <button className="text-sm text-primary hover:text-primary-light">+ Add New</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 rounded-lg gradient-bg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Visa ending in 4242</p>
                    <p className="text-xs text-text-secondary">Expires 12/28</p>
                  </div>
                </div>
                <span className="text-xs text-success bg-success/10 px-2 py-0.5 rounded-full">Default</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Mastercard ending in 8888</p>
                    <p className="text-xs text-text-secondary">Expires 06/27</p>
                  </div>
                </div>
                <button className="text-xs text-text-secondary hover:text-white">Edit</button>
              </div>
            </div>
          </GlassCard>
        )}
      </div>
    </DashboardLayout>
  );
}
