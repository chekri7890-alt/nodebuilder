import React from 'react';
import { 
  ArrowLeft, 
  Zap, 
  Play, 
  Settings, 
  Share2, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Activity, 
  Box, 
  Cpu, 
  Layers, 
  GitBranch, 
  ArrowRight,
  User,
  Calendar,
  Tag,
  Code2,
  FileText,
  Database
} from 'lucide-react';
import { motion } from 'motion/react';
import { AppMetadata, TabType } from '../types';
import { AI_AGENTS, TOOLS, APPS, WORKFLOWS } from '../constants';

interface ComponentDetailTabProps {
  componentId: string;
  setActiveTab: (tab: TabType) => void;
}

export const ComponentDetailTab: React.FC<ComponentDetailTabProps> = ({ componentId, setActiveTab }) => {
  // Find the component in any of the lists
  const allItems = [...AI_AGENTS, ...TOOLS, ...APPS, ...WORKFLOWS];
  const item = allItems.find(i => i.id === componentId);

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-slate-500">
        <AlertCircle size={48} className="mb-4 opacity-20" />
        <h2 className="text-xl font-bold">Component Not Found</h2>
        <button 
          onClick={() => setActiveTab('home')}
          className="mt-4 text-primary font-medium hover:underline"
        >
          Return Home
        </button>
      </div>
    );
  }

  const getTheme = (category: string) => {
    if (category.includes('Marketing')) return { primary: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', icon: Zap };
    if (category.includes('Sales')) return { primary: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', icon: TrendingUp };
    if (category.includes('Engineering')) return { primary: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', icon: Code2 };
    if (category.includes('Finance')) return { primary: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', icon: Activity };
    if (category.includes('HR')) return { primary: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100', icon: User };
    return { primary: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-100', icon: Box };
  };

  const theme = getTheme(item.category);
  const Icon = theme.icon;

  return (
    <div className="min-h-screen bg-white text-slate-900 page-enter">
      {/* Navigation / Breadcrumb */}
      <div className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
          <button 
            onClick={() => setActiveTab('apps')}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium text-sm"
          >
            <ArrowLeft size={16} /> Back to Apps
          </button>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-all"><Share2 size={18} /></button>
            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-all"><Settings size={18} /></button>
            <button className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all flex items-center gap-2">
              <Play size={14} fill="currentColor" /> Run {item.type}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className={`py-20 ${theme.bg} border-b ${theme.border}`}>
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${theme.bg} ${theme.primary} border ${theme.border}`}>
                  {item.type}
                </span>
                <span className="text-slate-400 text-sm">•</span>
                <span className="text-slate-500 text-sm font-medium">{item.category}</span>
              </div>
              <h1 className="text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                {item.name}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {item.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-500">
                    <Tag size={12} /> {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 relative overflow-hidden group">
                <div className={`absolute top-0 right-0 w-32 h-32 ${theme.bg} rounded-bl-full opacity-50 -mr-10 -mt-10 transition-transform group-hover:scale-110`} />
                <div className="relative space-y-6">
                  <div className="flex justify-between items-center">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${theme.bg} ${theme.primary}`}>
                      <Icon size={32} />
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Success Rate</div>
                      <div className="text-2xl font-bold text-emerald-600">{item.successRate}%</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Total Runs</div>
                      <div className="text-xl font-bold">{item.totalRuns.toLocaleString()}</div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Avg. Latency</div>
                      <div className="text-xl font-bold">{item.avgDuration}</div>
                    </div>
                  </div>
                  <button className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${theme.bg} ${theme.primary} hover:opacity-80`}>
                    View Analytics
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-16">
            {/* How it Works / Architecture */}
            <section>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Cpu size={24} className={theme.primary} /> How it Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(item.nodes || item.nodeList || item.uiComponents || []).map((node, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-lg hover:border-slate-200 transition-all">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors shadow-sm">
                      <Layers size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{node}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Integrated component handling logic and data processing for {item.name}.</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Performance & History */}
            <section>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Activity size={24} className={theme.primary} /> Performance History
              </h2>
              <div className="bg-white border border-slate-200 rounded-3xl p-8">
                <div className="flex items-end gap-2 h-40 mb-6">
                  {[40, 60, 45, 80, 70, 90, 85, 100, 95, 110, 105, 120].map((h, i) => (
                    <div key={i} className="flex-1 bg-slate-100 rounded-t-lg relative group" style={{ height: `${h}%` }}>
                      <div className={`absolute inset-0 rounded-t-lg opacity-0 group-hover:opacity-100 transition-all ${theme.bg.replace('bg-', 'bg-')}`} />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                  <span>Last 30 Days</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-200" /> Runs</span>
                    <span className="flex items-center gap-1.5"><div className={`w-2 h-2 rounded-full ${theme.bg}`} /> Success</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Meta Info */}
          <div className="lg:col-span-4 space-y-10">
            {/* Metadata Card */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Deployment Info</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-200/50">
                  <div className="flex items-center gap-3 text-slate-500">
                    <User size={16} /> <span className="text-sm font-medium">Owner</span>
                  </div>
                  <span className="text-sm font-bold">{item.owner}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-200/50">
                  <div className="flex items-center gap-3 text-slate-500">
                    <Calendar size={16} /> <span className="text-sm font-medium">Created</span>
                  </div>
                  <span className="text-sm font-bold">{item.created}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-200/50">
                  <div className="flex items-center gap-3 text-slate-500">
                    <Clock size={16} /> <span className="text-sm font-medium">Status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.status === 'Running' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                    <span className="text-sm font-bold">{item.status}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3 text-slate-500">
                    <Database size={16} /> <span className="text-sm font-medium">Cost/Run</span>
                  </div>
                  <span className="text-sm font-bold text-emerald-600">{item.costPerRun || '-'}</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 px-2">Recent Activity</h3>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all group cursor-pointer">
                    <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors shadow-sm">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Successful Execution</div>
                      <div className="text-xs text-slate-500">Processed 12 items • {i * 10}m ago</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 border border-slate-200 text-slate-500 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
                View Full Logs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className={`py-20 ${theme.bg} border-t ${theme.border} text-center`}>
        <div className="max-w-2xl mx-auto px-8 space-y-6">
          <h2 className="text-3xl font-bold">Ready to deploy {item.name}?</h2>
          <p className="text-slate-600">Start running this {item.type.toLowerCase()} in your production environment with one click.</p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-2">
              <Play size={18} fill="currentColor" /> Launch Now
            </button>
            <button className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-all">
              Edit Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
