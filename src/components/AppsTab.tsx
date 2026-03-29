import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  Plus, 
  Play, 
  Palette, 
  Monitor, 
  LayoutDashboard,
  MoreVertical,
  ChevronDown,
  Trash2,
  Download,
  Rocket,
  FileText,
  Brain,
  PauseCircle,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppMetadata, TabType } from '../types';
import { AI_AGENTS, TOOLS, APPS, WORKFLOWS } from '../constants';

export const AppsTab: React.FC<{ 
  setActiveTab: (tab: TabType) => void,
  onComponentClick: (id: string) => void 
}> = ({ setActiveTab, onComponentClick }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [filterType, setFilterType] = useState<string>('All');

  const allItems: AppMetadata[] = [...AI_AGENTS, ...TOOLS, ...APPS, ...WORKFLOWS];

  const filteredApps = allItems.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || app.type === filterType;
    return matchesSearch && matchesType;
  });

  const toggleSelect = (id: string) => {
    setSelectedApps(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'AI Agent': return "🤖";
      case 'App': return "📱";
      case 'Tool': return "🔧";
      case 'Workflow': return "⚡";
      default: return "📦";
    }
  };

  const handleAppClick = (app: AppMetadata) => {
    const agentTabs: Record<string, TabType> = {
      'ContentCraft AI': 'contentcraft-ai',
      'LeadHunter Pro': 'leadhunter-pro',
      'BugPatrol': 'bugpatrol',
      'FinanceRadar': 'financeradar',
      'TalentScout': 'talentscout'
    };
    if (agentTabs[app.name]) {
      setActiveTab(agentTabs[app.name]);
    } else {
      onComponentClick(app.id);
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto px-10 py-10 page-enter relative">
      {/* Create Modal */}
      <AnimatePresence>
        {isCreating && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreating(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-border flex justify-between items-center bg-surface">
                <h3 className="text-[18px] font-bold text-text-primary">Create New AI Application</h3>
                <button onClick={() => setIsCreating(false)} className="p-1 hover:bg-tertiary rounded text-text-muted">
                  <Plus size={20} className="rotate-45" />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { type: 'AI Agent', icon: Brain, desc: 'Autonomous reasoning' },
                    { type: 'App', icon: LayoutDashboard, desc: 'Visual interfaces' },
                    { type: 'Tool', icon: Rocket, desc: 'API & Automation' }
                  ].map(t => (
                    <button key={t.type} className="flex flex-col items-center p-4 border border-border rounded-xl hover:border-primary hover:bg-primary-light/10 transition-all group">
                      <t.icon size={24} className="text-text-muted group-hover:text-primary mb-2" />
                      <span className="text-[13px] font-bold text-text-primary mb-1">{t.type}</span>
                      <span className="text-[10px] text-text-muted text-center">{t.desc}</span>
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-text-muted uppercase tracking-wider mb-2">App Name</label>
                  <input type="text" placeholder="e.g. Customer Support Bot" className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-text-muted uppercase tracking-wider mb-2">Description</label>
                  <textarea placeholder="What does this app do?" className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-primary h-24 resize-none" />
                </div>
                <button className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-all shadow-md">
                  Initialize Workspace
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-[24px] font-semibold text-text-primary">Apps & Agents</h2>
          <p className="text-[14px] text-text-secondary">Build, run, and manage your AI-powered apps</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
            <input 
              type="text" 
              placeholder="Search apps..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[240px] bg-white border border-border rounded-md py-2 pl-9 pr-3 text-[13px] focus:outline-none focus:border-primary"
            />
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-2 border border-border rounded-md text-[13px] font-medium transition-colors ${showFilters ? 'bg-primary-light border-primary text-primary' : 'bg-white text-text-secondary hover:bg-surface'}`}
            >
              <Filter size={14} /> {filterType === 'All' ? 'Filter' : filterType}
            </button>
            {showFilters && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-xl z-50 p-2">
                {['All', 'AI Agent', 'App', 'Tool', 'Workflow'].map(t => (
                  <button 
                    key={t} 
                    onClick={() => { setFilterType(t); setShowFilters(false); }}
                    className={`w-full text-left px-3 py-2 rounded-md text-[13px] font-medium transition-colors ${filterType === t ? 'bg-primary-light text-primary' : 'hover:bg-surface text-text-secondary'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex bg-surface p-1 rounded-md border border-border">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-text-muted hover:text-text-secondary'}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-text-muted hover:text-text-secondary'}`}
            >
              <List size={16} />
            </button>
          </div>
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-[14px] font-semibold hover:bg-primary-dark transition-all active:scale-[0.97] shadow-sm"
          >
            <Plus size={16} /> New App
          </button>
        </div>
      </div>

      {/* Multi-select Bar */}
      {selectedApps.length > 0 && (
        <div className="sticky top-4 z-40 bg-text-primary text-white px-6 py-3 rounded-lg shadow-lg flex justify-between items-center mb-6 animate-page-enter">
          <div className="flex items-center gap-4">
            <span className="text-[14px] font-medium">{selectedApps.length} items selected</span>
            <div className="w-[1px] h-4 bg-white/20" />
            <button className="flex items-center gap-2 text-[13px] hover:text-primary-light transition-colors">
              <Play size={14} /> Run All
            </button>
            <button className="flex items-center gap-2 text-[13px] hover:text-error transition-colors">
              <Trash2 size={14} /> Delete
            </button>
            <button className="flex items-center gap-2 text-[13px] hover:text-primary-light transition-colors">
              <Download size={14} /> Export
            </button>
          </div>
          <button onClick={() => setSelectedApps([])} className="text-[13px] opacity-60 hover:opacity-100">Deselect all</button>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="space-y-10">
          {/* Grouping example */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-text-muted">
              <ChevronDown size={14} />
              <span className="text-[12px] font-bold uppercase tracking-widest">Pinned (2)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allItems.slice(0, 2).map(app => (
                <AppCard 
                  key={app.id} 
                  app={app} 
                  isSelected={selectedApps.includes(app.id)} 
                  onSelect={() => toggleSelect(app.id)} 
                  getIcon={getIconForType} 
                  onClick={() => handleAppClick(app)}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4 text-text-muted">
              <ChevronDown size={14} />
              <span className="text-[12px] font-bold uppercase tracking-widest">All Items ({filteredApps.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map(app => (
                <AppCard 
                  key={app.id} 
                  app={app} 
                  isSelected={selectedApps.includes(app.id)} 
                  onSelect={() => toggleSelect(app.id)} 
                  getIcon={getIconForType} 
                  onClick={() => handleAppClick(app)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* List View */
        <div className="bg-white border border-border rounded-lg overflow-hidden">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-surface border-b border-border text-text-muted font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-3 w-10">
                  <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                </th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Last Run</th>
                <th className="px-6 py-3">Total Runs</th>
                <th className="px-6 py-3">Success %</th>
                <th className="px-6 py-3">Cost</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredApps.map(app => (
                <tr key={app.id} className="hover:bg-primary-light/10 transition-colors group">
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      checked={selectedApps.includes(app.id)}
                      onChange={() => toggleSelect(app.id)}
                      className="rounded border-border text-primary focus:ring-primary" 
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{getIconForType(app.type)}</span>
                      <span className="font-semibold text-text-primary">{app.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        app.status === 'Idle' ? 'bg-success' : 
                        app.status === 'Running' ? 'bg-primary animate-pulse-coral' : 
                        app.status === 'Paused' ? 'bg-warning' :
                        'bg-error'
                      }`} />
                      <span className="capitalize">{app.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">{app.lastRun}</td>
                  <td className="px-6 py-4 text-text-secondary">{app.totalRuns.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${app.successRate > 90 ? 'text-success' : app.successRate > 80 ? 'text-warning' : 'text-error'}`}>
                      {app.successRate}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">{app.totalCost || app.costPerRun || '-'}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-primary-light hover:text-primary rounded transition-colors"><Play size={14} /></button>
                      <button className="p-1.5 hover:bg-primary-light hover:text-primary rounded transition-colors"><Palette size={14} /></button>
                      <button className="p-1.5 hover:bg-primary-light hover:text-primary rounded transition-colors"><Monitor size={14} /></button>
                      <button className="p-1.5 hover:bg-primary-light hover:text-primary rounded transition-colors"><MoreVertical size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

interface AppCardProps {
  app: AppMetadata;
  isSelected: boolean;
  onSelect: () => void;
  getIcon: (type: string) => string;
  onClick?: () => void;
}

const AppCard: React.FC<AppCardProps> = ({ app, isSelected, onSelect, getIcon, onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white border p-5 rounded-lg hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 group relative ${isSelected ? 'border-primary ring-1 ring-primary' : 'border-border'} ${onClick ? 'cursor-pointer' : ''}`}
  >
    <div className="absolute top-4 right-4 z-10">
      <input 
        type="checkbox" 
        checked={isSelected}
        onChange={onSelect}
        className="rounded border-border text-primary focus:ring-primary" 
      />
    </div>
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center text-xl">
          {getIcon(app.type)}
        </div>
        <div>
          <h4 className="text-[16px] font-semibold text-text-primary">{app.name}</h4>
          <span className="text-[11px] px-2 py-0.5 bg-primary-light text-primary rounded-full font-medium">
            {app.type}
          </span>
        </div>
      </div>
      <div className={`w-2 h-2 rounded-full mt-2 ${
        app.status === 'Idle' ? 'bg-success' : 
        app.status === 'Running' ? 'bg-primary animate-pulse-coral' : 
        app.status === 'Paused' ? 'bg-warning' :
        'bg-error'
      }`} />
    </div>
    <p className="text-[14px] text-text-secondary mb-4 line-clamp-2">{app.description}</p>
    <div className="flex flex-wrap gap-1.5 mb-4">
      {app.tags.map(tag => (
        <span key={tag} className="text-[10px] px-2 py-0.5 bg-surface border border-border rounded-md text-text-muted">{tag}</span>
      ))}
    </div>
    
    {app.status === 'Error' && app.error && (
      <div className="mb-4 p-2 bg-error/10 border border-error/20 rounded-md flex items-start gap-2">
        <AlertCircle size={14} className="text-error mt-0.5 shrink-0" />
        <span className="text-[11px] text-error leading-tight">{app.error}</span>
      </div>
    )}

    {app.status === 'Paused' && app.pausedReason && (
      <div className="mb-4 p-2 bg-warning/10 border border-warning/20 rounded-md flex items-start gap-2">
        <PauseCircle size={14} className="text-warning mt-0.5 shrink-0" />
        <span className="text-[11px] text-warning leading-tight">{app.pausedReason}</span>
      </div>
    )}

    <div className="text-[12px] text-text-muted mb-5 flex justify-between">
      <span>{app.lastRun} • {app.successRate}% success</span>
      <span className="font-medium text-text-secondary">{app.totalCost || app.costPerRun || '-'}</span>
    </div>
    <div className="grid grid-cols-4 gap-2">
      <button className="h-8 flex items-center justify-center gap-1 text-[11px] font-medium text-text-secondary bg-surface border border-border rounded hover:bg-primary-light hover:text-primary hover:border-primary transition-all">
        <Play size={12} /> Run
      </button>
      <button className="h-8 flex items-center justify-center gap-1 text-[11px] font-medium text-text-secondary bg-surface border border-border rounded hover:bg-primary-light hover:text-primary hover:border-primary transition-all">
        <Palette size={12} /> UI
      </button>
      <button className="h-8 flex items-center justify-center gap-1 text-[11px] font-medium text-text-secondary bg-surface border border-border rounded hover:bg-primary-light hover:text-primary hover:border-primary transition-all">
        <Monitor size={12} /> Canvas
      </button>
      <button className="h-8 flex items-center justify-center gap-1 text-[11px] font-medium text-text-secondary bg-surface border border-border rounded hover:bg-primary-light hover:text-primary hover:border-primary transition-all">
        <LayoutDashboard size={12} /> Dash
      </button>
    </div>
  </div>
);
