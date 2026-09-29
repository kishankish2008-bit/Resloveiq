import React from 'react';
import {
  IconIncidentMarker,
} from './brand/CustomIcons';
import {
  CheckCircle2,
  ArrowRight,
  Zap,
  Server,
  Layers,
  Clock,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { IncidentData } from '../types/incident';

interface IncidentCardProps {
  incident: IncidentData;
  onAnalyze: () => void;
  onSimulateSimilar: () => void;
  isAnalyzing: boolean;
  isResolved: boolean;
  onOpenResolutionModal: () => void;
  hasAnalysisResult: boolean;
}

export const IncidentCard: React.FC<IncidentCardProps> = ({
  incident,
  onAnalyze,
  onSimulateSimilar,
  isAnalyzing,
  isResolved,
  onOpenResolutionModal,
  hasAnalysisResult,
}) => {
  const isConnectionSaturated =
    incident.activeConnections >= incident.maxConnections;
  const saturationPercent = Math.min(
    100,
    Math.round((incident.activeConnections / incident.maxConnections) * 100)
  );

  return (
    <div className="bg-[#FFFFFF] border border-[#E4E9E4] rounded-xl p-6 lg:p-7 shadow-xs">
      {/* Editorial Header / Metadata Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#E4E9E4]">
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <span className="font-mono text-xl font-bold text-[#26332F] tracking-tight">
            {incident.incidentId}
          </span>

          <span className="text-[#D8DFD7]">·</span>

          <span className="font-mono font-semibold text-xs text-[#245C52] bg-[#F0F5F2] px-2 py-0.5 rounded">
            {incident.service}
          </span>

          <span className="text-[#D8DFD7]">·</span>

          {/* Severity: Muted brick accent (Section 7) */}
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#BF6259]/10 text-[#BF6259]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BF6259]" />
            <span>{incident.severity}</span>
          </div>

          <span className="text-[#D8DFD7]">·</span>

          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              isResolved
                ? 'bg-[#43866A]/10 text-[#43866A]'
                : isAnalyzing
                ? 'bg-[#245C52]/10 text-[#245C52]'
                : 'bg-[#C8A66A]/15 text-[#26332F]'
            }`}
          >
            {isResolved
              ? 'Resolved'
              : isAnalyzing
              ? 'Analyzing...'
              : incident.status}
          </span>
        </div>

        {/* Preset switch & resolution buttons */}
        <div className="flex items-center gap-2">
          {incident.incidentId === 'INC-042' ? (
            <button
              onClick={onSimulateSimilar}
              disabled={isAnalyzing}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#26332F] bg-[#F7F8F5] hover:bg-[#F0F5F2] border border-[#E4E9E4] rounded-md transition-colors disabled:opacity-50"
            >
              <Zap className="w-3.5 h-3.5 text-[#C8A66A]" />
              <span>Simulate Similar (INC-050)</span>
            </button>
          ) : (
            <button
              onClick={onSimulateSimilar}
              disabled={isAnalyzing}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#26332F] bg-[#F7F8F5] hover:bg-[#F0F5F2] border border-[#E4E9E4] rounded-md transition-colors disabled:opacity-50"
            >
              <ArrowRight className="w-3.5 h-3.5 text-[#245C52]" />
              <span>Back to INC-042</span>
            </button>
          )}

          {hasAnalysisResult && !isResolved && (
            <button
              onClick={onOpenResolutionModal}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-white bg-[#43866A] hover:bg-[#377058] rounded-md shadow-xs transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Resolution Successful</span>
            </button>
          )}
        </div>
      </div>

      {/* Asymmetric Editorial Body (Section 6) */}
      <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Incident Description & Primary Action (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#78847F] block mb-1.5 font-sans">
              Incident Narrative
            </span>
            <p className="text-[15px] text-[#26332F] leading-relaxed font-normal">
              "{incident.description}"
            </p>
          </div>

          {/* PostgreSQL Connection Pool Saturation Callout */}
          <div className="p-3.5 rounded-lg bg-[#F7F8F5] border border-[#E4E9E4] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#26332F]">
                PostgreSQL Connection Pool
              </span>
              <span className="font-mono font-bold text-[#BF6259]">
                {incident.activeConnections} / {incident.maxConnections} ({saturationPercent}% Saturation)
              </span>
            </div>

            <div className="w-full bg-[#E4E9E4] rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-[#BF6259] rounded-full transition-all duration-300"
                style={{ width: `${saturationPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#78847F]">
              <span>Active Pool: 50 connections max</span>
              <span className="text-[#BF6259] font-medium">137 requests waiting in buffer</span>
            </div>
          </div>

          {/* Primary Action Button (Section 8) */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <button
              onClick={onAnalyze}
              disabled={isAnalyzing}
              className="w-full sm:w-auto px-6 py-2.5 rounded-md text-sm font-semibold text-white bg-[#245C52] hover:bg-[#1D4B43] shadow-xs flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Analyzing Telemetry & Memory...' : 'Analyze Incident'}</span>
            </button>

            <span className="text-xs text-[#78847F]">
              Evaluates live metrics against Hindsight organizational memory
            </span>
          </div>
        </div>

        {/* Right Column: Key Metric Grid (5 cols) */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3">
          {/* Error Rate */}
          <div className="p-3.5 bg-[#F7F8F5] border border-[#E4E9E4] rounded-lg space-y-1">
            <div className="flex items-center justify-between text-[11px] text-[#78847F]">
              <span>Error Rate</span>
              <IconIncidentMarker size={13} className="text-[#BF6259]" />
            </div>
            <div className="text-2xl font-bold font-mono text-[#BF6259] tabular-nums">
              {incident.errorRate}%
            </div>
            <div className="text-[10px] text-[#78847F]">SLO threshold: 1.0%</div>
          </div>

          {/* Latency */}
          <div className="p-3.5 bg-[#F7F8F5] border border-[#E4E9E4] rounded-lg space-y-1">
            <div className="flex items-center justify-between text-[11px] text-[#78847F]">
              <span>p99 Latency</span>
              <Clock className="w-3.5 h-3.5 text-[#C8A66A]" />
            </div>
            <div className="text-2xl font-bold font-mono text-[#26332F] tabular-nums">
              {incident.latencySeconds}s
            </div>
            <div className="text-[10px] text-[#78847F]">Normal: 120ms</div>
          </div>

          {/* Traffic */}
          <div className="p-3.5 bg-[#F7F8F5] border border-[#E4E9E4] rounded-lg space-y-1">
            <div className="flex items-center justify-between text-[11px] text-[#78847F]">
              <span>Throughput</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#245C52]" />
            </div>
            <div className="text-2xl font-bold font-mono text-[#26332F] tabular-nums">
              {incident.trafficPerMinute.toLocaleString()}
            </div>
            <div className="text-[10px] text-[#78847F]">requests / min</div>
          </div>

          {/* Active Connections */}
          <div className="p-3.5 bg-[#F7F8F5] border border-[#E4E9E4] rounded-lg space-y-1">
            <div className="flex items-center justify-between text-[11px] text-[#78847F]">
              <span>Active Conn.</span>
              <Server className="w-3.5 h-3.5 text-[#BF6259]" />
            </div>
            <div className="text-2xl font-bold font-mono text-[#BF6259] tabular-nums">
              50/50
            </div>
            <div className="text-[10px] text-[#BF6259] font-medium">Pool Limit Reached</div>
          </div>

          {/* Waiting Requests */}
          <div className="p-3.5 bg-[#F7F8F5] border border-[#E4E9E4] rounded-lg space-y-1">
            <div className="flex items-center justify-between text-[11px] text-[#78847F]">
              <span>Queued Reqs</span>
              <Layers className="w-3.5 h-3.5 text-[#BF6259]" />
            </div>
            <div className="text-2xl font-bold font-mono text-[#BF6259] tabular-nums">
              {incident.waitingRequests}
            </div>
            <div className="text-[10px] text-[#78847F]">requests waiting</div>
          </div>

          {/* Recent Deployment */}
          <div className="p-3.5 bg-[#F7F8F5] border border-[#E4E9E4] rounded-lg space-y-1">
            <div className="flex items-center justify-between text-[11px] text-[#78847F]">
              <span>Deployment</span>
              <span className="text-[10px] text-[#78847F]">v2.14.0</span>
            </div>
            <div className="text-2xl font-bold font-mono text-[#576460]">
              {incident.recentDeployment ? 'Yes' : 'No'}
            </div>
            <div className="text-[10px] text-[#78847F]">No changes in 24h</div>
          </div>
        </div>
      </div>
    </div>
  );
};
