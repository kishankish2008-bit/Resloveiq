import React from 'react';
import {
  IconTimelineArchive,
} from './brand/CustomIcons';
import { CheckCircle2, Clock, Server } from 'lucide-react';

interface IncidentHistoryViewProps {
  resolvedIncidents: Array<{
    incidentId: string;
    service: string;
    rootCause: string;
    action: string;
    resolutionTimeMinutes: number;
    resolvedAt: string;
    engineerFeedback?: string;
  }>;
  onSelectIncident?: (id: string) => void;
}

export const IncidentHistoryView: React.FC<IncidentHistoryViewProps> = ({
  resolvedIncidents,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#FFFFFF] border border-[#E4E9E4] rounded-xl p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-[#E4E9E4]">
          <div>
            <div className="flex items-center gap-2 text-[#245C52] text-xs font-semibold uppercase tracking-wider mb-1">
              <IconTimelineArchive size={15} />
              <span>Resolved Incident Log</span>
            </div>
            <h2 className="text-xl font-bold text-[#26332F] font-sans">
              Resolution Audit Trail
            </h2>
            <p className="text-xs text-[#78847F] mt-1">
              Every resolved incident creates an immutable learning node in Hindsight memory
            </p>
          </div>

          <div className="text-right">
            <span className="text-2xl font-bold font-mono text-[#245C52]">
              {resolvedIncidents.length}
            </span>
            <span className="block text-[10px] text-[#78847F] uppercase font-medium">
              Resolved Incidents
            </span>
          </div>
        </div>

        {resolvedIncidents.length === 0 ? (
          <div className="py-12 text-center text-[#78847F]">
            <CheckCircle2 className="w-8 h-8 mx-auto text-[#78847F] mb-2" />
            <p className="text-sm font-medium text-[#26332F]">No resolved incidents yet</p>
            <p className="text-xs text-[#78847F] mt-1">
              Analyze and resolve INC-042 to record your first resolved experience.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#E4E9E4]">
            {resolvedIncidents.map((inc) => (
              <div
                key={inc.incidentId}
                className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-[#F7F8F5]/80 px-3 -mx-3 rounded-lg transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-[#245C52]">
                      {inc.incidentId}
                    </span>
                    <span className="text-[#D8DFD7]">·</span>
                    <span className="text-xs font-mono text-[#26332F] flex items-center gap-1">
                      <Server className="w-3 h-3 text-[#78847F]" />
                      {inc.service}
                    </span>
                    <span className="text-[#D8DFD7]">·</span>
                    <span className="text-[11px] text-[#43866A] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Resolved
                    </span>
                    <span className="text-[#D8DFD7]">·</span>
                    <span className="text-xs text-[#78847F]">{inc.resolvedAt}</span>
                  </div>

                  <p className="text-xs text-[#26332F] font-medium">
                    Root Cause: {inc.rootCause}
                  </p>

                  <p className="text-xs text-[#78847F] font-mono text-[11px]">
                    Action: {inc.action}
                  </p>

                  {inc.engineerFeedback && (
                    <p className="text-[11px] text-[#78847F] italic">
                      "{inc.engineerFeedback}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs font-mono font-semibold text-[#26332F] justify-end">
                      <Clock className="w-3.5 h-3.5 text-[#78847F]" />
                      <span>{inc.resolutionTimeMinutes}m MTTR</span>
                    </div>
                    <span className="text-[10.5px] text-[#245C52] font-mono">
                      Stored in Hindsight ✓
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
