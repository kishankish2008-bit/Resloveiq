import React from 'react';
import { motion } from 'motion/react';
import { IconMemoryNodes } from './brand/CustomIcons';
import {
  CheckCircle2,
  ArrowRight,
  Clock,
  History,
  Zap,
  Info,
} from 'lucide-react';
import { AnalysisResponse, HistoricalEvidence } from '../types/incident';

interface AnalysisResultsProps {
  result: AnalysisResponse;
  onOpenResolutionModal: () => void;
  isResolved: boolean;
  onSimulateSimilar: () => void;
  currentIncidentId: string;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  result,
  onOpenResolutionModal,
  isResolved,
  onSimulateSimilar,
  currentIncidentId,
}) => {
  const confidencePercent = Math.round((result.confidence || 0) * 100);
  const evidenceList: HistoricalEvidence[] = result.historicalEvidence || [];
  const memoryCount = result.memoryCount ?? evidenceList.length;

  return (
    <div className="space-y-6">
      {/* Root Cause & Confidence Grid (Section 10) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Root Cause Diagnosis Panel (8 cols) */}
        <div className="lg:col-span-8 bg-[#FFFFFF] border border-[#E4E9E4] rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E4E9E4]">
              <span className="text-[11px] font-bold tracking-widest text-[#245C52] uppercase font-sans">
                Diagnosed Root Cause
              </span>
              <span className="text-xs font-mono text-[#78847F]">
                Target: {result.incidentId}
              </span>
            </div>

            <div className="pt-4">
              <h3 className="text-xl font-bold text-[#26332F] font-sans leading-snug">
                {result.rootCause}
              </h3>
              <p className="text-xs text-[#78847F] mt-2 leading-relaxed">
                Diagnosed by Groq reasoning across real-time telemetry signatures and verified Hindsight organizational memories.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E4E9E4] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[#78847F]">
              <span>Resolution state:</span>
              <span className={isResolved ? 'text-[#43866A] font-semibold' : 'text-[#C8A66A] font-semibold'}>
                {isResolved ? 'Resolved & Retained in Hindsight' : 'Ready for Execution'}
              </span>
            </div>

            {!isResolved ? (
              <button
                onClick={onOpenResolutionModal}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#43866A] hover:bg-[#377058] rounded-md shadow-xs flex items-center gap-1.5 transition-all active:scale-98 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Resolution Successful</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#43866A] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#43866A]" />
                  Experience Recorded
                </span>
                {currentIncidentId === 'INC-042' && (
                  <button
                    onClick={onSimulateSimilar}
                    className="px-3 py-1.5 text-xs font-medium text-[#245C52] bg-[#F0F5F2] hover:bg-[#E5ECE8] border border-[#91B4A5]/40 rounded-md flex items-center gap-1.5 transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5 text-[#C8A66A]" />
                    <span>Test Memory Recall (INC-050)</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Confidence Percentage Indicator (4 cols) */}
        <div className="lg:col-span-4 bg-[#FFFFFF] border border-[#E4E9E4] rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E4E9E4] text-xs text-[#78847F]">
              <span className="font-semibold text-[#26332F] uppercase tracking-wider text-[11px]">
                Diagnostic Confidence
              </span>
              <span className="text-[11px] font-mono text-[#245C52]">Verified Match</span>
            </div>

            <div className="pt-4 flex items-baseline gap-2">
              <span className="text-4xl font-bold font-mono text-[#245C52] tabular-nums">
                {confidencePercent}%
              </span>
              <span className="text-xs text-[#78847F]">pattern correlation</span>
            </div>

            <p className="text-xs text-[#78847F] mt-2 leading-relaxed">
              Derived from {memoryCount} previous organizational resolutions with verified outcomes.
            </p>
          </div>

          <div className="pt-4">
            <div className="w-full bg-[#E4E9E4] h-1.5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${confidencePercent}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-full bg-[#245C52] rounded-full"
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#78847F] font-mono mt-1.5">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Action Runbook (Section 10) */}
      <div className="bg-[#F0F5F2] border border-[#91B4A5]/40 rounded-xl p-6 shadow-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-[#91B4A5]/20 text-xs font-semibold text-[#245C52]">
          <ArrowRight className="w-4 h-4 text-[#245C52]" />
          <span className="uppercase tracking-wider">Recommended Action Runbook</span>
        </div>

        <div className="pt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-[15px] font-semibold text-[#26332F] font-mono">
              {result.recommendation}
            </p>
            <p className="text-xs text-[#78847F]">
              Execute immediate configuration update to PostgreSQL pool capacity.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#245C52] bg-[#FFFFFF] border border-[#91B4A5]/30 px-3 py-1.5 rounded-md shrink-0">
            <span>Pool Target: 100</span>
            <span className="text-[#D8DFD7]">·</span>
            <span>Est. Recovery: &lt; 2m</span>
          </div>
        </div>
      </div>

      {/* Signature Feature: Hindsight Memory Visualization (Section 9) */}
      <div className="bg-[#FFFFFF] border border-[#E4E9E4] rounded-xl p-6 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E4E9E4]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#F0F5F2] flex items-center justify-center text-[#245C52]">
              <IconMemoryNodes size={15} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#26332F]">
                Hindsight Memory Retrieval ({memoryCount} Matching Experiences)
              </h3>
              <p className="text-xs text-[#78847F]">
                Autonomous recall linking current failure signatures to verified organizational fixes
              </p>
            </div>
          </div>

          {result.matchingIncidents && result.matchingIncidents.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-[#78847F] font-mono">
              <span>Matching nodes:</span>
              <div className="flex items-center gap-1">
                {result.matchingIncidents.map((id) => (
                  <span
                    key={id}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      id === 'INC-042'
                        ? 'bg-[#C8A66A]/20 text-[#26332F] border border-[#C8A66A]/40'
                        : 'bg-[#F7F8F5] text-[#245C52] border border-[#E4E9E4]'
                    }`}
                  >
                    {id}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Evidence Cards */}
        {evidenceList.length === 0 ? (
          <div className="p-8 text-center rounded-lg border border-dashed border-[#E4E9E4] text-[#78847F]">
            <History className="w-7 h-7 mx-auto mb-2 text-[#78847F]" />
            <p className="text-sm font-medium text-[#26332F]">No historical memories found</p>
            <p className="text-xs text-[#78847F] mt-1">
              Hindsight has not yet recorded similar incidents for this signature. Resolving this incident will create the first organizational memory.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
            {evidenceList.map((evidence, idx) => {
              const isNewlyLearned = evidence.incidentId === 'INC-042';

              return (
                <motion.div
                  key={evidence.incidentId || idx}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  className={`p-4 rounded-lg border transition-all ${
                    isNewlyLearned
                      ? 'bg-[#FAF6EC] border-[#C8A66A]/60 shadow-xs'
                      : 'bg-[#FFFFFF] border-[#E4E9E4] hover:border-[#91B4A5]'
                  }`}
                >
                  {/* Special indicator for INC-042 (Section 11 requirement) */}
                  {isNewlyLearned && (
                    <div className="mb-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-[#C8A66A]/20 text-[#26332F] border border-[#C8A66A]/40">
                      <Zap className="w-3 h-3 text-[#C8A66A]" />
                      <span>⚡ NEW MEMORY MATCH</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-bold text-[#245C52]">
                      {evidence.incidentId}
                    </span>
                    {evidence.resolutionTimeMinutes && (
                      <span className="text-[11px] font-mono text-[#78847F] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#78847F]" />
                        {evidence.resolutionTimeMinutes}m MTTR
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-[#78847F] tracking-wider block mb-0.5">
                        Observed Relevance
                      </span>
                      <p className="text-[#26332F] leading-relaxed text-[11.5px]">
                        {evidence.relevance}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#E4E9E4]">
                      <span className="text-[10px] uppercase font-semibold text-[#43866A] tracking-wider block mb-0.5">
                        Verified Team Resolution
                      </span>
                      <p className="text-[#26332F] font-mono text-[11px] leading-relaxed">
                        {evidence.resolution}
                      </p>
                    </div>

                    {evidence.engineerFeedback && (
                      <div className="pt-1.5 text-[11px] text-[#78847F] italic">
                        "{evidence.engineerFeedback}"
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Groq AI Reasoning Chain */}
      {result.reasoning && (
        <div className="bg-[#FFFFFF] border border-[#E4E9E4] rounded-xl p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E4E9E4] text-xs font-semibold text-[#26332F]">
            <Info className="w-4 h-4 text-[#245C52]" />
            <span className="uppercase tracking-wider">Groq AI Reasoning Chain</span>
          </div>

          <div className="text-xs text-[#26332F] leading-relaxed space-y-2 bg-[#F7F8F5] p-4 rounded-lg border border-[#E4E9E4] font-sans">
            {result.reasoning.split('\n\n').map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
