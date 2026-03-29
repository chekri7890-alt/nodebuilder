import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Monitor, 
  Palette, 
  Package, 
  Play, 
  ChevronDown, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Clock,
  PauseCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppMetadata, ActivityItem, TabType } from '../types';
import { AI_AGENTS, APPS, ACTIVITY_FEED } from '../constants';

const SectionLabel = ({ children, right }: { children: React.ReactNode, right?: React.ReactNode }) => (
  <div className="flex justify-between items-center mb-4 mt-10">
    <h3 className="text-[11px] uppercase tracking-[0.08em] text-text-muted font-bold">{children}</h3>
    {right && <div className="text-[14px] text-primary cursor-pointer hover:underline font-medium">{right}</div>}
  </div>
);

const Typewriter = ({ text, onComplete }: { text: string, onComplete: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        onComplete();
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <h1 className="text-[32px] font-semibold text-text-primary leading-tight">
      {displayedText}
      {showCursor && <span className="cursor-blink"></span>}
    </h1>
  );
};

export const HomeTab: React.FC<{ 
  setActiveTab: (tab: TabType) => void,
  onComponentClick: (id: string) => void 
}> = ({ setActiveTab, onComponentClick }) => {
  const [heroComplete, setHeroComplete] = useState(false);
  const [prompt, setPrompt] = useState('');

  const suggestions = [
    "Build CRM dashboard",
    "Create content generator",
    "Make admin panel",
    "Generate marketing posts",
    "Build AI agent",
  ];

  const quickActions = [
    { icon: Brain, title: "Create App", desc: "Build a new AI-powered app", btn: "Start Building" },
    { icon: Monitor, title: "Create Workflow", desc: "Design automation flows", btn: "Open Canvas" },
    { icon: Palette, title: "Create UI", desc: "Design frontend interfaces", btn: "Open UI Builder" },
    { icon: Package, title: "Browse Templates", desc: "Start from pre-built apps", btn: "Explore" },
  ];

  const featuredApps: AppMetadata[] = [...AI_AGENTS.slice(0, 3), ...APPS.slice(0, 3)];

  const getIconForType = (type: string) => {
    switch (type) {
      case 'AI Agent': return "🤖";
      case 'App': return "📱";
      case 'Tool': return "🔧";
      case 'Workflow': return "⚡";
      default: return "📦";
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto px-10 py-12 page-enter">
      {/* Hero */}
      <section className="relative mb-12">
        <div className="absolute inset-0 -z-10 dot-grid opacity-40 h-[300px]" />
        <div className="pt-8">
          <Typewriter 
            text="Good evening, Alex. What do you want to build today?" 
            onComplete={() => setHeroComplete(true)} 
          />
          <AnimatePresence>
            {heroComplete && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-text-secondary text-[16px] mt-2"
              >
                Create apps, automate workflows, or run your AI agents.
              </motion.p>
            )}
          </AnimatePresence>

          <div className="mt-8 relative group">
            <div className="relative flex items-center bg-white border border-border rounded-full h-[64px] px-6 shadow-sm group-focus-within:border-primary group-focus-within:ring-4 group-focus-within:ring-primary-light transition-all duration-200">
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe an app, workflow, or tool..." 
                className="flex-1 bg-transparent border-none outline-none text-[15px] text-text-primary placeholder:text-text-muted"
              />
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-full text-[13px] text-text-secondary hover:bg-tertiary transition-colors">
                  App Type <ChevronDown size={14} />
                </button>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full text-[14px] font-medium hover:bg-primary-dark transition-all active:scale-[0.97] shadow-sm">
                  Generate <ArrowRight size={16} />
                </button>
              </div>
            </div>
            <div className="mt-3 ml-6 text-[12px] text-text-muted">
              Try: <span className="italic">"Build a CRM dashboard with filters and analytics"</span>
            </div>
          </div>
        </div>
      </section>

      {/* Suggestions */}
      <section className="mb-12">
        <SectionLabel>SUGGESTIONS</SectionLabel>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {suggestions.map(s => (
            <button 
              key={s}
              onClick={() => setPrompt(s)}
              className="whitespace-nowrap px-4 py-2 bg-surface border border-border rounded-full text-[14px] text-text-secondary hover:bg-primary-light hover:border-primary hover:text-primary transition-all duration-150 active:scale-[0.97]"
            >
              {s}
            </button>
          ))}
          <button className="whitespace-nowrap px-4 py-2 bg-surface border border-border rounded-full text-[14px] text-text-secondary hover:bg-primary-light hover:border-primary hover:text-primary transition-all duration-150">
            + Custom
          </button>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-12">
        <SectionLabel>Quick Actions</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, i) => (
            <div 
              key={i}
              className="bg-white border border-border p-6 rounded-lg hover:-translate-y-0.5 hover:shadow-md hover:border-l-[3px] hover:border-l-primary hover:bg-primary-light/30 transition-all duration-180 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <action.icon size={20} />
              </div>
              <h4 className="font-semibold text-text-primary mb-1">{action.title}</h4>
              <p className="text-[13px] text-text-secondary mb-4">{action.desc}</p>
              <button className="text-[13px] font-medium text-primary flex items-center gap-1 hover:underline group-hover:translate-x-1 transition-transform">
                {action.btn} <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Apps */}
      <section className="mb-12">
        <SectionLabel right="View all →">Featured Apps</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredApps.map((app) => (
            <div 
              key={app.id}
              onClick={() => {
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
              }}
              className="bg-white border border-border p-5 rounded-lg hover:-translate-y-0.5 hover:shadow-md hover:border-primary transition-all duration-150 group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary-light rounded-lg flex items-center justify-center text-xl">
                    {getIconForType(app.type)}
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-text-primary">{app.name}</h4>
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
              <p className="text-[14px] text-text-secondary mb-4 line-clamp-1">{app.description}</p>
              <div className="text-[12px] text-text-muted mb-4">Last run {app.lastRun} · {app.successRate}% success</div>
              <div className="flex gap-2">
                <button className="flex-1 h-8 flex items-center justify-center gap-1 text-[12px] font-medium text-text-secondary bg-surface border border-border rounded hover:bg-primary-light hover:text-primary hover:border-primary transition-all">
                  <Play size={12} /> Run
                </button>
                <button className="flex-1 h-8 flex items-center justify-center gap-1 text-[12px] font-medium text-text-secondary bg-surface border border-border rounded hover:bg-primary-light hover:text-primary hover:border-primary transition-all">
                  <Palette size={12} /> UI
                </button>
                <button className="flex-1 h-8 flex items-center justify-center gap-1 text-[12px] font-medium text-text-secondary bg-surface border border-border rounded hover:bg-primary-light hover:text-primary hover:border-primary transition-all">
                  <Monitor size={12} /> Canvas
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Continue Working */}
      <section className="mb-12">
        <SectionLabel>Continue Working</SectionLabel>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {featuredApps.slice(0, 5).map((app, i) => (
            <div 
              key={i}
              className="min-w-[200px] bg-white border border-border p-4 rounded-lg hover:bg-primary-light/20 hover:border-primary transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{getIconForType(app.type)}</span>
                <span className="text-[14px] font-semibold text-text-primary">{app.name}</span>
              </div>
              <div className="text-[12px] text-text-muted mb-3">Edited {i * 10 + 5} min ago</div>
              <div className="text-[13px] text-primary font-medium flex items-center gap-1 group-hover:underline">
                Continue <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mb-12">
        <SectionLabel>Recent Activity</SectionLabel>
        <div className="bg-white border border-border rounded-lg overflow-hidden divide-y divide-border">
          {ACTIVITY_FEED.map((activity) => (
            <div 
              key={activity.id}
              className="flex items-center justify-between p-4 hover:bg-surface transition-all group"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-8 h-8 bg-tertiary rounded flex items-center justify-center text-lg">
                  {activity.status === 'success' ? "✅" : activity.status === 'failed' ? "❌" : activity.status === 'paused' ? "⏸" : "●"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-text-primary">{activity.appName}</span>
                    <span className="text-[13px] text-text-secondary">• {activity.action}</span>
                  </div>
                  <div className="text-[13px] text-text-muted truncate max-w-[300px]">
                    {activity.preview}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <span className="text-[12px] text-text-muted whitespace-nowrap">{activity.time}</span>
                <div className="flex items-center gap-2 min-w-[80px]">
                  {activity.status === 'success' && (
                    <>
                      <CheckCircle2 size={14} className="text-success" />
                      <span className="text-[12px] text-success font-medium">Success</span>
                    </>
                  )}
                  {activity.status === 'failed' && (
                    <>
                      <XCircle size={14} className="text-error" />
                      <span className="text-[12px] text-error font-medium">Failed</span>
                    </>
                  )}
                  {activity.status === 'paused' && (
                    <>
                      <PauseCircle size={14} className="text-warning" />
                      <span className="text-[12px] text-warning font-medium">Paused</span>
                    </>
                  )}
                  {activity.status === 'running' && (
                    <>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-coral" />
                      <span className="text-[12px] text-primary font-medium">Running</span>
                    </>
                  )}
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 text-[12px] font-medium text-primary bg-primary-light rounded hover:bg-primary hover:text-white">
                  View Output
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
