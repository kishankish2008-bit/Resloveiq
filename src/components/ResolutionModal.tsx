import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  X,
  Clock,
  Sparkles,
  AlertCircle,
  Plus,
  Trash2,
  Loader2,
} from 'lucide-react';
import { IconMemoryNodes } from './brand/CustomIcons';
import { ResolveRequest } from '../types/incident';

interface ResolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  incidentId: string;
  service: string;
  initialRootCause?: string;
  initialAction?: string;
  onSubmitResolution: (payload: ResolveRequest) => Promise<void>;
  isSubmitting: boolean;
}

export const ResolutionModal: React.FC<ResolutionModalProps> = ({
  isOpen,
  onClose,
  incidentId,
  service,
  initialRootCause = 'PostgreSQL connection pool exhaustion',
  initialAction = 'Increased PostgreSQL connection pool from 50 to 100',
  onSubmitResolution,
  isSubmitting,
}) => {
  const [rootCause, setRootCause] = useState(initialRootCause);
  const [action, setAction] = useState(initialAction);
  const [resolutionTimeMinutes, setResolutionTimeMinutes] = useState<number>(7);
  const [successful, setSuccessful] = useState<boolean>(true);
  const [engineerFeedback, setEngineerFeedback] = useState(
    'The recommendation was correct and resolved the issue quickly.'
  );
  const [observations, setObservations] = useState<string[]>([
    'Issue occurred during high traffic',
    'Traffic exceeded 8000 requests/minute',
    'Database connection pool reached maximum capacity',
  ]);
  const [newObsInput, setNewObsInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialRootCause) setRootCause(initialRootCause);
    if (initialAction) setAction(initialAction);
  }, [initialRootCause, initialAction, isOpen]);

  if (!isOpen) return null;

  const handleAddObservation = () => {
    if (!newObsInput.trim()) return;
    setObservations([...observations, newObsInput.trim()]);
    setNewObsInput('');
  };

  const handleRemoveObservation = (index: number) => {
    setObservations(observations.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const payload: ResolveRequest = {
      incidentId,
      service,
      rootCause,
      action,
      resolutionTimeMinutes: Number(resolutionTimeMinutes) || 1,
      successful,
      engineerFeedback,
      observations,
    };

    try {
      await onSubmitResolution(payload);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to record resolution in Hindsight.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-2xs overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#FFFFFF] border border-[#E5E9E4] rounded-xl shadow-xl p-6 text-[#273331] my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E4E9E4]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#F0F5F2] text-[#245C52]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#26332F]">Record Incident Resolution</h2>
              <p className="text-xs text-[#78847F]">
                Persist confirmed runbook and engineer outcome into Hindsight Organizational Memory
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1 rounded-md text-[#78847F] hover:text-[#26332F] hover:bg-[#F7F8F5] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="py-4 space-y-4 text-xs">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-[#BF6259]/10 border border-[#BF6259]/30 text-[#BF6259] flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Incident metadata row */}
          <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-[#F7F8F5] border border-[#E4E9E4]">
            <div>
              <span className="text-[10px] text-[#78847F] uppercase font-semibold">Incident</span>
              <p className="text-sm font-mono font-bold text-[#245C52]">{incidentId}</p>
            </div>
            <div>
              <span className="text-[10px] text-[#78847F] uppercase font-semibold">Service</span>
              <p className="text-sm font-mono font-semibold text-[#26332F]">{service}</p>
            </div>
          </div>

          {/* Root Cause */}
          <div>
            <label className="block text-[#26332F] font-medium mb-1">
              Confirmed Root Cause
            </label>
            <input
              type="text"
              required
              value={rootCause}
              onChange={(e) => setRootCause(e.target.value)}
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E4E9E4] rounded-lg text-[#26332F] focus:outline-hidden focus:border-[#245C52]"
            />
          </div>

          {/* Action Taken */}
          <div>
            <label className="block text-[#26332F] font-medium mb-1">
              Actual Action Taken
            </label>
            <input
              type="text"
              required
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E4E9E4] rounded-lg text-[#26332F] focus:outline-hidden focus:border-[#245C52]"
            />
          </div>

          {/* Time & Outcome row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#26332F] font-medium mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#78847F]" />
                <span>Resolution Time (Minutes)</span>
              </label>
              <input
                type="number"
                min="1"
                required
                value={resolutionTimeMinutes}
                onChange={(e) => setResolutionTimeMinutes(parseInt(e.target.value, 10) || 1)}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E4E9E4] rounded-lg font-mono text-[#245C52] focus:outline-hidden focus:border-[#245C52]"
              />
            </div>

            <div>
              <label className="block text-[#26332F] font-medium mb-1">
                Outcome Status
              </label>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSuccessful(true)}
                  className={`flex-1 py-1.5 px-3 rounded-lg border font-medium text-xs transition-colors ${
                    successful
                      ? 'bg-[#F0F5F2] border-[#245C52] text-[#245C52] font-semibold'
                      : 'bg-[#FFFFFF] border-[#E4E9E4] text-[#78847F]'
                  }`}
                >
                  ✓ Successful Fix
                </button>
                <button
                  type="button"
                  onClick={() => setSuccessful(false)}
                  className={`flex-1 py-1.5 px-3 rounded-lg border font-medium text-xs transition-colors ${
                    !successful
                      ? 'bg-[#BF6259]/10 border-[#BF6259] text-[#BF6259] font-semibold'
                      : 'bg-[#FFFFFF] border-[#E4E9E4] text-[#78847F]'
                  }`}
                >
                  ✕ Mitigated / Incomplete
                </button>
              </div>
            </div>
          </div>

          {/* Engineer Feedback */}
          <div>
            <label className="block text-[#26332F] font-medium mb-1">
              Engineer Feedback & Notes
            </label>
            <textarea
              rows={2}
              required
              value={engineerFeedback}
              onChange={(e) => setEngineerFeedback(e.target.value)}
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E4E9E4] rounded-lg text-[#26332F] focus:outline-hidden focus:border-[#245C52] text-xs"
            />
          </div>

          {/* Observations */}
          <div>
            <label className="block text-[#26332F] font-medium mb-1">
              Key Incident Observations (Retained by Hindsight)
            </label>
            <div className="space-y-1.5 mb-2">
              {observations.map((obs, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded bg-[#F7F8F5] border border-[#E4E9E4] text-[#26332F]"
                >
                  <span>• {obs}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveObservation(idx)}
                    className="text-[#78847F] hover:text-[#BF6259] p-0.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add custom telemetry observation..."
                value={newObsInput}
                onChange={(e) => setNewObsInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddObservation();
                  }
                }}
                className="flex-1 px-3 py-1.5 bg-[#FFFFFF] border border-[#E4E9E4] rounded-lg text-[#26332F] focus:outline-hidden focus:border-[#245C52] text-xs"
              />
              <button
                type="button"
                onClick={handleAddObservation}
                className="px-3 py-1.5 bg-[#F7F8F5] hover:bg-[#F0F5F2] text-[#26332F] border border-[#E4E9E4] rounded-lg flex items-center gap-1 text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Context callout */}
          <div className="p-3 rounded-lg bg-[#F0F5F2] border border-[#91B4A5]/30 text-[#245C52] flex items-center gap-2">
            <IconMemoryNodes size={16} className="text-[#245C52] shrink-0" />
            <span className="text-[11px] leading-relaxed">
              Submitting calls <code className="font-mono font-medium">POST /api/resolve</code> to store verified runbooks and metrics in Hindsight memory for future similar incident recalls.
            </span>
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E4E9E4]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg text-[#78847F] hover:text-[#26332F] hover:bg-[#F7F8F5] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg font-semibold text-white bg-[#245C52] hover:bg-[#1D4B43] shadow-xs flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Storing in Hindsight...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Store in Hindsight</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
