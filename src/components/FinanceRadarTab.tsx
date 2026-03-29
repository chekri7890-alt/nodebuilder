import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  CreditCard, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight, 
  ArrowRight,
  PieChart, 
  RefreshCw, 
  Slack, 
  Zap, 
  Calendar, 
  Download,
  CheckCircle2,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FinanceRadarTab: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState<any | null>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setData({
        mrr: '$142,800',
        mrrChange: '+12.4%',
        expenses: '$42,300',
        expensesChange: '-2.1%',
        netProfit: '$100,500',
        anomalies: [
          { type: 'Warning', msg: 'Unusual spike in AWS spending (+$1,200)', icon: AlertTriangle, color: 'text-amber-500 bg-amber-500/10' },
          { type: 'Info', msg: 'Subscription churn rate decreased to 1.2%', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-500/10' },
        ],
        lastSync: 'Just now'
      });
      setIsRefreshing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfb] text-slate-900 page-enter">
      {/* Top Navigation */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-100">
              <TrendingUp size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">FinanceRadar <span className="text-emerald-600">AI</span></h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Real-time Revenue Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right mr-4">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-0.5">Last Sync</div>
              <div className="text-sm font-bold text-slate-900">{data ? data.lastSync : '2h ago'}</div>
            </div>
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-10 px-4 bg-slate-900 text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition-all active:scale-[0.98]"
            >
              <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} /> {isRefreshing ? 'Syncing...' : 'Sync Now'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Stats */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: 'Monthly Revenue', value: data?.mrr || '$124,309', change: data?.mrrChange || '+8.2%', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
                { label: 'Total Expenses', value: data?.expenses || '$38,120', change: data?.expensesChange || '+1.4%', icon: CreditCard, color: 'text-red-600 bg-red-50' },
                { label: 'Net Profit', value: data?.netProfit || '$86,189', change: '+12.5%', icon: PieChart, color: 'text-blue-600 bg-blue-50' },
              ].map((stat, i) => (
                <div key={i} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                      <stat.icon size={20} />
                    </div>
                    <div className={`flex items-center gap-0.5 text-xs font-bold ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                      {stat.change} {stat.change.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">{stat.label}</div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Main Chart Area */}
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Revenue Trends</h3>
                  <p className="text-sm text-slate-500">Daily performance across all Stripe accounts</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all">7D</button>
                  <button className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all">30D</button>
                  <button className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all">90D</button>
                </div>
              </div>

              <div className="h-[300px] w-full relative flex items-end gap-2">
                {[40, 60, 45, 80, 70, 90, 85, 100, 95, 110, 105, 120].map((h, i) => (
                  <div key={i} className="flex-1 bg-slate-50 rounded-t-lg relative group cursor-pointer" style={{ height: `${h}%` }}>
                    <div className="absolute inset-0 bg-emerald-600 rounded-t-lg opacity-0 group-hover:opacity-100 transition-all" />
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                      ${(h * 1.2).toFixed(1)}k
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                <span>Mar 01</span>
                <span>Mar 15</span>
                <span>Mar 30</span>
              </div>
            </div>

            {/* Anomaly Detection */}
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Activity size={20} className="text-emerald-600" /> Anomaly Detection
                </h3>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-bold uppercase tracking-widest">AI Active</span>
              </div>

              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  {isRefreshing ? (
                    <motion.div 
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                    >
                      <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
                      <p className="text-sm text-slate-500 font-medium">Analyzing transaction patterns...</p>
                    </motion.div>
                  ) : (
                    (data?.anomalies || [
                      { type: 'Warning', msg: 'Unusual spike in AWS spending (+$1,200)', icon: AlertTriangle, color: 'text-amber-500 bg-amber-500/10' },
                      { type: 'Info', msg: 'Subscription churn rate decreased to 1.2%', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-500/10' },
                    ]).map((anomaly: any, i: number) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl hover:border-emerald-200 transition-all group"
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${anomaly.color}`}>
                          <anomaly.icon size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{anomaly.type}</div>
                          <p className="text-sm font-medium text-slate-700">{anomaly.msg}</p>
                        </div>
                        <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900 transition-all">
                          <ArrowRight size={18} />
                        </button>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl shadow-slate-200">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Integrations</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold">Stripe</div>
                      <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Connected</div>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <Slack size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold">Slack Alerts</div>
                      <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Active</div>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Zap size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold">QuickBooks</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Not Connected</div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-8 py-3 bg-white text-slate-900 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">
                Manage Integrations
              </button>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Quick Reports</h3>
              <div className="space-y-4">
                {[
                  { label: 'Monthly P&L', icon: FileText },
                  { label: 'Tax Summary', icon: Calendar },
                  { label: 'Expense Audit', icon: Download },
                ].map((item, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all group">
                    <div className="flex items-center gap-3">
                      <item.icon size={18} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
                      <span className="text-sm font-medium text-slate-700">{item.label}</span>
                    </div>
                    <ArrowRight size={14} className="text-slate-300 group-hover:text-emerald-600 transition-all group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FileText = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);
