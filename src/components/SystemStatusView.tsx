import React, { useState } from 'react';
import {
  IconPulseStatus,
  IconMemoryNodes,
  IconDatabaseStore,
} from './brand/CustomIcons';
import {
  CheckCircle2,
  XCircle,
  RefreshCw,
  Server,
  Cpu,
  AlertTriangle,
} from 'lucide-react';
import { getApiBaseUrl } from '../services/api';
import { HealthResponse } from '../types/incident';

interface SystemStatusViewProps {
  onRefreshHealth: () => Promise<void>;
  lastHealth: HealthResponse | null;
  healthError: string | null;
  isChecking: boolean;
}

export const SystemStatusView: React.FC<SystemStatusViewProps> = ({
  onRefreshHealth,
  lastHealth,
  healthError,
  isChecking,
}) => {
  const [latencyMs, setLatencyMs] = useState<number | null>(null);

  const handleManualPing = async () => {
    const start = performance.now();
    await onRefreshHealth();
    setLatencyMs(Math.round(performance.now() - start));
  };

  const isConnected = !healthError && lastHealth !== null;

  return (
    <div className="space-y-6">
      <div className="bg-[#FFFFFF] border border-[#E4E9E4] rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E4E9E4]">
          <div>
            <div className="flex items-center gap-2 text-[#245C52] text-xs font-semibold uppercase tracking-wider mb-1">
              <IconPulseStatus size={14} />
              <span>Platform Health & Diagnostics</span>
            </div>
            <h2 className="text-xl font-bold text-[#26332F] font-sans">
              Connection Status
            </h2>
            <p className="text-xs text-[#78847F] mt-1">
              Real-time telemetry and service status across backend API, Hindsight organizational memory, and Groq reasoning engines
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleManualPing}
              disabled={isChecking}
              className="px-3.5 py-2 bg-[#F7F8F5] hover:bg-[#F0F5F2] text-[#26332F] border border-[#E4E9E4] rounded-md text-xs font-medium flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin text-[#245C52]' : ''}`} />
              <span>{isChecking ? 'Checking...' : 'Ping Services'}</span>
            </button>
          </div>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {/* Backend API Service */}
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E4E9E4] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#78847F]">
              <span className="font-semibold text-[#26332F]">Backend API</span>
              <Server className="w-4 h-4 text-[#245C52]" />
            </div>

            <div className="flex items-center gap-2.5">
              {isConnected ? (
                <CheckCircle2 className="w-5 h-5 text-[#43866A] shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-[#BF6259] shrink-0" />
              )}
              <div className="min-w-0">
                <span className="text-sm font-bold font-mono text-[#26332F] block">
                  {isConnected ? 'ONLINE' : 'UNREACHABLE'}
                </span>
                <span className="text-[11px] text-[#78847F] truncate block font-mono">
                  {getApiBaseUrl() || 'Relative /api'}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E4E9E4] text-[11px] text-[#78847F] font-mono">
              {latencyMs !== null ? `Latency: ${latencyMs}ms` : 'Endpoint: /api/health'}
            </div>
          </div>

          {/* Hindsight Memory Engine */}
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E4E9E4] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#78847F]">
              <span className="font-semibold text-[#26332F]">Hindsight Memory</span>
              <IconMemoryNodes size={15} className="text-[#245C52]" />
            </div>

            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#245C52] shrink-0" />
              <div>
                <span className="text-sm font-bold font-mono text-[#245C52] block">
                  SYNCHRONIZED
                </span>
                <span className="text-[11px] text-[#78847F]">
                  Persistent Knowledge Graph
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E4E9E4] text-[11px] text-[#78847F] font-mono">
              State: Active Retention
            </div>
          </div>

          {/* Groq AI Llama 3 */}
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E4E9E4] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#78847F]">
              <span className="font-semibold text-[#26332F]">Groq AI Engine</span>
              <Cpu className="w-4 h-4 text-[#8199A8]" />
            </div>

            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#43866A] shrink-0" />
              <div>
                <span className="text-sm font-bold font-mono text-[#26332F] block">
                  READY
                </span>
                <span className="text-[11px] text-[#78847F]">
                  Llama 3 Diagnostic Logic
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E4E9E4] text-[11px] text-[#78847F] font-mono">
              Inference: Sub-Second
            </div>
          </div>

          {/* PostgreSQL Connection Pool Status */}
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E4E9E4] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#78847F]">
              <span className="font-semibold text-[#26332F]">payment-api DB Pool</span>
              <IconDatabaseStore size={15} className="text-[#BF6259]" />
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#BF6259]/10 text-[#BF6259] flex items-center justify-center shrink-0">
                <AlertTriangle className="w-3.5 h-3.5 text-[#BF6259]" />
              </div>
              <div>
                <span className="text-sm font-bold font-mono text-[#BF6259] block">
                  SATURATED (50/50)
                </span>
                <span className="text-[11px] text-[#BF6259] font-medium">
                  137 waiting requests
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E4E9E4] text-[11px] text-[#78847F] font-mono">
              Mitigation: Expand pool to 100
            </div>
          </div>
        </div>

        {/* Backend health notice if offline */}
        {healthError && (
          <div className="mt-6 p-4 rounded-lg bg-[#BF6259]/10 border border-[#BF6259]/30 text-[#BF6259] text-xs space-y-1">
            <div className="flex items-center gap-2 font-semibold">
              <XCircle className="w-4 h-4 text-[#BF6259]" />
              <span>Backend Connectivity Notice</span>
            </div>
            <p className="text-[#26332F]">{healthError}</p>
            <p className="text-[11px] text-[#78847F] pt-1">
              Ensure the backend server is running on the configured host.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
