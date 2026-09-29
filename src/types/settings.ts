export interface UserPreferences {
  // General Preferences
  displayName: string;
  workspaceName: string;
  jobRole: string;
  language: string;
  timeZone: string;
  dateTimeFormat: string;
  defaultLandingPage: 'overview' | 'active-incident' | 'history' | 'hindsight-memory' | 'learning-loop';
  interfaceDensity: 'comfortable' | 'compact';

  // Appearance
  theme: 'light' | 'dark' | 'system';
  accentColor: string;
  sidebarDefault: 'expanded' | 'collapsed';
  reducedMotion: boolean;
  animationIntensity: 'subtle' | 'balanced' | 'minimal';

  // Incident Preferences
  severityFilter: 'all' | 'critical' | 'high-critical';
  incidentLayout: 'expanded' | 'compact';
  incidentSorting: 'severity' | 'detected' | 'impact';
  refreshIntervalSeconds: number;
  autoAnalyzeOnDetection: boolean;
  displayHistoricalEvidence: boolean;
  showConfidenceIndicators: boolean;
  defaultAnalysisContext: string;

  // AI Assistant Preferences
  explanationStyle: 'concise' | 'balanced' | 'detailed';
  showReasoningSummaries: boolean;
  displayRelatedIncidents: boolean;
  customInstructions: string;
  recommendationFormat: 'runbook' | 'executive' | 'technical';

  // Notifications
  inAppNotifications: boolean;
  incidentResolutionNotifications: boolean;
  memoryLearningConfirmations: boolean;
  systemStatusAlerts: boolean;
  notificationFrequency: 'immediate' | 'batched';

  // Privacy and Data
  memoryRetention: 'persistent' | 'session';
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  displayName: 'Alex K.',
  workspaceName: 'Production',
  jobRole: 'Staff Site Reliability Engineer',
  language: 'en',
  timeZone: 'UTC-7 (Pacific Time)',
  dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
  defaultLandingPage: 'overview',
  interfaceDensity: 'comfortable',

  theme: 'light',
  accentColor: '#245C52', // Deep evergreen
  sidebarDefault: 'expanded',
  reducedMotion: false,
  animationIntensity: 'balanced',

  severityFilter: 'all',
  incidentLayout: 'expanded',
  incidentSorting: 'severity',
  refreshIntervalSeconds: 30,
  autoAnalyzeOnDetection: false,
  displayHistoricalEvidence: true,
  showConfidenceIndicators: true,
  defaultAnalysisContext: 'Target critical payment and database tier services with high transaction loads.',

  explanationStyle: 'balanced',
  showReasoningSummaries: true,
  displayRelatedIncidents: true,
  customInstructions: 'Prioritize MTTR reduction and connection pool saturation diagnostics.',
  recommendationFormat: 'runbook',

  inAppNotifications: true,
  incidentResolutionNotifications: true,
  memoryLearningConfirmations: true,
  systemStatusAlerts: true,
  notificationFrequency: 'immediate',

  memoryRetention: 'persistent',
};

export const ACCENT_PALETTE = [
  { name: 'Evergreen', value: '#245C52', bgLight: '#F0F5F2', borderLight: '#91B4A5' },
  { name: 'Forest Teal', value: '#176B68', bgLight: '#EBF3F0', borderLight: '#78A89A' },
  { name: 'Slate Steel', value: '#3E5C76', bgLight: '#F0F4F8', borderLight: '#8199A8' },
  { name: 'Royal Indigo', value: '#3D52A0', bgLight: '#EEF2FB', borderLight: '#8697C4' },
  { name: 'Warm Bronze', value: '#8C6239', bgLight: '#F9F5F0', borderLight: '#C8A66A' },
];
