import React from 'react';

interface ResolveLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

/**
 * ResolveIQ Original Geometric Mark:
 * Formed by interconnected telemetry nodes along an engineering spine
 * and a central resolving loop and diagonal pathway that subtly forms the letter 'R'.
 * Deep evergreen (#245C52), Muted eucalyptus (#91B4A5), and Soft antique gold (#C8A66A).
 */
export const ResolveMark: React.FC<{ size?: number; className?: string }> = ({
  size = 28,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="ResolveIQ Geometric Mark"
    >
      {/* Background Soft Geometric Surface */}
      <rect width="32" height="32" rx="7" fill="#F0F4F1" stroke="#E4E9E4" strokeWidth="1" />

      {/* Structural Backbone Spine */}
      <line x1="9.5" y1="7.5" x2="9.5" y2="24.5" stroke="#245C52" strokeWidth="2.2" strokeLinecap="round" />

      {/* Resolving R-Loop Pathway */}
      <path
        d="M9.5 8H17C19.7 8 21.8 10 21.8 12.8C21.8 15.6 19.7 17.6 17 17.6H9.5"
        stroke="#245C52"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Incident Resolution Pathway (R leg extending forward) */}
      <line
        x1="15"
        y1="17.6"
        x2="22.5"
        y2="24.5"
        stroke="#245C52"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Internal Knowledge Link */}
      <line
        x1="9.5"
        y1="12.8"
        x2="15.5"
        y2="12.8"
        stroke="#91B4A5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="1.5 2"
      />

      {/* Interconnected Knowledge Nodes */}
      <circle cx="9.5" cy="7.5" r="2.2" fill="#245C52" />
      <circle cx="9.5" cy="17.6" r="1.9" fill="#245C52" />
      <circle cx="9.5" cy="24.5" r="2.2" fill="#245C52" />
      <circle cx="21.8" cy="12.8" r="2" fill="#91B4A5" />
      <circle cx="22.5" cy="24.5" r="2.2" fill="#245C52" />

      {/* Hindsight Core Memory Focal Node (Soft Antique Gold) */}
      <circle cx="15.5" cy="12.8" r="1.6" fill="#C8A66A" />
    </svg>
  );
};

export const ResolveLogo: React.FC<ResolveLogoProps> = ({
  size = 30,
  showText = true,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <ResolveMark size={size} />
      {showText && (
        <div className="flex flex-col select-none">
          <div className="flex items-center tracking-tight font-sans">
            <span className="text-[17px] font-bold text-[#26332F] tracking-tight">
              Resolve
            </span>
            <span className="text-[17px] font-bold text-[#245C52] tracking-tight ml-0.5">
              IQ
            </span>
          </div>
          <span className="text-[10px] font-semibold tracking-wider text-[#78847F] uppercase font-sans -mt-0.5">
            Incident Intelligence
          </span>
        </div>
      )}
    </div>
  );
};
