import { IncidentData } from '../types/incident';

export const INCIDENT_042: IncidentData = {
  incidentId: 'INC-042',
  service: 'payment-api',
  severity: 'CRITICAL',
  status: 'Investigating',
  description:
    'The payment API is experiencing severe latency and elevated errors. PostgreSQL active connections are at the configured maximum and many requests are waiting for database connections.',
  errorRate: 17.4,
  latencySeconds: 4.8,
  trafficPerMinute: 8421,
  activeConnections: 50,
  maxConnections: 50,
  waitingRequests: 137,
  recentDeployment: false,
  detectedAt: '2 mins ago',
};

export const INCIDENT_050: IncidentData = {
  incidentId: 'INC-050',
  service: 'payment-api',
  severity: 'CRITICAL',
  status: 'Investigating',
  description:
    'Payment API is again experiencing severe latency during high traffic. PostgreSQL connections are saturated.',
  errorRate: 15.9,
  latencySeconds: 4.6,
  trafficPerMinute: 8600,
  activeConnections: 50,
  maxConnections: 50,
  waitingRequests: 121,
  recentDeployment: false,
  detectedAt: 'Just now',
};
