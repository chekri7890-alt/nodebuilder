import React, { useState, useRef, useEffect } from 'react';
import { 
  Clock,
  Save,
  Search, 
  Plus, 
  Play, 
  Settings, 
  Trash2, 
  Copy, 
  Maximize2, 
  Minimize2, 
  Layers, 
  Zap, 
  Database, 
  Brain, 
  Terminal,
  ChevronRight,
  ChevronLeft,
  MousePointer2,
  Hand,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Layout,
  Download,
  Share2,
  Image as ImageIcon,
  Mic,
  Volume2,
  Smile,
  Globe,
  Webhook,
  GitBranch,
  GitMerge,
  Scissors,
  AlertTriangle,
  StopCircle,
  Table,
  Cloud,
  Server,
  Box,
  FileJson,
  FileCode,
  SearchCode,
  Mail,
  Slack,
  Send,
  FileSpreadsheet,
  FileText,
  Calendar,
  Trello,
  CheckSquare,
  CreditCard,
  Wallet,
  FileUp,
  FileDown,
  FileArchive,
  Bell,
  Filter,
  Code,
  MessageSquare,
  DollarSign,
  RefreshCw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Node {
  id: string;
  type: string;
  title: string;
  x: number;
  y: number;
  config: any;
  status?: 'idle' | 'running' | 'success' | 'error';
}

interface Connection {
  id: string;
  fromNode: string;
  fromPort: string;
  toNode: string;
  toPort: string;
}

export const CanvasTab: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', type: 'trigger', title: 'HTTP Request', x: 100, y: 150, config: { method: 'POST', path: '/api/webhook' }, status: 'success' },
    { id: '2', type: 'model', title: 'Gemini 2.0 Flash', x: 400, y: 100, config: { temperature: 0.7, topP: 0.9 }, status: 'idle' },
    { id: '3', type: 'logic', title: 'JSON Parser', x: 400, y: 250, config: { schema: '{}' }, status: 'idle' },
    { id: '4', type: 'output', title: 'Response', x: 750, y: 175, config: { status: 200 }, status: 'idle' },
  ]);

  const [connections, setConnections] = useState<Connection[]>([
    { id: 'c1', fromNode: '1', fromPort: 'out', toNode: '2', toPort: 'in' },
    { id: 'c2', fromNode: '1', fromPort: 'out', toNode: '3', toPort: 'in' },
    { id: 'c3', fromNode: '2', fromPort: 'out', toNode: '4', toPort: 'in' },
    { id: 'c4', fromNode: '3', fromPort: 'out', toNode: '4', toPort: 'in' },
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [dragNodeId, setDragNodeId] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  // Handle Canvas Panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      setIsPanning(true);
      setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    } else if (dragNodeId) {
      const dx = (e.clientX - dragStart.x) / zoom;
      const dy = (e.clientY - dragStart.y) / zoom;
      
      setNodes(prev => prev.map(n => 
        n.id === dragNodeId 
          ? { ...n, x: n.x + dx, y: n.y + dy } 
          : n
      ));
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDragNodeId(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setZoom(prev => Math.min(Math.max(prev * delta, 0.2), 3));
    } else {
      setOffset(prev => ({
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY
      }));
    }
  };

  const handleNodeDragStart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDragNodeId(id);
    setDragStart({ x: e.clientX, y: e.clientY });
    setSelectedNodeId(id);
  };

  const nodeLibrary = [
    // AI & LLM
    { type: 'ai', title: 'GPT-4o', icon: Brain, color: 'text-purple-500 bg-purple-500/10' },
    { type: 'ai', title: 'GPT-4o Mini', icon: Brain, color: 'text-purple-500 bg-purple-500/10' },
    { type: 'ai', title: 'Claude 3.5', icon: Brain, color: 'text-purple-500 bg-purple-500/10' },
    { type: 'ai', title: 'Gemini Pro', icon: Brain, color: 'text-purple-500 bg-purple-500/10' },
    { type: 'ai', title: 'Llama 3', icon: Brain, color: 'text-purple-500 bg-purple-500/10' },
    { type: 'ai', title: 'Mistral', icon: Brain, color: 'text-purple-500 bg-purple-500/10' },
    { type: 'ai', title: 'AI Prompt', icon: Terminal, color: 'text-purple-500 bg-purple-500/10' },
    { type: 'ai', title: 'AI Router', icon: Zap, color: 'text-purple-500 bg-purple-500/10' },
    { type: 'ai', title: 'Embeddings', icon: Layers, color: 'text-purple-500 bg-purple-500/10' },
    { type: 'ai', title: 'Image Gen', icon: ImageIcon, color: 'text-purple-500 bg-purple-500/10' },
    { type: 'ai', title: 'Speech to Text', icon: Mic, color: 'text-purple-500 bg-purple-500/10' },
    { type: 'ai', title: 'Text to Speech', icon: Volume2, color: 'text-purple-500 bg-purple-500/10' },
    { type: 'ai', title: 'Summarizer', icon: FileText, color: 'text-purple-500 bg-purple-500/10' },
    { type: 'ai', title: 'Classifier', icon: Filter, color: 'text-purple-500 bg-purple-500/10' },
    { type: 'ai', title: 'Sentiment', icon: Smile, color: 'text-purple-500 bg-purple-500/10' },
    { type: 'ai', title: 'Extractor', icon: Search, color: 'text-purple-500 bg-purple-500/10' },
    { type: 'ai', title: 'Translator', icon: Globe, color: 'text-purple-500 bg-purple-500/10' },
    { type: 'ai', title: 'AI Memory', icon: Database, color: 'text-purple-500 bg-purple-500/10' },

    // API / HTTP
    { type: 'api', title: 'HTTP GET', icon: Globe, color: 'text-blue-500 bg-blue-500/10' },
    { type: 'api', title: 'HTTP POST', icon: Globe, color: 'text-blue-500 bg-blue-500/10' },
    { type: 'api', title: 'HTTP PUT', icon: Globe, color: 'text-blue-500 bg-blue-500/10' },
    { type: 'api', title: 'HTTP DELETE', icon: Globe, color: 'text-blue-500 bg-blue-500/10' },
    { type: 'api', title: 'REST API', icon: Zap, color: 'text-blue-500 bg-blue-500/10' },
    { type: 'api', title: 'GraphQL', icon: Zap, color: 'text-blue-500 bg-blue-500/10' },
    { type: 'api', title: 'Webhook In', icon: Webhook, color: 'text-blue-500 bg-blue-500/10' },
    { type: 'api', title: 'Webhook Out', icon: Webhook, color: 'text-blue-500 bg-blue-500/10' },

    // Logic & Flow
    { type: 'logic', title: 'If / Else', icon: GitBranch, color: 'text-orange-500 bg-orange-500/10' },
    { type: 'logic', title: 'Switch', icon: GitBranch, color: 'text-orange-500 bg-orange-500/10' },
    { type: 'logic', title: 'Loop', icon: RotateCcw, color: 'text-orange-500 bg-orange-500/10' },
    { type: 'logic', title: 'While Loop', icon: RotateCcw, color: 'text-orange-500 bg-orange-500/10' },
    { type: 'logic', title: 'Merge', icon: GitMerge, color: 'text-orange-500 bg-orange-500/10' },
    { type: 'logic', title: 'Split', icon: Scissors, color: 'text-orange-500 bg-orange-500/10' },
    { type: 'logic', title: 'Filter', icon: Filter, color: 'text-orange-500 bg-orange-500/10' },
    { type: 'logic', title: 'Wait', icon: Clock, color: 'text-orange-500 bg-orange-500/10' },
    { type: 'logic', title: 'Try / Catch', icon: AlertTriangle, color: 'text-orange-500 bg-orange-500/10' },
    { type: 'logic', title: 'Stop', icon: StopCircle, color: 'text-orange-500 bg-orange-500/10' },

    // Databases
    { type: 'database', title: 'PostgreSQL', icon: Database, color: 'text-indigo-500 bg-indigo-500/10' },
    { type: 'database', title: 'MySQL', icon: Database, color: 'text-indigo-500 bg-indigo-500/10' },
    { type: 'database', title: 'MongoDB', icon: Database, color: 'text-indigo-500 bg-indigo-500/10' },
    { type: 'database', title: 'SQLite', icon: Database, color: 'text-indigo-500 bg-indigo-500/10' },
    { type: 'database', title: 'Redis', icon: Zap, color: 'text-indigo-500 bg-indigo-500/10' },
    { type: 'database', title: 'Supabase', icon: Database, color: 'text-indigo-500 bg-indigo-500/10' },
    { type: 'database', title: 'Firebase', icon: Database, color: 'text-indigo-500 bg-indigo-500/10' },
    { type: 'database', title: 'Airtable', icon: Table, color: 'text-indigo-500 bg-indigo-500/10' },
    { type: 'database', title: 'PlanetScale', icon: Database, color: 'text-indigo-500 bg-indigo-500/10' },
    { type: 'database', title: 'Neon DB', icon: Database, color: 'text-indigo-500 bg-indigo-500/10' },
    { type: 'database', title: 'Pinecone', icon: Database, color: 'text-indigo-500 bg-indigo-500/10' },
    { type: 'database', title: 'Weaviate', icon: Database, color: 'text-indigo-500 bg-indigo-500/10' },

    // Cloud & Hosting
    { type: 'cloud', title: 'AWS S3', icon: Box, color: 'text-cyan-500 bg-cyan-500/10' },
    { type: 'cloud', title: 'AWS Lambda', icon: Zap, color: 'text-cyan-500 bg-cyan-500/10' },
    { type: 'cloud', title: 'AWS SES', icon: Mail, color: 'text-cyan-500 bg-cyan-500/10' },
    { type: 'cloud', title: 'Google Cloud', icon: Cloud, color: 'text-cyan-500 bg-cyan-500/10' },
    { type: 'cloud', title: 'Vercel', icon: Server, color: 'text-cyan-500 bg-cyan-500/10' },
    { type: 'cloud', title: 'Cloudflare R2', icon: Box, color: 'text-cyan-500 bg-cyan-500/10' },
    { type: 'cloud', title: 'Cloudflare KV', icon: Zap, color: 'text-cyan-500 bg-cyan-500/10' },
    { type: 'cloud', title: 'Railway', icon: Server, color: 'text-cyan-500 bg-cyan-500/10' },

    // Code & Transform
    { type: 'code', title: 'JavaScript', icon: Code, color: 'text-yellow-600 bg-yellow-600/10' },
    { type: 'code', title: 'Python', icon: Code, color: 'text-yellow-600 bg-yellow-600/10' },
    { type: 'code', title: 'JSON Transform', icon: FileJson, color: 'text-yellow-600 bg-yellow-600/10' },
    { type: 'code', title: 'Template', icon: FileCode, color: 'text-yellow-600 bg-yellow-600/10' },
    { type: 'code', title: 'Regex', icon: SearchCode, color: 'text-yellow-600 bg-yellow-600/10' },
    { type: 'code', title: 'Markdown', icon: FileText, color: 'text-yellow-600 bg-yellow-600/10' },

    // Communication
    { type: 'comm', title: 'SendGrid', icon: Mail, color: 'text-pink-500 bg-pink-500/10' },
    { type: 'comm', title: 'Resend', icon: Mail, color: 'text-pink-500 bg-pink-500/10' },
    { type: 'comm', title: 'Mailchimp', icon: Mail, color: 'text-pink-500 bg-pink-500/10' },
    { type: 'comm', title: 'Slack', icon: Slack, color: 'text-pink-500 bg-pink-500/10' },
    { type: 'comm', title: 'Discord', icon: MessageSquare, color: 'text-pink-500 bg-pink-500/10' },
    { type: 'comm', title: 'Telegram', icon: Send, color: 'text-pink-500 bg-pink-500/10' },
    { type: 'comm', title: 'Twilio SMS', icon: MessageSquare, color: 'text-pink-500 bg-pink-500/10' },
    { type: 'comm', title: 'WhatsApp', icon: MessageSquare, color: 'text-pink-500 bg-pink-500/10' },

    // Productivity & Workspace
    { type: 'prod', title: 'Google Sheets', icon: FileSpreadsheet, color: 'text-green-600 bg-green-600/10' },
    { type: 'prod', title: 'Google Docs', icon: FileText, color: 'text-green-600 bg-green-600/10' },
    { type: 'prod', title: 'Google Calendar', icon: Calendar, color: 'text-green-600 bg-green-600/10' },
    { type: 'prod', title: 'Notion', icon: FileText, color: 'text-green-600 bg-green-600/10' },
    { type: 'prod', title: 'Airtable Form', icon: Table, color: 'text-green-600 bg-green-600/10' },
    { type: 'prod', title: 'Trello', icon: Trello, color: 'text-green-600 bg-green-600/10' },
    { type: 'prod', title: 'Jira', icon: CheckSquare, color: 'text-green-600 bg-green-600/10' },
    { type: 'prod', title: 'Linear', icon: CheckSquare, color: 'text-green-600 bg-green-600/10' },

    // Payments & Finance
    { type: 'pay', title: 'Stripe', icon: CreditCard, color: 'text-emerald-500 bg-emerald-500/10' },
    { type: 'pay', title: 'Stripe Webhook', icon: Webhook, color: 'text-emerald-500 bg-emerald-500/10' },
    { type: 'pay', title: 'LemonSqueezy', icon: DollarSign, color: 'text-emerald-500 bg-emerald-500/10' },
    { type: 'pay', title: 'PayPal', icon: DollarSign, color: 'text-emerald-500 bg-emerald-500/10' },
    { type: 'pay', title: 'Plaid', icon: Wallet, color: 'text-emerald-500 bg-emerald-500/10' },

    // Files & Storage
    { type: 'file', title: 'Google Drive', icon: FileUp, color: 'text-amber-600 bg-amber-600/10' },
    { type: 'file', title: 'Dropbox', icon: FileUp, color: 'text-amber-600 bg-amber-600/10' },
    { type: 'file', title: 'OneDrive', icon: FileUp, color: 'text-amber-600 bg-amber-600/10' },
    { type: 'file', title: 'PDF Generator', icon: FileDown, color: 'text-amber-600 bg-amber-600/10' },
    { type: 'file', title: 'CSV Parser', icon: FileArchive, color: 'text-amber-600 bg-amber-600/10' },
    { type: 'file', title: 'File Converter', icon: RefreshCw, color: 'text-amber-600 bg-amber-600/10' },

    // Data & Search
    { type: 'search', title: 'Web Scraper', icon: Search, color: 'text-sky-500 bg-sky-500/10' },
    { type: 'search', title: 'Google Search', icon: Search, color: 'text-sky-500 bg-sky-500/10' },
    { type: 'search', title: 'Serper API', icon: SearchCode, color: 'text-sky-500 bg-sky-500/10' },
    { type: 'search', title: 'Wikipedia', icon: Globe, color: 'text-sky-500 bg-sky-500/10' },
    { type: 'search', title: 'RSS Feed', icon: Globe, color: 'text-sky-500 bg-sky-500/10' },

    // Triggers
    { type: 'trigger', title: 'Manual Trigger', icon: Play, color: 'text-success bg-success/10' },
    { type: 'trigger', title: 'Schedule', icon: Clock, color: 'text-success bg-success/10' },
    { type: 'trigger', title: 'Webhook Trigger', icon: Webhook, color: 'text-success bg-success/10' },
    { type: 'trigger', title: 'Event Trigger', icon: Bell, color: 'text-success bg-success/10' },
    { type: 'trigger', title: 'Form Trigger', icon: Table, color: 'text-success bg-success/10' },
    { type: 'trigger', title: 'Email Trigger', icon: Mail, color: 'text-success bg-success/10' },
  ];

  const nodeCategories = [
    { id: 'ai', label: 'AI & LLM' },
    { id: 'api', label: 'API / HTTP' },
    { id: 'logic', label: 'Logic & Flow' },
    { id: 'database', label: 'Databases' },
    { id: 'cloud', label: 'Cloud & Hosting' },
    { id: 'code', label: 'Code & Transform' },
    { id: 'comm', label: 'Communication' },
    { id: 'prod', label: 'Productivity' },
    { id: 'pay', label: 'Payments' },
    { id: 'file', label: 'Files & Storage' },
    { id: 'search', label: 'Data & Search' },
    { id: 'trigger', label: 'Triggers' },
  ];

  const getPortPos = (nodeId: string, portType: 'in' | 'out') => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };
    
    // Node width is roughly 200px, height varies but header is ~40px
    const width = 200;
    const height = 100; // Rough estimate for line drawing
    
    if (portType === 'in') {
      return { x: node.x, y: node.y + 50 };
    } else {
      return { x: node.x + width, y: node.y + 50 };
    }
  };

  return (
    <div className="flex h-screen w-full bg-tertiary overflow-hidden relative page-enter">
      {/* Top Toolbar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 shadow-sm">
        <div className="flex items-center gap-1 border-r border-border pr-3 mr-1">
          <button onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.2))} className="p-1.5 hover:bg-tertiary rounded-md text-text-secondary"><ZoomOut size={16} /></button>
          <span className="text-[12px] font-mono w-10 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(prev => Math.min(prev + 0.1, 3))} className="p-1.5 hover:bg-tertiary rounded-md text-text-secondary"><ZoomIn size={16} /></button>
          <button onClick={() => {setZoom(1); setOffset({x: 0, y: 0})}} className="p-1.5 hover:bg-tertiary rounded-md text-text-secondary ml-1"><Maximize2 size={16} /></button>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-primary text-white rounded-full text-[13px] font-medium hover:bg-primary-dark transition-all shadow-sm">
            <Play size={14} fill="currentColor" /> Run Workflow
          </button>
          <button className="p-1.5 hover:bg-tertiary rounded-md text-text-secondary"><Share2 size={16} /></button>
          <button className="p-1.5 hover:bg-tertiary rounded-md text-text-secondary"><Download size={16} /></button>
        </div>
      </div>

      {/* Left Sidebar: Node Library */}
      <motion.aside 
        initial={false}
        animate={{ width: isLeftSidebarOpen ? 260 : 0, opacity: isLeftSidebarOpen ? 1 : 0 }}
        className="bg-white border-r border-border flex flex-col z-30 relative"
      >
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h3 className="text-[14px] font-bold text-text-primary">Node Library</h3>
          <button onClick={() => setIsLeftSidebarOpen(false)} className="p-1 hover:bg-tertiary rounded text-text-muted"><ChevronLeft size={16} /></button>
        </div>
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
            <input type="text" placeholder="Search nodes..." className="w-full bg-surface border border-border rounded-md py-1.5 pl-9 pr-3 text-[13px] focus:outline-none focus:border-primary" />
          </div>
          <div className="space-y-6 overflow-y-auto no-scrollbar max-h-[calc(100vh-140px)]">
            {nodeCategories.map(category => (
              <div key={category.id}>
                <h4 className="text-[11px] uppercase tracking-widest text-text-muted font-bold mb-3">{category.label}</h4>
                <div className="grid grid-cols-1 gap-2">
                  {nodeLibrary.filter(n => n.type === category.id).map(node => (
                    <div 
                      key={node.title}
                      className="flex items-center gap-3 p-2 border border-border rounded-md hover:border-primary hover:bg-primary-light/30 cursor-grab active:cursor-grabbing transition-all group"
                    >
                      <div className={`w-8 h-8 rounded flex items-center justify-center ${node.color}`}>
                        <node.icon size={16} />
                      </div>
                      <span className="text-[13px] text-text-secondary group-hover:text-text-primary">{node.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.aside>
      {!isLeftSidebarOpen && (
        <button 
          onClick={() => setIsLeftSidebarOpen(true)}
          className="absolute left-4 top-4 z-40 w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center shadow-sm hover:bg-tertiary"
        >
          <Plus size={20} className="text-primary" />
        </button>
      )}

      {/* Canvas Area */}
      <div 
        ref={canvasRef}
        className="flex-1 relative overflow-hidden cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <div 
          className="absolute inset-0 dot-grid opacity-30" 
          style={{ 
            backgroundPosition: `${offset.x}px ${offset.y}px`,
            backgroundSize: `${20 * zoom}px ${20 * zoom}px`
          }} 
        />
        
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ 
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            transformOrigin: '0 0'
          }}
        >
          {/* Connections (SVG) */}
          <svg className="absolute inset-0 w-[5000px] h-[5000px] pointer-events-none overflow-visible">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#6B6B6B" />
              </marker>
            </defs>
            {connections.map(conn => {
              const start = getPortPos(conn.fromNode, 'out');
              const end = getPortPos(conn.toNode, 'in');
              const dx = Math.abs(end.x - start.x) * 0.5;
              const path = `M ${start.x} ${start.y} C ${start.x + dx} ${start.y}, ${end.x - dx} ${end.y}, ${end.x} ${end.y}`;
              
              return (
                <path 
                  key={conn.id}
                  d={path}
                  stroke="#6B6B6B"
                  strokeWidth="2"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map(node => (
            <div 
              key={node.id}
              onMouseDown={(e) => handleNodeDragStart(e, node.id)}
              className={`
                absolute w-[200px] bg-white border-2 rounded-lg shadow-sm pointer-events-auto cursor-default select-none
                ${selectedNodeId === node.id ? 'border-primary shadow-md' : 'border-border'}
                transition-shadow duration-150
              `}
              style={{ left: node.x, top: node.y }}
            >
              {/* Node Header */}
              <div className={`
                px-3 py-2 rounded-t-md flex items-center justify-between border-b border-border
                ${node.type === 'trigger' ? 'bg-success/5' : 
                  node.type === 'ai' ? 'bg-purple-500/5' : 
                  node.type === 'api' ? 'bg-blue-500/5' : 
                  node.type === 'logic' ? 'bg-orange-500/5' : 
                  node.type === 'database' ? 'bg-indigo-500/5' :
                  node.type === 'cloud' ? 'bg-cyan-500/5' :
                  node.type === 'code' ? 'bg-yellow-600/5' :
                  node.type === 'comm' ? 'bg-pink-500/5' :
                  node.type === 'prod' ? 'bg-green-600/5' :
                  node.type === 'pay' ? 'bg-emerald-500/5' :
                  node.type === 'file' ? 'bg-amber-600/5' :
                  node.type === 'search' ? 'bg-sky-500/5' : 'bg-surface'}
              `}>
                <div className="flex items-center gap-2">
                  {(() => {
                    const libNode = nodeLibrary.find(n => n.title === node.title) || nodeLibrary.find(n => n.type === node.type);
                    const Icon = libNode?.icon || Zap;
                    return <Icon size={14} className={libNode?.color.split(' ')[0] || 'text-primary'} />;
                  })()}
                  <span className="text-[12px] font-bold text-text-primary truncate max-w-[120px]">{node.title}</span>
                </div>
                <div className={`w-2 h-2 rounded-full ${node.status === 'success' ? 'bg-success' : 'bg-text-muted'}`} />
              </div>

              {/* Node Body */}
              <div className="p-3 space-y-2">
                <div className="text-[11px] text-text-muted uppercase tracking-wider font-bold">Config</div>
                <div className="bg-surface rounded p-2 border border-border font-mono text-[10px] text-text-secondary">
                  {Object.entries(node.config).map(([k, v]) => (
                    <div key={k} className="truncate">{k}: {String(v)}</div>
                  ))}
                </div>
              </div>

              {/* Node Footer */}
              <div className="px-3 py-2 border-t border-border flex justify-between items-center">
                <button className="p-1 hover:bg-tertiary rounded text-text-muted hover:text-primary transition-colors"><Settings size={12} /></button>
                <div className="flex gap-1">
                  <button className="p-1 hover:bg-tertiary rounded text-text-muted hover:text-error transition-colors"><Trash2 size={12} /></button>
                </div>
              </div>

              {/* Ports */}
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-border rounded-full hover:border-primary cursor-crosshair z-10" />
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-border rounded-full hover:border-primary cursor-crosshair z-10" />
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar: Properties */}
      <motion.aside 
        initial={false}
        animate={{ width: isRightSidebarOpen ? 300 : 0, opacity: isRightSidebarOpen ? 1 : 0 }}
        className="bg-white border-l border-border flex flex-col z-30 relative"
      >
        <div className="p-4 border-b border-border flex justify-between items-center">
          <button onClick={() => setIsRightSidebarOpen(false)} className="p-1 hover:bg-tertiary rounded text-text-muted"><ChevronRight size={16} /></button>
          <h3 className="text-[14px] font-bold text-text-primary">Properties</h3>
          <div className="w-6" />
        </div>
        
        {selectedNodeId ? (
          <div className="p-6 space-y-6 overflow-y-auto no-scrollbar">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center text-primary">
                <Brain size={24} />
              </div>
              <div>
                <h4 className="text-[16px] font-bold text-text-primary">{nodes.find(n => n.id === selectedNodeId)?.title}</h4>
                <span className="text-[12px] text-text-muted uppercase tracking-widest">ID: {selectedNodeId}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-2">Node Name</label>
                <input 
                  type="text" 
                  value={nodes.find(n => n.id === selectedNodeId)?.title}
                  onChange={(e) => {
                    const val = e.target.value;
                    setNodes(prev => prev.map(n => n.id === selectedNodeId ? { ...n, title: val } : n));
                  }}
                  className="w-full bg-surface border border-border rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-primary" 
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-2">Model Version</label>
                <select className="w-full bg-surface border border-border rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-primary">
                  <option>Gemini 2.0 Flash</option>
                  <option>Gemini 1.5 Pro</option>
                  <option>Gemini 1.5 Flash</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[12px] font-bold text-text-secondary uppercase tracking-wider">Temperature</label>
                  <span className="text-[12px] font-mono text-primary">0.7</span>
                </div>
                <input type="range" className="w-full accent-primary" min="0" max="1" step="0.1" defaultValue="0.7" />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-2">System Instruction</label>
                <textarea 
                  rows={4}
                  placeholder="You are a helpful assistant..."
                  className="w-full bg-surface border border-border rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-primary resize-none"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <button className="w-full py-2 bg-primary-light text-primary rounded-md text-[13px] font-bold hover:bg-primary hover:text-white transition-all">
                Save Configuration
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <MousePointer2 size={48} className="text-text-muted mb-4 opacity-20" />
            <h4 className="text-[15px] font-bold text-text-secondary mb-2">No Node Selected</h4>
            <p className="text-[13px] text-text-muted">Select a node on the canvas to view and edit its properties.</p>
          </div>
        )}
      </motion.aside>
      {!isRightSidebarOpen && (
        <button 
          onClick={() => setIsRightSidebarOpen(true)}
          className="absolute right-4 top-4 z-40 w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center shadow-sm hover:bg-tertiary"
        >
          <Layout size={20} className="text-primary" />
        </button>
      )}

      {/* Bottom Bar: Debug/Logs */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-white border-t border-border z-40 flex items-center px-4 justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[12px] text-text-secondary">
            <div className="w-2 h-2 rounded-full bg-success" /> System Ready
          </div>
          <div className="h-4 w-[1px] bg-border" />
          <div className="text-[12px] text-text-muted font-mono">Logs: [14:35:02] Workflow initialized...</div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-[12px] text-text-secondary hover:text-primary font-medium">Variables</button>
          <button className="text-[12px] text-text-secondary hover:text-primary font-medium">Debug Console</button>
        </div>
      </div>
    </div>
  );
};
