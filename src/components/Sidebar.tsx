import React from 'react';
import { ResolveLogo, ResolveMark } from './brand/ResolveLogo';
import {
  IconDashboardGrid,
  IconIncidentMarker,
  IconTimelineArchive,
  IconMemoryNodes,
  IconContinuousLoop,
  IconPulseStatus,
  IconSettingsSliders,
  IconSidebarToggle,
  IconDatabaseStore,
} from './brand/CustomIcons';
import { RefreshCw, X, ChevronRight, Activity, Cpu } from 'lucide-react';

export type NavTab =
  | 'overview'
  | 'active-incident'
  | 'history'
  | 'hindsight-memory'
  | 'learning-loop'
  | 'system-status'
  | 'settings';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  activeIncidentCount: number;
  onSeedDatabase: () => void;
  isSeeding: boolean;
  hindsightMemoryCount: number;
  systemOperational?: boolean;
  isCheckingHealth?: boolean;
  onPingBackend?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  activeIncidentCount,
  onSeedDatabase,
  isSeeding,
  hindsightMemoryCount,
  systemOperational = true,
  isCheckingHealth = false,
  onPingBackend,
  isCollapsed = false,
  onToggleCollapse,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  // 7 core navigation items strictly aligned with specification
  const navItems = [
    {
      id: 'overview' as NavTab,
      label: 'Overview',
      icon: IconDashboardGrid,
      group: 'WORKSPACE',
    },
    {
      id: 'active-incident' as NavTab,
      label: 'Active Incident',
      icon: IconIncidentMarker,
      badge: activeIncidentCount > 0 ? activeIncidentCount : undefined,
      badgeVariant: 'brick' as const,
      group: 'WORKSPACE',
    },
    {
      id: 'history' as NavTab,
      label: 'Incident History',
      icon: IconTimelineArchive,
      group: 'WORKSPACE',
    },
    {
      id: 'hindsight-memory' as NavTab,
      label: 'Hindsight Memory',
      icon: IconMemoryNodes,
      badge: hindsightMemoryCount > 0 ? `${hindsightMemoryCount}` : undefined,
      badgeVariant: 'eucalyptus' as const,
      group: 'INTELLIGENCE',
    },
    {
      id: 'learning-loop' as NavTab,
      label: 'Learning Loop',
      icon: IconContinuousLoop,
      group: 'INTELLIGENCE',
    },
    {
      id: 'system-status' as NavTab,
      label: 'System Status',
      icon: IconPulseStatus,
      group: 'SYSTEM',
    },
    {
      id: 'settings' as NavTab,
      label: 'Settings',
      icon: IconSettingsSliders,
      group: 'SYSTEM',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-2xs md:hidden"
        />
      )}

      <aside
        className={`${
          isCollapsed ? 'md:w-[72px]' : 'md:w-64'
        } w-64 shrink-0 bg-[#FFFFFF] border-r border-[#E4E9E4] flex flex-col justify-between h-screen sticky top-0 transition-all duration-300 select-none z-50 ${
          isOpenMobile ? 'fixed inset-y-0 left-0 translate-x-0' : 'hidden md:flex'
        }`}
      >
        {/* Top Header & Navigation */}
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto overflow-x-hidden p-3.5 space-y-4">
          {/* Logo Header & Collapse Toggle */}
          <div className="flex items-center justify-between px-1.5 pt-1.5 pb-2 border-b border-[#E4E9E4]/60">
            {isCollapsed ? (
              <div className="w-full flex justify-center py-1" title="ResolveIQ Incident Intelligence">
                <ResolveMark size={28} />
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <ResolveLogo size={28} />
                {onToggleCollapse && (
                  <button
                    onClick={onToggleCollapse}
                    title="Collapse sidebar"
                    className="hidden md:flex p-1.5 text-[#78847F] hover:text-[#26332F] hover:bg-[#F7F8F5] rounded-md transition-colors"
                  >
                    <IconSidebarToggle size={16} collapsed={false} />
                  </button>
                )}
                {isOpenMobile && (
                  <button
                    onClick={onCloseMobile}
                    className="p-1 rounded text-[#78847F] hover:text-[#26332F] md:hidden"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Quick Expand Button when collapsed */}
          {isCollapsed && onToggleCollapse && (
            <div className="flex justify-center pb-1">
              <button
                onClick={onToggleCollapse}
                title="Expand sidebar"
                className="p-1.5 text-[#78847F] hover:text-[#245C52] hover:bg-[#F0F5F2] rounded-md transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-1 pt-1">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              const showGroupHeader =
                !isCollapsed &&
                (idx === 0 || navItems[idx - 1].group !== item.group);

              return (
                <React.Fragment key={item.id}>
                  {showGroupHeader && (
                    <div className="px-2 pt-3 pb-1 text-[10px] font-bold tracking-widest uppercase text-[#78847F]/80">
                      {item.group}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      onSelectTab(item.id);
                      if (onCloseMobile) onCloseMobile();
                    }}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full relative flex items-center ${
                      isCollapsed ? 'justify-center px-2 py-2.5' : 'justify-between px-3 py-2'
                    } rounded-md text-[13px] font-medium transition-all group ${
                      isActive
                        ? 'bg-[#F0F5F2] text-[#245C52] font-semibold'
                        : 'text-[#485350] hover:text-[#26332F] hover:bg-[#F7F8F5]'
                    }`}
                  >
                    {/* Refined Accent Bar on Active Item */}
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#245C52] rounded-r-full" />
                    )}

                    <div className={`flex items-center gap-2.5 ${isCollapsed ? 'justify-center' : ''}`}>
                      <Icon
                        size={17}
                        className={`transition-colors shrink-0 ${
                          isActive
                            ? 'text-[#245C52]'
                            : 'text-[#78847F] group-hover:text-[#26332F]'
                        }`}
                      />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!isCollapsed && item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full font-medium shrink-0 ${
                          item.badgeVariant === 'brick'
                            ? 'bg-[#BF6259]/10 text-[#BF6259]'
                            : 'bg-[#91B4A5]/25 text-[#245C52]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                </React.Fragment>
              );
            })}
          </nav>
        </div>

        {/* Lower Sidebar: Compact System Status Widget & Seed Action */}
        <div className="p-3 border-t border-[#E4E9E4] bg-[#FAFAF8] space-y-3">
          {/* Compact System Status Widget */}
          {!isCollapsed ? (
            <div className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#E4E9E4] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#78847F]">
                <span>Telemetry Grid</span>
                <span className="flex items-center gap-1 font-mono text-[#43866A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#43866A] animate-pulse" />
                  Live
                </span>
              </div>

              {/* Status Rows */}
              <div className="space-y-1.5 text-[11px] font-mono">
                {/* Groq AI Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[#485350]">
                    <Cpu className="w-3 h-3 text-[#245C52]" />
                    <span>Groq AI</span>
                  </div>
                  <span className="text-[#245C52] font-semibold">Active</span>
                </div>

                {/* Hindsight Memory Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[#485350]">
                    <IconMemoryNodes size={12} className="text-[#245C52]" />
                    <span>Hindsight</span>
                  </div>
                  <span className="text-[#245C52] font-semibold">
                    {hindsightMemoryCount} Ready
                  </span>
                </div>

                {/* Backend API Ping */}
                <div className="flex items-center justify-between pt-0.5">
                  <div className="flex items-center gap-1.5 text-[#485350]">
                    <Activity className="w-3 h-3 text-[#43866A]" />
                    <span>Backend API</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className={`font-semibold ${
                        systemOperational ? 'text-[#43866A]' : 'text-[#BF6259]'
                      }`}
                    >
                      {systemOperational ? 'Operational' : 'Offline'}
                    </span>
                    {onPingBackend && (
                      <button
                        onClick={onPingBackend}
                        disabled={isCheckingHealth}
                        title="Ping backend API health check"
                        className="p-0.5 text-[#78847F] hover:text-[#245C52] transition-colors rounded disabled:opacity-50"
                      >
                        <RefreshCw
                          className={`w-2.5 h-2.5 ${
                            isCheckingHealth ? 'animate-spin text-[#245C52]' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Collapsed Status Indicator */
            <div className="flex flex-col items-center gap-2 py-1" title="Groq: Active | Hindsight: Ready | API: Operational">
              <span className="w-2.5 h-2.5 rounded-full bg-[#43866A] ring-2 ring-[#43866A]/20" />
            </div>
          )}

          {/* Seed Database Action */}
          {!isCollapsed ? (
            <button
              onClick={onSeedDatabase}
              disabled={isSeeding}
              title="Seed Hindsight with historical production incidents"
              className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium text-[#26332F] bg-[#FFFFFF] hover:bg-[#F0F5F2] border border-[#E4E9E4] rounded-md transition-colors disabled:opacity-50"
            >
              {isSeeding ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#245C52]" />
              ) : (
                <IconDatabaseStore size={14} className="text-[#245C52]" />
              )}
              <span>{isSeeding ? 'Seeding...' : 'Seed Memory Store'}</span>
            </button>
          ) : (
            <button
              onClick={onSeedDatabase}
              disabled={isSeeding}
              title="Seed Memory Store"
              className="w-full flex justify-center p-2 text-[#245C52] hover:bg-[#F0F5F2] rounded-md border border-[#E4E9E4] transition-colors disabled:opacity-50"
            >
              {isSeeding ? (
                <RefreshCw className="w-4 h-4 animate-spin text-[#245C52]" />
              ) : (
                <IconDatabaseStore size={16} />
              )}
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
