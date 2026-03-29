import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ChevronDown, 
  Download, 
  Filter, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreVertical, 
  Search, 
  RefreshCw 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ANALYTICS } from '../constants';

export const DashboardTab: React.FC = () => {
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [isLive, setIsLive] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const stats = [
    { label: 'Total Runs', value: ANALYTICS.stats.totalRuns.value, change: ANALYTICS.stats.totalRuns.change, trend: ANALYTICS.stats.totalRuns.trend, icon: RefreshCw, color: 'text-primary bg-primary-light' },
    { label: 'Success Rate', value: ANALYTICS.stats.successRate.value, change: ANALYTICS.stats.successRate.change, trend: ANALYTICS.stats.successRate.trend, icon: CheckCircle2, color: 'text-success bg-success/10' },
    { label: 'Avg. Latency', value: ANALYTICS.stats.avgLatency.value, change: ANALYTICS.stats.avgLatency.change, trend: ANALYTICS.stats.avgLatency.trend, icon: Clock, color: 'text-blue-500 bg-blue-500/10' },
    { label: 'Total Cost', value: ANALYTICS.stats.totalCost.value, change: ANALYTICS.stats.totalCost.change, trend: ANALYTICS.stats.totalCost.trend, icon: DollarSign, color: 'text-orange-500 bg-orange-500/10' },
  ];

  const appPerformance = ANALYTICS.appPerformance;

  // Simple SVG Line Chart Data
  const chartData = ANALYTICS.runHistory.map(d => d.runs);
  const maxVal = Math.max(...chartData);
  const points = chartData.map((val, i) => `${(i / (chartData.length - 1)) * 100},${100 - (val / maxVal) * 100}`).join(' ');

  return (
    <div className="max-w-[1200px] mx-auto px-10 py-12 page-enter">
      {/* Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-[28px] font-bold text-text-primary">Analytics Dashboard</h1>
            {isLive && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 px-2 py-0.5 bg-success/10 text-success rounded-full text-[10px] font-bold uppercase tracking-wider"
              >
                <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                Live
              </motion.div>
            )}
          </div>
          <p className="text-text-secondary text-[15px]">Monitor performance, costs, and health of your AI apps.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-md text-[13px] font-medium transition-all ${isLive ? 'bg-success text-white border-success shadow-lg shadow-success/20' : 'bg-white border-border text-text-secondary hover:bg-tertiary'}`}
          >
            <RefreshCw size={16} className={isLive ? 'animate-spin' : ''} /> {isLive ? 'Live Monitoring On' : 'Go Live'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-md text-[13px] font-medium text-text-secondary hover:bg-tertiary transition-all">
            <Calendar size={16} /> {dateRange} <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-[13px] font-medium hover:bg-primary-dark transition-all shadow-sm">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-border p-6 rounded-lg shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-[12px] font-bold ${stat.trend === 'up' ? 'text-success' : 'text-primary'}`}>
                {stat.change} {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <div className="text-[13px] text-text-muted font-bold uppercase tracking-wider mb-1">{stat.label}</div>
            <div className="text-[28px] font-bold text-text-primary">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Run History Chart */}
        <div className="lg:col-span-2 bg-white border border-border p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-[16px] font-bold text-text-primary">Workflow Run History</h3>
              <p className="text-[13px] text-text-muted">Total executions across all apps</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-[12px] text-text-secondary">Success</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-error" />
                <span className="text-[12px] text-text-secondary">Failed</span>
              </div>
            </div>
          </div>
          
          <div className="h-[240px] w-full relative">
            <svg 
              className="w-full h-full overflow-visible" 
              preserveAspectRatio="none" 
              viewBox="0 0 100 100"
              onMouseLeave={() => setHoveredPoint(null)}
            >
              {/* Grid Lines */}
              {[0, 25, 50, 75, 100].map(y => (
                <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#E8E5E1" strokeWidth="0.5" strokeDasharray="4" />
              ))}
              {/* Area Gradient */}
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D97757" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#D97757" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path 
                d={`M 0 100 L ${points} L 100 100 Z`} 
                fill="url(#chartGradient)" 
              />
              {/* Line */}
              <polyline 
                points={points} 
                fill="none" 
                stroke="#D97757" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              {/* Data Points */}
              {chartData.map((val, i) => (
                <g key={i}>
                  <circle 
                    cx={(i / (chartData.length - 1)) * 100} 
                    cy={100 - (val / maxVal) * 100} 
                    r={hoveredPoint === i ? "3" : "1.5"} 
                    fill={hoveredPoint === i ? "#D97757" : "white"} 
                    stroke="#D97757" 
                    strokeWidth="1.5" 
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredPoint(i)}
                  />
                </g>
              ))}
            </svg>
            
            {/* Tooltip */}
            <AnimatePresence>
              {hoveredPoint !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-10 bg-text-primary text-white p-2 rounded shadow-xl text-[11px] pointer-events-none"
                  style={{ 
                    left: `${(hoveredPoint / (chartData.length - 1)) * 100}%`, 
                    top: `${100 - (chartData[hoveredPoint] / maxVal) * 100}%`,
                    transform: 'translate(-50%, -120%)'
                  }}
                >
                  <div className="font-bold mb-0.5">{chartData[hoveredPoint]} Runs</div>
                  <div className="opacity-60">Success: 98.4%</div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[11px] text-text-muted font-bold">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>

        {/* Success Distribution */}
        <div className="bg-white border border-border p-6 rounded-lg shadow-sm">
          <h3 className="text-[16px] font-bold text-text-primary mb-6">Execution Health</h3>
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 mb-8">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#F1EFEC" strokeWidth="3.5" />
                <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#3DAA6E" strokeWidth="3.5" strokeDasharray="98 100" />
                <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#E5534B" strokeWidth="3.5" strokeDasharray="2 100" strokeDashoffset="-98" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[24px] font-bold text-text-primary">98%</span>
                <span className="text-[11px] text-text-muted uppercase font-bold tracking-wider">Healthy</span>
              </div>
            </div>
            
            <div className="w-full space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="text-[13px] text-text-secondary">Successful</span>
                </div>
                <span className="text-[13px] font-bold text-text-primary">{ANALYTICS.healthDistribution.success.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-error" />
                  <span className="text-[13px] text-text-secondary">Failed</span>
                </div>
                <span className="text-[13px] font-bold text-text-primary">{ANALYTICS.healthDistribution.failed.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <span className="text-[13px] text-text-secondary">Timed Out</span>
                </div>
                <span className="text-[13px] font-bold text-text-primary">{ANALYTICS.healthDistribution.timeout.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Performance Table */}
      <div className="bg-white border border-border rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h3 className="text-[16px] font-bold text-text-primary">App Performance</h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
              <input type="text" placeholder="Search apps..." className="bg-surface border border-border rounded-md py-1.5 pl-9 pr-3 text-[13px] focus:outline-none focus:border-primary" />
            </div>
            <button className="p-2 hover:bg-tertiary rounded-md text-text-muted transition-colors"><Filter size={16} /></button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface border-b border-border">
                <th className="px-6 py-4 text-[12px] font-bold text-text-muted uppercase tracking-wider">App Name</th>
                <th className="px-6 py-4 text-[12px] font-bold text-text-muted uppercase tracking-wider text-center">Total Runs</th>
                <th className="px-6 py-4 text-[12px] font-bold text-text-muted uppercase tracking-wider text-center">Success Rate</th>
                <th className="px-6 py-4 text-[12px] font-bold text-text-muted uppercase tracking-wider text-center">Avg. Latency</th>
                <th className="px-6 py-4 text-[12px] font-bold text-text-muted uppercase tracking-wider text-center">Total Cost</th>
                <th className="px-6 py-4 text-[12px] font-bold text-text-muted uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-[12px] font-bold text-text-muted uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {appPerformance.map((app, i) => (
                <tr key={i} className="hover:bg-surface transition-colors group">
                  <td className="px-6 py-4">
                    <div className="text-[14px] font-semibold text-text-primary">{app.name}</div>
                  </td>
                  <td className="px-6 py-4 text-center text-[14px] text-text-secondary">{app.runs.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[14px] font-bold text-text-primary">{app.success}%</span>
                      <div className="w-20 h-1 bg-tertiary rounded-full overflow-hidden">
                        <div className="h-full bg-success" style={{ width: `${app.success}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-[14px] text-text-secondary">{app.latency}</td>
                  <td className="px-6 py-4 text-center text-[14px] text-text-secondary font-mono">{app.cost}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        app.status === 'healthy' ? 'bg-success' : 
                        app.status === 'warning' ? 'bg-warning' : 'bg-error'
                      }`} />
                      <span className={`text-[12px] font-bold uppercase tracking-wider ${
                        app.status === 'healthy' ? 'text-success' : 
                        app.status === 'warning' ? 'text-warning' : 'text-error'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-tertiary rounded text-text-muted opacity-0 group-hover:opacity-100 transition-all"><MoreVertical size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 bg-surface border-t border-border flex justify-between items-center">
          <span className="text-[13px] text-text-muted">Showing 5 of 24 apps</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-border rounded text-[13px] text-text-secondary hover:bg-white transition-all disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-border rounded text-[13px] text-text-secondary hover:bg-white transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
