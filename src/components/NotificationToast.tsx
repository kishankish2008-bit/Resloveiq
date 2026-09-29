import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { IconMemoryNodes } from './brand/CustomIcons';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'hindsight';
  title: string;
  description?: string;
}

interface NotificationToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  toasts,
  onDismiss,
}) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className={`pointer-events-auto p-4 rounded-xl border shadow-md flex items-start gap-3 bg-[#FFFFFF] ${
              t.type === 'hindsight'
                ? 'border-[#91B4A5] text-[#245C52]'
                : t.type === 'success'
                ? 'border-[#43866A] text-[#43866A]'
                : 'border-[#BF6259] text-[#BF6259]'
            }`}
          >
            {t.type === 'hindsight' ? (
              <div className="p-1 rounded-md bg-[#F0F5F2] text-[#245C52] shrink-0">
                <IconMemoryNodes size={15} />
              </div>
            ) : t.type === 'success' ? (
              <div className="p-1 rounded-md bg-[#43866A]/10 text-[#43866A] shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            ) : (
              <div className="p-1 rounded-md bg-[#BF6259]/10 text-[#BF6259] shrink-0">
                <AlertCircle className="w-4 h-4" />
              </div>
            )}

            <div className="flex-1 min-w-0 pr-1">
              <h4 className="text-xs font-semibold tracking-wide text-[#26332F]">
                {t.title}
              </h4>
              {t.description && (
                <p className="text-xs text-[#78847F] mt-0.5 leading-relaxed">
                  {t.description}
                </p>
              )}
            </div>

            <button
              onClick={() => onDismiss(t.id)}
              className="text-[#78847F] hover:text-[#26332F] p-0.5 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
