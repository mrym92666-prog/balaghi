import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  ThumbsUp, 
  Clock, 
  CheckCircle2, 
  Flame, 
  Filter, 
  Plus, 
  Volume2, 
  Sparkles 
} from 'lucide-react';
import { IncidentCategory, IncidentReport, Language, ReportStatus, ScreenType } from '../types';
import { AudioSpeakerButton } from './AudioSpeakerButton';

interface ScreenExploreProps {
  lang: Language;
  reports: IncidentReport[];
  onNavigate: (screen: ScreenType) => void;
  onUpvote: (reportId: string) => void;
}

export const ScreenExplore: React.FC<ScreenExploreProps> = ({
  lang,
  reports,
  onNavigate,
  onUpvote,
}) => {
  const isFr = lang === 'fr';
  const [activeFilter, setActiveFilter] = useState<'all' | ReportStatus>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');

  const filteredReports = reports.filter((r) => {
    if (activeFilter !== 'all' && r.status !== activeFilter) return false;
    if (selectedCity !== 'all' && r.city !== selectedCity) return false;
    return true;
  });

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-5 pb-8 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate('welcome')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#0D5C63] bg-[#E6F6FF] hover:bg-[#D8F2FF] transition active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isFr ? 'Accueil' : 'رجوع'}</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('report_flow')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-[#0D5C63] hover:bg-[#004349] transition active:scale-95 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{isFr ? 'Nouveau' : 'بلاغ جديد'}</span>
        </button>
      </div>

      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-[#001F29] tracking-tight">
          {isFr ? 'Signalements Citoyens' : 'تتبع بلاغات المدينة'}
        </h2>
        <p className="text-xs text-[#3F484A]">
          {isFr
            ? 'Consultez les interventions en cours et soutenez les signalements de votre quartier.'
            : 'اطلع على الأشغال الجارية واضغط على "أنا أيضاً" لتسريع التدخل.'}
        </p>
      </div>

      {/* Filter Chips matching design system */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition ${
            activeFilter === 'all'
              ? 'bg-[#001F29] text-white'
              : 'bg-white border border-[#E1E8E6] text-[#3F484A]'
          }`}
        >
          {isFr ? 'Tous' : 'الكل'} ({reports.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('en_cours')}
          className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition ${
            activeFilter === 'en_cours'
              ? 'bg-[#E76F51] text-white shadow-sm'
              : 'bg-white border border-[#E1E8E6] text-[#A33D23]'
          }`}
        >
          {isFr ? 'En cours / قيد المعالجة' : 'قيد المعالجة'}
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('resolu')}
          className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition ${
            activeFilter === 'resolu'
              ? 'bg-[#2A9D8F] text-white shadow-sm'
              : 'bg-white border border-[#E1E8E6] text-[#00443D]'
          }`}
        >
          {isFr ? 'Résolu / تم الإصلاح' : 'تم الإصلاح'}
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('nouveau')}
          className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition ${
            activeFilter === 'nouveau'
              ? 'bg-[#0D5C63] text-white shadow-sm'
              : 'bg-white border border-[#E1E8E6] text-[#004349]'
          }`}
        >
          {isFr ? 'Nouveau / حديث' : 'حديث'}
        </button>
      </div>

      {/* Reports List */}
      <div className="space-y-3.5">
        {filteredReports.map((report) => {
          const isResolved = report.status === 'resolu';
          const isInProgress = report.status === 'en_cours';

          return (
            <div
              key={report.id}
              className="p-4 rounded-3xl bg-white border border-[#E1E8E6] shadow-sm hover:shadow-md transition space-y-3"
            >
              {/* Top Card Bar: Status Badge + Ticket */}
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    isResolved
                      ? 'bg-[#E6FBF7] text-[#00443D] border border-[#2A9D8F]/30'
                      : isInProgress
                      ? 'bg-[#FFF0ED] text-[#A33D23] border border-[#E76F51]/30'
                      : 'bg-[#E6F6FF] text-[#004349] border border-[#0D5C63]/30'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isResolved
                        ? 'bg-[#2A9D8F]'
                        : isInProgress
                        ? 'bg-[#E76F51] animate-pulse'
                        : 'bg-[#0D5C63]'
                    }`}
                  />
                  <span>
                    {isResolved
                      ? isFr ? 'Résolu' : 'تم الإصلاح'
                      : isInProgress
                      ? isFr ? 'En cours' : 'قيد المعالجة'
                      : isFr ? 'Reçu' : 'تم التوصل'}
                  </span>
                </span>

                <span className="text-[11px] font-mono text-[#3F484A]">
                  {report.ticketNumber}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm text-[#001F29] leading-snug">
                  {isFr ? report.titleFr : report.titleAr}
                </h3>
                <p className="text-xs text-[#3F484A] leading-relaxed line-clamp-2">
                  {isFr ? report.descriptionFr : report.descriptionAr}
                </p>
              </div>

              {/* Photos: Normal photo or Before/After Split for Resolved */}
              {isResolved && report.resolvedImageUrl ? (
                <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 p-1.5">
                  <div className="relative h-28 rounded-xl overflow-hidden">
                    <img
                      src={report.imageUrl}
                      alt="Avant"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {isFr ? 'Avant' : 'قبل'}
                    </span>
                  </div>
                  <div className="relative h-28 rounded-xl overflow-hidden">
                    <img
                      src={report.resolvedImageUrl}
                      alt="Après"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 left-1 bg-[#2A9D8F] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {isFr ? 'Après' : 'بعد'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative h-36 rounded-2xl overflow-hidden">
                  <img
                    src={report.imageUrl}
                    alt="Constat"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Meta & Civic Action Footer */}
              <div className="flex items-center justify-between pt-1 text-xs border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-[#3F484A] text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-[#E76F51]" />
                  <span>{report.city} • {report.neighborhood}</span>
                </div>

                {/* Community Endorsement Button ("Moi aussi / أنا أيضاً") in Civic Purple #6C5CE7 */}
                <button
                  type="button"
                  onClick={() => onUpvote(report.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${
                    report.hasUpvoted
                      ? 'bg-[#6C5CE7] text-white shadow-sm'
                      : 'bg-[#6C5CE7]/10 text-[#6C5CE7] hover:bg-[#6C5CE7]/20'
                  }`}
                  title="Confirmer que ce problème vous concerne également"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{isFr ? 'Moi aussi' : 'أنا أيضاً'}</span>
                  <span className="bg-white/30 px-1.5 py-0.2 rounded-full text-[10px]">
                    +{report.upvotes}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
