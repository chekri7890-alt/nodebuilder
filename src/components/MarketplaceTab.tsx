import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  ExternalLink, 
  ChevronRight, 
  ChevronDown,
  Zap, 
  Brain, 
  Layout, 
  Database, 
  MessageSquare, 
  Globe, 
  Shield, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Plus 
} from 'lucide-react';
import { motion } from 'motion/react';

export const MarketplaceTab: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'AI Agents', 'CRM', 'Marketing', 'Automation', 'Dev Tools', 'Utilities'];

  const featuredTemplates = [
    { id: '1', name: 'Customer Support Agent', author: 'NodeBuilder Team', rating: 4.9, installs: '12k', price: 'Free', icon: MessageSquare, color: 'text-primary bg-primary-light', desc: 'A multi-channel support agent with sentiment analysis and automated ticket routing.' },
    { id: '2', name: 'SEO Content Engine', author: 'GrowthLabs', rating: 4.8, installs: '8k', price: '$29', icon: Globe, color: 'text-blue-500 bg-blue-500/10', desc: 'Generate high-ranking blog posts and social media content optimized for search engines.' },
  ];

  const templates = [
    { id: '3', name: 'Lead Scraper Pro', author: 'DataFlow', rating: 4.7, installs: '5k', price: 'Free', icon: Database, color: 'text-success bg-success/10', category: 'Automation' },
    { id: '4', name: 'Sales Pipeline CRM', author: 'NodeBuilder Team', rating: 4.9, installs: '15k', price: 'Free', icon: Layout, category: 'CRM' },
    { id: '5', name: 'Code Reviewer AI', author: 'DevOps AI', rating: 4.6, installs: '3k', price: '$15', icon: Brain, category: 'Dev Tools' },
    { id: '6', name: 'Social Media Scheduler', author: 'Marketing Hub', rating: 4.5, installs: '6k', price: 'Free', icon: TrendingUp, category: 'Marketing' },
    { id: '7', name: 'Security Auditor', author: 'SafeNet', rating: 4.8, installs: '2k', price: '$49', icon: Shield, category: 'Utilities' },
    { id: '8', name: 'Team Collaboration Bot', author: 'WorkSync', rating: 4.4, installs: '4k', price: 'Free', icon: Users, category: 'Automation' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-10 py-12 page-enter">
      {/* Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-[28px] font-bold text-text-primary mb-2">Marketplace</h1>
          <p className="text-text-secondary text-[15px]">Discover and install pre-built templates, agents, and nodes.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
            <input type="text" placeholder="Search marketplace..." className="bg-white border border-border rounded-md py-2 pl-9 pr-4 text-[14px] focus:outline-none focus:border-primary w-[300px] shadow-sm" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-[13px] font-medium hover:bg-primary-dark transition-all shadow-sm">
            <Plus size={16} /> Submit Template
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar border-b border-border">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-bold transition-all
              ${activeCategory === cat ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:bg-tertiary hover:text-text-primary'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[18px] font-bold text-text-primary">Featured Templates</h2>
          <button className="text-[14px] text-primary font-bold hover:underline flex items-center gap-1">View all <ChevronRight size={16} /></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredTemplates.map(template => (
            <div key={template.id} className="bg-white border border-border p-8 rounded-xl shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-light/20 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
              <div className="flex items-start gap-6">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${template.color}`}>
                  <template.icon size={32} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-[20px] font-bold text-text-primary group-hover:text-primary transition-colors">{template.name}</h3>
                      <span className="text-[13px] text-text-muted">by {template.author}</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-tertiary rounded text-[12px] font-bold text-text-secondary">
                      <Star size={12} className="text-warning fill-warning" /> {template.rating}
                    </div>
                  </div>
                  <p className="text-[14px] text-text-secondary mb-6 line-clamp-2">{template.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-[12px] text-text-muted font-bold">
                        <Download size={14} /> {template.installs}
                      </div>
                      <div className="text-[14px] font-bold text-text-primary">{template.price}</div>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-full text-[13px] font-bold hover:bg-primary-dark transition-all shadow-sm active:scale-95">
                      Install Template
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[18px] font-bold text-text-primary">All Templates</h2>
          <div className="flex items-center gap-2 text-[13px] text-text-muted">
            Sort by: <button className="text-text-primary font-bold flex items-center gap-1">Most Popular <ChevronDown size={14} /></button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map(template => (
            <div key={template.id} className="bg-white border border-border p-5 rounded-lg hover:-translate-y-1 hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${template.color}`}>
                  <template.icon size={20} />
                </div>
                <div className="flex items-center gap-1 text-[12px] font-bold text-text-muted">
                  <Star size={12} className="text-warning fill-warning" /> {template.rating}
                </div>
              </div>
              <h4 className="text-[15px] font-bold text-text-primary mb-1 group-hover:text-primary transition-colors">{template.name}</h4>
              <div className="text-[12px] text-text-muted mb-4">by {template.author}</div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex flex-col">
                  <span className="text-[11px] text-text-muted uppercase font-bold tracking-wider">{template.category}</span>
                  <span className="text-[13px] font-bold text-text-primary">{template.price}</span>
                </div>
                <button className="p-2 bg-surface border border-border rounded-md text-text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <Download size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Section */}
      <section className="bg-surface border border-border rounded-xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-[500px]">
          <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center mb-6 shadow-lg">
            <Users size={24} />
          </div>
          <h2 className="text-[24px] font-bold text-text-primary mb-4">Join the NodeBuilder Community</h2>
          <p className="text-text-secondary text-[15px] mb-6">Share your custom nodes, UI components, and workflows with thousands of other builders. Get recognized and earn rewards.</p>
          <div className="flex gap-4">
            <button className="px-6 py-2.5 bg-primary text-white rounded-full text-[14px] font-bold hover:bg-primary-dark transition-all shadow-sm">
              Explore Community
            </button>
            <button className="px-6 py-2.5 bg-white border border-border text-text-primary rounded-full text-[14px] font-bold hover:bg-tertiary transition-all">
              Join Discord
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-32 h-32 bg-white border border-border rounded-lg shadow-sm flex flex-col items-center justify-center p-4 text-center">
              <div className="w-10 h-10 bg-tertiary rounded-full mb-2 flex items-center justify-center text-text-muted">
                <Plus size={20} />
              </div>
              <span className="text-[11px] font-bold text-text-muted uppercase">Node {i}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
