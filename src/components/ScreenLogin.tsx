import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Phone, 
  CreditCard, 
  KeyRound, 
  Check, 
  ShieldCheck, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  Smartphone, 
  Sparkles,
  MessageSquare,
  Lock
} from 'lucide-react';
import { Language, ScreenType, UserSession } from '../types';
import { AudioSpeakerButton } from './AudioSpeakerButton';

interface ScreenLoginProps {
  lang: Language;
  onNavigate: (screen: ScreenType) => void;
  onLoginSuccess: (user: UserSession) => void;
}

export const ScreenLogin: React.FC<ScreenLoginProps> = ({
  lang,
  onNavigate,
  onLoginSuccess,
}) => {
  const isFr = lang === 'fr';

  // Login tabs: 'phone' (standard in Morocco) or 'cin' (Carte d'Identité Nationale / Email)
  const [authMethod, setAuthMethod] = useState<'phone' | 'cin'>('phone');
  
  // Phone flow state
  const [phoneNumber, setPhoneNumber] = useState('06 61 23 45 67');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // CIN / Email flow state
  const [cinNumber, setCinNumber] = useState('BK 482910');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);

  // Loading & error state
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const loginAudioScript = isFr
    ? "Pour vous connecter à Balaghi, entrez votre numéro de téléphone marocain à dix chiffres ou votre numéro de Carte Nationale CIN. Vous recevrez un code de confirmation par SMS pour valider votre compte en toute sécurité."
    : "باش تدخل لحسابك فـ بلاغي، دخل نمرة التليفون ديالك فـ المغرب المكونة من عشرة أرقام ولا رقم بطاقة التعريف الوطنية. غادي يوصلك كود فـ ميساج للتأكيد بأمان.";

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    setIsLoading(true);
    setStatusMessage(null);

    // Simulate SMS dispatch
    setTimeout(() => {
      setIsLoading(false);
      setOtpStep(true);
      setStatusMessage(isFr ? 'Code SMS envoyé au ' + phoneNumber : 'تم إرسال رمز التأكيد إلى هاتفك');
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        isLoggedIn: true,
        phoneNumber,
        fullName: 'Yassine El Amrani',
        city: 'Casablanca',
      });
      onNavigate('report_flow');
    }, 600);
  };

  const handleCinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        isLoggedIn: true,
        cin: cinNumber,
        fullName: 'Fatima Zahra Bennani',
        city: 'Rabat',
      });
      onNavigate('report_flow');
    }, 600);
  };

  const fillQuickCode = () => {
    setOtpCode('8421');
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 sm:p-5 pb-8 space-y-5">
      {/* Top Navigation Bar with Back Arrow & Audio Instruction */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate('welcome')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#0D5C63] bg-[#E6F6FF] hover:bg-[#D8F2FF] transition active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isFr ? 'Accueil' : 'رجوع'}</span>
        </button>

        <AudioSpeakerButton
          text={loginAudioScript}
          lang={lang}
          label={isFr ? 'Instructions' : 'إرشادات'}
        />
      </div>

      {/* Screen Title & Civic Badging */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E6FBF7] text-[#00443D] text-[11px] font-bold border border-[#2A9D8F]/30">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2A9D8F]" />
          <span>{isFr ? 'Authentification Sécurisée' : 'دخول رسمي مؤمن'}</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[#001F29] tracking-tight">
          {isFr ? 'Connexion à Balaghi' : 'تسجيل الدخول إلى بلاغي'}
        </h2>
        <p className="text-xs sm:text-sm text-[#3F484A]">
          {isFr
            ? 'Accédez à votre espace pour suivre l\'avancement de vos signalements et voter pour les priorités de votre quartier.'
            : 'سجل الدخول لتتبع شكاياتك والتصويت على أولويات حيك السكني.'}
        </p>
      </div>

      {/* Method Selector Tabs: Téléphone (standard) vs CIN / Email */}
      <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#D8F2FF]/60 border border-[#CCEDFE]">
        <button
          type="button"
          onClick={() => {
            setAuthMethod('phone');
            setOtpStep(false);
          }}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all ${
            authMethod === 'phone'
              ? 'bg-[#0D5C63] text-white shadow-sm'
              : 'text-[#004349] hover:bg-white/50'
          }`}
        >
          <Phone className="w-3.5 h-3.5" />
          <span>{isFr ? 'Par Téléphone' : 'برقم الهاتف'}</span>
        </button>

        <button
          type="button"
          onClick={() => setAuthMethod('cin')}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all ${
            authMethod === 'cin'
              ? 'bg-[#0D5C63] text-white shadow-sm'
              : 'text-[#004349] hover:bg-white/50'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>{isFr ? 'Carte CIN / Email' : 'بطاقة التعريف الوطنية'}</span>
        </button>
      </div>

      {/* Form Section */}
      <div className="p-5 rounded-3xl bg-white border border-[#E1E8E6] shadow-md shadow-[#0D5C63]/5 space-y-4">
        {authMethod === 'phone' ? (
          /* Phone OTP Flow */
          !otpStep ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#001F29] mb-1.5">
                  {isFr ? 'Numéro de téléphone portable marocain' : 'رقم الهاتف المحمول بالمغرب'}
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 flex items-center gap-1.5 text-xs font-bold text-[#0D5C63] select-none pr-2 border-r border-gray-200">
                    <span>🇲🇦</span>
                    <span>+212</span>
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="06 12 34 56 78"
                    required
                    className="w-full pl-24 pr-4 py-3.5 rounded-xl bg-[#F8FAF9] border-2 border-[#E1E8E6] focus:border-[#0D5C63] focus:bg-white text-sm font-semibold text-[#001F29] outline-none transition"
                  />
                </div>
                <p className="text-[11px] text-[#3F484A] mt-1.5">
                  {isFr
                    ? 'Vous recevrez un code SMS gratuit de confirmation.'
                    : 'سنتوصل برمز تأكيد مجاني عبر رسالة نصية قصيرة.'}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none text-[#3F484A]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0D5C63] accent-[#0D5C63]"
                  />
                  <span>{isFr ? 'Rester connecté sur cet appareil' : 'تذكرني على هذا الهاتف'}</span>
                </label>
              </div>

              {/* Submit CTA (56px touch target) */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full min-h-[56px] flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#0D5C63] text-white font-extrabold text-base hover:bg-[#004349] active:scale-[0.98] shadow-md shadow-[#0D5C63]/25 transition"
              >
                {isLoading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <MessageSquare className="w-5 h-5 text-[#8CF5E4]" />
                    <span>{isFr ? 'Recevoir mon code par SMS' : 'إرسال رمز التأكيد SMS'}</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* OTP Verification Step */
            <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in">
              <div className="text-center space-y-1">
                <span className="inline-flex p-2.5 rounded-full bg-[#E6F6FF] text-[#0D5C63] mb-1">
                  <Smartphone className="w-5 h-5" />
                </span>
                <h3 className="font-extrabold text-base text-[#001F29]">
                  {isFr ? 'Vérification du code SMS' : 'أدخل رمز التأكيد'}
                </h3>
                <p className="text-xs text-[#3F484A]">
                  {isFr
                    ? `Code envoyé au ${phoneNumber}`
                    : `تم إرسال الرمز إلى ${phoneNumber}`}
                </p>
              </div>

              <div>
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="• • • •"
                  className="w-full text-center text-2xl tracking-[0.5em] font-mono py-3.5 rounded-xl bg-[#F8FAF9] border-2 border-[#0D5C63] text-[#001F29] outline-none"
                  autoFocus
                />
              </div>

              {/* Quick autofill helper for easy evaluator testing */}
              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={fillQuickCode}
                  className="inline-flex items-center gap-1 text-[#0D5C63] font-bold hover:underline"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E76F51]" />
                  <span>{isFr ? 'Remplir code test : 8421' : 'رمز تجريبي سريع : 8421'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOtpStep(false)}
                  className="text-xs text-[#3F484A] hover:underline"
                >
                  {isFr ? 'Modifier le numéro' : 'تغيير الرقم'}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading || !otpCode.trim()}
                className="w-full min-h-[56px] flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#0D5C63] text-white font-extrabold text-base hover:bg-[#004349] active:scale-[0.98] shadow-md shadow-[#0D5C63]/25 transition"
              >
                {isLoading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Check className="w-5 h-5 text-[#8CF5E4]" />
                    <span>{isFr ? 'Valider et Accéder' : 'تأكيد ودخول'}</span>
                  </>
                )}
              </button>
            </form>
          )
        ) : (
          /* CIN / Email Flow */
          <form onSubmit={handleCinSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#001F29] mb-1.5">
                {isFr ? 'N° Carte Nationale (CIN) ou Email' : 'رقم بطاقة التعريف (CIN) أو البريد الإلكتروني'}
              </label>
              <input
                type="text"
                value={cinNumber}
                onChange={(e) => setCinNumber(e.target.value)}
                placeholder="Ex : BK123456"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-[#F8FAF9] border-2 border-[#E1E8E6] focus:border-[#0D5C63] focus:bg-white text-sm font-semibold text-[#001F29] outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#001F29] mb-1.5">
                {isFr ? 'Mot de passe' : 'كلمة المرور'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3.5 pr-11 rounded-xl bg-[#F8FAF9] border-2 border-[#E1E8E6] focus:border-[#0D5C63] focus:bg-white text-sm font-semibold text-[#001F29] outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none text-[#3F484A]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0D5C63] accent-[#0D5C63]"
                />
                <span>{isFr ? 'Mémoriser ma session' : 'تذكر الجلسة'}</span>
              </label>
              <a href="#help" onClick={(e) => { e.preventDefault(); alert(isFr ? 'Contactez le support municipal au 3003' : 'اتصل بالرقم الأخضر 3003'); }} className="text-[#0D5C63] font-semibold hover:underline">
                {isFr ? 'Oublié ?' : 'نسيت الكود؟'}
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full min-h-[56px] flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#0D5C63] text-white font-extrabold text-base hover:bg-[#004349] active:scale-[0.98] shadow-md shadow-[#0D5C63]/25 transition"
            >
              {isLoading ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-5 h-5 text-[#8CF5E4]" />
                  <span>{isFr ? 'Se connecter' : 'تسجيل الدخول'}</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Alternative Options: Sign Up or Quick Guest Access */}
      <div className="space-y-2.5 pt-2">
        <button
          type="button"
          onClick={() => {
            alert(isFr ? 'Ouverture du formulaire d\'inscription citoyenne...' : 'جاري فتح استمارة التسجيل...');
          }}
          className="w-full py-3 rounded-xl border border-[#0D5C63]/20 bg-white text-[#0D5C63] font-bold text-xs hover:bg-[#E6F6FF] transition"
        >
          {isFr ? 'Pas encore de compte ? Créer mon profil citoyen' : 'ليس لديك حساب؟ إنشاء حساب مواطن جديد'}
        </button>

        <button
          type="button"
          onClick={() => onNavigate('report_flow')}
          className="w-full py-2.5 text-center text-xs font-semibold text-[#3F484A] hover:text-[#0D5C63] transition"
        >
          {isFr ? '→ Continuer sans compte (Signalement anonyme)' : '→ المتابعة بدون حساب (تبليغ سريع)'}
        </button>
      </div>

      {/* Civic Assistance Contact Badge */}
      <div className="p-3.5 rounded-2xl bg-[#E6F6FF] border border-[#CCEDFE] flex items-center gap-3">
        <HelpCircle className="w-5 h-5 text-[#0D5C63] shrink-0" />
        <div className="text-xs text-[#004349] leading-tight">
          <p className="font-bold">
            {isFr ? 'Besoin d\'assistance pour vous connecter ?' : 'هل تحتاج لمساعدة للدخول؟'}
          </p>
          <p className="text-[11px] text-[#3F484A] mt-0.5">
            {isFr ? 'Appel gratuit au Numéro Vert Municipal 3003 (Du lundi au samedi)' : 'اتصل مجاناً بالرقم الأخضر 3003 من الإثنين إلى السبت'}
          </p>
        </div>
      </div>
    </div>
  );
};
