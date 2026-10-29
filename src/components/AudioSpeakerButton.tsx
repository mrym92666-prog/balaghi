import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Language } from '../types';

interface AudioSpeakerButtonProps {
  text: string;
  lang: Language;
  label?: string;
  className?: string;
  iconOnly?: boolean;
}

export const AudioSpeakerButton: React.FC<AudioSpeakerButtonProps> = ({
  text,
  lang,
  label,
  className = '',
  iconOnly = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!('speechSynthesis' in window)) {
      alert(lang === 'fr' ? 'Synthèse vocale non supportée sur ce navigateur' : 'القارئ الصوتي غير مدعوم في هذا المتصفح');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel(); // Stop any previous speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ar' ? 'ar-MA' : 'fr-FR';
    utterance.rate = 0.95; // Slightly slower for clear municipal comprehension
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={handleSpeak}
        title={lang === 'fr' ? 'Écouter ce texte' : 'استمع لهذا النص'}
        className={`p-2 rounded-full transition-all duration-200 active:scale-95 flex items-center justify-center ${
          isPlaying
            ? 'bg-[#E76F51] text-white animate-pulse shadow-md shadow-[#E76F51]/30'
            : 'bg-[#E6F6FF] text-[#0D5C63] hover:bg-[#D8F2FF]'
        } ${className}`}
        aria-label={label || (lang === 'fr' ? 'Écouter' : 'استمع')}
      >
        {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleSpeak}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 border ${
        isPlaying
          ? 'bg-[#E76F51] border-[#E76F51] text-white animate-pulse shadow-md'
          : 'bg-[#F3FAFF] border-[#6F797A]/25 text-[#004349] hover:bg-[#E6F6FF]'
      } ${className}`}
      aria-label={label || (lang === 'fr' ? 'Écouter l\'instruction' : 'استمع للإرشادات')}
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-white" />
          <span>{lang === 'fr' ? 'Arrêter l\'audio' : 'إيقاف الصوت'}</span>
          <span className="flex items-center gap-0.5 ml-1">
            <span className="w-1 h-3 bg-white rounded-full animate-bounce" />
            <span className="w-1 h-4 bg-white rounded-full animate-bounce [animation-delay:0.15s]" />
            <span className="w-1 h-2 bg-white rounded-full animate-bounce [animation-delay:0.3s]" />
          </span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#0D5C63]" />
          <span>{label || (lang === 'fr' ? 'Écouter' : 'استمع')}</span>
        </>
      )}
    </button>
  );
};
