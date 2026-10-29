import React from 'react';
import { 
  ArrowRight, 
  LogIn, 
  Camera, 
  Mic, 
  MapPin, 
  CheckCircle2, 
  Flame, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck,
  ChevronRight,
  Globe,
  AlertTriangle
} from 'lucide-react';
import { Language, ScreenType } from '../types';
import { AudioSpeakerButton } from './AudioSpeakerButton';
import { PWAInstallButton } from './PWAInstallButton';
import { CATEGORIES } from '../data/mockData';

interface ScreenWelcomeProps {
  lang: Language;
  onSetLang: (lang: Language) => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenApkModal: () => void;
}

export const ScreenWelcome: React.FC<ScreenWelcomeProps> = ({
  lang,
  onSetLang,
  onNavigate,
  onOpenApkModal,
}) => {
  const isFr = lang === 'fr';

  const welcomeAudioScript = isFr
    ? "Bienvenue sur Balaghi. L'application officielle citoyenne pour signaler facilement les problèmes dans votre commune : nids-de-poule, lampadaires en panne, déchets ou fuites d'eau. Vous pouvez vous connecter avec votre numéro de téléphone ou faire un signalement rapide sans compte."
    : "مرحباً بكم فـ بلاغي. التطبيق الرسمي للمواطن باش تبلغ بكل سهولة على مشاكل مدينتك: حفرة فالطريق، ضو طافي، أزبال متراكمة، ولا تسرب ديال الما. تقدر تدخل بنمرتك ولا دير بلاغ سريع بلا حساب.";

  return (
    <div className="flex-1 flex flex-col justify-between p-4 sm:p-5 pb-8 space-y-6">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between">
        {/* Moroccan Emblem & Civic Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#004349] to-[#0D5C63] flex items-center justify-center p-1.5 shadow-md shadow-[#0D5C63]/20 border border-[#8CF5E4]/30">
            <img src="/icon.svg" alt="Logo Balaghi" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0D5C63] bg-[#CCEDFE] px-2 py-0.5 rounded-full">
                {isFr ? 'Maroc • الجماعات الترابية' : 'المملكة المغربية'}
              </span>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-[#001F29] leading-tight">
              Balaghi <span className="text-[#0D5C63]">بلاغي</span>
            </h1>
          </div>
        </div>

        {/* Language Switcher & Audio Affordance */}
        <div className="flex items-center gap-2">
          <AudioSpeakerButton
            text={welcomeAudioScript}
            lang={lang}
            iconOnly={true}
          />
          <button
            type="button"
            onClick={() => onSetLang(isFr ? 'ar' : 'fr')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#E6F6FF] text-[#004349] border border-[#0D5C63]/20 hover:bg-[#D8F2FF] transition"
          >
            <Globe className="w-3.5 h-3.5 text-[#0D5C63]" />
            <span>{isFr ? 'الدارجة' : 'Français'}</span>
          </button>
        </div>
      </div>

      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0D5C63] to-[#004349] text-white p-6 shadow-xl shadow-[#0D5C63]/25 border border-white/10">
        {/* Background decorative Moroccan geometric arc pattern */}
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full border-4 border-white/10 opacity-30 pointer-events-none" />
        <div className="absolute -right-6 -bottom-10 w-36 h-36 rounded-full border-2 border-[#8CF5E4]/20 opacity-40 pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[#8CF5E4] text-xs font-bold border border-white/15">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isFr ? 'Plateforme Nationale Citoyenne' : 'المنصة الوطنية للمواطن'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
            {isFr ? 'Bienvenue sur Balaghi' : 'مرحباً بكم في بلاغي'}
          </h2>

          <p className="text-sm text-[#CCEDFE] leading-relaxed">
            {isFr
              ? 'Votre application citoyenne pour signaler, suivre et résoudre ensemble les désordres urbains de votre ville.'
              : 'تطبيقكم اليومي للتبليغ السريع ومتابعة إصلاح الحفر، الإنارة، النظافة وتسرب المياه بمدينتكم.'}
          </p>

          {/* Quick Audio Readout button right on hero */}
          <div className="pt-1">
            <AudioSpeakerButton
              text={welcomeAudioScript}
              lang={lang}
              label={isFr ? 'Écouter la présentation' : 'استمع للتقديم الصوتي'}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            />
          </div>
        </div>
      </div>

      {/* Live Civic Pulse Statistics */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-3 rounded-2xl bg-white border border-[#E1E8E6] shadow-sm">
          <div className="flex items-center justify-center text-[#2A9D8F] mb-1">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-base sm:text-lg font-black text-[#001F29]">14,280+</div>
          <div className="text-[10px] font-semibold text-[#3F484A]">
            {isFr ? 'Résolus' : 'تم إصلاحه'}
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white border border-[#E1E8E6] shadow-sm">
          <div className="flex items-center justify-center text-[#E76F51] mb-1">
            <Flame className="w-4 h-4" />
          </div>
          <div className="text-base sm:text-lg font-black text-[#001F29]">94%</div>
          <div className="text-[10px] font-semibold text-[#3F484A]">
            {isFr ? 'Taux d\'action' : 'نسبة المعالجة'}
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white border border-[#E1E8E6] shadow-sm">
          <div className="flex items-center justify-center text-[#0D5C63] mb-1">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="text-base sm:text-lg font-black text-[#001F29]">72</div>
          <div className="text-[10px] font-semibold text-[#3F484A]">
            {isFr ? 'Communes' : 'جماعة متصلة'}
          </div>
        </div>
      </div>

      {/* 4 Incident Domains Preview (Universal Category Affordance) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0D5C63]">
            {isFr ? '4 Domaines d\'action citoyenne' : 'المجالات الرئيسية للبلاغات'}
          </h3>
          <span className="text-[11px] text-[#3F484A]">
            {isFr ? 'Avec assistance vocale' : 'مع قارئ صوتي'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('report_flow')}
              role="button"
              tabIndex={0}
              className="p-3.5 rounded-2xl bg-white border border-[#E1E8E6] shadow-sm hover:border-[#0D5C63] hover:shadow-md transition cursor-pointer active:scale-98 flex flex-col justify-between relative group"
            >
              <div className="flex items-start justify-between">
                <span
                  className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white text-xs"
                  style={{ backgroundColor: cat.color }}
                >
                  {cat.id === 'voirie' ? '🛣️' : cat.id === 'eclairage' ? '💡' : cat.id === 'dechets' ? '🗑️' : '💧'}
                </span>
                <AudioSpeakerButton
                  text={isFr ? cat.audioFr : cat.audioAr}
                  lang={lang}
                  iconOnly={true}
                  className="w-7 h-7 p-1 text-xs"
                />
              </div>
              <div className="mt-2.5">
                <h4 className="font-bold text-xs text-[#001F29] leading-tight group-hover:text-[#0D5C63]">
                  {isFr ? cat.nameFr : cat.nameAr}
                </h4>
                <p className="text-[10px] text-[#3F484A] line-clamp-1 mt-0.5">
                  {isFr ? cat.descFr : cat.descAr}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Action CTAs */}
      <div className="space-y-3 pt-2">
        {/* Primary CTA Button: Se Connecter (56px touch target) -> Screen 2 */}
        <button
          type="button"
          onClick={() => onNavigate('login')}
          className="w-full min-h-[56px] flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#0D5C63] text-white font-extrabold text-base shadow-lg shadow-[#0D5C63]/25 hover:bg-[#004349] active:scale-[0.98] transition-all"
        >
          <LogIn className="w-5 h-5 text-[#8CF5E4]" />
          <span>{isFr ? 'Se connecter à mon compte' : 'تسجيل الدخول إلى حسابي'}</span>
          <ArrowRight className="w-5 h-5 ml-auto text-white/80" />
        </button>

        {/* Secondary CTA: Direct Anonymous Citizen Report (Quick flow) */}
        <button
          type="button"
          onClick={() => onNavigate('report_flow')}
          className="w-full min-h-[52px] flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white border-2 border-[#E76F51] text-[#A33D23] font-bold text-sm shadow-sm hover:bg-[#FFF0ED] active:scale-[0.98] transition-all"
        >
          <Camera className="w-4 h-4 text-[#E76F51]" />
          <span>{isFr ? 'Faire un signalement direct (Sans compte)' : 'بلاغ سريع ومباشر (بدون حساب)'}</span>
          <ChevronRight className="w-4 h-4 ml-auto text-[#E76F51]" />
        </button>

        {/* Explore Reports in town */}
        <button
          type="button"
          onClick={() => onNavigate('explore')}
          className="w-full py-2.5 text-center text-xs font-bold text-[#0D5C63] hover:underline"
        >
          {isFr ? '🔍 Explorer les signalements de mon quartier' : '🔍 تصفح بلاغات ومشاريع حيي'}
        </button>
      </div>

      {/* APK / PWA Install Bar & Municipal Footer */}
      <div className="pt-2 border-t border-[#CCEDFE]/50 space-y-2">
        <PWAInstallButton
          lang={lang}
          onOpenApkModal={onOpenApkModal}
          variant="compact"
          className="w-full justify-center"
        />

        <div className="flex items-center justify-between text-[11px] text-[#3F484A] px-1">
          <span className="flex items-center gap-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F]" />
            {isFr ? 'Numéro Vert Gratuit : 3003' : 'الرقم الأخضر المجاني: 3003'}
          </span>
          <span className="font-mono text-[10px] text-gray-400">APK v1.0.4</span>
        </div>
      </div>
    </div>
  );
};
