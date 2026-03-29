import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  History, 
  Layout, 
  Settings, 
  Plus, 
  ArrowRight, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Check, 
  X, 
  RefreshCw, 
  Maximize2, 
  Upload, 
  Paperclip, 
  Send,
  Brain,
  Wrench,
  Smartphone,
  GitBranch,
  Star,
  ChevronDown,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Clock,
  Play,
  ExternalLink,
  Shield,
  Terminal,
  Lock,
  Eye,
  Copy,
  Trash2,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AI_AGENTS, TOOLS, APPS, WORKFLOWS } from '../constants';
import { AppMetadata, TabType } from '../types';

// --- Types ---

interface BuilderTabProps {
  setActiveTab: (tab: TabType) => void;
}

type BuilderMode = 'hero' | 'prompt' | 'type' | 'template';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
  quickReplies?: string[];
}

// --- Mock Data for Templates ---
const TEMPLATES = [
  { id: 't1', name: 'Blog Post Pipeline', type: 'Workflow', desc: 'End-to-end content workflow from topic to WordPress.', nodes: 8, rating: 4.9 },
  { id: 't2', name: 'Lead Nurture Sequence', type: 'Workflow', desc: 'AI-driven lead scoring and automated email drip.', nodes: 7, rating: 4.8 },
  { id: 't3', name: 'ContentCraft AI', type: 'Agent', desc: 'Marketing agent for SEO posts and social captions.', nodes: 4, rating: 4.9 },
  { id: 't4', name: 'SalesDesk CRM', type: 'App', desc: 'Full internal CRM with pipeline and revenue charts.', nodes: 12, rating: 4.7 },
  { id: 't5', name: 'Invoice Generator', type: 'Tool', desc: 'Branded PDF generator with Google Sheets sync.', nodes: 5, rating: 4.9 },
  { id: 't6', name: 'Employee Onboarding', type: 'Workflow', desc: 'Automated HR onboarding from Greenhouse to Slack.', nodes: 7, rating: 4.8 },
];

// --- Components ---

export const BuilderTab: React.FC<BuilderTabProps> = ({ setActiveTab }) => {
  const [mode, setMode] = useState<BuilderMode>('hero');
  const [prompt, setPrompt] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<AppMetadata[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<any>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isThinking]);

  // --- Handlers ---

  const handleStartPrompt = () => {
    setMode('prompt');
  };

  const handleStartType = () => {
    setMode('type');
  };

  const handleStartTemplate = () => {
    setMode('template');
  };

  const handleBuild = () => {
    if (!prompt.trim()) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages([...chatMessages, userMsg]);
    setPrompt('');
    setIsThinking(true);
    setMode('prompt');

    // Simulate AI response
    setTimeout(() => {
      setIsThinking(false);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: `Great! I'll build a Lead Scoring Agent for you. Here's what I'm creating:\n✓ HubSpot Trigger node\n✓ Claude 3.5 Scorer node\n✓ IF/Else routing node\n✓ Slack Alert node\nGenerating your workflow now...`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiMsg]);
      
      // Start building animation
      setIsBuilding(true);
      setBuildProgress(0);
      
      const interval = setInterval(() => {
        setBuildProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            
            // Follow up message
            setTimeout(() => {
              const followUp: Message = {
                id: (Date.now() + 2).toString(),
                role: 'ai',
                content: `Your agent is ready! A few questions to refine it:`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                quickReplies: ['Score > 80', 'Yes, send email', '#sales-alerts']
              };
              setChatMessages(prevMsgs => [...prevMsgs, followUp]);
            }, 1000);
            
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages([...chatMessages, userMsg]);
    
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: `Got it! I've updated the workflow to ${reply}. Anything else?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  const toggleItemSelection = (item: AppMetadata) => {
    if (selectedItems.find(i => i.id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleUseTemplate = (template: any) => {
    setActiveTemplate(template);
    setIsBuilding(true);
    setBuildProgress(0);
    
    const interval = setInterval(() => {
      setBuildProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setMode('prompt');
          setChatMessages([{
            id: Date.now().toString(),
            role: 'ai',
            content: `I've loaded the ${template.name} template. Want me to customize it for you?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
          return 100;
        }
        return prev + 5;
      });
    }, 50);
  };

  // --- Render Helpers ---

  const renderHero = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto px-6"
    >
      <div className="text-center mb-12">
        <h2 className="text-[28px] font-bold text-text-primary mb-3">What do you want to build?</h2>
        <p className="text-text-secondary text-[15px]">Prompt AI, pick a type, browse templates, or start blank.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[600px]">
        {[
          { id: 'prompt', title: 'Describe it', desc: 'Tell AI what you want to build in plain English', icon: Brain, action: handleStartPrompt },
          { id: 'type', title: 'Choose a type', desc: 'Select Agent, Tool, App, or Workflow to start', icon: Zap, action: handleStartType },
          { id: 'template', title: 'Use a template', desc: 'Browse pre-built starting points', icon: Layout, action: handleStartTemplate },
          { id: 'blank', title: 'Website Builder', desc: 'Build a full website frontend with AI', icon: Globe, action: () => setActiveTab('website') },
        ].map((card, i) => (
          <motion.button
            key={card.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={card.action}
            className={`p-6 rounded-lg text-left hover:shadow-md hover:-translate-y-0.5 hover:border-l-[3px] hover:border-l-primary transition-all group ${
              card.id === 'blank' 
                ? 'bg-primary/5 border-primary/30 border-2 shadow-lg shadow-primary/5' 
                : 'bg-white border border-border hover:bg-primary-light/30'
            }`}
          >
            <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
              <card.icon size={24} />
            </div>
            <h3 className="text-[16px] font-bold text-text-primary mb-1">{card.title}</h3>
            <p className="text-[13px] text-text-secondary leading-relaxed">{card.desc}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  const renderPromptBar = () => (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative group">
        <div className="absolute inset-0 bg-primary/5 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
        <div className="relative flex items-center h-16 bg-white border border-border rounded-full px-6 shadow-sm group-focus-within:border-primary group-focus-within:ring-[3px] group-focus-within:ring-primary-light transition-all">
          <input 
            type="text" 
            placeholder="Describe an agent, tool, app, or workflow..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleBuild()}
            className="flex-1 bg-transparent border-none outline-none text-[15px] text-text-primary placeholder:text-text-muted"
          />
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-tertiary rounded-full text-[12px] font-bold text-text-secondary hover:bg-border transition-colors">
              Auto-detect <ChevronDown size={14} />
            </button>
            <button 
              onClick={handleBuild}
              className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-dark transition-all shadow-sm"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar pb-2">
        {['Blog post pipeline', 'Lead scoring agent', 'Invoice generator', 'CRM dashboard', 'Code reviewer', 'Onboarding workflow'].map(chip => (
          <button 
            key={chip}
            onClick={() => setPrompt(chip)}
            className="whitespace-nowrap px-4 py-1.5 bg-surface border border-border rounded-full text-[12px] font-medium text-text-secondary hover:bg-primary-light hover:border-primary hover:text-primary transition-all"
          >
            {chip}
          </button>
        ))}
        <button className="whitespace-nowrap px-4 py-1.5 bg-surface border border-border rounded-full text-[12px] font-medium text-text-muted hover:text-text-primary transition-all">
          + Custom
        </button>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      <div className="flex-1 overflow-y-auto no-scrollbar py-6 space-y-6">
        {chatMessages.map((msg) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-1">
                  FM
                </div>
              )}
              <div className="flex flex-col gap-1">
                <div className={`px-4 py-3 text-[14px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary-light text-primary rounded-[12px_12px_2px_12px]' 
                    : 'bg-white border border-border text-text-primary rounded-[12px_12px_12px_2px]'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
                <span className={`text-[10px] text-text-muted ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp}
                </span>
                
                {msg.quickReplies && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {msg.quickReplies.map(reply => (
                      <button 
                        key={reply}
                        onClick={() => handleQuickReply(reply)}
                        className="px-4 py-1.5 border border-primary rounded-full text-[12px] font-bold text-primary hover:bg-primary hover:text-white transition-all scale-100 active:scale-95"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        
        {isThinking && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                FM
              </div>
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                    className="w-1.5 h-1.5 bg-primary rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="pt-4 pb-8">
        <div className="relative flex items-center bg-white border border-border rounded-lg px-4 py-2 shadow-sm focus-within:border-primary transition-all">
          <button className="p-2 text-text-muted hover:text-primary transition-colors">
            <Paperclip size={18} />
          </button>
          <input 
            type="text" 
            placeholder="Refine, ask questions, or add details..."
            className="flex-1 bg-transparent border-none outline-none text-[14px] px-3 py-2"
          />
          <button className="p-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-all">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderTypeSelector = () => (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h3 className="text-[14px] font-bold text-text-primary mb-4">What are you building?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: 'agent', label: 'Agent', desc: 'Autonomous AI', icon: Brain },
            { id: 'tool', label: 'Tool', desc: 'Single-purpose', icon: Wrench },
            { id: 'app', label: 'App', desc: 'Frontend UI', icon: Smartphone },
            { id: 'workflow', label: 'Workflow', desc: 'Multi-step process', icon: GitBranch },
          ].map(type => (
            <button 
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`p-4 border rounded-lg text-left transition-all relative ${
                selectedType === type.id 
                  ? 'border-primary bg-primary-light/30 text-primary' 
                  : 'border-border bg-white hover:border-primary/50'
              }`}
            >
              <type.icon size={20} className="mb-2" />
              <div className="text-[14px] font-bold">{type.label}</div>
              <div className="text-[11px] opacity-70">{type.desc}</div>
              {selectedType === type.id && (
                <div className="absolute top-2 right-2 w-4 h-4 bg-primary text-white rounded-full flex items-center justify-center">
                  <Check size={10} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {selectedType && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-border rounded-lg overflow-hidden"
        >
          <div className="p-4 border-b border-border flex justify-between items-center bg-surface">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
                <input 
                  type="text" 
                  placeholder="Search existing..." 
                  className="w-full bg-white border border-border rounded-md py-1.5 pl-9 pr-3 text-[13px] outline-none focus:border-primary"
                />
              </div>
              <div className="flex items-center gap-1 bg-white border border-border rounded-md p-1">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-text-muted hover:bg-tertiary'}`}
                >
                  <Grid size={14} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'text-text-muted hover:bg-tertiary'}`}
                >
                  <List size={14} />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {['All', 'Recent', 'Pinned'].map(f => (
                <button key={f} className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full border ${f === 'All' ? 'border-primary text-primary bg-primary-light' : 'border-border text-text-muted'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-2'}>
              {[...AI_AGENTS, ...TOOLS, ...APPS, ...WORKFLOWS].slice(0, 6).map(item => {
                const isSelected = selectedItems.find(i => i.id === item.id);
                return viewMode === 'grid' ? (
                  <button 
                    key={item.id}
                    onClick={() => toggleItemSelection(item)}
                    className={`p-4 border rounded-lg text-left transition-all group relative ${
                      isSelected ? 'border-primary bg-primary-light/20' : 'border-border bg-white hover:border-primary/30'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="w-10 h-10 bg-tertiary rounded-lg flex items-center justify-center text-text-primary group-hover:bg-primary-light group-hover:text-primary transition-colors">
                        <Zap size={20} />
                      </div>
                      <div className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        item.type === 'AI Agent' ? 'bg-purple-100 text-purple-600' : 
                        item.type === 'Workflow' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                        {item.type}
                      </div>
                    </div>
                    <h4 className="text-[14px] font-bold text-text-primary mb-1">{item.name}</h4>
                    <p className="text-[12px] text-text-secondary line-clamp-2 mb-4">{item.description}</p>
                    <div className="flex items-center justify-between text-[11px] text-text-muted">
                      <span>{item.lastRun}</span>
                      <span>{item.successRate}% success</span>
                    </div>
                    {isSelected && (
                      <div className="absolute inset-0 bg-primary/5 border-2 border-primary rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg">
                          <Check size={16} />
                        </div>
                      </div>
                    )}
                  </button>
                ) : (
                  <button 
                    key={item.id}
                    onClick={() => toggleItemSelection(item)}
                    className={`w-full flex items-center gap-4 p-3 border rounded-lg text-left transition-all ${
                      isSelected ? 'border-primary bg-primary-light/20 border-l-[4px]' : 'border-border bg-white hover:bg-surface'
                    }`}
                  >
                    <div className="w-8 h-8 bg-tertiary rounded flex items-center justify-center shrink-0">
                      <Zap size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-bold text-text-primary truncate">{item.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-tertiary rounded text-text-muted uppercase font-bold">{item.type}</span>
                      </div>
                    </div>
                    <div className="text-[12px] text-text-muted shrink-0">{item.successRate}%</div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'bg-primary border-primary text-white' : 'border-border'}`}>
                      {isSelected && <Check size={10} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence>
            {selectedItems.length > 0 && (
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="bg-primary text-white px-6 py-3 flex justify-between items-center"
              >
                <div className="text-[13px] font-medium">
                  {selectedItems.length} selected: {selectedItems.map(i => i.name).join(', ')}
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setSelectedItems([])} className="text-[13px] font-bold hover:underline">Clear</button>
                  <button 
                    onClick={() => {
                      setMode('prompt');
                      setChatMessages([{
                        id: Date.now().toString(),
                        role: 'ai',
                        content: `I've added ${selectedItems.length} items to your build. How should we combine them?`,
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      }]);
                    }}
                    className="px-4 py-1.5 bg-white text-primary rounded-md text-[13px] font-bold hover:bg-primary-light transition-all"
                  >
                    Start Building →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );

  const renderTemplateGallery = () => (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
          <input 
            type="text" 
            placeholder="Search templates..." 
            className="w-full bg-white border border-border rounded-lg py-2.5 pl-10 pr-4 text-[14px] outline-none focus:border-primary shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {['All', 'Agents', 'Tools', 'Apps', 'Workflows', 'Marketing', 'Sales'].map(f => (
            <button key={f} className={`whitespace-nowrap px-4 py-2 rounded-full text-[12px] font-bold border transition-all ${f === 'All' ? 'bg-primary text-white border-primary' : 'bg-white text-text-secondary border-border hover:border-primary/50'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map(t => (
          <motion.div 
            key={t.id}
            whileHover={{ y: -4 }}
            className="bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
          >
            <div className="h-32 bg-tertiary p-6 flex items-center justify-center relative">
              <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Zap size={32} />
              </div>
              <div className="absolute top-3 right-3 px-2 py-0.5 bg-primary text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                {t.type}
              </div>
            </div>
            <div className="p-5">
              <h4 className="text-[16px] font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">{t.name}</h4>
              <p className="text-[13px] text-text-secondary line-clamp-2 mb-6 h-10">{t.desc}</p>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1 text-[12px] text-text-muted">
                  <Star size={14} className="text-warning fill-warning" />
                  <span className="font-bold text-text-primary">{t.rating}</span>
                </div>
                <div className="text-[12px] text-text-muted font-medium">{t.nodes} nodes</div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleUseTemplate(t)}
                  className="flex-1 py-2 bg-primary text-white rounded-md text-[13px] font-bold hover:bg-primary-dark transition-all"
                >
                  Use Template
                </button>
                <button className="px-3 py-2 bg-surface border border-border rounded-md text-text-secondary hover:bg-tertiary transition-all">
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderPreviewPanel = () => (
    <div className="w-[440px] h-full bg-surface border-l border-border flex flex-col shrink-0">
      <div className="h-14 px-4 border-b border-border flex justify-between items-center bg-white">
        <span className="text-[13px] font-bold text-text-secondary uppercase tracking-wider">Live Preview</span>
        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-tertiary rounded text-text-muted transition-colors"><RefreshCw size={14} /></button>
          <button className="p-1.5 hover:bg-tertiary rounded text-text-muted transition-colors"><Maximize2 size={14} /></button>
          <button className="p-1.5 hover:bg-tertiary rounded text-text-muted transition-colors"><Upload size={14} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {!isBuilding && !activeTemplate && (
          <div className="h-full flex flex-col items-center justify-center text-center px-8">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-primary/20 mb-6 border-2 border-dashed border-border">
              <Zap size={48} />
            </div>
            <h4 className="text-[15px] font-bold text-text-primary mb-2">Your build will appear here</h4>
            <p className="text-[13px] text-text-muted">Start by describing what you want or pick a starting mode on the left.</p>
          </div>
        )}

        {isBuilding && (
          <div className="space-y-6">
            <div className="bg-white border border-border rounded-xl p-6 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <h5 className="text-[14px] font-bold text-text-primary">Generating Nodes...</h5>
                <span className="text-[12px] font-bold text-primary">{Math.round(buildProgress)}%</span>
              </div>
              
              <div className="relative h-64 flex flex-col items-center justify-center gap-8">
                {/* Node Animation */}
                <div className="flex flex-col items-center gap-12 relative">
                  {[1, 2, 3].map((n, i) => (
                    <motion.div 
                      key={n}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: buildProgress > (i * 30) ? 1 : 0,
                        scale: buildProgress > (i * 30) ? 1 : 0.8
                      }}
                      className="w-40 p-3 bg-white border border-border rounded-lg shadow-sm flex items-center gap-3 relative z-10"
                    >
                      <div className="w-8 h-8 bg-primary-light text-primary rounded flex items-center justify-center">
                        <Zap size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-bold text-text-primary truncate">Node {n}</div>
                        <div className="text-[9px] text-text-muted uppercase font-bold tracking-tighter">Processing...</div>
                      </div>
                      {i < 2 && (
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[2px] h-12 overflow-hidden">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: buildProgress > (i * 30 + 15) ? '100%' : 0 }}
                            className="w-full bg-primary dashed-line"
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <div className="h-1.5 w-full bg-tertiary rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${buildProgress}%` }}
                    className="h-full bg-primary"
                  />
                </div>
                <p className="text-[11px] text-text-muted mt-2 text-center">
                  Building... {Math.floor(buildProgress / 20)} of 5 nodes created
                </p>
              </div>
            </div>
          </div>
        )}

        {buildProgress === 100 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-success/10 text-success rounded-full flex items-center justify-center">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-text-primary">Lead Scoring Agent ready</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-1.5 py-0.5 bg-primary-light text-primary rounded font-bold uppercase tracking-wider">Agent</span>
                    <span className="text-[10px] text-text-muted font-medium">4 nodes created</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-border mb-4">
                <div className="text-center">
                  <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider mb-1">Nodes</div>
                  <div className="text-[13px] font-bold text-text-primary">4</div>
                </div>
                <div className="text-center border-x border-border">
                  <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider mb-1">Cost/Run</div>
                  <div className="text-[13px] font-bold text-text-primary">~$0.041</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider mb-1">Avg Time</div>
                  <div className="text-[13px] font-bold text-text-primary">6.8s</div>
                </div>
              </div>

              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('website')}
                  className="w-full py-2.5 bg-primary text-white rounded-md text-[13px] font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2"
                >
                  <Play size={14} fill="currentColor" /> Run Now
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-2 bg-surface border border-border rounded-md text-[12px] font-bold text-text-secondary hover:bg-tertiary transition-all">
                    Open in Canvas
                  </button>
                  <button className="py-2 bg-surface border border-border rounded-md text-[12px] font-bold text-text-secondary hover:bg-tertiary transition-all">
                    Save to Apps
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Add error handling', 'Add Slack notification', 'Add scheduling', 'Make it faster'].map(chip => (
                <button 
                  key={chip}
                  className="px-3 py-1.5 bg-white border border-primary/30 rounded-full text-[11px] font-bold text-primary hover:bg-primary-light transition-all"
                >
                  {chip}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );

  const renderHistoryDrawer = () => (
    <AnimatePresence>
      {isHistoryOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsHistoryOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-screen w-[360px] bg-white shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h3 className="text-[18px] font-bold text-text-primary">Build History</h3>
              <button onClick={() => setIsHistoryOpen(false)} className="p-2 hover:bg-tertiary rounded-full text-text-muted transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {[...AI_AGENTS, ...WORKFLOWS].slice(0, 8).map((item, i) => (
                <div key={item.id} className="p-4 bg-surface border border-border rounded-lg hover:border-primary transition-all group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-primary shadow-sm">
                      <Zap size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[14px] font-bold text-text-primary truncate">{item.name}</h4>
                      <div className="text-[11px] text-text-muted">Built {i + 1}h ago by AI prompt</div>
                    </div>
                    <div className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                      i % 3 === 0 ? 'bg-success/10 text-success' : 'bg-tertiary text-text-muted'
                    }`}>
                      {i % 3 === 0 ? 'Saved' : 'Draft'}
                    </div>
                  </div>
                  <button className="w-full mt-2 py-1.5 bg-white border border-border rounded text-[12px] font-bold text-text-secondary hover:bg-primary-light hover:text-primary hover:border-primary transition-all">
                    Open Build
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div className="flex h-full bg-white overflow-hidden">
      {/* Left Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 px-8 border-b border-border flex justify-between items-center bg-white shrink-0">
          <div>
            <h1 className="text-[24px] font-bold text-text-primary leading-tight">Builder</h1>
            <p className="text-text-secondary text-[14px]">Describe, select, and build — all in one place</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsHistoryOpen(true)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-tertiary rounded-md text-[13px] font-bold text-text-secondary transition-all"
            >
              <History size={16} /> History
            </button>
            <button 
              onClick={handleStartTemplate}
              className="flex items-center gap-2 px-4 py-2 hover:bg-tertiary rounded-md text-[13px] font-bold text-text-secondary transition-all"
            >
              <Layout size={16} /> Templates
            </button>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-tertiary rounded-md text-[13px] font-bold text-text-secondary transition-all">
              <Settings size={16} /> Settings
            </button>
            <button 
              onClick={() => {
                setMode('hero');
                setChatMessages([]);
                setIsBuilding(false);
                setBuildProgress(0);
                setSelectedItems([]);
                setSelectedType(null);
                setActiveTemplate(null);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-[13px] font-bold hover:bg-primary-dark transition-all shadow-sm"
            >
              <Plus size={16} /> New Build
            </button>
          </div>
        </header>

        {/* Builder Content */}
        <main className="flex-1 overflow-y-auto no-scrollbar bg-surface relative">
          <AnimatePresence mode="wait">
            {mode === 'hero' && renderHero()}
            {mode === 'prompt' && (
              <motion.div 
                key="prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col p-8"
              >
                {renderPromptBar()}
                {renderChat()}
              </motion.div>
            )}
            {mode === 'type' && (
              <motion.div 
                key="type"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full p-8 overflow-y-auto no-scrollbar"
              >
                {renderPromptBar()}
                {renderTypeSelector()}
              </motion.div>
            )}
            {mode === 'template' && (
              <motion.div 
                key="template"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full p-8 overflow-y-auto no-scrollbar"
              >
                {renderPromptBar()}
                {renderTemplateGallery()}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Right Preview Panel */}
      {renderPreviewPanel()}

      {/* Side Drawer */}
      {renderHistoryDrawer()}

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .dashed-line {
          background-image: linear-gradient(to bottom, #D97757 50%, transparent 50%);
          background-size: 2px 8px;
          background-repeat: repeat-y;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-pulse-coral {
          animation: pulse-coral 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-coral {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .7; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};
