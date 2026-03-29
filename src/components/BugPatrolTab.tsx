import React, { useState } from 'react';
import { 
  Github, 
  Bug, 
  Code2, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Zap, 
  Terminal, 
  GitPullRequest, 
  MessageSquare, 
  ShieldCheck,
  Cpu,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BugPatrolTab: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [report, setReport] = useState<any | null>(null);
  const [prUrl, setPrUrl] = useState('');

  const handleScan = () => {
    if (!prUrl) return;
    setIsScanning(true);
    setTimeout(() => {
      setReport({
        pr: '#482: Implement OAuth2 Flow',
        author: 'priya-dev',
        status: 'Needs Changes',
        findings: [
          { type: 'Critical', msg: 'Potential SQL Injection in auth.ts:42', icon: AlertCircle, color: 'text-red-500 bg-red-500/10' },
          { type: 'Warning', msg: 'Unused import "crypto" in session.ts:12', icon: AlertCircle, color: 'text-amber-500 bg-amber-500/10' },
          { type: 'Optimization', msg: 'Consider using memoization for heavy calculation in utils.ts:104', icon: Zap, color: 'text-blue-500 bg-blue-500/10' },
        ],
        score: 68
      });
      setIsScanning(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 font-mono page-enter">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-900 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <Bug size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">BugPatrol <span className="text-emerald-500">AI</span></h1>
              <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest mt-0.5">
                <ShieldCheck size={12} className="text-emerald-500" /> Continuous Code Review • Claude 3.5
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">System Status</div>
              <div className="flex items-center gap-2 text-emerald-500 text-sm font-bold">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Operational
              </div>
            </div>
            <div className="h-10 w-[1px] bg-slate-800" />
            <Github size={24} className="text-slate-500 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Console */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Terminal size={20} className="text-emerald-500" /> PR Analysis Console
              </h2>
              
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center text-slate-500">
                    <GitPullRequest size={18} />
                  </div>
                  <input 
                    type="text" 
                    value={prUrl}
                    onChange={(e) => setPrUrl(e.target.value)}
                    placeholder="Enter GitHub PR URL (e.g. github.com/org/repo/pull/482)" 
                    className="w-full h-14 bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="h-12 border border-slate-800 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                    <Code2 size={16} /> Scan Repository
                  </button>
                  <button 
                    onClick={handleScan}
                    disabled={isScanning || !prUrl}
                    className={`h-12 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                      isScanning || !prUrl 
                        ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
                        : 'bg-emerald-500 text-slate-900 hover:bg-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.2)]'
                    }`}
                  >
                    {isScanning ? <RefreshCw size={16} className="animate-spin" /> : <Zap size={16} fill="currentColor" />}
                    {isScanning ? 'Analyzing...' : 'Analyze PR'}
                  </button>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isScanning ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center space-y-8"
                >
                  <div className="relative">
                    <div className="w-24 h-24 border-4 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin" />
                    <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500" size={32} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">Deep Scanning PR #482</h3>
                    <p className="text-slate-500 text-sm">Running static analysis, security audits, and logic verification</p>
                  </div>
                  <div className="w-full max-w-xs h-1 bg-slate-950 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3 }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                </motion.div>
              ) : report ? (
                <motion.div 
                  key="report"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Analysis Result</div>
                        <h3 className="text-lg font-bold text-white">{report.pr}</h3>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Health Score</div>
                        <div className={`text-2xl font-bold ${report.score > 80 ? 'text-emerald-500' : 'text-red-500'}`}>{report.score}/100</div>
                      </div>
                    </div>
                    <div className="p-8 space-y-4">
                      {report.findings.map((finding: any, i: number) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-slate-950 border border-slate-800 rounded-xl group hover:border-slate-700 transition-all">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${finding.color}`}>
                            <finding.icon size={20} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{finding.type}</span>
                              <span className="text-[10px] text-slate-600">auth.ts:42</span>
                            </div>
                            <p className="text-sm text-slate-300">{finding.msg}</p>
                          </div>
                          <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-600 hover:text-white transition-all">
                            <ExternalLink size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="p-6 bg-slate-950/50 border-t border-slate-800 flex gap-4">
                      <button className="flex-1 h-12 bg-emerald-500 text-slate-900 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all">
                        Post Comments to GitHub
                      </button>
                      <button className="flex-1 h-12 border border-slate-800 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all">
                        Create Linear Issue
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 border-dashed rounded-2xl p-20 flex flex-col items-center justify-center text-center space-y-6 opacity-30">
                  <div className="w-20 h-20 border-2 border-slate-800 rounded-full flex items-center justify-center">
                    <GitPullRequest size={40} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">No Active Analysis</h3>
                    <p className="text-sm">Submit a PR URL to begin the automated review process</p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Stats Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Global Stats</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-500">Bugs Caught</span>
                    <span className="text-white font-bold">1,242</span>
                  </div>
                  <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[85%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-500">Review Time Saved</span>
                    <span className="text-white font-bold">482h</span>
                  </div>
                  <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[62%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3 text-xs">
                    <div className="w-8 h-8 bg-slate-950 border border-slate-800 rounded flex items-center justify-center text-emerald-500">
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <div className="text-white font-bold">PR #481 Approved</div>
                      <div className="text-slate-600">2 hours ago</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
