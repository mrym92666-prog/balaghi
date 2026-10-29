import React from 'react';
import { CloudOff } from 'lucide-react';
import { Language } from '../types';

interface OfflineIndicatorProps {
  isOnline: boolean;
  lang: Language;
  pendingCount?: number;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({
  isOnline,
  lang,
  pendingCount = 0,
}) => {
  if (isOnline && pendingCount === 0) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-50 transition-all transform animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#FFF3CD] border-2 border-[#E76F51] text-[#731A04] shadow-lg">
        <div className="relative flex-shrink-0 p-2 rounded-lg bg-[#FFE699] text-[#A33D23]">
          <CloudOff className="w-5 h-5 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#E76F51] rounded-full ring-2 ring-white" />
        </div>
        <div className="flex-1 text-xs sm:text-sm font-medium leading-tight">
          <p className="font-bold text-[#A33D23]">
            {lang === 'fr' ? 'Pas de réseau — Mode Hors Ligne' : 'لا يوجد اتصال — وضع عدم الاتصال'}
          </p>
          <p className="mt-0.5 text-xs text-[#731A04]/90">
            {lang === 'fr'
              ? 'Signalement sauvegardé localement, envoi automatique dès reconnexion.'
              : 'تم حفظ البلاغ في الهاتف، وسيتم الإرسال تلقائياً عند عودة الإنترنت.'}
          </p>
          {pendingCount > 0 && (
            <span className="inline-block mt-1 font-bold text-[#0D5C63] bg-white/80 px-2 py-0.5 rounded text-[11px]">
              {pendingCount} {lang === 'fr' ? 'en attente de synchronisation' : 'بلاغات في انتظار الإرسال'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
