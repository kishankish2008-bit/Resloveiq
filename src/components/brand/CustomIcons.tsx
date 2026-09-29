import React from 'react';

export interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

/**
 * Cohesive, professional icon system for ResolveIQ.
 * Uniform stroke weight (1.75px), precise vector geometry, no random styles.
 */

// Overview: Clean editorial dashboard layout grid
export const IconDashboardGrid: React.FC<IconProps> = ({
  size = 17,
  className = '',
  strokeWidth = 1.75,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="3" width="7.5" height="10" rx="1.5" />
    <rect x="13.5" y="3" width="7.5" height="5.5" rx="1.5" />
    <rect x="13.5" y="11.5" width="7.5" height="9.5" rx="1.5" />
    <rect x="3" y="16" width="7.5" height="5" rx="1.5" />
  </svg>
);

// Active Incident: Precise structured alert marker
export const IconIncidentMarker: React.FC<IconProps> = ({
  size = 17,
  className = '',
  strokeWidth = 1.75,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13.5" />
    <circle cx="12" cy="17" r="0.75" fill="currentColor" stroke="none" />
  </svg>
);

// Incident History: Circular timeline milestone archive
export const IconTimelineArchive: React.FC<IconProps> = ({
  size = 17,
  className = '',
  strokeWidth = 1.75,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

// Hindsight Memory: Connected geometric knowledge nodes
export const IconMemoryNodes: React.FC<IconProps> = ({
  size = 17,
  className = '',
  strokeWidth = 1.75,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="6" cy="6" r="2.2" />
    <circle cx="18" cy="6" r="2.2" />
    <circle cx="6" cy="18" r="2.2" />
    <circle cx="18" cy="18" r="2.2" />
    <circle cx="12" cy="12" r="2" />
    <line x1="8.5" y1="6" x2="15.5" y2="6" />
    <line x1="6" y1="8.5" x2="6" y2="15.5" />
    <line x1="18" y1="8.5" x2="18" y2="15.5" />
    <line x1="8.5" y1="18" x2="15.5" y2="18" />
    <line x1="7.8" y1="7.8" x2="10.5" y2="10.5" />
    <line x1="13.5" y1="13.5" x2="16.2" y2="16.2" />
  </svg>
);

// Learning Loop: Continuous feedback pathway
export const IconContinuousLoop: React.FC<IconProps> = ({
  size = 17,
  className = '',
  strokeWidth = 1.75,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7 19H4.8A2.8 2.8 0 0 1 2 16.2V7.8A2.8 2.8 0 0 1 4.8 5h14.4A2.8 2.8 0 0 1 22 7.8v8.4a2.8 2.8 0 0 1-2.8 2.8H17" />
    <polyline points="10 16 7 19 10 22" />
    <polyline points="14 8 17 5 14 2" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

// System Status: Minimal telemetry pulse indicator
export const IconPulseStatus: React.FC<IconProps> = ({
  size = 17,
  className = '',
  strokeWidth = 1.75,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="22 12 18 12 15 20 9 4 6 12 2 12" />
  </svg>
);

// Search: Clean magnifying glass
export const IconCleanSearch: React.FC<IconProps> = ({
  size = 17,
  className = '',
  strokeWidth = 1.75,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="7.5" />
    <line x1="16.5" y1="16.5" x2="21.5" y2="21.5" />
  </svg>
);

// Settings: Clean sliders-and-nodes symbol
export const IconSettingsSliders: React.FC<IconProps> = ({
  size = 17,
  className = '',
  strokeWidth = 1.75,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <circle cx="4" cy="12" r="2" />
    <circle cx="12" cy="10" r="2" />
    <circle cx="20" cy="14" r="2" />
  </svg>
);

// Collapse / Expand toggle
export const IconSidebarToggle: React.FC<IconProps & { collapsed?: boolean }> = ({
  size = 16,
  className = '',
  strokeWidth = 1.75,
  collapsed = false,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="9" y1="3" x2="9" y2="21" />
    {collapsed ? (
      <polyline points="13 10 15 12 13 14" />
    ) : (
      <polyline points="15 10 13 12 15 14" />
    )}
  </svg>
);

// Database Store / Storage icon for Hindsight memory
export const IconDatabaseStore: React.FC<IconProps> = ({
  size = 17,
  className = '',
  strokeWidth = 1.75,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <ellipse cx="12" cy="5" rx="8.5" ry="3" />
    <path d="M3.5 5v6c0 1.66 3.8 3 8.5 3s8.5-1.34 8.5-3V5" />
    <path d="M3.5 11v6c0 1.66 3.8 3 8.5 3s8.5-1.34 8.5-3v-6" />
    <circle cx="16" cy="14" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);
