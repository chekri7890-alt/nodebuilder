export type TabType = 'home' | 'builder' | 'apps' | 'canvas' | 'ui' | 'dashboard' | 'marketplace' | 'data' | 'contentcraft-ai' | 'leadhunter-pro' | 'bugpatrol' | 'financeradar' | 'talentscout' | 'component-detail';

export type StatusType = 'Running' | 'Idle' | 'Error' | 'Paused';

export interface AppMetadata {
  id: string;
  name: string;
  type: 'AI Agent' | 'Dashboard' | 'Tool' | 'Automation' | 'App' | 'Workflow';
  category: string;
  status: StatusType;
  description: string;
  lastRun: string;
  totalRuns: number;
  successRate: number;
  avgDuration: string;
  costPerRun?: string;
  totalCost?: string;
  nodes?: string[];
  nodeList?: string[];
  tags: string[];
  created: string;
  owner: string;
  error?: string;
  pausedReason?: string;
  input?: string;
  output?: string;
  uiComponents?: string[];
  dataBoundTo?: string;
}

export interface ActivityItem {
  id: string;
  appName: string;
  action: string;
  preview: string;
  time: string;
  status: 'success' | 'failed' | 'paused' | 'running';
}

export interface User {
  name: string;
  role: string;
  email: string;
}
