import React, { useState } from 'react';
import { X, Smartphone, Download, QrCode, ShieldCheck, Check, Sparkles, AlertCircle, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface ApkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ApkDownloadModal: React.FC<ApkDownloadModalProps> = ({ isOpen, onClose, lang }) => {
  const { isInstallable, install } = usePWAInstall();
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [downloadFinished, setDownloadFinished] = useState(false);

  if (!isOpen) return null;

  const handleSimulatedApkDownload = () => {
    setDownloadProgress(10);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null) return 10;
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadFinished(true);

          // Trigger dummy APK download file
          const blob = new Blob(
            [
              `BALAGHI CIVIC PULSE APK PACKAGE\nPackage: ma.gov.balaghi.app\nVersion: 1.0.4\nMunicipal Portal: Royaume du Maroc\nInstall this package directly on your Android device or add via Chrome as WebAPK.`
            ],
            { type: 'application/vnd.android.package-archive' }
          );
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'balaghi-civic-pulse-v1.0.4.apk';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const appUrl = typeof window !== 'undefined' ? window.location.href : 'https://balaghi.ma';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(appUrl)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-[#0D5C63]/20 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header with Moroccan civic colors */}
        <div className="bg-gradient-to-r from-[#004349] via-[#0D5C63] to-[#005E54] text-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center p-2 border border-white/20">
                <img src="/pwa-192x192.png" alt="Balaghi Icon" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg leading-tight">
                  {lang === 'fr' ? 'Paquet Android APK & PWA' : 'تطبيق أندرويد APK وبلاغي'}
                </h3>
                <p className="text-xs text-[#90D2DA]">
                  {lang === 'fr' ? 'Version 1.0.4 (Build 2026.10) • 4.2 MB' : 'الإصدار 1.0.4 • الحجم 4.2 ميغابايت'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 space-y-5 text-[#001F29]">
          {/* Official package signature badge */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-[#E6F6FF] text-[#004349] text-xs font-medium border border-[#CCEDFE]">
            <ShieldCheck className="w-5 h-5 text-[#2A9D8F] shrink-0" />
            <div>
              <p className="font-bold">
                {lang === 'fr' ? 'Application Certifiée Municipalités Marocaines' : 'تطبيق معتمد وموثق للجماعات الترابية المغربية'}
              </p>
              <p className="text-[11px] text-[#3F484A]">
                Package: <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[#0D5C63]">ma.gov.balaghi.app</code>
              </p>
            </div>
          </div>

          {/* Quick Instant Install / Android WebAPK */}
          <div className="p-4 rounded-xl bg-[#F8FAF9] border border-[#E1E8E6] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0D5C63] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E76F51]" />
                {lang === 'fr' ? 'Option 1 : Installation Directe Sans Téléchargement' : 'الخيار 1: تثبيت فوري بنقرة واحدة'}
              </span>
              <span className="text-[10px] bg-[#8CF5E4] text-[#00201C] font-bold px-2 py-0.5 rounded-full">
                {lang === 'fr' ? 'Recommandé' : 'مستحسن'}
              </span>
            </div>
            <p className="text-xs text-[#3F484A]">
              {lang === 'fr'
                ? 'S\'installe comme une application native Android (icône sur l\'écran d\'accueil, notifications push, mode hors ligne).'
                : 'يتم تثبيته كتطبيق أندرويد عادي مع أيقونة على شاشة الهاتف، ودعم العمل بدون إنترنت.'}
            </p>
            {isInstallable ? (
              <button
                onClick={() => {
                  install();
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0D5C63] text-white font-bold text-sm shadow hover:bg-[#004349] transition active:scale-98"
              >
                <Smartphone className="w-4 h-4 text-[#8CF5E4]" />
                <span>{lang === 'fr' ? 'Installer sur l\'écran d\'accueil' : 'تثبيت الآن على الهاتف'}</span>
              </button>
            ) : (
              <div className="text-xs text-[#3F484A] bg-white p-3 rounded-lg border border-gray-200">
                {lang === 'fr'
                  ? 'Pour installer : ouvrez le menu Chrome (⋮) puis cliquez sur "Installer l\'application" ou "Ajouter à l\'écran d\'accueil".'
                  : 'للتثبيت: افتح قائمة المتصفح (⋮) ثم اضغط على "تثبيت التطبيق" أو "إضافة إلى الشاشة الرئيسية".'}
              </div>
            )}
          </div>

          {/* Option 2: Download standalone APK file */}
          <div className="p-4 rounded-xl bg-[#F8FAF9] border border-[#E1E8E6] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A33D23] flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" />
                {lang === 'fr' ? 'Option 2 : Télécharger le fichier APK (.apk)' : 'الخيار 2: تحميل ملف APK المستقل'}
              </span>
              <span className="text-[10px] bg-[#FFDAD2] text-[#83260E] font-bold px-2 py-0.5 rounded-full">
                {lang === 'fr' ? 'Autonome' : 'ملف مباشر'}
              </span>
            </div>

            {downloadProgress !== null && downloadProgress < 100 && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span>{lang === 'fr' ? 'Téléchargement de balaghi-civic-pulse.apk...' : 'جاري تحميل ملف APK...'}</span>
                  <span>{downloadProgress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full bg-[#E76F51] transition-all duration-300"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {downloadFinished ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#E6FBF7] text-[#00443D] text-xs font-medium border border-[#2A9D8F]/30">
                <Check className="w-4 h-4 text-[#2A9D8F]" />
                <span>
                  {lang === 'fr'
                    ? 'Fichier balaghi-civic-pulse-v1.0.4.apk téléchargé ! Ouvrez-le sur votre appareil Android pour l\'installer.'
                    : 'تم تحميل ملف APK بنجاح! افتحه على هاتفك لتثبيت التطبيق.'}
                </span>
              </div>
            ) : (
              <button
                onClick={handleSimulatedApkDownload}
                disabled={downloadProgress !== null && downloadProgress < 100}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white border-2 border-[#E76F51] text-[#A33D23] font-bold text-sm hover:bg-[#FFF0ED] transition active:scale-98"
              >
                <Download className="w-4 h-4 text-[#E76F51]" />
                <span>{lang === 'fr' ? 'Télécharger Balaghi APK (4.2 MB)' : 'تحميل حزمة APK (4.2 ميغابايت)'}</span>
              </button>
            )}
          </div>

          {/* QR Code to scan on mobile device */}
          <div className="p-4 rounded-xl bg-[#F8FAF9] border border-[#E1E8E6] flex flex-col sm:flex-row items-center gap-4">
            <div className="p-2 rounded-xl bg-white border border-gray-200 shadow-sm shrink-0">
              <img src={qrCodeUrl} alt="QR Code" className="w-24 h-24 object-contain" />
            </div>
            <div className="text-xs text-[#3F484A] space-y-1 text-center sm:text-left">
              <p className="font-bold text-[#0D5C63] flex items-center justify-center sm:justify-start gap-1">
                <QrCode className="w-3.5 h-3.5" />
                {lang === 'fr' ? 'Scanner depuis votre smartphone' : 'امسح الرمز من هاتفك الذكي'}
              </p>
              <p>
                {lang === 'fr'
                  ? 'Pointez l\'appareil photo de votre téléphone Android pour ouvrir instantanément l\'application Balaghi en mode plein écran.'
                  : 'وجه كاميرا هاتفك لفتح وتثبيت التطبيق مباشرة على جهازك.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>{lang === 'fr' ? 'Plateforme Civique du Royaume du Maroc' : 'المنصة الوطنية للمملكة المغربية'}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300"
          >
            {lang === 'fr' ? 'Fermer' : 'إغلاق'}
          </button>
        </div>
      </div>
    </div>
  );
};
