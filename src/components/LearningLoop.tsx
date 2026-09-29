import React from 'react';
import { motion } from 'motion/react';
import {
  IconIncidentMarker,
  IconDatabaseStore,
  IconTimelineArchive,
  IconContinuousLoop,
  IconMemoryNodes,
} from './brand/CustomIcons';
import {
  Cpu,
  ArrowRight,
  UserCheck,
  TrendingUp,
  Check,
  CheckCircle2,
} from 'lucide-react';

export type LoopStageKey =
  | 'incident'
  | 'recall'
  | 'experience'
  | 'groq'
  | 'recommendation'
  | 'resolution'
  | 'retain'
  | 'future';

interface LearningLoopProps {
  activeStage?: LoopStageKey;
  isAnalyzing?: boolean;
  isResolved?: boolean;
  compact?: boolean;
  matchingIncidentCount?: number;
  highlightRetain?: boolean;
}

interface LoopStep {
  key: LoopStageKey;
  label: string;
  sub: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export const LOOP_STEPS: LoopStep[] = [
  {
    key: 'incident',
    label: 'Current Incident',
    sub: 'Live Anomaly Detection',
    icon: IconIncidentMarker,
  },
  {
    key: 'recall',
    label: 'Hindsight Recall',
    sub: 'Vector Memory Query',
    icon: IconDatabaseStore,
  },
  {
    key: 'experience',
    label: 'Historical Experience',
    sub: 'Verified Past Outages',
    icon: IconTimelineArchive,
  },
  {
    key: 'groq',
    label: 'Groq Reasoning',
    sub: 'Llama 3 Diagnostic Logic',
    icon: Cpu,
  },
  {
    key: 'recommendation',
    label: 'Recommendation',
    sub: 'Actionable Runbook',
    icon: ArrowRight,
  },
  {
    key: 'resolution',
    label: 'Engineer Resolution',
    sub: 'Human Verification',
    icon: UserCheck,
  },
  {
    key: 'retain',
    label: 'Hindsight Retain',
    sub: 'Knowledge Graph Storage',
    icon: IconMemoryNodes,
  },
  {
    key: 'future',
    label: 'Future Learning',
    sub: 'Instant Match Next Outage',
    icon: TrendingUp,
  },
];

export const LearningLoop: React.FC<LearningLoopProps> = ({
  isAnalyzing = false,
  isResolved = false,
  compact = false,
  highlightRetain = false,
}) => {
  return (
    <div className="bg-[#FFFFFF] border border-[#E4E9E4] rounded-xl p-6 shadow-xs relative">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E4E9E4]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-[#F0F5F2] text-[#245C52]">
            <IconContinuousLoop size={16} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#26332F]">
              The Hindsight Learning Loop
            </h3>
            <p className="text-xs text-[#78847F]">
              Connected nodes linking real-time failure telemetry to accumulated team knowledge
            </p>
          </div>
        </div>

        {highlightRetain && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0F5F2] text-[#245C52] border border-[#91B4A5]/40"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#43866A]" />
            <span>Retain Phase Confirmed & Stored</span>
          </motion.div>
        )}
      </div>

      {/* Connected Nodes Flow */}
      <div className="pt-6 pb-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2.5 relative">
          {LOOP_STEPS.map((step, idx) => {
            const Icon = step.icon;

            const isRetain = step.key === 'retain';
            const isHighlightRetain = isRetain && (highlightRetain || isResolved);
            const isAnalyzingActive =
              isAnalyzing &&
              (step.key === 'recall' || step.key === 'experience' || step.key === 'groq');
            const isCompleted =
              (!isAnalyzing && isResolved) ||
              (step.key === 'incident' && isAnalyzing) ||
              (step.key === 'recall' && !isAnalyzing && isResolved);

            const cardBg = isHighlightRetain || isAnalyzingActive
              ? 'bg-[#FAF6EC] border-[#C8A66A]'
              : isCompleted
              ? 'bg-[#F0F5F2] border-[#91B4A5]/40'
              : 'bg-[#F7F8F5] border-[#E4E9E4]';

            const badgeBg = isHighlightRetain || isAnalyzingActive
              ? 'bg-[#C8A66A] text-white'
              : isCompleted
              ? 'bg-[#245C52] text-white'
              : 'bg-[#E4E9E4] text-[#78847F]';

            return (
              <div key={step.key} className="relative flex flex-col">
                <div
                  className={`h-full p-3.5 rounded-lg border text-left flex flex-col justify-between transition-all ${cardBg}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-medium ${badgeBg}`}
                    >
                      {isCompleted && !isHighlightRetain ? (
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      ) : (
                        idx + 1
                      )}
                    </span>

                    <Icon size={14} className="opacity-80 text-[#78847F]" />
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold tracking-tight text-[#26332F] mb-0.5">
                      {step.label}
                    </h4>
                    {!compact && (
                      <p className="text-[10.5px] text-[#78847F] leading-snug line-clamp-2">
                        {step.sub}
                      </p>
                    )}
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#E4E9E4] text-[9.5px] font-mono flex items-center justify-between">
                    {isHighlightRetain ? (
                      <span className="text-[#C8A66A] font-bold">RETAINED ✓</span>
                    ) : isAnalyzingActive ? (
                      <span className="text-[#C8A66A] font-medium">ACTIVE...</span>
                    ) : isCompleted ? (
                      <span className="text-[#245C52] font-medium">COMPLETE</span>
                    ) : (
                      <span className="text-[#78847F]">STAGE {idx + 1}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#E4E9E4] text-xs text-[#78847F] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-[11.5px] text-[#78847F]">
          <span className="text-[#245C52] font-semibold">Continuous Feedback Cycle:</span> Every confirmed mitigation is indexed into Hindsight's organizational graph with latency impact and verified engineer notes.
        </p>
        <span className="text-[11px] font-mono text-[#78847F] shrink-0">
          Organizational Flywheel: Active
        </span>
      </div>
    </div>
  );
};
