import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Play, 
  Settings, 
  Trash2, 
  Copy, 
  Maximize2, 
  Minimize2, 
  Layers, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Eye, 
  Code, 
  Save, 
  Share2, 
  Type, 
  Image as ImageIcon, 
  Square, 
  Circle, 
  Columns, 
  Rows, 
  Table as TableIcon, 
  BarChart3, 
  MessageSquare, 
  ChevronRight, 
  ChevronLeft, 
  Layout, 
  Palette, 
  Link2, 
  Zap 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UIElement {
  id: string;
  type: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  config: {
    text?: string;
    title?: string;
    value?: string;
    color?: string;
    backgroundColor?: string;
    fontSize?: number;
    fontWeight?: string;
    borderRadius?: number;
    padding?: number;
    variant?: 'primary' | 'secondary' | 'outline';
    dataBinding?: string;
    [key: string]: any;
  };
}

export const UIBuilderTab: React.FC = () => {
  const [elements, setElements] = useState<UIElement[]>([
    { id: '1', type: 'text', label: 'Header', x: 40, y: 40, w: 300, h: 40, config: { text: 'NodeBuilder Dashboard', fontSize: 24, fontWeight: 'bold', color: '#1A1A1A' } },
    { id: '2', type: 'card', label: 'Stats Card', x: 40, y: 100, w: 240, h: 120, config: { title: 'Total Users', value: '1,234', color: '#D97757', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16 } },
    { id: '3', type: 'chart', label: 'Growth Chart', x: 300, y: 100, w: 460, h: 280, config: { type: 'bar', data: 'user_growth', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16 } },
    { id: '4', type: 'button', label: 'Action Button', x: 40, y: 240, w: 140, h: 44, config: { text: 'Refresh Data', variant: 'primary', borderRadius: 8 } },
  ]);

  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isPreview, setIsPreview] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [draggedType, setDraggedType] = useState<string | null>(null);
  const [isDraggingOnCanvas, setIsDraggingOnCanvas] = useState(false);

  const componentLibrary = [
    { type: 'text', label: 'Text Block', icon: Type, defaultW: 200, defaultH: 40 },
    { type: 'button', label: 'Button', icon: Square, defaultW: 120, defaultH: 40 },
    { type: 'input', label: 'Input Field', icon: Type, defaultW: 240, defaultH: 40 },
    { type: 'card', label: 'Card Container', icon: Square, defaultW: 240, defaultH: 160 },
    { type: 'image', label: 'Image', icon: ImageIcon, defaultW: 200, defaultH: 150 },
    { type: 'table', label: 'Data Table', icon: TableIcon, defaultW: 600, defaultH: 300 },
    { type: 'chart', label: 'Chart', icon: BarChart3, defaultW: 400, defaultH: 250 },
    { type: 'form', label: 'Form', icon: Layout, defaultW: 300, defaultH: 400 },
    { type: 'modal', label: 'Modal', icon: Layers, defaultW: 500, defaultH: 350 },
  ];

  const handleDragStart = (type: string) => {
    setDraggedType(type);
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOnCanvas(false);
    if (!draggedType) return;

    const canvasRect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - canvasRect.left);
    const y = Math.round(e.clientY - canvasRect.top);

    const comp = componentLibrary.find(c => c.type === draggedType);
    if (!comp) return;

    const newElement: UIElement = {
      id: Math.random().toString(36).substr(2, 9),
      type: draggedType,
      label: comp.label,
      x,
      y,
      w: comp.defaultW,
      h: comp.defaultH,
      config: {
        text: comp.label,
        title: comp.label,
        value: '0',
        color: '#1A1A1A',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        variant: 'primary',
      }
    };

    setElements([...elements, newElement]);
    setSelectedElementId(newElement.id);
    setDraggedType(null);
  };

  const updateElement = (id: string, updates: Partial<UIElement>) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const updateConfig = (id: string, configUpdates: any) => {
    setElements(elements.map(el => el.id === id ? { ...el, config: { ...el.config, ...configUpdates } } : el));
  };

  const handleElementClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedElementId(id);
  };

  const selectedElement = elements.find(el => el.id === selectedElementId);

  const renderElement = (el: UIElement) => {
    const isSelected = selectedElementId === el.id;
    
    const baseStyle: React.CSSProperties = {
      left: el.x,
      top: el.y,
      width: el.w,
      height: el.h,
      borderRadius: el.config.borderRadius,
      padding: el.config.padding,
      backgroundColor: el.config.backgroundColor,
      color: el.config.color,
    };

    switch (el.type) {
      case 'text':
        return (
          <div 
            key={el.id}
            onClick={(e) => handleElementClick(e, el.id)}
            style={baseStyle}
            className={`absolute flex items-center group cursor-move ${isSelected ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-primary/50'}`}
          >
            <span style={{ fontSize: el.config.fontSize || 16, fontWeight: el.config.fontWeight || 'normal' }}>
              {el.config.text}
            </span>
          </div>
        );
      case 'card':
        return (
          <div 
            key={el.id}
            onClick={(e) => handleElementClick(e, el.id)}
            style={baseStyle}
            className={`absolute border border-border shadow-sm flex flex-col justify-between group cursor-move ${isSelected ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-primary/50'}`}
          >
            <div className="text-[12px] text-text-muted uppercase tracking-wider font-bold">{el.config.title}</div>
            <div className="text-[24px] font-bold" style={{ color: el.config.color }}>{el.config.value}</div>
          </div>
        );
      case 'chart':
        return (
          <div 
            key={el.id}
            onClick={(e) => handleElementClick(e, el.id)}
            style={baseStyle}
            className={`absolute border border-border shadow-sm flex flex-col group cursor-move ${isSelected ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-primary/50'}`}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="text-[14px] font-bold">Growth Analytics</div>
              <BarChart3 size={16} className="text-text-muted" />
            </div>
            <div className="flex-1 flex items-end gap-2 pb-2">
              {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                <div key={i} className="flex-1 bg-primary-light rounded-t hover:bg-primary transition-all" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        );
      case 'button':
        return (
          <button 
            key={el.id}
            onClick={(e) => handleElementClick(e, el.id)}
            style={baseStyle}
            className={`absolute text-[14px] font-medium transition-all group cursor-move flex items-center justify-center ${
              el.config.variant === 'primary' ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-surface border border-border text-text-secondary hover:bg-tertiary'
            } ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}
          >
            {el.config.text}
          </button>
        );
      case 'input':
        return (
          <div 
            key={el.id}
            onClick={(e) => handleElementClick(e, el.id)}
            style={baseStyle}
            className={`absolute flex flex-col gap-1 group cursor-move ${isSelected ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-primary/50'}`}
          >
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">{el.config.text}</label>
            <div className="flex-1 bg-surface border border-border rounded px-3 py-2 text-[13px] text-text-muted">Placeholder...</div>
          </div>
        );
      default:
        return (
          <div 
            key={el.id}
            onClick={(e) => handleElementClick(e, el.id)}
            style={baseStyle}
            className={`absolute border border-dashed border-border flex items-center justify-center text-text-muted text-[12px] group cursor-move ${isSelected ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-primary/50'}`}
          >
            {el.label}
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-tertiary overflow-hidden relative page-enter">
      {/* Top Toolbar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 bg-white border border-border rounded-full px-6 py-2 shadow-sm">
        <div className="flex items-center gap-1 border-r border-border pr-4">
          <button onClick={() => setViewMode('desktop')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'desktop' ? 'bg-primary-light text-primary' : 'text-text-muted hover:bg-tertiary'}`}><Monitor size={18} /></button>
          <button onClick={() => setViewMode('tablet')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'tablet' ? 'bg-primary-light text-primary' : 'text-text-muted hover:bg-tertiary'}`}><Tablet size={18} /></button>
          <button onClick={() => setViewMode('mobile')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'mobile' ? 'bg-primary-light text-primary' : 'text-text-muted hover:bg-tertiary'}`}><Smartphone size={18} /></button>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsPreview(!isPreview)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-medium transition-all ${isPreview ? 'bg-primary text-white shadow-md' : 'bg-surface border border-border text-text-secondary hover:bg-tertiary'}`}
          >
            {isPreview ? <Code size={14} /> : <Eye size={14} />} {isPreview ? 'Edit Mode' : 'Preview'}
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-primary text-white rounded-full text-[13px] font-medium hover:bg-primary-dark transition-all shadow-sm">
            <Save size={14} /> Publish App
          </button>
        </div>
      </div>

      {/* Left Sidebar: Components */}
      <motion.aside 
        initial={false}
        animate={{ width: isLeftSidebarOpen ? 260 : 0, opacity: isLeftSidebarOpen ? 1 : 0 }}
        className="bg-white border-r border-border flex flex-col z-30 relative"
      >
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h3 className="text-[14px] font-bold text-text-primary">Components</h3>
          <button onClick={() => setIsLeftSidebarOpen(false)} className="p-1 hover:bg-tertiary rounded text-text-muted"><ChevronLeft size={16} /></button>
        </div>
        <div className="p-4">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
            <input type="text" placeholder="Search components..." className="w-full bg-surface border border-border rounded-md py-1.5 pl-9 pr-3 text-[13px] focus:outline-none focus:border-primary" />
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-[11px] uppercase tracking-widest text-text-muted font-bold mb-3">Basic Elements</h4>
              <div className="grid grid-cols-2 gap-2">
                {componentLibrary.slice(0, 5).map(comp => (
                  <div 
                    key={comp.type}
                    draggable
                    onDragStart={() => handleDragStart(comp.type)}
                    className="flex flex-col items-center justify-center gap-2 p-3 border border-border rounded-md hover:border-primary hover:bg-primary-light/30 cursor-grab active:cursor-grabbing transition-all group"
                  >
                    <comp.icon size={20} className="text-text-muted group-hover:text-primary" />
                    <span className="text-[11px] text-text-secondary font-medium">{comp.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-widest text-text-muted font-bold mb-3">Advanced Widgets</h4>
              <div className="grid grid-cols-2 gap-2">
                {componentLibrary.slice(5).map(comp => (
                  <div 
                    key={comp.type}
                    draggable
                    onDragStart={() => handleDragStart(comp.type)}
                    className="flex flex-col items-center justify-center gap-2 p-3 border border-border rounded-md hover:border-primary hover:bg-primary-light/30 cursor-grab active:cursor-grabbing transition-all group"
                  >
                    <comp.icon size={20} className="text-text-muted group-hover:text-primary" />
                    <span className="text-[11px] text-text-secondary font-medium">{comp.label}</span>
                  </div>
                ))}
              </div>
            </div>
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
        className="flex-1 relative overflow-auto p-20 flex justify-center items-start"
        onClick={() => setSelectedElementId(null)}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingOnCanvas(true);
        }}
        onDragLeave={() => setIsDraggingOnCanvas(false)}
        onDrop={handleCanvasDrop}
      >
        <div 
          className={`
            bg-white shadow-2xl rounded-xl border border-border relative transition-all duration-300 overflow-hidden
            ${viewMode === 'desktop' ? 'w-[1000px] min-h-[800px]' : viewMode === 'tablet' ? 'w-[768px] min-h-[1024px]' : 'w-[375px] min-h-[667px]'}
            ${isDraggingOnCanvas ? 'ring-4 ring-primary/20 border-primary' : ''}
          `}
        >
          {/* Canvas Grid Background */}
          {!isPreview && (
            <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />
          )}

          {/* Render Elements */}
          {elements.map(el => renderElement(el))}

          {/* Drop Indicator */}
          {isDraggingOnCanvas && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-primary/10 border-2 border-dashed border-primary rounded-lg px-6 py-4 text-primary font-bold animate-pulse">
                Drop to Add Component
              </div>
            </div>
          )}
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

        {selectedElementId && selectedElement ? (
          <div className="p-6 space-y-6 overflow-y-auto no-scrollbar">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center text-primary">
                <Palette size={24} />
              </div>
              <div>
                <h4 className="text-[16px] font-bold text-text-primary">{selectedElement.label}</h4>
                <span className="text-[12px] text-text-muted uppercase tracking-widest">Type: {selectedElement.type}</span>
              </div>
            </div>

            <div className="space-y-6">
              {/* Layout Section */}
              <div>
                <h5 className="text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Layout size={14} /> Layout
                </h5>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-text-muted mb-1">X Position</label>
                    <input 
                      type="number" 
                      value={selectedElement.x} 
                      onChange={(e) => updateElement(selectedElement.id, { x: parseInt(e.target.value) || 0 })}
                      className="w-full bg-surface border border-border rounded px-2 py-1.5 text-[12px]" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-text-muted mb-1">Y Position</label>
                    <input 
                      type="number" 
                      value={selectedElement.y} 
                      onChange={(e) => updateElement(selectedElement.id, { y: parseInt(e.target.value) || 0 })}
                      className="w-full bg-surface border border-border rounded px-2 py-1.5 text-[12px]" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-text-muted mb-1">Width</label>
                    <input 
                      type="number" 
                      value={selectedElement.w} 
                      onChange={(e) => updateElement(selectedElement.id, { w: parseInt(e.target.value) || 0 })}
                      className="w-full bg-surface border border-border rounded px-2 py-1.5 text-[12px]" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-text-muted mb-1">Height</label>
                    <input 
                      type="number" 
                      value={selectedElement.h} 
                      onChange={(e) => updateElement(selectedElement.id, { h: parseInt(e.target.value) || 0 })}
                      className="w-full bg-surface border border-border rounded px-2 py-1.5 text-[12px]" 
                    />
                  </div>
                </div>
              </div>

              {/* Styling Section */}
              <div>
                <h5 className="text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Palette size={14} /> Styling
                </h5>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-text-muted mb-1">Radius</label>
                      <input 
                        type="number" 
                        value={selectedElement.config.borderRadius || 0} 
                        onChange={(e) => updateConfig(selectedElement.id, { borderRadius: parseInt(e.target.value) || 0 })}
                        className="w-full bg-surface border border-border rounded px-2 py-1.5 text-[12px]" 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-text-muted mb-1">Padding</label>
                      <input 
                        type="number" 
                        value={selectedElement.config.padding || 0} 
                        onChange={(e) => updateConfig(selectedElement.id, { padding: parseInt(e.target.value) || 0 })}
                        className="w-full bg-surface border border-border rounded px-2 py-1.5 text-[12px]" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-text-muted mb-1">Background Color</label>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded border border-border" style={{ backgroundColor: selectedElement.config.backgroundColor }} />
                      <input 
                        type="text" 
                        value={selectedElement.config.backgroundColor || '#FFFFFF'} 
                        onChange={(e) => updateConfig(selectedElement.id, { backgroundColor: e.target.value })}
                        className="flex-1 bg-surface border border-border rounded px-2 py-1.5 text-[12px]" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div>
                <h5 className="text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Type size={14} /> Content
                </h5>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] text-text-muted mb-1">Label / Text</label>
                    <input 
                      type="text" 
                      value={selectedElement.config.text || selectedElement.config.title || ''} 
                      onChange={(e) => {
                        if (selectedElement.type === 'card') updateConfig(selectedElement.id, { title: e.target.value });
                        else updateConfig(selectedElement.id, { text: e.target.value });
                      }}
                      className="w-full bg-surface border border-border rounded px-2 py-1.5 text-[12px]" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-text-muted mb-1">Text Color</label>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded border border-border" style={{ backgroundColor: selectedElement.config.color }} />
                      <input 
                        type="text" 
                        value={selectedElement.config.color || '#1A1A1A'} 
                        onChange={(e) => updateConfig(selectedElement.id, { color: e.target.value })}
                        className="flex-1 bg-surface border border-border rounded px-2 py-1.5 text-[12px]" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Binding Section */}
              <div>
                <h5 className="text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Link2 size={14} /> Data Binding
                </h5>
                {selectedElement.config.dataBinding ? (
                  <div className="p-3 bg-primary-light/30 border border-primary/20 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12px] font-medium text-primary">Connected to:</span>
                      <Zap size={12} className="text-primary" />
                    </div>
                    <div className="text-[11px] font-mono text-text-secondary">{selectedElement.config.dataBinding}</div>
                    <button 
                      onClick={() => updateConfig(selectedElement.id, { dataBinding: null })}
                      className="mt-2 text-[10px] text-error hover:underline"
                    >
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <select 
                      onChange={(e) => updateConfig(selectedElement.id, { dataBinding: e.target.value })}
                      className="w-full bg-surface border border-border rounded px-2 py-1.5 text-[12px]"
                      defaultValue=""
                    >
                      <option value="" disabled>Select Data Source...</option>
                      <option value="workflow.outputs.user_count">User Count (Workflow)</option>
                      <option value="workflow.outputs.total_revenue">Total Revenue (Workflow)</option>
                      <option value="database.users.count">User Count (Database)</option>
                      <option value="env.API_URL">API URL (Environment)</option>
                    </select>
                    <p className="text-[10px] text-text-muted italic">Link this component to dynamic data from your workflows or database.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-border flex gap-2">
              <button 
                onClick={() => {
                  const newEl = { ...selectedElement, id: Math.random().toString(36).substr(2, 9), x: selectedElement.x + 20, y: selectedElement.y + 20 };
                  setElements([...elements, newEl]);
                  setSelectedElementId(newEl.id);
                }}
                className="flex-1 py-2 bg-surface border border-border rounded-md text-[13px] font-bold text-text-secondary hover:bg-tertiary"
              >
                <Copy size={14} className="inline mr-1" /> Duplicate
              </button>
              <button 
                onClick={() => {
                  setElements(elements.filter(el => el.id !== selectedElementId));
                  setSelectedElementId(null);
                }}
                className="flex-1 py-2 bg-error/10 text-error rounded-md text-[13px] font-bold hover:bg-error hover:text-white transition-all"
              >
                <Trash2 size={14} className="inline mr-1" /> Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <Layout size={48} className="text-text-muted mb-4 opacity-20" />
            <h4 className="text-[15px] font-bold text-text-secondary mb-2">No Element Selected</h4>
            <p className="text-[13px] text-text-muted">Select a component on the canvas to edit its properties and data bindings.</p>
          </div>
        )}
      </motion.aside>
      {!isRightSidebarOpen && (
        <button 
          onClick={() => setIsRightSidebarOpen(true)}
          className="absolute right-4 top-4 z-40 w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center shadow-sm hover:bg-tertiary"
        >
          <Palette size={20} className="text-primary" />
        </button>
      )}

      {/* Bottom Bar: Event Logs */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-white border-t border-border z-40 flex items-center px-4 justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[12px] text-text-secondary">
            <div className="w-2 h-2 rounded-full bg-success" /> Builder Online
          </div>
          <div className="h-4 w-[1px] bg-border" />
          <div className="text-[12px] text-text-muted font-mono">Events: [14:35:02] Element 'Header' moved to (40, 40)</div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-[12px] text-text-secondary hover:text-primary font-medium">Data Inspector</button>
          <button className="text-[12px] text-text-secondary hover:text-primary font-medium">CSS Editor</button>
        </div>
      </div>
    </div>
  );
};
