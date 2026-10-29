/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenWelcome } from './components/ScreenWelcome';
import { ScreenLogin } from './components/ScreenLogin';
import { ScreenReportFlow } from './components/ScreenReportFlow';
import { ScreenExplore } from './components/ScreenExplore';
import { AndroidFrame } from './components/AndroidFrame';
import { ApkDownloadModal } from './components/ApkDownloadModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { Language, ScreenType, UserSession, IncidentReport } from './types';
import { INITIAL_REPORTS } from './data/mockData';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const [lang, setLang] = useState<Language>('fr');
  const [user, setUser] = useState<UserSession | null>(null);
  const [reports, setReports] = useState<IncidentReport[]>(INITIAL_REPORTS);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const [pendingOfflineReports, setPendingOfflineReports] = useState<IncidentReport[]>([]);

  const isOnline = useOnlineStatus();

  // Adjust document direction when Arabic Darija is selected
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const handleLoginSuccess = (session: UserSession) => {
    setUser(session);
  };

  const handleSubmitReport = (newReport: IncidentReport) => {
    if (!isOnline) {
      setPendingOfflineReports((prev) => [...prev, newReport]);
    }
    setReports((prev) => [newReport, ...prev]);
  };

  const handleUpvote = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          const hasUpvoted = !r.hasUpvoted;
          return {
            ...r,
            hasUpvoted,
            upvotes: hasUpvoted ? r.upvotes + 1 : r.upvotes - 1,
          };
        }
        return r;
      })
    );
  };

  return (
    <AndroidFrame
      lang={lang}
      onOpenApkModal={() => setIsApkModalOpen(true)}
      isOnline={isOnline}
    >
      {/* Screen 1: Balaghi - Bienvenue sur Balaghi — Initial Screen */}
      {currentScreen === 'welcome' && (
        <ScreenWelcome
          lang={lang}
          onSetLang={setLang}
          onNavigate={setCurrentScreen}
          onOpenApkModal={() => setIsApkModalOpen(true)}
        />
      )}

      {/* Screen 2: Balaghi - Connexion */}
      {currentScreen === 'login' && (
        <ScreenLogin
          lang={lang}
          onNavigate={setCurrentScreen}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Incident Reporting Flow */}
      {currentScreen === 'report_flow' && (
        <ScreenReportFlow
          lang={lang}
          user={user}
          onNavigate={setCurrentScreen}
          onSubmitReport={handleSubmitReport}
          isOnline={isOnline}
        />
      )}

      {/* Citizen Feed & Community Endorsements */}
      {currentScreen === 'explore' && (
        <ScreenExplore
          lang={lang}
          reports={reports}
          onNavigate={setCurrentScreen}
          onUpvote={handleUpvote}
        />
      )}

      {/* Persistent Offline Banner matching specification */}
      <OfflineIndicator
        isOnline={isOnline}
        lang={lang}
        pendingCount={pendingOfflineReports.length}
      />

      {/* Android APK Download & PWA Modal */}
      <ApkDownloadModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
        lang={lang}
      />
    </AndroidFrame>
  );
}
