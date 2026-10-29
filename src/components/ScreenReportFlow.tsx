import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Camera, 
  MapPin, 
  Mic, 
  MicOff, 
  Check, 
  Send, 
  Sparkles, 
  Image as ImageIcon, 
  AlertCircle,
  Clock,
  Compass
} from 'lucide-react';
import { IncidentCategory, IncidentReport, Language, ScreenType, UserSession } from '../types';
import { CATEGORIES } from '../data/mockData';
import { AudioSpeakerButton } from './AudioSpeakerButton';

interface ScreenReportFlowProps {
  lang: Language;
  user: UserSession | null;
  onNavigate: (screen: ScreenType) => void;
  onSubmitReport: (report: IncidentReport) => void;
  isOnline: boolean;
}

export const ScreenReportFlow: React.FC<ScreenReportFlowProps> = ({
  lang,
  user,
  onNavigate,
  onSubmitReport,
  isOnline,
}) => {
  const isFr = lang === 'fr';

  // Step 1: Category
  const [selectedCategory, setSelectedCategory] = useState<IncidentCategory>('voirie');

  // Step 2: Photo
  const [photoSelected, setPhotoSelected] = useState<string | null>(
    'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=700&q=80'
  );

  // Step 3: Location
  const [city, setCity] = useState('Casablanca');
  const [neighborhood, setNeighborhood] = useState('Boulevard Zerktouni, Maârif');

  // Step 4: Voice note / Audio dictation
  const [isRecording, setIsRecording] = useState(false);
  const [hasVoiceNote, setHasVoiceNote] = useState(false);
  const [voiceDuration, setVoiceDuration] = useState('0:14');

  // Step 5: Description & Submission
  const [description, setDescription] = useState(
    'Nid-de-poule profond sur la chaussée provoquant des chocs violents pour les véhicules.'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdTicket, setCreatedTicket] = useState('');

  const currentCat = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  const handleToggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasVoiceNote(true);
    } else {
      setIsRecording(true);
      setHasVoiceNote(false);
      setTimeout(() => {
        setIsRecording(false);
        setHasVoiceNote(true);
      }, 3500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const ticket = `BLG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setCreatedTicket(ticket);

    const newReport: IncidentReport = {
      id: `rep-${Date.now()}`,
      ticketNumber: ticket,
      category: selectedCategory,
      titleFr: `Signalement ${currentCat.nameFr} à ${neighborhood}`,
      titleAr: `بلاغ ${currentCat.nameAr} في ${neighborhood}`,
      descriptionFr: description,
      descriptionAr: description,
      city,
      neighborhood,
      coordinates: { lat: 33.5898, lng: -7.6322 },
      status: 'nouveau',
      date: "À l'instant",
      upvotes: 1,
      hasUpvoted: true,
      hasAudioNote: hasVoiceNote,
      audioDuration: hasVoiceNote ? voiceDuration : undefined,
      imageUrl: photoSelected || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=700&q=80',
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSubmitReport(newReport);
    }, 800);
  };

  if (isSubmitted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-5 animate-in zoom-in-95 duration-200">
        <div className="w-20 h-20 rounded-full bg-[#E6FBF7] text-[#2A9D8F] flex items-center justify-center border-4 border-[#8CF5E4] shadow-lg">
          <Check className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#0D5C63] bg-[#CCEDFE] px-3 py-1 rounded-full">
            {createdTicket}
          </span>
          <h2 className="text-2xl font-extrabold text-[#001F29]">
            {isFr ? 'Signalement Transmis aux Services Municipaux !' : 'تم إرسال بلاغكم بنجاح إلى مصالح الجماعة !'}
          </h2>
          <p className="text-xs sm:text-sm text-[#3F484A] max-w-sm mx-auto leading-relaxed">
            {isFr
              ? 'Votre dossier a été enregistré et assigné à l\'équipe d\'intervention de voirie et salubrité locale.'
              : 'تم تسجيل ملفكم وتوجيهه لفرقة التدخل الميداني، وسيصلكم إشعار عند بدء الأشغال.'}
          </p>
        </div>

        {/* Status Chip matching spec */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0D5C63] text-white text-xs font-bold shadow">
          <span className="w-2 h-2 rounded-full bg-[#8CF5E4] animate-pulse" />
          <span>{isFr ? 'Statut : Reçu & Enregistré' : 'الحالة: تم التوصل بالطلب'}</span>
        </div>

        <div className="w-full space-y-2.5 pt-4">
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="w-full min-h-[56px] rounded-2xl bg-[#0D5C63] text-white font-extrabold text-sm shadow hover:bg-[#004349] transition active:scale-98"
          >
            {isFr ? 'Suivre mon signalement sur la carte' : 'تتبع البلاغ على الخريطة الحية'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              onNavigate('welcome');
            }}
            className="w-full py-3 text-xs font-bold text-[#3F484A] hover:text-[#001F29]"
          >
            {isFr ? 'Retourner à l\'écran d\'accueil' : 'الرجوع إلى الصفحة الرئيسية'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-5 pb-8 space-y-5">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate('welcome')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#0D5C63] bg-[#E6F6FF] hover:bg-[#D8F2FF] transition active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isFr ? 'Accueil' : 'رجوع'}</span>
        </button>

        <span className="text-xs font-bold text-[#0D5C63] bg-[#CCEDFE] px-2.5 py-1 rounded-full">
          {user?.fullName ? `👤 ${user.fullName}` : isFr ? 'Mode Citoyen Libre' : 'مواطن'}
        </span>
      </div>

      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-[#001F29] tracking-tight">
          {isFr ? 'Nouveau Signalement' : 'بلاغ جديد'}
        </h2>
        <p className="text-xs text-[#3F484A]">
          {isFr
            ? 'Complétez les 5 étapes simples : Catégorie, Photo, Lieu, Audio et Envoi.'
            : 'أكمل الخطوات الخمس: الصنف، الصورة، الموقع، الملاحظة الصوتية والإرسال.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Step 1: Incident Category Picker */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black uppercase tracking-wider text-[#0D5C63] flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#0D5C63] text-white flex items-center justify-center text-[10px]">1</span>
              <span>{isFr ? 'Choisir la catégorie' : 'اختر نوع المشكل'}</span>
            </label>
            <AudioSpeakerButton
              text={isFr ? currentCat.audioFr : currentCat.audioAr}
              lang={lang}
              iconOnly={true}
              className="w-7 h-7 p-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  role="button"
                  tabIndex={0}
                  className={`min-h-[100px] p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between relative active:scale-98 ${
                    isSelected
                      ? 'border-[#0D5C63] bg-[#E6F6FF] shadow-sm'
                      : 'border-[#E1E8E6] bg-white hover:border-[#0D5C63]/40'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-2xl">
                      {cat.id === 'voirie' ? '🛣️' : cat.id === 'eclairage' ? '💡' : cat.id === 'dechets' ? '🗑️' : '💧'}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#0D5C63] text-white flex items-center justify-center text-xs">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-[#001F29] leading-tight">
                      {isFr ? cat.nameFr : cat.nameAr}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: One-Tap Photo Trigger */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-[#0D5C63] flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-[#0D5C63] text-white flex items-center justify-center text-[10px]">2</span>
            <span>{isFr ? 'Photo du constat' : 'صورة المشكل'}</span>
          </label>

          <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-[#0D5C63]/30 bg-[#F8FAF9] p-2">
            {photoSelected ? (
              <div className="relative h-40 w-full rounded-xl overflow-hidden group">
                <img
                  src={photoSelected}
                  alt="Incident"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-90 transition">
                  <button
                    type="button"
                    onClick={() => setPhotoSelected(null)}
                    className="px-3 py-1.5 rounded-lg bg-white/90 text-xs font-bold text-[#BA1A1A] hover:bg-white"
                  >
                    {isFr ? 'Changer' : 'تغيير'}
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setPhotoSelected('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=700&q=80')}
                className="h-32 flex flex-col items-center justify-center gap-2 text-center cursor-pointer hover:bg-[#E6F6FF]/50 transition rounded-xl"
              >
                <div className="w-12 h-12 rounded-full bg-[#CCEDFE] text-[#0D5C63] flex items-center justify-center shadow-sm">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#0D5C63]">
                  {isFr ? 'Prendre une photo en 1 clic' : 'التقاط صورة بنقرة واحدة'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Step 3: Geolocation Map Pinning */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-[#0D5C63] flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-[#0D5C63] text-white flex items-center justify-center text-[10px]">3</span>
            <span>{isFr ? 'Localisation & Ville' : 'الموقع والمدينة'}</span>
          </label>

          <div className="p-3.5 rounded-2xl bg-white border border-[#E1E8E6] space-y-2.5">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#E76F51] shrink-0" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="font-bold text-xs bg-transparent border-b border-gray-200 pb-1 text-[#001F29] outline-none"
              >
                <option value="Casablanca">Casablanca / الدار البيضاء</option>
                <option value="Rabat">Rabat / الرباط</option>
                <option value="Marrakech">Marrakech / مراكش</option>
                <option value="Tanger">Tanger / طنجة</option>
                <option value="Fès">Fès / فاس</option>
                <option value="Agadir">Agadir / أكادير</option>
              </select>
            </div>
            <input
              type="text"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              placeholder={isFr ? 'Adresse ou repère' : 'العنوان أو المعلمة'}
              className="w-full text-xs p-2 rounded-lg bg-[#F8FAF9] border border-gray-200 outline-none"
            />
          </div>
        </div>

        {/* Step 4: Audio Note / Dictation (Microphone Button with Pulse Animation) */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-[#0D5C63] flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-[#0D5C63] text-white flex items-center justify-center text-[10px]">4</span>
            <span>{isFr ? 'Note vocale (Darija / Français)' : 'تسجيل صوتي بالدارجة'}</span>
          </label>

          <div className="p-4 rounded-2xl bg-white border border-[#E1E8E6] flex items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-bold text-[#001F29]">
                {hasVoiceNote
                  ? isFr ? 'Note vocale enregistrée' : 'تم تسجيل الملاحظة الصوتية'
                  : isRecording
                  ? isFr ? 'Enregistrement en cours...' : 'جاري التسجيل...'
                  : isFr ? 'Appuyez pour parler' : 'اضغط للتحدث بالصوت'}
              </p>
              <p className="text-[11px] text-[#3F484A]">
                {hasVoiceNote
                  ? `${voiceDuration} • ${isFr ? 'Prêt à être envoyé' : 'جاهز للإرسال'}`
                  : isFr ? 'Facilite l\'analyse sans devoir taper' : 'يسهل الشرح لفرق التدخل'}
              </p>
            </div>

            {/* 64px circular microphone button matching design spec */}
            <button
              type="button"
              onClick={handleToggleRecord}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                isRecording
                  ? 'bg-[#BA1A1A] text-white animate-pulse scale-110 shadow-[#BA1A1A]/40'
                  : hasVoiceNote
                  ? 'bg-[#2A9D8F] text-white hover:bg-[#00443D]'
                  : 'bg-[#0D5C63] text-white hover:bg-[#004349]'
              }`}
              title={isFr ? 'Enregistrer note vocale' : 'تسجيل صوتي'}
            >
              {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Step 5: High-Contrast Submission CTA (56px touch target) */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full min-h-[56px] flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#0D5C63] text-white font-extrabold text-base shadow-lg shadow-[#0D5C63]/25 hover:bg-[#004349] active:scale-[0.98] transition-all"
          >
            {isSubmitting ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5 text-[#8CF5E4]" />
                <span>
                  {isFr ? 'Transmettre le signalement à la commune' : 'إرسال البلاغ إلى الجماعة'}
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
