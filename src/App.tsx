import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TabType } from './types';
import { Sidebar } from './components/Sidebar';
import { HomeTab } from './components/HomeTab';
import { BuilderTab } from './components/BuilderTab';
import { AppsTab } from './components/AppsTab';
import { CanvasTab } from './components/CanvasTab';
import { UIBuilderTab } from './components/UIBuilderTab';
import { DashboardTab } from './components/DashboardTab';
import { MarketplaceTab } from './components/MarketplaceTab';
import { DataTab } from './components/DataTab';
import { ContentCraftAITab } from './components/ContentCraftAITab';
import { LeadHunterProTab } from './components/LeadHunterProTab';
import { BugPatrolTab } from './components/BugPatrolTab';
import { FinanceRadarTab } from './components/FinanceRadarTab';
import { TalentScoutTab } from './components/TalentScoutTab';
import { ComponentDetailTab } from './components/ComponentDetailTab';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSetComponentDetail = (id: string) => {
    setSelectedComponentId(id);
    setActiveTab('component-detail');
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab setActiveTab={setActiveTab} onComponentClick={handleSetComponentDetail} />;
      case 'builder':
        return <BuilderTab />;
      case 'apps':
        return <AppsTab setActiveTab={setActiveTab} onComponentClick={handleSetComponentDetail} />;
      case 'canvas':
        return <CanvasTab />;
      case 'ui':
        return <UIBuilderTab />;
      case 'dashboard':
        return <DashboardTab />;
      case 'marketplace':
        return <MarketplaceTab />;
      case 'data':
        return <DataTab />;
      case 'contentcraft-ai':
        return <ContentCraftAITab />;
      case 'leadhunter-pro':
        return <LeadHunterProTab />;
      case 'bugpatrol':
        return <BugPatrolTab />;
      case 'financeradar':
        return <FinanceRadarTab />;
      case 'talentscout':
        return <TalentScoutTab />;
      case 'component-detail':
        return selectedComponentId ? <ComponentDetailTab componentId={selectedComponentId} setActiveTab={setActiveTab} /> : <HomeTab setActiveTab={setActiveTab} />;
      default:
        return <HomeTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onComponentClick={handleSetComponentDetail} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto ml-[240px] relative bg-white">
        {renderTab()}
      </main>

      {/* Mobile Sidebar Overlay (Simplified) */}
      <div className="lg:hidden fixed bottom-4 right-4 z-[100]">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center"
        >
          <Plus size={24} className={isSidebarOpen ? 'rotate-45 transition-transform' : 'transition-transform'} />
        </button>
      </div>
    </div>
  );
};

export default App;
