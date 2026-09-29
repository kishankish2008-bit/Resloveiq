import React from 'react';
import { motion } from 'motion/react';
import {
  Check,
  Loader2,
} from 'lucide-react';

export interface AnalysisStageItem {
  id: string;
  stepNum: string;
  label: string;
  subtext: string;
}

export const ANALYSIS_STAGES: AnalysisStageItem[] = [
  {
    id: 'assessment',
    stepNum: '01',
    label: 'Incident assessment',
    subtext: 'Scanning connection saturation, latency spike, and error rates',
  },
  {
    id: 'retrieval',
    stepNum: '02',
    label: 'Hindsight memory retrieval',
    subtext: 'Extracting historical incident vectors from organizational knowledge base',
  },
  {
    id: 'matching',
    stepNum: '03',
    label: 'Historical pattern matching',
    subtext: 'Evaluating similarity graphs against verified team resolutions',
  },
  {
    id: 'reasoning',
    stepNum: '04',
    label: 'Groq reasoning',
    subtext: 'Synthesizing evidence and calculating root cause probability',
  },
  {
    id: 'recommendation',
    stepNum: '05',
    label: 'Recommendation generation',
    subtext: 'Formulating prioritized operational runbook and mitigation steps',
  },
];

interface AnalysisStagesProps {
  currentStageIndex: number;
}

export const AnalysisStages: React.FC<AnalysisStagesProps> = ({
  currentStageIndex,
}) => {
  return (
    <div className="bg-[#FFFFFF] border border-[#E4E9E4] rounded-xl p-6 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-[#E4E9E4]">
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-[#245C52]" />
          <h3 className="text-sm font-semibold text-[#26332F]">
            Autonomous Diagnostic Sequence
          </h3>
        </div>

        <span className="text-xs font-mono font-medium text-[#245C52] bg-[#F0F5F2] px-2 py-0.5 rounded">
          Step {Math.min(currentStageIndex + 1, 5)} of 5
        </span>
      </div>

      <div className="py-4 space-y-2">
        {ANALYSIS_STAGES.map((stage, idx) => {
          const isDone = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;
          const isPending = idx > currentStageIndex;

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                isCurrent
                  ? 'bg-[#F0F5F2] border-[#91B4A5]/60 text-[#26332F]'
                  : isDone
                  ? 'bg-[#FFFFFF] border-[#E4E9E4] text-[#26332F]'
                  : 'bg-[#F7F8F5]/50 border-transparent text-[#78847F]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded flex items-center justify-center text-xs font-mono transition-colors ${
                    isDone
                      ? 'bg-[#43866A] text-white'
                      : isCurrent
                      ? 'bg-[#245C52] text-white'
                      : 'bg-[#E4E9E4] text-[#78847F]'
                  }`}
                >
                  {isDone ? (
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <span>{stage.stepNum}</span>
                  )}
                </div>

                <div>
                  <h4
                    className={`text-xs font-semibold ${
                      isCurrent
                        ? 'text-[#245C52]'
                        : isDone
                        ? 'text-[#26332F]'
                        : 'text-[#78847F]'
                    }`}
                  >
                    {stage.stepNum} — {stage.label}
                  </h4>
                  <p className="text-[11px] text-[#78847F]">{stage.subtext}</p>
                </div>
              </div>

              <div className="text-right text-[11px] font-mono">
                {isDone && <span className="text-[#43866A] font-medium">Completed</span>}
                {isCurrent && <span className="text-[#245C52] font-medium">Processing...</span>}
                {isPending && <span className="text-[#78847F]">Queued</span>}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
