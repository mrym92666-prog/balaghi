export type Language = 'fr' | 'ar';

export type ScreenType = 'welcome' | 'login' | 'report_flow' | 'explore';

export type IncidentCategory = 'voirie' | 'eclairage' | 'dechets' | 'eau';

export interface CategoryInfo {
  id: IncidentCategory;
  nameFr: string;
  nameAr: string;
  iconName: string;
  descFr: string;
  descAr: string;
  audioFr: string;
  audioAr: string;
  color: string;
  accent: string;
}

export type ReportStatus = 'nouveau' | 'en_cours' | 'resolu';

export interface IncidentReport {
  id: string;
  ticketNumber: string;
  category: IncidentCategory;
  titleFr: string;
  titleAr: string;
  descriptionFr: string;
  descriptionAr: string;
  city: string;
  neighborhood: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: ReportStatus;
  date: string;
  upvotes: number;
  hasUpvoted?: boolean;
  hasAudioNote: boolean;
  audioDuration?: string;
  imageUrl: string;
  resolvedImageUrl?: string;
}

export interface UserSession {
  isLoggedIn: boolean;
  phoneNumber?: string;
  cin?: string;
  fullName?: string;
  city?: string;
}
