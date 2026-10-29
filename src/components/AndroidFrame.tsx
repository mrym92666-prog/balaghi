import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal, Smartphone, Monitor, Download, Volume2, Shield } from 'lucide-react';
import { Language } from '../types';

interface AndroidFrameProps {
  children: React.ReactNode;
  lang: Language;
  onOpenApkModal: () => void;
  isOnline: boolean;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  lang,
  onOpenApkModal,
  isOnline,
}) => {
  const [isFrameEnabled, setIsFrameEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState('09:28');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#BEDFEF]/40 flex flex-col items-center justify-start text-[#001F29]">
      {/* Top Administrative Bar with APK Controls & View Switcher */}
      <header className="w-full bg-[#004349] text-white py-2.5 px-4 shadow-md sticky top-0 z-40 border-b border-[#0D5C63]">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8CF5E4] animate-ping" />
              <span className="font-extrabold tracking-wide uppercase text-[#8CF5E4]">
                Balaghi Civic Pulse
              </span>
            </div>
            <span className="hidden sm:inline-block text-[#90D2DA]/80">|</span>
            <span className="hidden sm:inline-block text-[#90D2DA]">
              {lang === 'fr' ? 'Application Mobile Android APK' : 'حزمة تطبيق أندرويد الرسمية'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle between Android Frame and Fullscreen View */}
            <div className="bg-[#002023] rounded-lg p-0.5 flex items-center border border-[#0D5C63]">
              <button
                type="button"
                onClick={() => setIsFrameEnabled(true)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold transition ${
                  isFrameEnabled
                    ? 'bg-[#0D5C63] text-white shadow'
                    : 'text-[#90D2DA] hover:text-white'
                }`}
                title="Afficher le cadre Android smartphone"
              >
                <Smartphone className="w-3.5 h-3.5 text-[#8CF5E4]" />
                <span className="hidden md:inline">{lang === 'fr' ? 'Vue Téléphone (APK)' : 'عرض الهاتف'}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsFrameEnabled(false)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold transition ${
                  !isFrameEnabled
                    ? 'bg-[#0D5C63] text-white shadow'
                    : 'text-[#90D2DA] hover:text-white'
                }`}
                title="Afficher en plein écran"
              >
                <Monitor className="w-3.5 h-3.5 text-[#8CF5E4]" />
                <span className="hidden md:inline">{lang === 'fr' ? 'Plein Écran' : 'شاشة كاملة'}</span>
              </button>
            </div>

            {/* APK installer trigger */}
            <button
              type="button"
              onClick={onOpenApkModal}
              className="flex items-center gap-1.5 bg-[#E76F51] hover:bg-[#A33D23] text-white px-3 py-1.5 rounded-lg font-bold shadow-sm transition active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'fr' ? 'Installer APK' : 'تثبيت APK'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full flex-1 flex items-center justify-center p-0 sm:p-6 md:p-8">
        {isFrameEnabled ? (
          /* Android Smartphone Device Shell */
          <div className="relative w-full max-w-[430px] h-[910px] max-h-[95vh] bg-[#001F29] rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,31,41,0.5)] border-[8px] border-[#0F2A35] flex flex-col overflow-hidden ring-1 ring-white/20">
            {/* Top Speaker Ear-piece */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#264653] rounded-full z-30" />

            {/* Inner Phone Screen */}
            <div className="relative w-full h-full bg-[#F3FAFF] rounded-[38px] overflow-hidden flex flex-col shadow-inner">
              {/* Android Native Status Bar */}
              <div className="w-full h-9 bg-[#004349] text-white px-5 flex items-center justify-between text-xs select-none z-30 shrink-0">
                <span className="font-bold tracking-tight font-mono">{currentTime}</span>

                {/* Camera Punch Hole */}
                <div className="w-3.5 h-3.5 bg-black rounded-full ring-2 ring-[#001F29]/30" />

                <div className="flex items-center gap-2 text-white/90">
                  <span className="text-[10px] font-semibold tracking-wider text-[#8CF5E4]">IAM 5G</span>
                  <Signal className="w-3 h-3 text-[#8CF5E4]" />
                  <Wifi className="w-3 h-3" />
                  <div className="flex items-center gap-0.5">
                    <span className="text-[10px] font-mono">96%</span>
                    <BatteryMedium className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Scrollable App Viewport */}
              <div className="flex-1 overflow-y-auto custom-scrollbar relative flex flex-col bg-[#F3FAFF]">
                {children}
              </div>

              {/* Android Bottom Navigation Pill */}
              <div className="w-full h-6 bg-[#F3FAFF] flex items-center justify-center pb-1 shrink-0 z-30">
                <div className="w-32 h-1 bg-[#001F29]/30 rounded-full" />
              </div>
            </div>
          </div>
        ) : (
          /* Full Responsive View */
          <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl bg-[#F3FAFF] min-h-[90vh] rounded-3xl shadow-xl border border-[#D8F2FF] overflow-hidden flex flex-col">
            {children}
          </div>
        )}
      </main>
    </div>
  );
};
