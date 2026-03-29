import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Calendar, 
  Mail, 
  FileText, 
  Star, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Filter, 
  Zap, 
  MoreVertical,
  MessageSquare,
  Award,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const TalentScoutTab: React.FC = () => {
  const [isFiltering, setIsFiltering] = useState(false);
  const [candidates, setCandidates] = useState<any[] | null>(null);

  const handleFilter = () => {
    setIsFiltering(true);
    setTimeout(() => {
      setCandidates([
        { name: 'Alex Rivera', role: 'Senior Frontend Engineer', match: 96, status: 'Screening Scheduled', experience: '8 years', avatar: 'AR' },
        { name: 'Jordan Lee', role: 'Product Designer', match: 92, status: 'Reviewing', experience: '5 years', avatar: 'JL' },
        { name: 'Sam Taylor', role: 'Fullstack Developer', match: 88, status: 'New', experience: '4 years', avatar: 'ST' },
        { name: 'Casey Morgan', role: 'Engineering Manager', match: 85, status: 'New', experience: '12 years', avatar: 'CM' },
      ]);
      setIsFiltering(false);
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-[#fdfaff] text-slate-900 page-enter">
      {/* Hero Header */}
      <div className="bg-white border-b border-purple-100">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="flex items-center gap-6 mb-10">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-purple-200">
              <Users size={36} />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">TalentScout <span className="text-purple-600">AI</span></h1>
              <p className="text-slate-500 text-lg">Autonomous Recruiting Intelligence • Claude 3.5</p>
            </div>
            <div className="ml-auto flex gap-3">
              <button className="px-6 py-2.5 bg-white border border-purple-200 text-purple-600 rounded-xl font-bold text-sm hover:bg-purple-50 transition-all">
                Import Resumes
              </button>
              <button 
                onClick={handleFilter}
                disabled={isFiltering}
                className="px-6 py-2.5 bg-purple-600 text-white rounded-xl font-bold text-sm hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 flex items-center gap-2"
              >
                {isFiltering ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Zap size={16} fill="currentColor" />}
                Run AI Screening
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {[
              { label: 'Active Jobs', value: '12', icon: Briefcase, color: 'text-purple-600 bg-purple-50' },
              { label: 'New Applicants', value: '142', icon: Users, color: 'text-blue-600 bg-blue-50' },
              { label: 'Interviews Today', value: '8', icon: Calendar, color: 'text-emerald-600 bg-emerald-50' },
              { label: 'Avg. Match Score', value: '84%', icon: Award, color: 'text-amber-600 bg-amber-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-purple-50 p-5 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <stat.icon size={18} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Top Candidates</h3>
              <div className="flex gap-2">
                <button className="p-2 bg-white border border-purple-100 rounded-lg text-slate-400 hover:text-purple-600 transition-all">
                  <Filter size={18} />
                </button>
                <button className="p-2 bg-white border border-purple-100 rounded-lg text-slate-400 hover:text-purple-600 transition-all">
                  <Search size={18} />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isFiltering ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border border-purple-100 rounded-3xl p-20 flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-purple-100 border-t-purple-600 rounded-full animate-spin" />
                    <Users className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-600" size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Analyzing Talent Pool</h3>
                    <p className="text-slate-500">Matching skills, experience, and culture fit with AI</p>
                  </div>
                </motion.div>
              ) : candidates ? (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {candidates.map((c, i) => (
                    <div key={i} className="bg-white border border-purple-50 p-6 rounded-2xl hover:border-purple-300 hover:shadow-lg transition-all group">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-700 font-bold text-xl">
                          {c.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-bold text-slate-900 text-lg">{c.name}</h4>
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-widest">
                              <Star size={10} fill="currentColor" /> {c.match}% Match
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1.5"><Briefcase size={14} /> {c.role}</span>
                            <span className="flex items-center gap-1.5"><Clock size={14} /> {c.experience} exp.</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg ${
                            c.status === 'Screening Scheduled' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'
                          }`}>
                            {c.status}
                          </span>
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-purple-50 rounded-lg text-slate-400 hover:text-purple-600 transition-all">
                              <Mail size={18} />
                            </button>
                            <button className="p-2 hover:bg-purple-50 rounded-lg text-slate-400 hover:text-purple-600 transition-all">
                              <Calendar size={18} />
                            </button>
                            <button className="p-2 hover:bg-purple-50 rounded-lg text-slate-400 hover:text-purple-600 transition-all">
                              <MoreVertical size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <div className="bg-white border border-purple-50 border-dashed rounded-3xl p-24 flex flex-col items-center justify-center text-center space-y-6 opacity-40">
                  <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center text-purple-300">
                    <Users size={48} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Talent Pool Empty</h3>
                    <p className="text-lg">Import resumes or connect Greenhouse to start scouting</p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-purple-900 text-white rounded-3xl p-8 shadow-xl shadow-purple-100">
              <h3 className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-6">Recruiting Pipeline</h3>
              <div className="space-y-6">
                {[
                  { label: 'New Applicants', count: 42, color: 'bg-blue-400' },
                  { label: 'AI Screened', count: 28, color: 'bg-purple-400' },
                  { label: 'Interviews', count: 12, color: 'bg-emerald-400' },
                  { label: 'Offers Sent', count: 3, color: 'bg-amber-400' },
                ].map((step, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-purple-200">{step.label}</span>
                      <span>{step.count}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${step.color}`} style={{ width: `${(step.count / 50) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-purple-100 rounded-3xl p-8 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Upcoming Interviews</h3>
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="flex items-start gap-3 p-3 hover:bg-purple-50 rounded-xl transition-all cursor-pointer group">
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex flex-col items-center justify-center text-purple-600 shrink-0">
                      <span className="text-[10px] font-bold uppercase">Mar</span>
                      <span className="text-sm font-bold leading-none">30</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors">Technical Interview</div>
                      <div className="text-xs text-slate-500">with Alex Rivera • 2:00 PM</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 border border-purple-100 text-purple-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-purple-50 transition-all">
                View Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
