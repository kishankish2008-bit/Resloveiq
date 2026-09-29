export interface HistoricalEvidence {
  incidentId: string;
  relevance: string;
  resolution: string;
  resolutionTimeMinutes?: number;
  rootCause?: string;
  engineerFeedback?: string;
}

export interface AnalysisRequest {
  incidentId: string;
  service: string;
  errorRate: number;
  latencySeconds: number;
  trafficPerMinute: number;
  activeConnections: number;
  maxConnections: number;
  waitingRequests: number;
  recentDeployment: boolean;
  description: string;
}

export interface AnalysisResponse {
  success: boolean;
  incidentId: string;
  rootCause: string;
  confidence: number;
  recommendation: string;
  matchingIncidents: string[];
  reasoning: string;
  historicalEvidence?: HistoricalEvidence[];
  memoryCount: number;
  error?: string;
}

export interface ResolveRequest {
  incidentId: string;
  service: string;
  rootCause: string;
  action: string;
  resolutionTimeMinutes: number;
  successful: boolean;
  engineerFeedback: string;
  observations: string[];
}

export interface ResolveResponse {
  success: boolean;
  message?: string;
  memoryId?: string;
  storedInHindsight?: boolean;
  incidentId?: string;
  error?: string;
}

export interface HealthResponse {
  status: string;
  hindsight?: string | boolean;
  groq?: string | boolean;
  uptime?: number;
  timestamp?: string;
}

export type IncidentStatus = 'Investigating' | 'Analyzing' | 'Diagnosed' | 'Resolved';
export type IncidentSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface IncidentData {
  incidentId: string;
  service: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  description: string;
  errorRate: number;
  latencySeconds: number;
  trafficPerMinute: number;
  activeConnections: number;
  maxConnections: number;
  waitingRequests: number;
  recentDeployment: boolean;
  detectedAt?: string;
  resolvedAt?: string;
  resolutionSummary?: {
    action: string;
    resolutionTimeMinutes: number;
    engineerFeedback: string;
  };
}
