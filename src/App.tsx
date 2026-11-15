import { useState, useEffect } from 'react';
import {
  INITIAL_SITE_CONFIG,
  INITIAL_HERO_SLIDES,
  INITIAL_FESTIVALS,
  INITIAL_JURY_MEMBERS,
  INITIAL_VENUES,
  INITIAL_TESTIMONIALS,
  INITIAL_APPLICATIONS,
} from './data/florenceData';
import type { Festival, JuryMember, ChoirApplication } from './types/festival';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { FestivalsSection } from './components/FestivalsSection';
import { DifferenceSection } from './components/DifferenceSection';
import { ImpactStatsSection } from './components/ImpactStatsSection';
import { VenuesAndCommittee } from './components/VenuesAndCommittee';
import { ApplicationModal } from './components/ApplicationModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { InteractiveProposal } from './components/InteractiveProposal';

const STORAGE_KEYS = {
  festivals: 'florence_choral_festivals_v1',
  jury: 'florence_choral_jury_v1',
  applications: 'florence_choral_applications_v1',
};

type AppView = 'proposal' | 'contract' | 'public' | 'admin';

function getInitialView(): AppView {
  if (typeof window === 'undefined') return 'proposal';
  const params = new URLSearchParams(window.location.search);
  const viewParam = params.get('view')?.toLowerCase();
  const path = window.location.pathname.toLowerCase();

  if (viewParam === 'contract' || path.includes('/contract')) return 'contract';
  if (viewParam === 'public' || viewParam === 'prototype' || path.includes('/prototype') || path.includes('/website')) {
    return 'public';
  }
  if (viewParam === 'admin' || viewParam === 'dashboard' || path.includes('/admin') || path.includes('/dashboard')) {
    return 'admin';
  }
  if (viewParam === 'proposal' || path.includes('/proposal')) return 'proposal';
  return 'proposal';
}

export function App() {
  const [activeView, setActiveView] = useState<AppView>(getInitialView);

  const handleSwitchView = (nextView: AppView) => {
    setActiveView(nextView);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('view', nextView);
      window.history.replaceState({}, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const [festivals, setFestivals] = useState<Festival[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.festivals);
      return saved ? JSON.parse(saved) : INITIAL_FESTIVALS;
    } catch {
      return INITIAL_FESTIVALS;
    }
  });

  const [juryMembers, setJuryMembers] = useState<JuryMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.jury);
      return saved ? JSON.parse(saved) : INITIAL_JURY_MEMBERS;
    } catch {
      return INITIAL_JURY_MEMBERS;
    }
  });

  const [applications, setApplications] = useState<ChoirApplication[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.applications);
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [appModalFestivalId, setAppModalFestivalId] = useState<string | undefined>(undefined);
  const [appModalRequestType, setAppModalRequestType] = useState<
    'Full Application' | 'Brochure Request'
  >('Brochure Request');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.festivals, JSON.stringify(festivals));
    } catch {
      // ignore storage quota errors
    }
  }, [festivals]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.jury, JSON.stringify(juryMembers));
    } catch {
      // ignore
    }
  }, [juryMembers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.applications, JSON.stringify(applications));
    } catch {
      // ignore
    }
  }, [applications]);

  const handleOpenApplication = (
    festivalId?: string,
    requestType: 'Full Application' | 'Brochure Request' = 'Brochure Request'
  ) => {
    setAppModalFestivalId(festivalId);
    setAppModalRequestType(requestType);
    setAppModalOpen(true);
  };

  const handleHeroCta = (targetSection: string) => {
    if (targetSection === 'apply') {
      handleOpenApplication(undefined, 'Brochure Request');
      return;
    }
    document.getElementById(targetSection)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmitApplication = (
    newApp: Omit<ChoirApplication, 'id' | 'submittedAt' | 'status'>
  ) => {
    const created: ChoirApplication = {
      ...newApp,
      id: `app-${Date.now()}`,
      submittedAt: new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'New',
    };
    setApplications((prev) => [created, ...prev]);
  };

  const handleUpdateFestival = (updated: Festival) => {
    setFestivals((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
  };

  const handleAddJuryMember = (member: Omit<JuryMember, 'id'>) => {
    setJuryMembers((prev) => [...prev, { ...member, id: `jury-${Date.now()}` }]);
  };

  const handleUpdateApplicationStatus = (
    id: string,
    status: ChoirApplication['status']
  ) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const handleResetDemoData = () => {
    setFestivals(INITIAL_FESTIVALS);
    setJuryMembers(INITIAL_JURY_MEMBERS);
    setApplications(INITIAL_APPLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.festivals);
    localStorage.removeItem(STORAGE_KEYS.jury);
    localStorage.removeItem(STORAGE_KEYS.applications);
  };

  if (activeView === 'proposal' || activeView === 'contract') {
    return (
      <InteractiveProposal
        mode={activeView === 'contract' ? 'contract-only' : 'full-proposal'}
        onOpenPrototype={() => handleSwitchView('public')}
        onOpenDashboard={() => handleSwitchView('admin')}
        onSwitchMode={(mode) =>
          handleSwitchView(mode === 'contract-only' ? 'contract' : 'proposal')
        }
      />
    );
  }

  return (
    <div id="top" className="min-h-screen flex flex-col">
      <Header
        config={INITIAL_SITE_CONFIG}
        festivals={festivals}
        activeView={activeView}
        onSwitchView={(v) => handleSwitchView(v)}
        onSelectFestival={(fest) => {
          handleSwitchView('public');
          setSelectedFestival(fest);
        }}
        onOpenApplication={handleOpenApplication}
      />

      {activeView === 'admin' ? (
        <main className="flex-1">
          <AdminDashboard
            config={INITIAL_SITE_CONFIG}
            festivals={festivals}
            juryMembers={juryMembers}
            applications={applications}
            onUpdateFestival={handleUpdateFestival}
            onAddJuryMember={handleAddJuryMember}
            onUpdateApplicationStatus={handleUpdateApplicationStatus}
            onResetDemoData={handleResetDemoData}
            onSwitchToPublic={() => handleSwitchView('public')}
          />
        </main>
      ) : (
        <main className="flex-1">
          <HeroCarousel slides={INITIAL_HERO_SLIDES} onCtaClick={handleHeroCta} />

          <FestivalsSection
            festivals={festivals}
            selectedFestival={selectedFestival}
            onSelectFestival={setSelectedFestival}
            onOpenApplication={handleOpenApplication}
          />

          <DifferenceSection onOpenApplication={handleOpenApplication} />

          <ImpactStatsSection />

          <VenuesAndCommittee
            juryMembers={juryMembers}
            venues={INITIAL_VENUES}
            testimonials={INITIAL_TESTIMONIALS}
            onOpenApplication={handleOpenApplication}
          />
        </main>
      )}

      <Footer
        config={INITIAL_SITE_CONFIG}
        festivals={festivals}
        onSelectFestival={(fest) => {
          handleSwitchView('public');
          setSelectedFestival(fest);
        }}
        onOpenApplication={handleOpenApplication}
      />

      <ApplicationModal
        isOpen={appModalOpen}
        onClose={() => setAppModalOpen(false)}
        festivals={festivals}
        initialFestivalId={appModalFestivalId}
        initialRequestType={appModalRequestType}
        onSubmitApplication={handleSubmitApplication}
      />

      {/* Floating Proposal Presentation Dock so Dr. Sagliocca can switch back to the Proposal/Contract anytime */}
      <div
        className="no-print"
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 90,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          borderRadius: 999,
          background: 'rgba(13, 15, 20, 0.94)',
          border: '1px solid rgba(247, 146, 35, 0.45)',
          boxShadow: '0 18px 40px rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(12px)',
          fontFamily: "'Urbanist', sans-serif",
        }}
      >
        <img
          src="/proposal-assets/jezreel_logo_mark.png"
          alt="Jezreel Dave"
          style={{ width: 24, height: 24, borderRadius: 6, objectFit: 'contain' }}
        />
        <button
          type="button"
          onClick={() => handleSwitchView('proposal')}
          style={{
            background: '#F79223',
            color: '#07080B',
            border: 'none',
            borderRadius: 999,
            padding: '7px 14px',
            fontSize: 12,
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          ← Back to Proposal & Savings Breakdown
        </button>
        <button
          type="button"
          onClick={() => handleSwitchView('contract')}
          style={{
            background: 'rgba(255,255,255,0.08)',
            color: '#E5E5E3',
            border: '1px solid rgba(255,255,255,0.16)',
            borderRadius: 999,
            padding: '7px 12px',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Contract
        </button>
      </div>
    </div>
  );
}

export default App;
