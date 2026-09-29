import React from 'react';
import { RotateCcw, Menu, Settings as SettingsIcon } from 'lucide-react';
import { IconPulseStatus } from './brand/CustomIcons';
import { NavTab } from './Sidebar';

interface HeaderProps {
  systemOperational: boolean;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  onResetDemo: () => void;
  onOpenMobileSidebar?: () => void;
  currentTab?: NavTab;
  onSelectTab?: (tab: NavTab) => void;
}

const TAB_TITLES: Record<NavTab, string> = {
  overview: 'Command Overview',
  'active-incident': 'Active Incident (INC-042)',
  history: 'Incident History & MTTR',
  'hindsight-memory': 'Hindsight Organizational Memory',
  'learning-loop': 'Continuous Learning Loop',
  'system-status': 'Connection & Telemetry Status',
  settings: 'Workspace Settings & Controls',
};

export const Header: React.FC<HeaderProps> = ({
  systemOperational,
  isDemoMode,
  onToggleDemoMode,
  onResetDemo,
  onOpenMobileSidebar,
  currentTab = 'overview',
  onSelectTab,
}) => {
  return (
    <header className="h-13 border-b border-[#E4E9E4] bg-[#FFFFFF] px-5 sm:px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
      {/* Left: Mobile Toggle & Contextual Breadcrumb */}
      <div className="flex items-center gap-3">
        {onOpenMobileSidebar && (
          <button
            onClick={onOpenMobileSidebar}
            className="p-1.5 rounded-md text-[#78847F] hover:text-[#26332F] hover:bg-[#F7F8F5] md:hidden"
            aria-label="Open Navigation Drawer"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-2 text-xs text-[#78847F] font-mono">
          <span className="font-semibold text-[#26332F]">Production</span>
          <span className="text-[#D8DFD7]">/</span>
          <span className="hidden sm:inline">Core Infrastructure</span>
          <span className="text-[#D8DFD7] hidden sm:inline">/</span>
          <span className="text-[#245C52] font-semibold truncate max-w-[180px] sm:max-w-none">
            {TAB_TITLES[currentTab] || 'payment-api'}
          </span>
        </div>
      </div>

      {/* Right: Operational Status & Demo Controls */}
      <div className="flex items-center gap-2.5">
        {/* System Status Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F7F8F5] border border-[#E4E9E4] text-[11px] font-mono text-[#78847F]">
          <IconPulseStatus
            size={12}
            className={systemOperational ? 'text-[#43866A]' : 'text-[#C8A66A]'}
          />
          <span>Telemetry:</span>
          <span className="font-semibold text-[#26332F]">
            {systemOperational ? 'Live' : 'Degraded'}
          </span>
        </div>

        {/* Reset State Button */}
        <button
          onClick={onResetDemo}
          title="Reset incident and analysis state"
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#78847F] hover:text-[#26332F] hover:bg-[#F7F8F5] rounded-md transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Reset</span>
        </button>

        {/* Demo Mode Toggle */}
        <button
          onClick={onToggleDemoMode}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all border ${
            isDemoMode
              ? 'bg-[#F0F5F2] text-[#245C52] border-[#91B4A5]/50'
              : 'bg-[#FFFFFF] text-[#78847F] border-[#E4E9E4] hover:bg-[#F7F8F5]'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isDemoMode ? 'bg-[#245C52]' : 'bg-[#78847F]'
            }`}
          />
          <span>Demo Mode</span>
        </button>

        {/* Direct Settings Shortcut */}
        {onSelectTab && (
          <button
            onClick={() => onSelectTab('settings')}
            title="Workspace Preferences"
            className={`p-1.5 rounded-md border text-xs transition-colors ${
              currentTab === 'settings'
                ? 'bg-[#F0F5F2] text-[#245C52] border-[#91B4A5]/50'
                : 'text-[#78847F] hover:text-[#26332F] hover:bg-[#F7F8F5] border-[#E4E9E4]'
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
};
