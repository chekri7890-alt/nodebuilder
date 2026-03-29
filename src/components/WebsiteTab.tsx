import React, { useState } from 'react';
import { 
  Globe, 
  Layout, 
  Smartphone, 
  Search, 
  Menu, 
  X, 
  ArrowRight, 
  Zap, 
  Shield, 
  Users, 
  Star, 
  Mail, 
  Github, 
  Twitter, 
  Linkedin,
  MessageSquare,
  Code,
  Layers,
  Cpu,
  Brain
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-border z-[100]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">N</div>
          <span className="text-2xl font-bold tracking-tight text-text-primary">NodeBuilder</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Product', 'Solutions', 'Developers', 'Pricing', 'Resources'].map(item => (
            <a key={item} href="#" className="text-[15px] font-medium text-text-secondary hover:text-primary transition-colors">{item}</a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="text-[15px] font-semibold text-text-primary hover:text-primary transition-colors">Sign In</button>
          <button className="px-6 py-2.5 bg-primary text-white rounded-full text-[15px] font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 text-text-primary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-border overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {['Product', 'Solutions', 'Developers', 'Pricing', 'Resources'].map(item => (
                <a key={item} href="#" className="text-lg font-semibold text-text-primary">{item}</a>
              ))}
              <hr className="border-border" />
              <div className="flex flex-col gap-4">
                <button className="w-full py-3 text-lg font-semibold text-text-primary border border-border rounded-xl">Sign In</button>
                <button className="w-full py-3 text-lg font-semibold text-white bg-primary rounded-xl">Get Started</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="pt-40 pb-20 px-6 overflow-hidden">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-light text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-6">
          <Zap size={14} /> New: NodeBuilder v2.5 is here
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-text-primary leading-[1.1] mb-8">
          Build the future of <span className="text-primary italic">AI Agents</span> and Workflows.
        </h1>
        <p className="text-xl text-text-secondary leading-relaxed mb-10 max-w-xl">
          The most powerful visual development platform for creating autonomous AI agents, complex multi-step workflows, and full-stack internal tools.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full text-lg font-bold hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group">
            Start Building Free <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-text-primary border border-border rounded-full text-lg font-bold hover:bg-tertiary transition-all">
            Book a Demo
          </button>
        </div>
        <div className="mt-12 flex items-center gap-6">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-tertiary overflow-hidden">
                <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
          <div className="text-sm text-text-secondary">
            <span className="font-bold text-text-primary">10k+</span> developers building on NodeBuilder
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" />
        <div className="relative bg-white border border-border rounded-2xl shadow-2xl overflow-hidden aspect-square md:aspect-video lg:aspect-square">
          <div className="h-10 bg-surface border-b border-border px-4 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="mx-auto bg-white border border-border rounded px-4 py-0.5 text-[10px] text-text-muted">app.nodebuilder.ai/canvas</div>
          </div>
          <div className="p-8 h-full flex items-center justify-center">
            <div className="grid grid-cols-3 gap-6 w-full max-w-md">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <motion.div 
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                  className="bg-white border border-border p-4 rounded-xl shadow-sm flex flex-col items-center gap-2"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${i % 2 === 0 ? 'bg-primary' : 'bg-blue-500'}`}>
                    {i % 2 === 0 ? <Brain size={20} /> : <Zap size={20} />}
                  </div>
                  <div className="w-12 h-1.5 bg-tertiary rounded-full" />
                  <div className="w-8 h-1 bg-tertiary/50 rounded-full" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Features = () => {
  const features = [
    { title: 'Autonomous Agents', desc: 'Deploy AI agents that can reason, plan, and execute complex tasks across your tool stack.', icon: Brain, color: 'bg-purple-500' },
    { title: 'Visual Workflows', desc: 'Build multi-step automations with a drag-and-drop canvas. No code required, but fully extensible.', icon: Layers, color: 'bg-blue-500' },
    { title: 'Internal Tools', desc: 'Generate custom dashboards, CRMs, and admin panels with pre-built UI components.', icon: Layout, color: 'bg-orange-500' },
    { title: 'Enterprise Security', desc: 'Role-based access control, SSO, and audit logs to keep your data safe and compliant.', icon: Shield, color: 'bg-green-500' },
    { title: 'Real-time Analytics', desc: 'Monitor your agents and workflows in real-time with detailed performance metrics.', icon: Cpu, color: 'bg-red-500' },
    { title: 'Team Collaboration', desc: 'Work together in real-time. Share templates, components, and best practices across your org.', icon: Users, color: 'bg-cyan-500' },
  ];

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-text-primary mb-4">Everything you need to build AI-first apps</h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            NodeBuilder provides the infrastructure, tools, and UI components to take your AI ideas from concept to production in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-8 rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all"
            >
              <div className={`w-14 h-14 ${f.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/5`}>
                <f.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">{f.title}</h3>
              <p className="text-text-secondary leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    { title: 'SalesDesk CRM', category: 'Internal Tool', image: 'https://picsum.photos/seed/crm/800/600' },
    { title: 'ContentCraft AI', category: 'AI Agent', image: 'https://picsum.photos/seed/content/800/600' },
    { title: 'AutoFlow Pipeline', category: 'Workflow', image: 'https://picsum.photos/seed/workflow/800/600' },
    { title: 'DataSync Engine', category: 'Automation', image: 'https://picsum.photos/seed/datasync/800/600' },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-bold text-text-primary mb-4">Built with NodeBuilder</h2>
            <p className="text-lg text-text-secondary max-w-xl">
              See what leading companies are building with our visual development platform.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline">
            View all case studies <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 shadow-lg">
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <button className="px-6 py-2 bg-white text-text-primary rounded-full font-bold text-sm">View Details</button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-1">{p.title}</h3>
                  <p className="text-text-secondary font-medium">{p.category}</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text-muted group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                  <ArrowRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <div className="lg:col-span-1">
          <h2 className="text-4xl font-bold text-text-primary mb-6">Loved by developers worldwide.</h2>
          <p className="text-lg text-text-secondary mb-8">
            Join thousands of teams building the next generation of software on NodeBuilder.
          </p>
          <div className="flex items-center gap-2 text-warning">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="currentColor" />)}
            <span className="ml-2 text-text-primary font-bold">4.9/5 on G2</span>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'Sarah Chen', role: 'CTO at TechFlow', content: 'NodeBuilder has completely changed how we build internal tools. What used to take weeks now takes hours.' },
            { name: 'Marcus Rodriguez', role: 'AI Engineer at Scale', content: 'The agent orchestration capabilities are second to none. It is the most robust platform I have used.' },
            { name: 'Elena Petrova', role: 'Product Manager at Innovate', content: 'The visual builder is so intuitive that even our non-technical team members can contribute to workflows.' },
            { name: 'David Kim', role: 'Founder at Stealth Startup', content: 'We built our entire MVP on NodeBuilder. The speed of iteration is incredible.' },
          ].map((t, i) => (
            <div key={i} className="bg-surface p-8 rounded-2xl border border-border">
              <p className="text-text-primary italic mb-6">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-tertiary overflow-hidden">
                  <img src={`https://picsum.photos/seed/t${i}/100/100`} alt={t.name} referrerPolicy="no-referrer" />
                </div>
                <div>
                  <div className="font-bold text-text-primary">{t.name}</div>
                  <div className="text-xs text-text-secondary">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-24 px-6">
    <div className="max-w-5xl mx-auto bg-primary rounded-[32px] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/40">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.2),transparent)]" />
      <h2 className="text-4xl md:text-6xl font-bold mb-8 relative z-10">Ready to build your first AI agent?</h2>
      <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto relative z-10">
        Start building for free today. No credit card required. Join 10,000+ developers pushing the boundaries of AI.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
        <button className="w-full sm:w-auto px-10 py-5 bg-white text-primary rounded-full text-xl font-bold hover:bg-primary-light transition-all shadow-xl">
          Get Started Now
        </button>
        <button className="w-full sm:w-auto px-10 py-5 bg-primary-dark text-white rounded-full text-xl font-bold hover:bg-black/20 transition-all border border-white/20">
          Talk to Sales
        </button>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section className="py-24 px-6 bg-surface">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-4xl font-bold text-text-primary mb-6">Get in touch with our team.</h2>
          <p className="text-lg text-text-secondary mb-12">
            Have questions about NodeBuilder? We are here to help you build the future of AI.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-text-primary mb-1">Email us</h4>
                <p className="text-text-secondary">hello@nodebuilder.ai</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center shrink-0">
                <MessageSquare size={24} />
              </div>
              <div>
                <h4 className="font-bold text-text-primary mb-1">Chat with us</h4>
                <p className="text-text-secondary">Available 24/7 via our AI agent</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center shrink-0">
                <Globe size={24} />
              </div>
              <div>
                <h4 className="font-bold text-text-primary mb-1">Visit us</h4>
                <p className="text-text-secondary">123 AI Boulevard, San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-3xl border border-border shadow-xl">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-primary">First Name</label>
                <input type="text" className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:border-primary outline-none transition-all" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-primary">Last Name</label>
                <input type="text" className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:border-primary outline-none transition-all" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary">Email Address</label>
              <input type="email" className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:border-primary outline-none transition-all" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary">Company</label>
              <input type="text" className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:border-primary outline-none transition-all" placeholder="Acme Inc" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary">Message</label>
              <textarea className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:border-primary outline-none transition-all h-32 resize-none" placeholder="How can we help you?" />
            </div>
            <button className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white border-t border-border pt-20 pb-10 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">N</div>
            <span className="text-xl font-bold tracking-tight text-text-primary">NodeBuilder</span>
          </div>
          <p className="text-text-secondary mb-8 max-w-xs">
            The visual development platform for the AI era. Build agents, workflows, and apps faster than ever.
          </p>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center text-text-secondary hover:text-primary transition-colors"><Twitter size={20} /></button>
            <button className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center text-text-secondary hover:text-primary transition-colors"><Github size={20} /></button>
            <button className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center text-text-secondary hover:text-primary transition-colors"><Linkedin size={20} /></button>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-text-primary mb-6">Product</h4>
          <ul className="space-y-4 text-text-secondary">
            {['Builder', 'Agents', 'Workflows', 'UI Builder', 'Marketplace'].map(item => (
              <li key={item}><a href="#" className="hover:text-primary transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-text-primary mb-6">Company</h4>
          <ul className="space-y-4 text-text-secondary">
            {['About', 'Careers', 'Blog', 'Press', 'Contact'].map(item => (
              <li key={item}><a href="#" className="hover:text-primary transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-text-primary mb-6">Resources</h4>
          <ul className="space-y-4 text-text-secondary">
            {['Documentation', 'Community', 'Templates', 'API Reference', 'Status'].map(item => (
              <li key={item}><a href="#" className="hover:text-primary transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-text-primary mb-6">Legal</h4>
          <ul className="space-y-4 text-text-secondary">
            {['Privacy', 'Terms', 'Security', 'Cookies'].map(item => (
              <li key={item}><a href="#" className="hover:text-primary transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-border gap-4">
        <div className="text-sm text-text-muted">© 2026 NodeBuilder Inc. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export const WebsiteTab: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <Hero />
      <Features />
      <Portfolio />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
};
