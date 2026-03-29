import React from 'react';
import { 
  Home, 
  Brain, 
  Monitor, 
  Palette, 
  LayoutDashboard, 
  Package, 
  Database, 
  Search, 
  Settings, 
  HelpCircle,
  Play,
  Pin,
  Clock,
  Zap
} from 'lucide-react';
import { TabType } from '../types';
import { AI_AGENTS, WORKFLOWS } from '../constants';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onComponentClick: (id: string) => void;
}

const NavItem = ({ 
  icon: Icon, 
  label, 
  id, 
  active, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  id: TabType, 
  active: boolean, 
  onClick: (id: TabType) => void 
}) => (
  <button
    onClick={() => onClick(id)}
    className={`
      w-full flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-150 group
      ${active 
        ? 'bg-primary-light border-l-[3px] border-primary text-primary font-semibold' 
        : 'text-text-secondary hover:bg-tertiary hover:text-text-primary'}
    `}
  >
    <Icon size={18} className={active ? 'text-primary' : 'group-hover:text-text-primary'} />
    <span className="text-[14px]">{label}</span>
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onComponentClick }) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] bg-surface border-r border-border flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">N</div>
        <span className="text-xl font-semibold tracking-tight text-text-primary">NodeBuilder</span>
      </div>

      {/* Search */}
      <div className="px-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-white border border-border rounded-md py-1.5 pl-9 pr-3 text-[13px] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light transition-all"
          />
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-2 space-y-1 overflow-y-auto no-scrollbar">
        <NavItem icon={LayoutDashboard} label="Dashboard" id="dashboard" active={activeTab === 'dashboard'} onClick={setActiveTab} />
        <NavItem icon={Home} label="Home" id="home" active={activeTab === 'home'} onClick={setActiveTab} />
        <NavItem icon={Zap} label="Builder" id="builder" active={activeTab === 'builder'} onClick={setActiveTab} />
        <NavItem icon={Brain} label="Apps & Agents" id="apps" active={activeTab === 'apps'} onClick={setActiveTab} />
        <NavItem icon={Monitor} label="Canvas" id="canvas" active={activeTab === 'canvas'} onClick={setActiveTab} />
        <NavItem icon={Palette} label="UI Builder" id="ui" active={activeTab === 'ui'} onClick={setActiveTab} />
        <NavItem icon={Package} label="Marketplace" id="marketplace" active={activeTab === 'marketplace'} onClick={setActiveTab} />
        <NavItem icon={Database} label="Data" id="data" active={activeTab === 'data'} onClick={setActiveTab} />

        <div className="h-[1px] bg-border mx-2 my-4" />

        {/* Dynamic Sections */}
        <div className="px-2 mb-4">
          <h4 className="text-[11px] uppercase tracking-widest text-text-muted font-bold mb-3 flex items-center gap-2 px-2">
            <Pin size={10} /> Pinned Agents
          </h4>
          <div className="space-y-1">
            {[
              { id: 'contentcraft-ai', name: 'ContentCraft AI', color: 'bg-primary' },
              { id: 'leadhunter-pro', name: 'LeadHunter Pro', color: 'bg-indigo-500' },
              { id: 'bugpatrol', name: 'BugPatrol', color: 'bg-emerald-500' },
              { id: 'financeradar', name: 'FinanceRadar', color: 'bg-blue-500' },
              { id: 'talentscout', name: 'TalentScout', color: 'bg-purple-500' },
            ].map((agent) => (
              <div 
                key={agent.id}
                onClick={() => {
                  const agentTabs: Record<string, TabType> = {
                    'contentcraft-ai': 'contentcraft-ai',
                    'leadhunter-pro': 'leadhunter-pro',
                    'bugpatrol': 'bugpatrol',
                    'financeradar': 'financeradar',
                    'talentscout': 'talentscout'
                  };
                  if (agentTabs[agent.id]) {
                    setActiveTab(agentTabs[agent.id]);
                  } else {
                    onComponentClick(agent.id);
                  }
                }}
                className={`flex items-center justify-between group cursor-pointer px-2 py-1.5 rounded-md transition-colors ${activeTab === agent.id ? 'bg-primary-light border-l-[3px] border-primary' : 'hover:bg-tertiary'}`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${agent.color} ${activeTab === agent.id ? 'animate-pulse-coral' : ''}`} />
                  <span className={`text-[13px] group-hover:text-text-primary ${activeTab === agent.id ? 'text-primary font-semibold' : 'text-text-secondary'}`}>{agent.name}</span>
                </div>
                <button className="p-1 text-text-muted opacity-0 group-hover:opacity-100 hover:text-primary transition-all">
                  <Play size={12} fill="currentColor" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="px-2 mb-4">
          <h4 className="text-[11px] uppercase tracking-widest text-text-muted font-bold mb-3 px-2">My Workflows</h4>
          <div className="space-y-1">
            {WORKFLOWS.slice(0, 3).map(w => (
              <div 
                key={w.id} 
                onClick={() => onComponentClick(w.id)}
                className="px-2 py-1 text-[13px] text-text-secondary hover:text-text-primary hover:bg-tertiary rounded-md cursor-pointer transition-colors flex justify-between items-center group"
              >
                <span>{w.name}</span>
                <span className="text-[10px] text-text-muted opacity-0 group-hover:opacity-100">{w.lastRun}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-2 mb-4">
          <h4 className="text-[11px] uppercase tracking-widest text-text-muted font-bold mb-3 px-2">Recent Tasks</h4>
          <div className="space-y-1">
            {AI_AGENTS.slice(0, 3).map(t => (
              <div 
                key={t.id} 
                onClick={() => {
                  const agentTabs: Record<string, TabType> = {
                    'contentcraft-ai': 'contentcraft-ai',
                    'leadhunter-pro': 'leadhunter-pro',
                    'bugpatrol': 'bugpatrol',
                    'financeradar': 'financeradar',
                    'talentscout': 'talentscout'
                  };
                  if (agentTabs[t.id]) setActiveTab(agentTabs[t.id]);
                  else onComponentClick(t.id);
                }}
                className="px-2 py-1 text-[13px] text-text-secondary hover:text-text-primary hover:bg-tertiary rounded-md cursor-pointer transition-colors flex items-center gap-2"
              >
                <Clock size={12} className="text-text-muted" /> {t.name}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-border bg-surface">
        <div className="flex flex-col gap-1 mb-4">
          <button className="flex items-center gap-3 text-text-secondary hover:text-text-primary hover:bg-tertiary px-2 py-1.5 rounded-md transition-all">
            <Settings size={16} /> <span className="text-[13px]">Settings</span>
          </button>
          <button className="flex items-center gap-3 text-text-secondary hover:text-text-primary hover:bg-tertiary px-2 py-1.5 rounded-md transition-all">
            <HelpCircle size={16} /> <span className="text-[13px]">Help</span>
          </button>
        </div>
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-xs border border-primary/10">AL</div>
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-text-primary">Alex Johnson</span>
            <span className="text-[11px] text-text-muted">Pro Plan</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
