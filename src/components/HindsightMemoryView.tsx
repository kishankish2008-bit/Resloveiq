import React, { useState } from 'react';
import {
  IconMemoryNodes,
  IconDatabaseStore,
  IconCleanSearch,
} from './brand/CustomIcons';
import {
  RefreshCw,
  Clock,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { HistoricalEvidence } from '../types/incident';

interface HindsightMemoryViewProps {
  onSeedDatabase: () => void;
  isSeeding: boolean;
  memories: HistoricalEvidence[];
  retainedIncidentCount: number;
}

export const HindsightMemoryView: React.FC<HindsightMemoryViewProps> = ({
  onSeedDatabase,
  isSeeding,
  memories,
  retainedIncidentCount,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMemories = memories.filter(
    (m) =>
      m.incidentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.resolution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.relevance.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#FFFFFF] border border-[#E4E9E4] rounded-xl p-6 shadow-xs relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#245C52] text-xs font-semibold uppercase tracking-wider mb-1">
              <IconMemoryNodes size={15} />
              <span>Hindsight Organizational Memory</span>
            </div>
            <h2 className="text-xl font-bold text-[#26332F] font-sans">
              Institutional Knowledge Corpus
            </h2>
            <p className="text-xs text-[#78847F] mt-1 max-w-2xl leading-relaxed">
              ResolveIQ indexes verified team resolutions, failure signatures, and on-call post-mortems so engineering teams never have to diagnose the same outage twice.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right px-4 py-2 bg-[#F7F8F5] border border-[#E4E9E4] rounded-lg">
              <div className="text-xl font-bold font-mono text-[#245C52]">
                {retainedIncidentCount}
              </div>
              <div className="text-[10px] text-[#78847F] uppercase font-medium">
                Retained Memories
              </div>
            </div>

            <button
              onClick={onSeedDatabase}
              disabled={isSeeding}
              className="px-4 py-2 bg-[#245C52] hover:bg-[#1D4B43] text-white rounded-md text-xs font-semibold shadow-xs flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSeeding ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <IconDatabaseStore size={14} />
              )}
              <span>{isSeeding ? 'Seeding...' : 'Seed Memory Store'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Memory Explorer & Search */}
      <div className="bg-[#FFFFFF] border border-[#E4E9E4] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E4E9E4]">
          <div>
            <h3 className="text-sm font-semibold text-[#26332F]">Indexed Memory Graph</h3>
            <p className="text-xs text-[#78847F]">
              Active incident vectors and verified on-call fixes stored in backend Hindsight
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <IconCleanSearch
              size={14}
              className="text-[#78847F] absolute left-3 top-2.5"
            />
            <input
              type="text"
              placeholder="Search memories, root causes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#F7F8F5] border border-[#E4E9E4] rounded-lg text-xs text-[#26332F] placeholder-[#78847F] focus:outline-hidden focus:border-[#245C52] focus:bg-[#FFFFFF] transition-colors"
            />
          </div>
        </div>

        {/* Memories Grid */}
        {filteredMemories.length === 0 ? (
          <div className="py-12 text-center text-[#78847F] space-y-2">
            <ShieldAlert className="w-8 h-8 mx-auto text-[#78847F]" />
            <p className="text-sm font-medium text-[#26332F]">No matching memories</p>
            <p className="text-xs text-[#78847F]">
              Click "Seed Memory Store" to populate initial historical incidents into backend Hindsight.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
            {filteredMemories.map((mem) => {
              const isNewlyLearned = mem.incidentId === 'INC-042';

              return (
                <div
                  key={mem.incidentId}
                  className={`p-4 rounded-lg border transition-all ${
                    isNewlyLearned
                      ? 'bg-[#FAF6EC] border-[#C8A66A]/60 shadow-xs'
                      : 'bg-[#FFFFFF] border-[#E4E9E4] hover:border-[#91B4A5]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E4E9E4]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-[#245C52]">
                        {mem.incidentId}
                      </span>
                      {isNewlyLearned && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C8A66A]/20 text-[#26332F] border border-[#C8A66A]/40">
                          NEWLY RETAINED
                        </span>
                      )}
                    </div>
                    {mem.resolutionTimeMinutes && (
                      <span className="text-[11px] font-mono text-[#78847F] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#78847F]" />
                        {mem.resolutionTimeMinutes}m MTTR
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#78847F] block mb-0.5">
                        Failure Signature & Context
                      </span>
                      <p className="text-[#26332F] leading-relaxed text-[11.5px]">
                        {mem.relevance}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#E4E9E4]">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#43866A] block mb-0.5">
                        Verified Resolution Action
                      </span>
                      <p className="text-[#26332F] font-mono text-[11px] leading-relaxed">
                        {mem.resolution}
                      </p>
                    </div>

                    {mem.engineerFeedback && (
                      <div className="pt-2 border-t border-[#E4E9E4] text-[11px] text-[#78847F] italic">
                        "{mem.engineerFeedback}"
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Explainer card */}
      <div className="bg-[#FFFFFF] border border-[#E4E9E4] rounded-xl p-6 shadow-xs">
        <h3 className="text-sm font-semibold text-[#26332F] mb-3">
          How Hindsight Memory Operates
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#78847F]">
          <div className="p-3.5 rounded-lg bg-[#F7F8F5] border border-[#E4E9E4] space-y-1.5">
            <div className="text-[#245C52] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#245C52]" />
              <span>1. Semantic & Metric Embedding</span>
            </div>
            <p className="leading-relaxed text-[#485350]">
              Telemetry spikes (saturation %, error gradients, traffic volume) are transformed into dense operational vectors.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#F7F8F5] border border-[#E4E9E4] space-y-1.5">
            <div className="text-[#245C52] font-semibold flex items-center gap-1.5">
              <IconMemoryNodes size={14} className="text-[#245C52]" />
              <span>2. Subgraph Relevance Scoring</span>
            </div>
            <p className="leading-relaxed text-[#485350]">
              When an outage hits, Hindsight extracts previous incidents with identical operational fingerprints and ranked effectiveness.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#F7F8F5] border border-[#E4E9E4] space-y-1.5">
            <div className="text-[#245C52] font-semibold flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5 text-[#245C52]" />
              <span>3. Continuous Retention Flywheel</span>
            </div>
            <p className="leading-relaxed text-[#485350]">
              Engineer feedback and MTTR metrics are immediately added back into the memory corpus, turning on-call tribal knowledge into permanent software.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
