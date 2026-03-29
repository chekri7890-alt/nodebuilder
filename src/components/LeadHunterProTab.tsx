import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Linkedin, 
  Database, 
  Target, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  Filter, 
  Download,
  Mail,
  MoreVertical,
  TrendingUp,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const LeadHunterProTab: React.FC = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [leads, setLeads] = useState<any[] | null>(null);
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (!query) return;
    setIsSearching(true);
    setTimeout(() => {
      setLeads([
        { name: 'Sarah Jenkins', role: 'CTO', company: 'TechFlow', email: 'sarah@techflow.io', score: 98, status: 'Qualified' },
        { name: 'Michael Chen', role: 'VP Engineering', company: 'CloudScale', email: 'm.chen@cloudscale.com', score: 92, status: 'Qualified' },
        { name: 'Elena Rodriguez', role: 'Head of Product', company: 'DataPulse', email: 'elena@datapulse.ai', score: 85, status: 'New' },
        { name: 'David Smith', role: 'Founder', company: 'NextGen', email: 'david@nextgen.co', score: 78, status: 'New' },
      ]);
      setIsSearching(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 page-enter">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200">
              <Target size={36} />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">LeadHunter <span className="text-indigo-600">Pro</span></h1>
              <p className="text-slate-500 text-lg mt-1">Autonomous Sales Intelligence • Powered by Claude 3.5</p>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-600">Used by 12 reps</span>
            </div>
          </div>

          <div className="max-w-3xl">
            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center text-slate-400">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find decision makers at B2B SaaS companies in San Francisco..." 
                className="w-full h-16 bg-slate-50 border border-slate-200 rounded-2xl pl-14 pr-40 text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
              />
              <button 
                onClick={handleSearch}
                disabled={isSearching || !query}
                className="absolute right-2 top-2 bottom-2 px-8 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isSearching ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Zap size={18} fill="currentColor" />}
                Search Leads
              </button>
            </div>
            <div className="mt-4 flex gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><Linkedin size={14} className="text-blue-600" /> LinkedIn Scraper Active</span>
              <span className="flex items-center gap-1.5"><Database size={14} className="text-indigo-600" /> Clearbit Enrichment On</span>
              <span className="flex items-center gap-1.5"><Globe size={14} className="text-emerald-600" /> Apollo DB Connected</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar / Filters */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Pipeline Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-sm text-slate-600">Today's Leads</span>
                  <span className="text-xl font-bold">124</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 w-[65%]" />
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm text-slate-600">Qualified</span>
                  <span className="text-xl font-bold">42</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[34%]" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Filters</h3>
              <div className="space-y-4">
                {['Company Size', 'Industry', 'Seniority', 'Location'].map(f => (
                  <div key={f} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0 cursor-pointer hover:text-indigo-600 transition-colors">
                    <span className="text-sm font-medium">{f}</span>
                    <ArrowRight size={14} className="opacity-40" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {isSearching ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                    <Users className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Hunting for Leads...</h3>
                    <p className="text-slate-500">Scraping LinkedIn, Apollo, and enriching with Clearbit</p>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </motion.div>
              ) : leads ? (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold">Found {leads.length} Qualified Leads</h3>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all flex items-center gap-2">
                        <Download size={16} /> Export CSV
                      </button>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all flex items-center gap-2">
                        <TrendingUp size={16} /> Push to HubSpot
                      </button>
                    </div>
                  </div>

                  {leads.map((lead, i) => (
                    <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl hover:border-indigo-500 hover:shadow-lg transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-lg">
                          {lead.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900">{lead.name}</h4>
                            <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-bold">
                              {lead.score}% Match
                            </span>
                          </div>
                          <div className="text-sm text-slate-500">{lead.role} at <span className="font-medium text-slate-700">{lead.company}</span></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-all">
                            <Mail size={18} />
                          </button>
                          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-all">
                            <Linkedin size={18} />
                          </button>
                          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-all">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-3xl p-20 flex flex-col items-center justify-center text-center space-y-6 opacity-40">
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                    <Target size={48} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Ready to Hunt</h3>
                    <p className="text-lg">Enter your search criteria above to find your next customers</p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
