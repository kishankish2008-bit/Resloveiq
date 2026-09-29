import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar, NavTab } from './components/Sidebar';
import { Header } from './components/Header';
import { IncidentCard } from './components/IncidentCard';
import { AnalysisStages, ANALYSIS_STAGES } from './components/AnalysisStages';
import { AnalysisResults } from './components/AnalysisResults';
import { ResolutionModal } from './components/ResolutionModal';
import { LearningLoop } from './components/LearningLoop';
import { HindsightMemoryView } from './components/HindsightMemoryView';
import { IncidentHistoryView } from './components/IncidentHistoryView';
import { SystemStatusView } from './components/SystemStatusView';
import { SettingsView } from './components/SettingsView';
import { NotificationToast, ToastMessage } from './components/NotificationToast';
import { IconMemoryNodes } from './components/brand/CustomIcons';
import { INCIDENT_042, INCIDENT_050 } from './data/incidents';
import {
  IncidentData,
  AnalysisResponse,
  ResolveRequest,
  HistoricalEvidence,
  HealthResponse,
} from './types/incident';
import { UserPreferences } from './types/settings';
import { loadUserPreferences, saveUserPreferences } from './services/settings';
import { api } from './services/api';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  // User Preferences
  const [preferences, setPreferences] = useState<UserPreferences>(() => loadUserPreferences());

  // Navigation
  const [currentTab, setCurrentTab] = useState<NavTab>(() => {
    return preferences.defaultLandingPage || 'overview';
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    return preferences.sidebarDefault === 'collapsed';
  });

  // Active Incident state
  const [currentIncident, setCurrentIncident] = useState<IncidentData>(INCIDENT_042);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  // Analysis state
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStageIndex, setAnalysisStageIndex] = useState<number>(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Resolution state
  const [isResolutionModalOpen, setIsResolutionModalOpen] = useState<boolean>(false);
  const [isSubmittingResolution, setIsSubmittingResolution] = useState<boolean>(false);
  const [resolvedIncidentIds, setResolvedIncidentIds] = useState<Set<string>>(new Set());
  const [highlightRetain, setHighlightRetain] = useState<boolean>(false);

  // History & Hindsight Memories
  const [resolvedIncidentsLog, setResolvedIncidentsLog] = useState<
    Array<{
      incidentId: string;
      service: string;
      rootCause: string;
      action: string;
      resolutionTimeMinutes: number;
      resolvedAt: string;
      engineerFeedback?: string;
    }>
  >([]);

  const [activeMemories, setActiveMemories] = useState<HistoricalEvidence[]>([
    {
      incidentId: 'INC-017',
      relevance: 'Similar database saturation under high traffic spikes (>8,000 req/min).',
      resolution: 'Increased PostgreSQL connection pool from 50 to 100.',
      resolutionTimeMinutes: 6,
    },
    {
      incidentId: 'INC-023',
      relevance: 'PostgreSQL thread exhaustion during flash traffic event.',
      resolution: 'Adjusted idle connection timeout and expanded pool size.',
      resolutionTimeMinutes: 11,
    },
    {
      incidentId: 'INC-031',
      relevance: 'Database connection leak in payment gateway webhook handler.',
      resolution: 'Enforced connection pooling release in finally block.',
      resolutionTimeMinutes: 15,
    },
  ]);

  // System Health state
  const [systemOperational, setSystemOperational] = useState<boolean>(true);
  const [lastHealth, setLastHealth] = useState<HealthResponse | null>(null);
  const [healthError, setHealthError] = useState<string | null>(null);
  const [isCheckingHealth, setIsCheckingHealth] = useState<boolean>(false);

  // Seeding state
  const [isSeeding, setIsSeeding] = useState<boolean>(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Health check
  const checkHealth = useCallback(async () => {
    setIsCheckingHealth(true);
    setHealthError(null);
    try {
      const res = await api.getHealth();
      setLastHealth(res);
      setSystemOperational(res.status === 'ok' || res.status === 'healthy' || true);
    } catch (err: any) {
      setHealthError(err.message || 'Backend unreachable');
      setSystemOperational(false);
    } finally {
      setIsCheckingHealth(false);
    }
  }, []);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  // Save Preferences Handler
  const handleSavePreferences = (updated: UserPreferences) => {
    setPreferences(updated);
    saveUserPreferences(updated);
    if (updated.sidebarDefault === 'collapsed') {
      setIsSidebarCollapsed(true);
    } else if (updated.sidebarDefault === 'expanded') {
      setIsSidebarCollapsed(false);
    }
    addToast({
      type: 'success',
      title: 'Preferences Updated',
      description: 'Your workspace and diagnostic preferences have been saved.',
    });
  };

  // Seed Database trigger
  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    try {
      const res = await api.seedDatabase();
      addToast({
        type: 'hindsight',
        title: 'Hindsight Memory Seeded',
        description: res.message || 'Seeded historical production incidents into memory store.',
      });
      checkHealth();
    } catch (err: any) {
      addToast({
        type: 'error',
        title: 'Seeding Failed',
        description: err.message || 'Failed to seed backend Hindsight memory.',
      });
    } finally {
      setIsSeeding(false);
    }
  };

  // Switch to INC-050 or back to INC-042
  const handleSimulateSimilar = () => {
    if (currentIncident.incidentId === 'INC-042') {
      setCurrentIncident(INCIDENT_050);
      setAnalysisResult(null);
      setAnalysisError(null);
      addToast({
        type: 'hindsight',
        title: 'Loaded Similar Incident INC-050',
        description: 'Payment API under high traffic with saturated PostgreSQL connections.',
      });
    } else {
      setCurrentIncident(INCIDENT_042);
      setAnalysisResult(null);
      setAnalysisError(null);
      addToast({
        type: 'hindsight',
        title: 'Loaded Primary Incident INC-042',
        description: 'Returned to primary critical incident INC-042.',
      });
    }
  };

  // Demo Reset
  const handleResetDemo = () => {
    setCurrentIncident(INCIDENT_042);
    setAnalysisResult(null);
    setAnalysisError(null);
    setResolvedIncidentIds(new Set());
    setHighlightRetain(false);
    setCurrentTab('overview');
    addToast({
      type: 'success',
      title: 'Demo State Reset',
      description: 'Reset incident state and analysis pipeline for presentation.',
    });
  };

  // Toggle Demo Mode
  const handleToggleDemoMode = () => {
    setIsDemoMode(!isDemoMode);
    if (!isDemoMode) {
      setCurrentIncident(INCIDENT_042);
      setAnalysisResult(null);
      setAnalysisError(null);
      addToast({
        type: 'success',
        title: 'Demo Mode Activated',
        description: 'INC-042 primed for live demonstration.',
      });
    }
  };

  // Primary Action: Analyze Incident
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisResult(null);
    setAnalysisStageIndex(0);

    const stageInterval = setInterval(() => {
      setAnalysisStageIndex((prev) => {
        if (prev < ANALYSIS_STAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 420);

    try {
      const response = await api.analyzeIncident({
        incidentId: currentIncident.incidentId,
        service: currentIncident.service,
        errorRate: currentIncident.errorRate,
        latencySeconds: currentIncident.latencySeconds,
        trafficPerMinute: currentIncident.trafficPerMinute,
        activeConnections: currentIncident.activeConnections,
        maxConnections: currentIncident.maxConnections,
        waitingRequests: currentIncident.waitingRequests,
        recentDeployment: currentIncident.recentDeployment,
        description: currentIncident.description,
      });

      clearInterval(stageInterval);
      setAnalysisStageIndex(ANALYSIS_STAGES.length - 1);

      setTimeout(() => {
        setAnalysisResult(response);
        setIsAnalyzing(false);

        if (response.historicalEvidence && response.historicalEvidence.length > 0) {
          setActiveMemories((prev) => {
            const existingIds = new Set(prev.map((p) => p.incidentId));
            const newMems = response.historicalEvidence!.filter((e) => !existingIds.has(e.incidentId));
            return [...prev, ...newMems];
          });
        }

        addToast({
          type: 'hindsight',
          title: `Diagnosis Complete (${Math.round(response.confidence * 100)}% Confidence)`,
          description: `Identified: ${response.rootCause}. ${response.memoryCount || 0} historical memories matched.`,
        });
      }, 350);
    } catch (err: any) {
      clearInterval(stageInterval);
      setIsAnalyzing(false);
      const errorText = err.message || 'Incident analysis failed.';
      setAnalysisError(errorText);

      addToast({
        type: 'error',
        title: 'Analysis Error',
        description: errorText,
      });
    }
  };

  // Resolution Workflow Submit
  const handleResolutionSubmit = async (payload: ResolveRequest) => {
    setIsSubmittingResolution(true);
    try {
      await api.resolveIncident(payload);

      setIsSubmittingResolution(false);
      setIsResolutionModalOpen(false);

      setResolvedIncidentIds((prev) => new Set(prev).add(payload.incidentId));
      setHighlightRetain(true);

      setCurrentIncident((prev) => ({
        ...prev,
        status: 'Resolved',
        resolvedAt: 'Just now',
        resolutionSummary: {
          action: payload.action,
          resolutionTimeMinutes: payload.resolutionTimeMinutes,
          engineerFeedback: payload.engineerFeedback,
        },
      }));

      setResolvedIncidentsLog((prev) => [
        {
          incidentId: payload.incidentId,
          service: payload.service,
          rootCause: payload.rootCause,
          action: payload.action,
          resolutionTimeMinutes: payload.resolutionTimeMinutes,
          resolvedAt: 'Just now',
          engineerFeedback: payload.engineerFeedback,
        },
        ...prev,
      ]);

      setActiveMemories((prev) => [
        {
          incidentId: payload.incidentId,
          relevance: `Resolved database saturation under high traffic (${currentIncident.trafficPerMinute} req/min).`,
          resolution: payload.action,
          resolutionTimeMinutes: payload.resolutionTimeMinutes,
          engineerFeedback: payload.engineerFeedback,
        },
        ...prev.filter((m) => m.incidentId !== payload.incidentId),
      ]);

      addToast({
        type: 'hindsight',
        title: 'Experience Stored in Hindsight',
        description: `Backend confirmed: ${payload.incidentId} resolution retained for future organizational learning.`,
      });
    } catch (err: any) {
      setIsSubmittingResolution(false);
      throw err;
    }
  };

  const isCurrentIncidentResolved = resolvedIncidentIds.has(currentIncident.incidentId);

  return (
    <div className="min-h-screen bg-[#F7F8F5] text-[#26332F] flex flex-col md:flex-row antialiased">
      {/* Sidebar Navigation: 7 Core Sections, Collapsible, Compact System Status Widget */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        activeIncidentCount={isCurrentIncidentResolved ? 0 : 1}
        onSeedDatabase={handleSeedDatabase}
        isSeeding={isSeeding}
        hindsightMemoryCount={activeMemories.length}
        systemOperational={systemOperational}
        isCheckingHealth={isCheckingHealth}
        onPingBackend={checkHealth}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          systemOperational={systemOperational}
          isDemoMode={isDemoMode}
          onToggleDemoMode={handleToggleDemoMode}
          onResetDemo={handleResetDemo}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
        />

        <main className="flex-1 p-5 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Tab 1: Overview */}
          {currentTab === 'overview' && (
            <div className="space-y-6">
              {/* Mission Statement */}
              <div className="px-5 py-3.5 rounded-xl bg-[#FFFFFF] border border-[#E4E9E4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-md bg-[#F0F5F2] text-[#245C52]">
                    <IconMemoryNodes size={16} />
                  </div>
                  <p className="text-xs text-[#26332F]">
                    <span className="text-[#245C52] font-semibold">Core Principle:</span> ResolveIQ doesn't just remember incidents. It learns how your team resolves them.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#78847F]">
                  Hindsight Autonomous Engine v3.0
                </div>
              </div>

              {/* Asymmetric Incident Overview */}
              <IncidentCard
                incident={currentIncident}
                onAnalyze={handleAnalyze}
                onSimulateSimilar={handleSimulateSimilar}
                isAnalyzing={isAnalyzing}
                isResolved={isCurrentIncidentResolved}
                onOpenResolutionModal={() => setIsResolutionModalOpen(true)}
                hasAnalysisResult={analysisResult !== null}
              />

              {/* Analysis Stages */}
              {isAnalyzing && (
                <AnalysisStages currentStageIndex={analysisStageIndex} />
              )}

              {/* Analysis Error State */}
              {analysisError && !isAnalyzing && (
                <div className="p-5 rounded-xl bg-[#BF6259]/10 border border-[#BF6259]/30 text-[#BF6259] space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <AlertCircle className="w-5 h-5 text-[#BF6259]" />
                    <span>Analysis Request Failed</span>
                  </div>
                  <p className="text-xs text-[#26332F] leading-relaxed font-mono">
                    {analysisError}
                  </p>
                  <div className="pt-1">
                    <button
                      onClick={handleAnalyze}
                      className="px-3.5 py-1.5 bg-[#BF6259] hover:bg-[#A9534B] text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Retry Analysis</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Analysis Results Display */}
              {analysisResult && !isAnalyzing && (
                <AnalysisResults
                  result={analysisResult}
                  onOpenResolutionModal={() => setIsResolutionModalOpen(true)}
                  isResolved={isCurrentIncidentResolved}
                  onSimulateSimilar={handleSimulateSimilar}
                  currentIncidentId={currentIncident.incidentId}
                />
              )}

              {/* The Hindsight Learning Loop Flow */}
              <LearningLoop
                isAnalyzing={isAnalyzing}
                isResolved={isCurrentIncidentResolved}
                highlightRetain={highlightRetain}
                matchingIncidentCount={analysisResult?.memoryCount}
              />
            </div>
          )}

          {/* Tab 2: Active Incident */}
          {currentTab === 'active-incident' && (
            <div className="space-y-6">
              <div className="bg-[#FFFFFF] border border-[#E4E9E4] rounded-xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-[#E4E9E4]">
                  <div>
                    <h2 className="text-lg font-bold text-[#26332F]">Active Production Incident</h2>
                    <p className="text-xs text-[#78847F]">
                      Direct diagnostic focal view for anomaly triage and mitigation
                    </p>
                  </div>
                  <button
                    onClick={handleSimulateSimilar}
                    className="px-3 py-1.5 bg-[#F7F8F5] hover:bg-[#F0F5F2] text-[#26332F] border border-[#E4E9E4] rounded-md text-xs font-medium transition-colors"
                  >
                    <span>Toggle INC-042 / INC-050</span>
                  </button>
                </div>

                <IncidentCard
                  incident={currentIncident}
                  onAnalyze={handleAnalyze}
                  onSimulateSimilar={handleSimulateSimilar}
                  isAnalyzing={isAnalyzing}
                  isResolved={isCurrentIncidentResolved}
                  onOpenResolutionModal={() => setIsResolutionModalOpen(true)}
                  hasAnalysisResult={analysisResult !== null}
                />
              </div>
            </div>
          )}

          {/* Tab 3: Incident History */}
          {currentTab === 'history' && (
            <IncidentHistoryView resolvedIncidents={resolvedIncidentsLog} />
          )}

          {/* Tab 4: Hindsight Memory */}
          {currentTab === 'hindsight-memory' && (
            <HindsightMemoryView
              onSeedDatabase={handleSeedDatabase}
              isSeeding={isSeeding}
              memories={activeMemories}
              retainedIncidentCount={activeMemories.length}
            />
          )}

          {/* Tab 5: Learning Loop */}
          {currentTab === 'learning-loop' && (
            <div className="space-y-6">
              <LearningLoop
                isAnalyzing={isAnalyzing}
                isResolved={isCurrentIncidentResolved}
                highlightRetain={highlightRetain}
                compact={false}
              />

              <div className="bg-[#FFFFFF] border border-[#E4E9E4] rounded-xl p-6 shadow-xs space-y-4">
                <h3 className="text-base font-semibold text-[#26332F]">
                  Why Organizational Memory Eliminates Incident Recurrence
                </h3>
                <p className="text-xs text-[#78847F] leading-relaxed">
                  Traditional observability tools alert engineers to symptoms—high latency, error spikes, pool saturation. But the human on-call engineer still has to manually reconstruct the diagnosis and guess the remediation runbook.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-lg bg-[#F7F8F5] border border-[#E4E9E4] text-xs space-y-2">
                    <span className="font-semibold text-[#BF6259] block">
                      Without Hindsight (Conventional Observability)
                    </span>
                    <ul className="space-y-1.5 text-[#485350] list-disc list-inside">
                      <li>Incidents are treated as isolated, first-time events.</li>
                      <li>Tribal knowledge is lost when engineers leave or switch shifts.</li>
                      <li>Runbooks sit stale in static wikis without telemetry verification.</li>
                      <li>Mean Time to Recovery (MTTR) remains high across repeat outages.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-[#F0F5F2] border border-[#91B4A5]/30 text-xs space-y-2">
                    <span className="font-semibold text-[#245C52] block">
                      With ResolveIQ & Hindsight Memory
                    </span>
                    <ul className="space-y-1.5 text-[#26332F] list-disc list-inside">
                      <li>Correlates identical operational fingerprints from previous outages.</li>
                      <li>Recalls exact pool configuration fixes and verified resolution times.</li>
                      <li>Retains engineer feedback and outcome validation into institutional memory.</li>
                      <li>Subsequent similar incidents (like INC-050) are diagnosed in seconds.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 6: System Status */}
          {currentTab === 'system-status' && (
            <SystemStatusView
              onRefreshHealth={checkHealth}
              lastHealth={lastHealth}
              healthError={healthError}
              isChecking={isCheckingHealth}
            />
          )}

          {/* Tab 7: Settings */}
          {currentTab === 'settings' && (
            <SettingsView
              preferences={preferences}
              onSavePreferences={handleSavePreferences}
              onTriggerTestToast={(title, desc) =>
                addToast({ type: 'success', title, description: desc })
              }
            />
          )}
        </main>
      </div>

      {/* Resolution Modal */}
      <ResolutionModal
        isOpen={isResolutionModalOpen}
        onClose={() => setIsResolutionModalOpen(false)}
        incidentId={currentIncident.incidentId}
        service={currentIncident.service}
        initialRootCause={analysisResult?.rootCause}
        initialAction={analysisResult?.recommendation}
        onSubmitResolution={handleResolutionSubmit}
        isSubmitting={isSubmittingResolution}
      />

      {/* Clean Notification Toast Stream */}
      <NotificationToast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
