import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Database as DatabaseIcon, 
  Globe, 
  FileText, 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  ExternalLink, 
  Trash2, 
  ChevronRight, 
  Zap, 
  Table as TableIcon, 
  CheckCircle2, 
  AlertCircle, 
  Terminal,
  Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DATA_SOURCES, VARIABLES } from '../constants';

export const DataTab: React.FC = () => {
  const [activeView, setActiveView] = useState<'sources' | 'variables' | 'security'>('sources');
  const [isAddingSource, setIsAddingSource] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [variableSearch, setVariableSearch] = useState('');

  const filteredSources = DATA_SOURCES.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredVariables = VARIABLES.filter(v => 
    v.name.toLowerCase().includes(variableSearch.toLowerCase())
  );

  return (
    <div className="max-w-[1200px] mx-auto px-10 py-12 page-enter relative">
      {/* Add Source Modal */}
      <AnimatePresence>
        {isAddingSource && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingSource(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-border flex justify-between items-center bg-surface">
                <h3 className="text-[18px] font-bold text-text-primary">Connect Data Source</h3>
                <button onClick={() => setIsAddingSource(false)} className="p-1 hover:bg-tertiary rounded text-text-muted">
                  <Plus size={20} className="rotate-45" />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-[12px] font-bold text-text-muted uppercase tracking-wider mb-2">Source Type</label>
                  <select className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-primary">
                    <option>PostgreSQL</option>
                    <option>MongoDB</option>
                    <option>Redis</option>
                    <option>Google Sheets</option>
                    <option>REST API</option>
                    <option>Supabase</option>
                    <option>Firebase</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-text-muted uppercase tracking-wider mb-2">Display Name</label>
                  <input type="text" placeholder="e.g. Production Database" className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-text-muted uppercase tracking-wider mb-2">Connection String / URL</label>
                  <input type="password" placeholder="postgresql://user:pass@host:port/db" className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-primary" />
                </div>
                <div className="flex items-center gap-2 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <Shield size={16} className="text-blue-500" />
                  <p className="text-[11px] text-blue-700">Your credentials are encrypted using AES-256 and never stored in plain text.</p>
                </div>
                <button className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-all shadow-md">
                  Test & Connect Source
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-[28px] font-bold text-text-primary mb-2">Data Management</h1>
          <p className="text-text-secondary text-[15px]">Manage your databases, APIs, variables, and security settings.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-md text-[13px] font-medium text-text-secondary hover:bg-tertiary transition-all">
            <RefreshCw size={16} /> Sync All
          </button>
          <button 
            onClick={() => setIsAddingSource(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-[13px] font-medium hover:bg-primary-dark transition-all shadow-sm"
          >
            <Plus size={16} /> Add Connection
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-border mb-10">
        <button 
          onClick={() => setActiveView('sources')}
          className={`pb-4 text-[14px] font-bold transition-all relative ${activeView === 'sources' ? 'text-primary' : 'text-text-muted hover:text-text-primary'}`}
        >
          Data Sources
          {activeView === 'sources' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full" />}
        </button>
        <button 
          onClick={() => setActiveView('variables')}
          className={`pb-4 text-[14px] font-bold transition-all relative ${activeView === 'variables' ? 'text-primary' : 'text-text-muted hover:text-text-primary'}`}
        >
          Variables & Secrets
          {activeView === 'variables' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full" />}
        </button>
        <button 
          onClick={() => setActiveView('security')}
          className={`pb-4 text-[14px] font-bold transition-all relative ${activeView === 'security' ? 'text-primary' : 'text-text-muted hover:text-text-primary'}`}
        >
          Security & Access
          {activeView === 'security' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full" />}
        </button>
      </div>

      {/* View Content */}
      {activeView === 'sources' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
              <input 
                type="text" 
                placeholder="Search sources..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white border border-border rounded-md py-1.5 pl-9 pr-3 text-[13px] focus:outline-none focus:border-primary w-[300px]" 
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-tertiary rounded-md text-text-muted transition-colors"><Filter size={16} /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSources.map(source => (
              <div key={source.id} className="bg-white border border-border p-6 rounded-lg shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${source.color}`}>
                    <source.icon size={24} />
                  </div>
                  <div className="flex items-center gap-2">
                    {source.status === 'connected' && <CheckCircle2 size={16} className="text-success" />}
                    {source.status === 'warning' && <AlertCircle size={16} className="text-warning" />}
                    {source.status === 'error' && <AlertCircle size={16} className="text-error" />}
                    <button className="p-1 hover:bg-tertiary rounded text-text-muted opacity-0 group-hover:opacity-100 transition-all"><MoreVertical size={16} /></button>
                  </div>
                </div>
                <h3 className="text-[16px] font-bold text-text-primary mb-1 group-hover:text-primary transition-colors">{source.name}</h3>
                <div className="text-[12px] text-text-muted mb-6 uppercase tracking-widest font-bold">{source.type}</div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-text-muted uppercase font-bold tracking-wider">Size</span>
                    <span className="text-[13px] font-bold text-text-primary">{source.size}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[11px] text-text-muted uppercase font-bold tracking-wider">Last Sync</span>
                    <span className="text-[13px] font-bold text-text-primary">{source.lastSync}</span>
                  </div>
                </div>
                <button className="w-full mt-6 py-2 bg-surface border border-border rounded-md text-[13px] font-bold text-text-secondary hover:bg-primary-light hover:text-primary hover:border-primary transition-all flex items-center justify-center gap-2">
                  <ExternalLink size={14} /> Browse Data
                </button>
              </div>
            ))}
            <button 
              onClick={() => setIsAddingSource(true)}
              className="border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center p-8 hover:border-primary hover:bg-primary-light/10 transition-all group"
            >
              <div className="w-12 h-12 bg-tertiary rounded-full flex items-center justify-center text-text-muted mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                <Plus size={24} />
              </div>
              <span className="text-[14px] font-bold text-text-secondary group-hover:text-primary transition-colors">Connect New Source</span>
            </button>
          </div>
        </div>
      )}

      {activeView === 'variables' && (
        <div className="bg-white border border-border rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <div className="flex items-center gap-6">
              <h3 className="text-[16px] font-bold text-text-primary">Environment Variables</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={12} />
                <input 
                  type="text" 
                  placeholder="Filter variables..." 
                  value={variableSearch}
                  onChange={(e) => setVariableSearch(e.target.value)}
                  className="bg-surface border border-border rounded-md py-1 px-8 text-[12px] focus:outline-none focus:border-primary w-[200px]" 
                />
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-1.5 bg-primary text-white rounded-md text-[12px] font-bold hover:bg-primary-dark transition-all">
              <Plus size={14} /> New Variable
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface border-b border-border">
                  <th className="px-6 py-4 text-[12px] font-bold text-text-muted uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-text-muted uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-text-muted uppercase tracking-wider">Value</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-text-muted uppercase tracking-wider">Scope</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-text-muted uppercase tracking-wider">Last Used</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-text-muted uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredVariables.map((v, i) => (
                  <tr key={i} className="hover:bg-surface transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {v.type === 'Secret' ? <Lock size={14} className="text-primary" /> : <Terminal size={14} className="text-text-muted" />}
                        <span className="text-[14px] font-mono font-bold text-text-primary">{v.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${v.type === 'Secret' ? 'bg-primary-light text-primary' : 'bg-tertiary text-text-secondary'}`}>
                        {v.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] text-text-secondary font-mono">{v.value}</span>
                        {v.type === 'Secret' && <button className="p-1 hover:bg-tertiary rounded text-text-muted"><Eye size={14} /></button>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[14px] text-text-secondary">{v.scope}</td>
                    <td className="px-6 py-4 text-[14px] text-text-secondary">{v.lastUsed}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button className="p-1 hover:bg-tertiary rounded text-text-muted hover:text-primary" title="Copy to Clipboard"><Copy size={16} /></button>
                        <button className="p-1 hover:bg-tertiary rounded text-text-muted hover:text-primary" title="Rotate Key"><RefreshCw size={16} /></button>
                        <button className="p-1 hover:bg-tertiary rounded text-text-muted hover:text-error" title="Delete"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeView === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-border p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mb-6 shadow-sm">
              <Shield size={24} />
            </div>
            <h3 className="text-[20px] font-bold text-text-primary mb-4">Data Encryption</h3>
            <p className="text-text-secondary text-[14px] mb-8">All your data is encrypted at rest using AES-256 and in transit using TLS 1.3. Manage your encryption keys and rotation policy here.</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-surface border border-border rounded-lg">
                <div>
                  <div className="text-[14px] font-bold text-text-primary">Auto-Rotation</div>
                  <div className="text-[12px] text-text-muted">Rotate keys every 90 days</div>
                </div>
                <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-surface border border-border rounded-lg">
                <div>
                  <div className="text-[14px] font-bold text-text-primary">PII Masking</div>
                  <div className="text-[12px] text-text-muted">Automatically mask sensitive data in logs</div>
                </div>
                <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center mb-6 shadow-sm">
              <Lock size={24} />
            </div>
            <h3 className="text-[20px] font-bold text-text-primary mb-4">Access Logs</h3>
            <p className="text-text-secondary text-[14px] mb-8">Track every access request to your data sources. Audit logs are kept for 365 days for compliance.</p>
            <div className="space-y-3">
              {[
                { user: 'Alex Johnson', action: 'Accessed Production DB', time: '2m ago' },
                { user: 'System Agent', action: 'Updated User Analytics', time: '15m ago' },
                { user: 'Alex Johnson', action: 'Modified Secret: GEMINI_API_KEY', time: '1h ago' },
                { user: 'Support Bot', action: 'Read Customer Sheets', time: '3h ago' },
              ].map((log, i) => (
                <div key={i} className="flex justify-between items-center text-[13px] py-2 border-b border-border last:border-none">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-text-primary">{log.user}</span>
                    <span className="text-text-muted">{log.action}</span>
                  </div>
                  <span className="text-text-muted font-mono">{log.time}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-2 text-[13px] font-bold text-primary hover:underline">
              View Full Audit Trail <ChevronRight size={14} className="inline" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
