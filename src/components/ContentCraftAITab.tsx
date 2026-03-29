import React, { useState } from 'react';
import { 
  Brain, 
  Search, 
  FileText, 
  Share2, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Globe,
  Copy,
  Check,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type ContentType = 'blog' | 'social' | 'ad';

export const ContentCraftAITab: React.FC = () => {
  const [activeType, setActiveType] = useState<ContentType>('blog');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      let content = '';
      if (activeType === 'blog') {
        content = `# The Future of AI in Content Creation\n\nArtificial Intelligence is no longer a futuristic concept; it's a present-day reality that's reshaping how we create, consume, and distribute content. From automated news reports to AI-generated art, the landscape is shifting rapidly.\n\n## Why AI Matters\nAI tools like GPT-4o are enabling creators to produce high-quality content at scale. By handling repetitive tasks and providing creative sparks, these tools allow humans to focus on strategy and emotional resonance.\n\n### Key Benefits:\n1. **Efficiency**: Reduce production time by up to 70%.\n2. **SEO Optimization**: Automatically identify and integrate high-value keywords.\n3. **Consistency**: Maintain a steady brand voice across all platforms.`;
      } else if (activeType === 'social') {
        content = `🚀 Exciting news! We've just launched our new AI-powered content engine. \n\nSay goodbye to writer's block and hello to unlimited creativity. Whether you need SEO-optimized blogs or viral social captions, we've got you covered. \n\nCheck it out at the link in bio! #AI #ContentCreation #Innovation #TechTrends`;
      } else {
        content = `**Headline**: Stop Guessing, Start Growing.\n**Body**: Tired of spending hours on ad copy that doesn't convert? Our AI agent uses GPT-4o to craft high-converting ads tailored to your audience. Get 3x more clicks today.\n**CTA**: Start Your Free Trial`;
      }
      setGeneratedContent(content);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0502] text-white relative overflow-hidden page-enter">
      {/* Atmospheric Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[20%] w-[60%] h-[60%] bg-[#3a1510] rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[-10%] right-[10%] w-[50%] h-[50%] bg-[#ff4e00] rounded-full blur-[100px] opacity-20" />
      </div>

      <div className="max-w-5xl mx-auto px-8 py-16 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-14 h-14 bg-[#ff4e00]/20 border border-[#ff4e00]/30 rounded-2xl flex items-center justify-center text-[#ff4e00] shadow-[0_0_30px_rgba(255,78,0,0.2)]">
            <Brain size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-light tracking-tight">ContentCraft <span className="text-[#ff4e00] font-medium">AI</span></h1>
            <p className="text-white/50 text-sm uppercase tracking-[0.2em] mt-1">SEO & Marketing Agent • Powered by GPT-4o</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
                <Sparkles size={20} className="text-[#ff4e00]" /> What are we crafting?
              </h2>
              
              <div className="flex gap-2 mb-8 p-1 bg-white/5 rounded-xl border border-white/5">
                {(['blog', 'social', 'ad'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeType === type 
                        ? 'bg-[#ff4e00] text-white shadow-lg' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Topic or Keywords</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={
                      activeType === 'blog' ? "e.g. The future of AI in content creation..." :
                      activeType === 'social' ? "e.g. Launching a new AI tool for creators..." :
                      "e.g. High-converting ad for a SaaS product..."
                    }
                    className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#ff4e00]/50 transition-all resize-none"
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt}
                  className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                    isGenerating || !prompt
                      ? 'bg-white/10 text-white/30 cursor-not-allowed'
                      : 'bg-[#ff4e00] hover:bg-[#ff6a2a] text-white shadow-[0_10px_40px_rgba(255,78,0,0.3)] active:scale-[0.98]'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap size={18} fill="currentColor" /> Generate Content
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Features Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <Search size={20} className="text-[#ff4e00] mb-3" />
                <h4 className="text-sm font-bold mb-1">SEO Optimized</h4>
                <p className="text-xs text-white/40">Rank higher with AI-driven keyword integration.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <Share2 size={20} className="text-[#ff4e00] mb-3" />
                <h4 className="text-sm font-bold mb-1">Multi-Channel</h4>
                <p className="text-xs text-white/40">Tailored formats for LinkedIn, Twitter, and more.</p>
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="lg:col-span-7">
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl h-full flex flex-col overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#ff4e00] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60">Output Preview</span>
                </div>
                {generatedContent && (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleCopy}
                      className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-all"
                      title="Copy to clipboard"
                    >
                      {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-all" title="Share">
                      <Send size={18} />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                  {isGenerating ? (
                    <motion.div 
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center text-center space-y-4"
                    >
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-[#ff4e00]/20 border-t-[#ff4e00] rounded-full animate-spin" />
                        <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#ff4e00]" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Crafting your content...</h3>
                        <p className="text-white/40 text-sm">Analyzing SEO trends and brand voice</p>
                      </div>
                    </motion.div>
                  ) : generatedContent ? (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="prose prose-invert max-w-none"
                    >
                      {activeType === 'blog' ? (
                        <div className="space-y-6">
                          <h1 className="text-3xl font-bold text-white leading-tight">The Future of AI in Content Creation</h1>
                          <p className="text-white/70 leading-relaxed">
                            Artificial Intelligence is no longer a futuristic concept; it's a present-day reality that's reshaping how we create, consume, and distribute content. From automated news reports to AI-generated art, the landscape is shifting rapidly.
                          </p>
                          <h2 className="text-xl font-bold text-[#ff4e00]">Why AI Matters</h2>
                          <p className="text-white/70 leading-relaxed">
                            AI tools like GPT-4o are enabling creators to produce high-quality content at scale. By handling repetitive tasks and providing creative sparks, these tools allow humans to focus on strategy and emotional resonance.
                          </p>
                          <div className="bg-white/5 border-l-4 border-[#ff4e00] p-6 rounded-r-2xl">
                            <h3 className="text-lg font-bold mb-4">Key Benefits:</h3>
                            <ul className="space-y-3 text-white/70 list-none p-0">
                              <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#ff4e00]" />
                                <span><strong>Efficiency</strong>: Reduce production time by up to 70%.</span>
                              </li>
                              <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#ff4e00]" />
                                <span><strong>SEO Optimization</strong>: Automatically integrate high-value keywords.</span>
                              </li>
                              <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#ff4e00]" />
                                <span><strong>Consistency</strong>: Maintain a steady brand voice across all platforms.</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      ) : activeType === 'social' ? (
                        <div className="space-y-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                              <Linkedin size={20} />
                            </div>
                            <div>
                              <div className="font-bold text-sm">Alex Johnson</div>
                              <div className="text-[10px] text-white/40 uppercase tracking-widest">LinkedIn Preview</div>
                            </div>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-lg leading-relaxed text-white/90 italic font-serif">
                            "{generatedContent}"
                          </div>
                          <div className="flex gap-4">
                            <button className="flex-1 py-3 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-xs font-bold hover:bg-white/5 transition-all">
                              <Twitter size={14} /> Post to X
                            </button>
                            <button className="flex-1 py-3 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-xs font-bold hover:bg-white/5 transition-all">
                              <Linkedin size={14} /> Post to LinkedIn
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-8">
                          <div className="text-center mb-8">
                            <div className="inline-block px-3 py-1 bg-[#ff4e00]/20 text-[#ff4e00] text-[10px] font-bold rounded-full uppercase tracking-[0.2em] mb-4">Ad Preview</div>
                            <h2 className="text-2xl font-bold">High-Conversion Ad Copy</h2>
                          </div>
                          <div className="bg-white p-8 rounded-3xl text-black shadow-2xl">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
                                <Zap size={16} fill="currentColor" />
                              </div>
                              <span className="font-bold text-sm">NodeBuilder</span>
                              <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 ml-auto">Sponsored</span>
                            </div>
                            <h3 className="text-xl font-black mb-3 leading-tight">Stop Guessing, Start Growing.</h3>
                            <p className="text-gray-600 text-sm mb-6">
                              Tired of spending hours on ad copy that doesn't convert? Our AI agent uses GPT-4o to craft high-converting ads tailored to your audience. Get 3x more clicks today.
                            </p>
                            <button className="w-full py-3 bg-black text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-all">
                              Start Your Free Trial <ArrowRight size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-20">
                      <div className="w-24 h-24 border-2 border-dashed border-white/30 rounded-full flex items-center justify-center">
                        <FileText size={40} />
                      </div>
                      <div>
                        <h3 className="text-xl font-medium">Ready to Craft</h3>
                        <p className="text-sm">Enter a topic and click generate to see the magic</p>
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
};
