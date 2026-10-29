import React, { useState } from 'react';
import { Download, Smartphone, CheckCircle, Info, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Language } from '../types';

interface PWAInstallButtonProps {
  lang: Language;
  onOpenApkModal?: () => void;
  className?: string;
  variant?: 'primary' | 'compact' | 'badge';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  lang,
  onOpenApkModal,
  className = '',
  variant = 'primary',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  const handleInstallClick = async () => {
    if (isInstallable) {
      const res = await install();
      if (res) {
        setInstallSuccess(true);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else if (onOpenApkModal) {
      onOpenApkModal();
    }
  };

  if (isInstalled || installSuccess) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E6FBF7] text-[#00443D] text-xs font-semibold border border-[#2A9D8F]/30 ${className}`}>
        <CheckCircle className="w-3.5 h-3.5 text-[#2A9D8F]" />
        <span>{lang === 'fr' ? 'APK Balaghi Installée' : 'تطبيق بلاغي مثبت'}</span>
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <button
        onClick={handleInstallClick}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 active:scale-95 bg-[#0D5C63] text-white hover:bg-[#004349] shadow-sm ${className}`}
      >
        <Download className="w-3.5 h-3.5" />
        <span>{lang === 'fr' ? 'Installer l\'APK' : 'تثبيت التطبيق'}</span>
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <>
        <button
          onClick={handleInstallClick}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition border border-[#0D5C63]/30 bg-white text-[#0D5C63] hover:bg-[#E6F6FF] active:scale-95 shadow-sm ${className}`}
        >
          <Smartphone className="w-4 h-4 text-[#E76F51]" />
          <span>{lang === 'fr' ? 'Télécharger l\'APK' : 'تحميل التطبيق APK'}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-base font-bold text-[#001F29]">
                  {lang === 'fr' ? 'Installer sur iPhone / iPad' : 'التثبيت على آيفون'}
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="py-4 space-y-3 text-xs sm:text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#E6F6FF] text-[#0D5C63] font-bold flex items-center justify-center shrink-0">1</span>
                  <p>{lang === 'fr' ? 'Appuyez sur le bouton Partager dans Safari' : 'اضغط على زر المشاركة في متصفح سفاري'}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#E6F6FF] text-[#0D5C63] font-bold flex items-center justify-center shrink-0">2</span>
                  <p>{lang === 'fr' ? 'Faites défiler et sélectionnez "Sur l\'écran d\'accueil"' : 'اختر "إضافة إلى الشاشة الرئيسية"'}</p>
                </div>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 rounded-xl bg-[#0D5C63] text-white font-bold text-sm"
              >
                {lang === 'fr' ? 'Compris' : 'حسناً'}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleInstallClick}
        className={`w-full min-h-[56px] flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-[#0D5C63] text-white font-bold text-base hover:bg-[#004349] active:scale-[0.98] transition-all shadow-md shadow-[#0D5C63]/25 ${className}`}
      >
        <Smartphone className="w-5 h-5 text-[#8CF5E4]" />
        <span>
          {lang === 'fr'
            ? 'Installer l\'Application Balaghi (APK / Mobile)'
            : 'تثبيت تطبيق بلاغي على هاتفك (APK)'}
        </span>
        <Download className="w-4 h-4 ml-auto opacity-80" />
      </button>

      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-[#001F29]">
                {lang === 'fr' ? 'Installer sur votre appareil' : 'التثبيت على الهاتف'}
              </h3>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-4 space-y-3 text-xs sm:text-sm text-gray-700">
              <p>
                {lang === 'fr'
                  ? 'Pour installer Balaghi sans passer par le store, ajoutez-la à votre écran d\'accueil :'
                  : 'لتثبيت بلاغي مباشرة بدون متجر التطبيقات:'}
              </p>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#E6F6FF] text-[#0D5C63] font-bold flex items-center justify-center shrink-0">1</span>
                <p>{lang === 'fr' ? 'Menu du navigateur ou bouton Partager' : 'افتح قائمة المتصفح'}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#E6F6FF] text-[#0D5C63] font-bold flex items-center justify-center shrink-0">2</span>
                <p>{lang === 'fr' ? 'Sélectionnez "Installer l\'application" ou "Ajouter à l\'écran d\'accueil"' : 'اختر تثبيت التطبيق أو إضافة للشاشة الرئيسية'}</p>
              </div>
            </div>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 rounded-xl bg-[#0D5C63] text-white font-bold text-sm"
            >
              {lang === 'fr' ? 'Compris' : 'حسناً'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
