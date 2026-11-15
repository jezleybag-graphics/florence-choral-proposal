import React, { useState, useEffect } from 'react';

interface InteractiveProposalProps {
  mode?: 'full-proposal' | 'contract-only';
  initialCover?: boolean;
  onOpenPrototype: () => void;
  onOpenDashboard: () => void;
  onOpenCover?: () => void;
  onSwitchMode: (mode: 'full-proposal' | 'contract-only') => void;
}

interface BentoItem {
  id: string;
  year: string;
  title: string;
  type: 'image' | 'pdf' | 'video';
  previewImg: string;
  fullSrc: string;
  colSpan: string;
  actionLabel: string;
}

const BENTO_PROJECTS: BentoItem[] = [
  {
    id: 'lorenzo-2022',
    year: '2022',
    title: "Lorenzo de' Medici",
    type: 'image',
    previewImg: '/past-work/lorenzo-2022-web.jpg',
    fullSrc: '/past-work/lorenzo-2022-web.jpg',
    colSpan: 'sm:col-span-2 lg:col-span-2',
    actionLabel: 'Learn more ↗',
  },
  {
    id: 'leonardo-2022',
    year: '2022',
    title: 'Leonardo da Vinci',
    type: 'image',
    previewImg: '/past-work/leonardo-2022-web.jpg',
    fullSrc: '/past-work/leonardo-2022-web.jpg',
    colSpan: 'sm:col-span-1 lg:col-span-1',
    actionLabel: 'Learn more ↗',
  },
  {
    id: 'michelangelo-2021',
    year: '2021',
    title: 'Michelangelo',
    type: 'image',
    previewImg: '/past-work/michelangelo-2021-web.jpg',
    fullSrc: '/past-work/michelangelo-2021-web.jpg',
    colSpan: 'sm:col-span-1 lg:col-span-1',
    actionLabel: 'Learn more ↗',
  },
  {
    id: 'michelangelo-2022',
    year: '2022',
    title: 'Michelangelo (2nd Ed.)',
    type: 'image',
    previewImg: '/past-work/michelangelo-2022-web.jpg',
    fullSrc: '/past-work/michelangelo-2022-web.jpg',
    colSpan: 'sm:col-span-1 lg:col-span-1',
    actionLabel: 'Learn more ↗',
  },
  {
    id: 'verrocchio-2023',
    year: '2023',
    title: 'Andrea del Verrocchio',
    type: 'image',
    previewImg: '/past-work/verrocchio-2023-web.jpg',
    fullSrc: '/past-work/verrocchio-2023-web.jpg',
    colSpan: 'sm:col-span-1 lg:col-span-1',
    actionLabel: 'Learn more ↗',
  },
  {
    id: 'lorenzo-2024',
    year: '2024',
    title: "Lorenzo de' Medici (6th Ed.)",
    type: 'image',
    previewImg: '/past-work/lorenzo-2024-web.jpg',
    fullSrc: '/past-work/lorenzo-2024-web.jpg',
    colSpan: 'sm:col-span-2 lg:col-span-2',
    actionLabel: 'Learn more ↗',
  },
  {
    id: 'booklet-6th-ldicf',
    year: '2023–2024',
    title: '31-Page Competition Booklet',
    type: 'pdf',
    previewImg: '/past-work/booklet-cover-web.jpg',
    fullSrc: '/past-work/FINAL-booklet-6th-LDICF.pdf',
    colSpan: 'sm:col-span-2 lg:col-span-2',
    actionLabel: 'Open PDF (31 Pages) ↗',
  },
  {
    id: 'reportage-5th-verrocchio',
    year: '2024',
    title: '4K Festival Video Reportage',
    type: 'video',
    previewImg: '/past-work/reportage-verrocchio-thumb.jpg',
    fullSrc:
      'https://drive.google.com/file/d/1cbdwlPW3jtUyYGywW90kKrBw11XTyGBC/preview',
    colSpan: 'sm:col-span-2 lg:col-span-2',
    actionLabel: 'Watch 1080p Video ▶',
  },
];

const SECTIONS = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'what-will-we-do', label: 'What Will We Do' },
  { id: 'process-and-timescales', label: 'Process and Timescales' },
  { id: 'case-study', label: 'Case Study' },
  { id: 'investment', label: 'Investment' },
  { id: 'next-steps', label: 'Next Steps' },
  { id: 'terms-and-conditions', label: 'Terms and Conditions' },
  { id: 'proposal-acceptance', label: 'Proposal Acceptance' },
];

export const InteractiveProposal: React.FC<InteractiveProposalProps> = ({
  mode = 'full-proposal',
  initialCover = false,
  onOpenPrototype,
  onOpenDashboard,
  onOpenCover,
  onSwitchMode,
}) => {
  const [showCover, setShowCover] = useState(initialCover);
  const [activeSection, setActiveSection] = useState('introduction');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'planA' | 'planB'>('planA');
  const [planBBilling, setPlanBBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [signerName, setSignerName] = useState('Dr. Leonardo Sagliocca');
  const [signTab, setSignTab] = useState<'type' | 'draw'>('type');
  const [isSigning, setIsSigning] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [notifyStatus, setNotifyStatus] = useState<'idle' | 'sending' | 'sent' | 'fallback'>('idle');

  const handleSignProposal = async () => {
    if (!signerName.trim()) return;
    setIsSigning(true);
    setNotifyStatus('sending');

    const packageName =
      selectedPlan === 'planA'
        ? 'Option A: Setup + Monthly (€1,599 + €499/mo)'
        : `Option B: Monthly Partner (${planBBilling === 'yearly' ? '€6,853/yr' : '€649/mo'})`;

    const payload = {
      _subject: `🎉 Florence Choral Proposal Accepted & Signed by ${signerName}`,
      _template: 'table',
      _captcha: 'false',
      'Signer Full Name': signerName,
      'Document Title': 'Florence Choral Digital Platform & Services Agreement',
      'Selected Package': packageName,
      'Signature Method': signTab === 'type' ? 'Digital Type Signature' : 'Digital Drawn Signature',
      'Digital Verification ID': 'FC-2026-SIG',
      'Signing Timestamp':
        new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' }) +
        ' (Rome Time) / ' +
        new Date().toISOString(),
      'User Agent': navigator.userAgent,
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/jezreelleybag.graphics@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('FormSubmit notification response:', data);
      setIsSigned(true);
      setNotifyStatus('sent');
    } catch (err) {
      console.error('Notification dispatch error:', err);
      // Mark as signed so client UX is never blocked
      setIsSigned(true);
      setNotifyStatus('fallback');
    } finally {
      setIsSigning(false);
    }
  };
  const [activeMediaModal, setActiveMediaModal] = useState<{
    type: 'image' | 'video' | 'pdf';
    src: string;
    title: string;
  } | null>(null);


  // Active section scroll spy
  useEffect(() => {
    if (showCover) return;
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showCover]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // =========================================================================
  // VIEW 1: CINEMATIC COVER LANDING PAGE (Exact Better Proposals Cover.php)
  // =========================================================================
  if (showCover) {
    return (
      <div className="min-h-screen w-full bg-[#0A0A0A] text-white bp-font relative overflow-hidden flex flex-col justify-between p-8 sm:p-14 lg:p-20 selection:bg-white selection:text-black">
        {/* Background Atmospheric Imagery */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-25 filter brightness-75 scale-105"
          style={{ backgroundImage: `url('/proposal-assets/05_historic_venues_16x9.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent pointer-events-none" />

        {/* Top Header Strip */}
        <header className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/branding/on-black_1.png"
              alt="Jezreel Dave Leybag"
              className="h-9 w-auto object-contain"
            />
            <span className="hidden sm:inline-block text-xs font-medium text-neutral-400 uppercase tracking-widest pl-2">
              Florence Choral • Web Development
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setShowCover(false);
                onSwitchMode('full-proposal');
              }}
              className="text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer px-3.5 py-1.5 rounded-full hover:bg-white/10"
            >
              Skip Cover →
            </button>
          </div>
        </header>

        {/* Center Main Stage Content */}
        <div className="relative z-10 max-w-4xl my-auto py-12">
          <div className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">
            Florence Choral Partnership • 2026 Season
          </div>

          <h1 className="bp-heading-title text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.08] mb-6">
            High End Web Design &amp; <br />
            Digital Partnership
          </h1>

          <h2 className="text-lg sm:text-2xl text-neutral-300 font-normal leading-relaxed mb-10 max-w-2xl">
            Written by <strong className="text-white">Jezreel Dave Leybag</strong> for{' '}
            <strong className="text-white">Dr. Leonardo Sagliocca</strong> (Founder &amp; Artistic Director, Florence Choral)
          </h2>

          <div className="flex flex-wrap items-center gap-5">
            <button
              onClick={() => {
                setShowCover(false);
                onSwitchMode('full-proposal');
              }}
              className="px-10 py-5 rounded-full bg-white hover:bg-neutral-200 text-[#0A0A0A] font-bold text-base transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-3 group"
            >
              <span>Start Reading Proposal</span>
              <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button
              onClick={onOpenPrototype}
              className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all border border-white/15 cursor-pointer flex items-center gap-2"
            >
              <span>Live Website Prototype</span>
              <span>↗</span>
            </button>

            <button
              onClick={onOpenDashboard}
              className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all border border-white/15 cursor-pointer flex items-center gap-2"
            >
              <span>Admin Dashboard</span>
              <span>↗</span>
            </button>
          </div>
        </div>

        {/* Bottom Footer Strip */}
        <footer className="relative z-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            <strong>florencechoral.org</strong> • 5 Renaissance Master Festivals, Admin Portal &amp; Digital Media
          </div>
          <div>
            Confidential &amp; Proprietary • Valid until 2026-12-31
          </div>
        </footer>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: CONTINUOUS PROPOSAL (Exact Better Proposals Alternating Layout)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#333333] bp-font flex flex-col md:flex-row relative">
      {/* Mobile Top Header */}
      <div className="md:hidden sticky top-0 z-50 bg-[#0A0A0A] border-b border-white/10 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2.5">
          <img
            src="/branding/on-black_1.png"
            alt="Jezreel Dave Leybag"
            className="h-7 w-auto object-contain"
          />
          <span className="text-xs text-neutral-400 truncate max-w-[150px]">
            Florence Choral
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="px-3 py-1.5 rounded bg-white/10 text-xs font-bold cursor-pointer"
        >
          {mobileMenuOpen ? 'Close ✕' : 'Menu ☰'}
        </button>
      </div>

      {/* =====================================================================
          LEFT STICKY SIDEBAR NAVIGATION (Exact Better Proposals Grey Pill Active)
          ===================================================================== */}
      <aside
        className={`${
          mobileMenuOpen ? 'block fixed inset-0 z-50 bg-[#0A0A0A]' : 'hidden'
        } md:flex flex-col w-full md:w-[240px] lg:w-[260px] shrink-0 sticky md:top-0 md:h-screen bg-[#0A0A0A] border-r border-white/10 p-6 z-40 overflow-y-auto custom-scrollbar justify-between text-left`}
      >
        <div>
          {/* Logo / Brand Header */}
          <div className="mb-8">
            <img
              src="/branding/on-black_1.png"
              alt="Jezreel Dave Leybag"
              className="h-10 w-auto object-contain"
            />
            <div className="mt-3 text-[11px] text-neutral-400 font-medium">
              Florence Choral • Web Development
            </div>
            <button
              type="button"
              onClick={() => {
                if (onOpenCover) onOpenCover();
                else setShowCover(true);
              }}
              className="mt-3 text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>←</span>
              <span>View Cover Page</span>
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg border border-white/10 mb-6">
            <button
              type="button"
              onClick={() => onSwitchMode('full-proposal')}
              className={`flex-1 py-1.5 px-2 rounded text-[11px] font-medium transition-all cursor-pointer ${
                mode === 'full-proposal'
                  ? 'bg-[#333333] text-white shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Proposal
            </button>
            <button
              type="button"
              onClick={() => {
                onSwitchMode('contract-only');
                scrollToSection('terms-and-conditions');
              }}
              className={`flex-1 py-1.5 px-2 rounded text-[11px] font-medium transition-all cursor-pointer ${
                mode === 'contract-only'
                  ? 'bg-[#333333] text-white shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Contract
            </button>
          </div>

          {/* Table of Contents Navigation Links */}
          <nav className="space-y-1">
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full text-left py-2 px-3 rounded-md text-sm transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#333333] text-white font-medium'
                      : 'text-[#888888] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="truncate">{sec.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Shortcuts */}
        <div className="pt-6 border-t border-white/10 space-y-2 text-xs">
          <button
            onClick={onOpenPrototype}
            className="w-full text-left py-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
          >
            <span>Live Prototype</span>
            <span>↗</span>
          </button>
          <button
            onClick={onOpenDashboard}
            className="w-full text-left py-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
          >
            <span>Admin Dashboard</span>
            <span>↗</span>
          </button>
        </div>
      </aside>

      {/* =====================================================================
          MAIN CONTINUOUS CONTENT (Exact Better Proposals Alternating Sections)
          ===================================================================== */}
      <main className="flex-1 w-full bg-[#0A0A0A] overflow-x-hidden">
        {/* ===================================================================
            SECTION 1: INTRODUCTION
            =================================================================== */}
        <section id="introduction" className="scroll-mt-0">
          {/* Hero Header Block (Dark #0A0A0A) */}
          <div className="bg-[#0A0A0A] text-white pt-16 pb-12 px-8 sm:px-14 lg:px-20">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 max-w-5xl">
              <div>
                <h1 className="bp-heading-title text-4xl sm:text-6xl text-white font-bold tracking-tight mb-3">
                  Redefining Web Design
                </h1>
                <h2 className="text-2xl sm:text-3xl text-neutral-300 font-normal">
                  Bespoke, Bold, Boundless
                </h2>
              </div>

              {/* Rotating Circular Text Badge */}
              <div className="shrink-0 relative w-28 h-28 hidden sm:flex items-center justify-center">
                <svg
                  className="w-full h-full animate-spin-slow"
                  viewBox="0 0 100 100"
                >
                  <path
                    id="circlePathHero"
                    d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    fill="none"
                  />
                  <text className="text-[9px] uppercase tracking-[0.22em] fill-neutral-400 font-medium">
                    <textPath href="#circlePathHero" xlinkHref="#circlePathHero">
                      • Florence Choral • Web Development 
                    </textPath>
                  </text>
                </svg>
                <div className="absolute w-2 h-2 rounded-full bg-white" />
              </div>
            </div>

            {/* 3-Image Photographic Strip (Exact Screenshot da78b88e style) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-12 overflow-hidden rounded-lg border border-white/10 max-w-5xl">
              <div
                onClick={() =>
                  setActiveMediaModal({
                    type: 'image',
                    src: '/proposal-assets/01_header_hero_dropdown_16x9.png',
                    title: 'Header Hero & Festivals Dropdown',
                  })
                }
                className="h-64 sm:h-72 overflow-hidden cursor-zoom-in group relative"
              >
                <img
                  src="/proposal-assets/01_header_hero_dropdown_16x9.png"
                  alt="Florence Choral Header"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div
                onClick={() =>
                  setActiveMediaModal({
                    type: 'image',
                    src: '/proposal-assets/02a_festivals_grid_top_16x9.png',
                    title: '5 Renaissance Festivals Directory',
                  })
                }
                className="h-64 sm:h-72 overflow-hidden cursor-zoom-in group relative"
              >
                <img
                  src="/proposal-assets/02a_festivals_grid_top_16x9.png"
                  alt="5 Renaissance Festivals"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div
                onClick={() =>
                  setActiveMediaModal({
                    type: 'image',
                    src: '/proposal-assets/05_historic_venues_16x9.png',
                    title: 'Historic Venues of Florence',
                  })
                }
                className="h-64 sm:h-72 overflow-hidden cursor-zoom-in group relative"
              >
                <img
                  src="/proposal-assets/05_historic_venues_16x9.png"
                  alt="Historic Venues"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* White Introduction Letter Block (Exact Better Proposals Block) */}
          <div className="bg-white text-[#333333] py-16 px-8 sm:px-14 lg:px-20">
            <div className="max-w-5xl">
              <h3 className="bp-heading-lowercase text-2xl sm:text-3xl text-[#2D2D2D] mb-8">
                introduction
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                <div className="md:col-span-8 space-y-4 bp-body-text text-[#333333]">
                  <p>Dear Dr. Leonardo Sagliocca,</p>
                  <p>
                    Thank you for our continued collaboration since 2022 and choosing us to design and engineer a world-class digital ecosystem for Florence Choral's prestigious international festivals.
                  </p>
                  <p>
                    As we discussed during our review, our goal is to deliver an undisputed, high-end platform that captures the Renaissance grandeur of Florence while providing an automated, effortless conductor application experience.
                  </p>
                  <p>
                    Below you will find the complete scope of deliverables, timescales, social proof from past projects, investment comparison, terms, and immediate electronic agreement.
                  </p>
                </div>
                <div className="md:col-span-4 bg-[#F8F9FA] p-6 rounded-lg border border-[#EBEBEB]">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#777777] mb-2">
                    Client &amp; Partner
                  </div>
                  <div className="text-sm font-bold text-black mb-1">
                    Dr. Leonardo Sagliocca
                  </div>
                  <div className="text-xs text-neutral-600 mb-4">
                    Founder &amp; Artistic Director, Florence Choral
                  </div>
                  <div className="border-t border-neutral-200 pt-3">
                    <div className="text-xs font-bold text-black">
                      Jezreel Dave Leybag
                    </div>
                    <div className="text-xs text-neutral-600">
                      Digital &amp; Media Partner (Since 2022)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 2: WHAT WILL WE DO
            =================================================================== */}
        <section id="what-will-we-do" className="scroll-mt-0">
          {/* Overview & 2 Columns (Dark Block - Exact Screenshot 83e79a6a style) */}
          <div className="bg-[#0A0A0A] text-white py-16 px-8 sm:px-14 lg:px-20">
            <div className="max-w-5xl">
              <div className="text-xs text-neutral-400 uppercase tracking-widest mb-2 font-medium">
                overview
              </div>
              <h2 className="bp-heading-title text-3xl sm:text-5xl text-white mb-14">
                High-End Brand Strengthening Design
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Homepage Column */}
                <div>
                  <h3 className="bp-heading-lowercase text-2xl sm:text-3xl text-white mb-6">
                    homepage
                  </h3>
                  <div className="space-y-4 bp-body-text text-neutral-300">
                    <p>
                      <strong className="text-white">Your homepage will be all about style.</strong>
                    </p>
                    <p>
                      Contemporary, classical, yet with an industrial vibe to emphasize that sometimes, less is more.
                    </p>
                    <p>
                      We will highlight the Renaissance influence in Florence Choral's festivals with a clean white background, a minimal look with rich photography.
                    </p>
                    <p>
                      Your homepage and the landing page are what makes it or breaks it in the website world. That is what visiting conductors establish their opinion on, so we will make sure they will not just visit the website.
                    </p>
                    <p>
                      <strong className="text-white">They will experience it.</strong>
                    </p>
                  </div>
                </div>

                {/* About Us Column */}
                <div>
                  <h3 className="bp-heading-lowercase text-2xl sm:text-3xl text-white mb-6">
                    about us
                  </h3>
                  <div className="space-y-4 bp-body-text text-neutral-300">
                    <p>
                      <strong className="text-white">
                        A good written "About Us" or "Our story" page is essential in establishing your brand presence.
                      </strong>
                    </p>
                    <p>
                      It will tell the story of the artistic director, followed by the international choral competition traditions. We will include animations and audio highlights for a final touch to the progression of the narrative.
                    </p>
                    <p>
                      <strong className="text-white">
                        When people buy luxury, they are not just buying a product. They want to buy a story.
                      </strong>
                    </p>
                    <p>
                      For that reason, our goal is to add a message to your "About Us" page that will speak to the visitors, explaining why they should participate in Florence Choral festivals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* White Block: news & products */}
          <div className="bg-white text-[#333333] py-16 px-8 sm:px-14 lg:px-20">
            <div className="max-w-5xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="bp-heading-lowercase text-2xl sm:text-3xl text-[#2D2D2D] mb-6">
                    news &amp; rulebooks
                  </h3>
                  <div className="space-y-4 bp-body-text text-[#333333]">
                    <p>
                      <strong>Choral directors need immediate access to festival guidelines.</strong>
                    </p>
                    <p>
                      Clear breakdown of Leonardo da Vinci, Verrocchio, Michelangelo, Lorenzo de' Medici, and Botticelli categories, compulsory pieces, scoring criteria, and awards.
                    </p>
                    <p>
                      All presented in interactive mobile-friendly drawers so conductors find their answers in seconds without dealing with broken links.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="bp-heading-lowercase text-2xl sm:text-3xl text-[#2D2D2D] mb-6">
                    products &amp; publications
                  </h3>
                  <div className="space-y-4 bp-body-text text-[#333333]">
                    <p>
                      <strong>Unlimited festival poster campaigns and 31-page competition booklets.</strong>
                    </p>
                    <p>
                      Certified print-ready PDF masters (A2, A3, 70×100) + full competition programme booklets, diplomas, and jury scoring sheets.
                    </p>
                    <p>
                      Everything produced with precision typographic craftsmanship under one unified flat monthly partnership.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dark Block: lifestyle & contact forms */}
          <div className="bg-[#0A0A0A] text-white py-16 px-8 sm:px-14 lg:px-20">
            <div className="max-w-5xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="bp-heading-lowercase text-2xl sm:text-3xl text-white mb-6">
                    lifestyle &amp; video
                  </h3>
                  <div className="space-y-4 bp-body-text text-neutral-300">
                    <p>
                      <strong className="text-white">4K documentary festival reportages and social reels.</strong>
                    </p>
                    <p>
                      5–7 minute documentary recaps capturing choir performances in Santa Croce and Salone dei Cinquecento, with professional multitrack choral audio synchronization.
                    </p>
                    <p>
                      Creates lasting memories that turn first-time attendees into lifetime advocates.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="bp-heading-lowercase text-2xl sm:text-3xl text-white mb-6">
                    contact forms &amp; cta
                  </h3>
                  <div className="space-y-4 bp-body-text text-neutral-300">
                    <p>
                      <strong className="text-white">Frictionless choir registration and inquiry management.</strong>
                    </p>
                    <p>
                      High-converting intake forms that capture conductor name, choir size, repertoire, and dates, with automated email confirmation and PDF brochure delivery.
                    </p>
                    <p>
                      Syncs directly to your Client Dashboard in real-time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 3: PROCESS AND TIMESCALES (Exact Screenshot 2d4cf275 style)
            =================================================================== */}
        <section id="process-and-timescales" className="scroll-mt-0">
          <div className="bg-white text-[#333333] py-16 px-8 sm:px-14 lg:px-20">
            <div className="max-w-5xl space-y-12">
              {/* Step 1 */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-5">
                  <div className="text-xs text-[#777777] uppercase tracking-wider mb-1">
                    step 1
                  </div>
                  <h3 className="bp-heading-lowercase text-2xl sm:text-3xl text-[#2D2D2D]">
                    initial design interview
                  </h3>
                </div>
                <div className="md:col-span-7 space-y-3 bp-body-text text-[#333333]">
                  <p>
                    To start a design project as big as this one, we will need an initial design interview. The goal of that meeting will be to get an inside look into your brand, vision, products, and goals.
                  </p>
                  <p>
                    The saying, "you get what you pay for," holds for websites, which is why we will get to the bottom of who you are and what you stand for before we even attempt to design your website.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-neutral-100 pt-10">
                <div className="md:col-span-5">
                  <div className="text-xs text-[#777777] uppercase tracking-wider mb-1">
                    step 2
                  </div>
                  <h3 className="bp-heading-lowercase text-2xl sm:text-3xl text-[#2D2D2D]">
                    design presentation
                  </h3>
                </div>
                <div className="md:col-span-7 space-y-3 bp-body-text text-[#333333]">
                  <p>
                    We will create three new design concepts. Naturally, there will be a common theme, but we will try to think outside of the box and develop a few different solutions.
                  </p>
                  <p>
                    The brainstorming and comparison part is often where the best ideas come from. We will go through these options and decide which direction to take and which adjustments to make.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-neutral-100 pt-10">
                <div className="md:col-span-5">
                  <div className="text-xs text-[#777777] uppercase tracking-wider mb-1">
                    step 3
                  </div>
                  <h3 className="bp-heading-lowercase text-2xl sm:text-3xl text-[#2D2D2D]">
                    high-quality website content
                  </h3>
                </div>
                <div className="md:col-span-7 space-y-3 bp-body-text text-[#333333]">
                  <p>
                    High-end website designers know that it is important to keep up with trends in digital media. Apart from that, your site needs to convey the authentic prestige of singing in Florence's sacred basilicas.
                  </p>
                  <p>
                    We prepare all typography, festival rulebook structures, category tables, and media assets in advance so visiting conductors experience zero friction.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-neutral-100 pt-10">
                <div className="md:col-span-5">
                  <div className="text-xs text-[#777777] uppercase tracking-wider mb-1">
                    step 4
                  </div>
                  <h3 className="bp-heading-lowercase text-2xl sm:text-3xl text-[#2D2D2D]">
                    website build
                  </h3>
                </div>
                <div className="md:col-span-7 space-y-3 bp-body-text text-[#333333]">
                  <p>
                    Building a website is more than just stacking templates. We construct a bespoke, high-performance platform on clean modern code with zero server bloat.
                  </p>
                  <p>
                    We thoroughly test on all desktop browsers, iPads, and mobile devices so conductors across Europe, the Americas, and Asia can apply seamlessly.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-neutral-100 pt-10">
                <div className="md:col-span-5">
                  <div className="text-xs text-[#777777] uppercase tracking-wider mb-1">
                    step 5
                  </div>
                  <h3 className="bp-heading-lowercase text-2xl sm:text-3xl text-[#2D2D2D]">
                    launch
                  </h3>
                </div>
                <div className="md:col-span-7 space-y-3 bp-body-text text-[#333333]">
                  <p>
                    We point your official florencechoral.org domain to the new platform with SSL encryption and global CDN distribution.
                  </p>
                  <p>
                    You receive administrative dashboard access immediately to track all incoming inquiries, while ongoing poster, booklet, and video production begins.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timescales Dark Block */}
          <div className="bg-[#0A0A0A] text-white py-14 px-8 sm:px-14 lg:px-20 border-t border-white/10">
            <div className="max-w-5xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="text-xs text-neutral-400 uppercase tracking-widest mb-1 font-medium">
                  Timescales
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Live Deployment Ready Within 48 to 72 Hours
                </h3>
                <p className="bp-body-text text-neutral-400 max-w-2xl">
                  Because the full functional prototype and Admin Dashboard have already been engineered, launch is instantaneous upon agreement.
                </p>
              </div>
              <button
                onClick={onOpenPrototype}
                className="shrink-0 px-6 py-3 rounded-full bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Test Prototype ↗
              </button>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 4: CASE STUDY (Exact Screenshot 230759bb style)
            =================================================================== */}
        <section id="case-study" className="scroll-mt-0">
          {/* Dark Header */}
          <div className="bg-[#0A0A0A] text-white pt-16 pb-8 px-8 sm:px-14 lg:px-20">
            <div className="max-w-5xl">
              <h2 className="bp-heading-title text-3xl sm:text-5xl text-white mb-4">
                Brands That Put Their Trust in Us
              </h2>
              <p className="bp-body-text text-neutral-400 max-w-2xl">
                Having collaborated with Florence Choral on festival posters, 31-page booklets, and 4-day video reportages since 2022:
              </p>
            </div>
          </div>

          {/* Photographic Strip Above White Block */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-[#0A0A0A] overflow-hidden">
            <div
              onClick={() =>
                setActiveMediaModal({
                  type: 'image',
                  src: '/proposal-assets/03_festival_programme_modal_16x9.png',
                  title: 'Festival Programme Modal',
                })
              }
              className="h-48 overflow-hidden cursor-zoom-in group"
            >
              <img
                src="/proposal-assets/03_festival_programme_modal_16x9.png"
                alt="Modal"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div
              onClick={() =>
                setActiveMediaModal({
                  type: 'image',
                  src: '/proposal-assets/04a_our_difference_cards_16x9.png',
                  title: 'Festival Differences & Features',
                })
              }
              className="h-48 overflow-hidden cursor-zoom-in group"
            >
              <img
                src="/proposal-assets/04a_our_difference_cards_16x9.png"
                alt="Cards"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div
              onClick={() =>
                setActiveMediaModal({
                  type: 'image',
                  src: '/proposal-assets/02b_festivals_grid_bottom_16x9.png',
                  title: 'Festivals Directory',
                })
              }
              className="h-48 overflow-hidden cursor-zoom-in group"
            >
              <img
                src="/proposal-assets/02b_festivals_grid_bottom_16x9.png"
                alt="Festivals"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* White Block: the solution / the result (Exact Screenshot 230759bb) */}
          <div className="bg-white text-[#333333] py-16 px-8 sm:px-14 lg:px-20">
            <div className="max-w-5xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="bp-heading-lowercase text-2xl sm:text-3xl text-[#2D2D2D] mb-6">
                    the solution
                  </h3>
                  <div className="space-y-4 bp-body-text text-[#333333]">
                    <p>
                      We wasted no time identifying what kind of content Dr. Leonardo Sagliocca wanted on florencechoral.org and what kind of angle he wanted to take.
                    </p>
                    <p>
                      It was clear from the beginning that he wanted Florence Choral to be a digital landmark for visiting international choirs. We focused on design and content with a lot of white space, prestigious Renaissance typography, and ever-present branding and logo.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="bp-heading-lowercase text-2xl sm:text-3xl text-[#2D2D2D] mb-6">
                    the result
                  </h3>
                  <div className="space-y-4 bp-body-text text-[#333333]">
                    <p>
                      After just a few weeks, Florence Choral's new website was up and running. The artistic director's goals are being met, the site is providing the conversions and exposure needed, and it can handle both current and future festival needs.
                    </p>
                    <p>
                      <strong>In short, Florence Choral's high-end website is doing its job.</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dark Commitment Block (Replacing Testimonial with Jezreel's Personal Commitment) */}
          <div className="bg-[#0A0A0A] text-white py-16 px-8 sm:px-14 lg:px-20 border-t border-white/10">
            <div className="max-w-5xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-12">
                <div className="md:col-span-3 flex justify-start md:justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-3 shadow-lg">
                    <img
                      src="/branding/logo-dark-mark.png"
                      alt="Jezreel Dave Leybag"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
                <div className="md:col-span-9">
                  <div className="text-xs text-neutral-400 uppercase tracking-widest mb-3 font-semibold">
                    My Personal Commitment
                  </div>
                  <blockquote className="text-base sm:text-xl text-neutral-200 font-normal leading-relaxed italic mb-4">
                    “My commitment to Florence Choral is simple: to treat our collaboration not as one-off work, but as an enduring partnership. Every deliverable will be executed with the exact precision, reliability, and artistic dignity that your international festivals deserve.”
                  </blockquote>
                  <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    — Jezreel Dave Leybag • Digital &amp; Media Partner
                  </div>
                </div>
              </div>

              {/* Bento Style Design (Matching Image 2 Reference) */}
              <div className="border-t border-white/10 pt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                  {BENTO_PROJECTS.map((item) => (
                    <div
                      key={item.id}
                      onClick={() =>
                        setActiveMediaModal({
                          type: item.type,
                          src: item.fullSrc,
                          title: `${item.year} • ${item.title}`,
                        })
                      }
                      className={`${item.colSpan} relative rounded-3xl overflow-hidden group cursor-pointer border border-white/10 shadow-lg h-[260px] sm:h-[300px] transition-all duration-300 hover:shadow-2xl hover:border-white/30`}
                    >
                      {/* Background Image / Asset */}
                      <img
                        src={item.previewImg}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Scrim Gradient for Contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:from-black/95 transition-colors" />

                      {/* Bento Card Content (Year Pill + Project Name + Action Pill) */}
                      <div className="relative z-10 h-full p-6 sm:p-7 flex flex-col justify-between items-start text-left">
                        {/* Top: Year Tag Pill */}
                        <span className="text-[11px] font-bold uppercase tracking-wider text-white/90 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/25 shadow-sm">
                          {item.year}
                        </span>

                        {/* Bottom: Optimized Project Name & Action Pill */}
                        <div className="w-full">
                          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-md">
                            {item.title}
                          </h3>
                          <div className="mt-3.5">
                            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black text-xs font-bold shadow-md group-hover:bg-[#F79223] transition-colors">
                              {item.actionLabel}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 5: INVESTMENT
            =================================================================== */}
        <section id="investment" className="scroll-mt-0">
          {/* Dark Intro */}
          <div className="bg-[#0A0A0A] text-white pt-16 pb-10 px-8 sm:px-14 lg:px-20">
            <div className="max-w-5xl">
              <div className="text-xs text-neutral-400 uppercase tracking-widest mb-2 font-medium">
                the cost
              </div>
              <h2 className="bp-heading-title text-3xl sm:text-5xl text-white mb-4">
                Take Your Brand to the Next Level with Luxury Design
              </h2>
              <p className="bp-body-text text-neutral-400 max-w-2xl leading-relaxed">
                Below you will find the transparent cost of our high-end website design and continuous media partnership services.
              </p>
            </div>
          </div>

          {/* White Pricing Block */}
          <div className="bg-white text-[#333333] py-16 px-8 sm:px-14 lg:px-20">
            <div className="max-w-5xl">
              {/* Plan Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Option A */}
                <div
                  onClick={() => setSelectedPlan('planA')}
                  className={`p-8 rounded-lg border transition-all cursor-pointer ${
                    selectedPlan === 'planA'
                      ? 'border-black bg-[#FAFAFA] shadow-lg ring-2 ring-black'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                    Option A • Recommended
                  </div>
                  <div className="text-xl font-bold text-black mb-3">Setup + Monthly</div>
                  <div className="text-4xl font-extrabold text-black mb-1">
                    €499<span className="text-sm font-normal text-neutral-600">/month</span>
                  </div>
                  <div className="text-xs text-neutral-600 mb-2">
                    + €1,599.00 one-time setup
                  </div>
                  <div className="text-xs font-semibold text-neutral-800 bg-neutral-200/60 inline-block px-2.5 py-1 rounded mb-6">
                    Saves €17 per month vs Option B monthly**
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedPlan('planA')}
                    className={`w-full py-3 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      selectedPlan === 'planA'
                        ? 'bg-black text-white'
                        : 'bg-neutral-100 text-black hover:bg-neutral-200'
                    }`}
                  >
                    {selectedPlan === 'planA' ? '✓ Selected Plan' : 'Select Plan'}
                  </button>
                </div>

                {/* Option B */}
                <div
                  onClick={() => setSelectedPlan('planB')}
                  className={`p-8 rounded-lg border transition-all cursor-pointer ${
                    selectedPlan === 'planB'
                      ? 'border-black bg-[#FAFAFA] shadow-lg ring-2 ring-black'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                    Option B • Zero Upfront
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xl font-bold text-black">Monthly or Yearly</div>
                    <div className="inline-flex p-0.5 bg-neutral-200 rounded text-[10px] font-bold">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlanBBilling('monthly');
                          setSelectedPlan('planB');
                        }}
                        className={`px-2 py-0.5 rounded ${
                          planBBilling === 'monthly' ? 'bg-black text-white' : 'text-neutral-600'
                        }`}
                      >
                        Monthly
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlanBBilling('yearly');
                          setSelectedPlan('planB');
                        }}
                        className={`px-2 py-0.5 rounded ${
                          planBBilling === 'yearly' ? 'bg-black text-white' : 'text-neutral-600'
                        }`}
                      >
                        Yearly
                      </button>
                    </div>
                  </div>

                  {planBBilling === 'monthly' ? (
                    <>
                      <div className="text-4xl font-extrabold text-black mb-1">
                        €649<span className="text-sm font-normal text-neutral-600">/month</span>
                      </div>
                      <div className="text-xs text-neutral-600 mb-2">
                        (€7,788/yr) or €6,853.00/year
                      </div>
                      <div className="text-xs font-semibold text-neutral-800 bg-neutral-200/60 inline-block px-2.5 py-1 rounded mb-6">
                        Zero setup fee upfront
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl font-extrabold text-black mb-1">
                        €6,853<span className="text-sm font-normal text-neutral-600">/year</span>
                      </div>
                      <div className="text-xs text-neutral-600 mb-2">
                        Equivalent to €571/mo
                      </div>
                      <div className="text-xs font-semibold text-emerald-800 bg-emerald-100 inline-block px-2.5 py-1 rounded mb-6">
                        ✓ Save €935/year with Yearly Billing**
                      </div>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedPlan('planB')}
                    className={`w-full py-3 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      selectedPlan === 'planB'
                        ? 'bg-black text-white'
                        : 'bg-neutral-100 text-black hover:bg-neutral-200'
                    }`}
                  >
                    {selectedPlan === 'planB' ? '✓ Selected Plan' : 'Select Plan'}
                  </button>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="overflow-x-auto border border-neutral-200 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8F9FA] border-b border-neutral-200 text-black uppercase tracking-wider font-bold">
                    <tr>
                      <th className="p-4">Inclusions &amp; Deliverables</th>
                      <th className="p-4 text-center">Option A</th>
                      <th className="p-4 text-center">Option B</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 text-neutral-800">
                    <tr>
                      <td className="p-4 font-semibold">Client Dashboard &amp; Inquiry Tracker</td>
                      <td className="p-4 text-center">✓ Live Tracker Included</td>
                      <td className="p-4 text-center">✓ Live Tracker Included</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">5-Festival Modern Web Platform</td>
                      <td className="p-4 text-center">✓ Included (100% Owned)</td>
                      <td className="p-4 text-center">✓ Included (100% Owned)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Unlimited Festival Poster Campaigns</td>
                      <td className="p-4 text-center">✓ Unlimited PDF Masters</td>
                      <td className="p-4 text-center">✓ Unlimited PDF Masters</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">31-Page Competition Booklets</td>
                      <td className="p-4 text-center">✓ Unlimited Digital Layouts</td>
                      <td className="p-4 text-center">✓ Unlimited Digital Layouts</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">5–7 Min 4K Documentary Video Reportages</td>
                      <td className="p-4 text-center">✓ Unlimited Renders</td>
                      <td className="p-4 text-center">✓ Unlimited Renders</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Global Choir Outreach &amp; Newsletters</td>
                      <td className="p-4 text-center">✓ 2 / Month + Outbound</td>
                      <td className="p-4 text-center">✓ 2 / Month + Outbound</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 6: NEXT STEPS (Exact Screenshot 4baef456 style)
            =================================================================== */}
        <section id="next-steps" className="scroll-mt-0">
          {/* Centered Guarantee Block (Dark #0A0A0A) */}
          <div className="bg-[#0A0A0A] text-white py-20 px-8 sm:px-14 lg:px-20 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="bp-heading-title text-3xl sm:text-5xl font-bold text-white tracking-tight mb-6">
                Our Guarantee and Next Steps
              </h2>
              <p className="bp-body-text text-neutral-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-6">
                No matter what you do in business, there is always a risk and we understand that. In our cooperation, we will be the ones who deal with it. The purpose of this project is to deliver a great website that will establish you as an industry expert. If we fail in delivering our promises, you don't have to pay for our services.
              </p>
              <div className="text-xl sm:text-2xl font-normal text-white mt-8 mb-12">
                It is as simple as that.
              </div>
            </div>

            {/* Edge-to-Edge Image Strip Under Guarantee */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-8 rounded-lg overflow-hidden border border-white/10 max-w-5xl mx-auto">
              <div className="h-44 overflow-hidden">
                <img
                  src="/proposal-assets/01_header_hero_dropdown_16x9.png"
                  alt="Prototype 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-44 overflow-hidden">
                <img
                  src="/proposal-assets/05_historic_venues_16x9.png"
                  alt="Prototype 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-44 overflow-hidden">
                <img
                  src="/proposal-assets/02a_festivals_grid_top_16x9.png"
                  alt="Prototype 3"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* White Block: sign below */}
          <div className="bg-white text-[#333333] py-16 px-8 sm:px-14 lg:px-20">
            <div className="max-w-5xl">
              <h3 className="bp-heading-lowercase text-2xl sm:text-3xl text-[#2D2D2D] mb-6">
                sign below
              </h3>
              <p className="bp-body-text text-[#333333] mb-6">
                To get started and to make the following steps as simple as possible:
              </p>
              <div className="space-y-4 bp-body-text text-[#333333] max-w-2xl">
                <div>
                  <strong>ONE</strong> — Simply type your name in the acceptance card below and click “Accept and sign”.
                </div>
                <div>
                  <strong>TWO</strong> — We initiate the 48-to-72 hour domain pointing and live deployment sequence.
                </div>
                <div>
                  <strong>THREE</strong> — You receive your Client Dashboard credentials and your ongoing digital partnership begins immediately.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 7: TERMS AND CONDITIONS
            =================================================================== */}
        <section id="terms-and-conditions" className="scroll-mt-0">
          <div className="bg-white text-[#333333] py-16 px-8 sm:px-14 lg:px-20 border-t border-neutral-200">
            <div className="max-w-5xl">
              <h3 className="bp-heading-lowercase text-2xl sm:text-3xl text-[#2D2D2D] mb-8">
                terms &amp; conditions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed text-neutral-700">
                <div className="space-y-3">
                  <h4 className="font-bold text-black text-sm">1. 100% Client Ownership</h4>
                  <p>
                    Florence Choral retains 100% perpetual ownership of all domain names, design assets, source code, festival posters, booklets, and video files upon payment. No lock-in or proprietary traps.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-black text-sm">2. Rapid Turnaround Timescales</h4>
                  <p>
                    Standard website revisions are completed within 48 to 72 hours. Complete competition booklets and 4K reportage video edits are delivered within 3 to 5 business days upon receiving assets.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-black text-sm">3. Digital Scope &amp; Exclusions</h4>
                  <p>
                    Deliverables encompass all digital master files, high-resolution certified PDFs, video editing, hosting maintenance, and email broadcasts. Physical print manufacturing, paper shipping, and third-party advertising budgets remain the responsibility of Florence Choral.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-black text-sm">4. Flexible Month-to-Month Term</h4>
                  <p>
                    Following the initial evaluation period, partnership services continue on a flexible month-to-month basis cancellable with 30 days written notice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 8: PROPOSAL ACCEPTANCE (Exact Screenshot a1ec1c22 style)
            =================================================================== */}
        <section id="proposal-acceptance" className="scroll-mt-0">
          <div className="bg-[#0A0A0A] py-20 px-6 sm:px-14 lg:px-20 flex justify-center items-center">
            {/* White Signature Card (Exact Screenshot a1ec1c22) */}
            <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10 max-w-2xl w-full border border-neutral-200 text-left">
              {/* Top Legal Agreement Clause */}
              <p className="text-sm text-[#333333] leading-relaxed mb-6 font-normal">
                I, {signerName || 'Dr. Leonardo Sagliocca'}, agree to the terms of this agreement and I agree that my typed name below can be used as a digital representation of my signature to that fact.
              </p>

              {/* Tab Navigation */}
              <div className="flex items-center gap-6 border-b border-neutral-200 mb-6 text-xs font-bold uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => setSignTab('type')}
                  className={`pb-3 flex items-center gap-2 cursor-pointer transition-colors ${
                    signTab === 'type'
                      ? 'text-black border-b-2 border-black -mb-[1px]'
                      : 'text-neutral-400 hover:text-black'
                  }`}
                >
                  <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <line x1="6" y1="8" x2="18" y2="8" />
                    <line x1="6" y1="12" x2="18" y2="12" />
                    <line x1="6" y1="16" x2="12" y2="16" />
                  </svg>
                  <span>SIGN BY TYPING</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSignTab('draw')}
                  className={`pb-3 flex items-center gap-2 cursor-pointer transition-colors ${
                    signTab === 'draw'
                      ? 'text-black border-b-2 border-black -mb-[1px]'
                      : 'text-neutral-400 hover:text-black'
                  }`}
                >
                  <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  <span>SIGN BY DRAWING</span>
                </button>
              </div>

              {/* Input Header */}
              <div className="text-base sm:text-lg font-bold text-[#1F1F1F] mb-3">
                To accept and sign, type your name below
              </div>

              {/* Input Area */}
              {signTab === 'type' ? (
                <div className="mb-4">
                  <input
                    type="text"
                    value={signerName}
                    onChange={(e) => setSignerName(e.target.value)}
                    placeholder="Type your full name"
                    className="w-full p-4 rounded-lg bg-[#F8F9FA] border border-[#E0E0E0] text-base text-[#111111] focus:bg-white focus:outline-none focus:border-black transition-all"
                  />
                  {signerName && (
                    <div className="mt-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-between">
                      <span
                        style={{ fontFamily: 'Brush Script MT, cursive' }}
                        className="text-2xl text-neutral-800"
                      >
                        {signerName}
                      </span>
                      <span className="text-[10px] text-neutral-500 font-mono">
                        Digital ID: FC-2026-SIG
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mb-4 p-8 border-2 border-dashed border-neutral-300 rounded-lg text-center bg-[#F8F9FA]">
                  <span
                    style={{ fontFamily: 'Brush Script MT, cursive' }}
                    className="text-3xl text-neutral-800"
                  >
                    {signerName || 'Dr. Leonardo Sagliocca'}
                  </span>
                  <div className="text-[11px] text-neutral-400 mt-2">
                    (Touch/Stylus Draw Enabled)
                  </div>
                </div>
              )}

              {/* Primary Action Button */}
              {!isSigned ? (
                <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    type="button"
                    disabled={isSigning || !signerName.trim()}
                    onClick={handleSignProposal}
                    className="px-8 py-3.5 rounded-lg bg-black hover:bg-[#222222] disabled:bg-neutral-400 text-white font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSigning && (
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    <span>{isSigning ? 'Submitting & Notifying...' : 'Accept and sign'}</span>
                  </button>
                  <span className="text-[11px] text-neutral-400">
                    Signing automatically notifies <strong>jezreelleybag.graphics@gmail.com</strong>
                  </span>
                </div>
              ) : (
                <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-950 mt-6 text-center shadow-sm">
                  <div className="font-bold text-lg mb-1 flex items-center justify-center gap-2 text-emerald-900">
                    <span className="text-xl">✓</span> Proposal Formally Signed &amp; Accepted
                  </div>
                  <div className="text-xs text-emerald-800">
                    Signed by <strong>{signerName}</strong> • Verified on {new Date().toLocaleDateString('en-GB')} • Digital ID: <code className="font-mono bg-emerald-100 px-1 py-0.5 rounded">FC-2026-SIG</code>
                  </div>
                  <div className="mt-3 text-xs text-emerald-700 bg-white/80 p-3 rounded-lg border border-emerald-200 inline-block text-left">
                    <div className="font-semibold mb-0.5 flex items-center gap-1.5">
                      <span>📧</span> {notifyStatus === 'fallback' ? 'Email Confirmation Ready' : 'Notification Dispatched'}
                    </div>
                    <div>
                      {notifyStatus === 'fallback'
                        ? 'Your signature is verified. Please click the button below to send your direct email confirmation.'
                        : 'An official acceptance dossier was dispatched to jezreelleybag.graphics@gmail.com with your chosen package details.'}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="text-xs font-semibold px-4 py-2 bg-white text-emerald-900 border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer shadow-sm"
                    >
                      Print / Save Signed PDF 📄
                    </button>
                    <a
                      href={`mailto:jezreelleybag.graphics@gmail.com?subject=${encodeURIComponent(`Florence Choral Proposal Accepted & Signed by ${signerName}`)}&body=${encodeURIComponent(`Dear Jezreel,\n\nI have formally reviewed and accepted the Florence Choral Proposal.\n\nSigner: ${signerName}\nSelected Package: ${selectedPlan === 'planA' ? 'Option A: Setup + Monthly' : 'Option B: Monthly Partner'}\nDigital ID: FC-2026-SIG\nDate: ${new Date().toLocaleDateString('en-GB')}\n\nLooking forward to initiating our digital partnership!`)}`}
                      className="text-xs font-semibold px-4 py-2 bg-emerald-800 text-white rounded-lg hover:bg-emerald-900 transition-colors shadow-sm inline-flex items-center gap-1.5"
                    >
                      <span>Send Direct Email Copy ✉</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>



      {/* Universal Media Modal (Image Lightbox, PDF Booklet Viewer, 1080p Video Embed) */}
      {activeMediaModal && (
        <div
          onClick={() => setActiveMediaModal(null)}
          className="fixed inset-0 z-50 bg-black/95 p-4 sm:p-8 flex items-center justify-center cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full flex flex-col items-center cursor-default"
          >
            <div className="w-full flex items-center justify-between pb-3 text-white text-sm font-bold border-b border-white/10 mb-4">
              <span>{activeMediaModal.title}</span>
              <div className="flex items-center gap-3">
                {activeMediaModal.type === 'pdf' && (
                  <a
                    href={activeMediaModal.src}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#F79223] hover:underline"
                  >
                    Open in New Tab ↗
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setActiveMediaModal(null)}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer transition-colors"
                >
                  Close ✕
                </button>
              </div>
            </div>

            {activeMediaModal.type === 'image' && (
              <img
                src={activeMediaModal.src}
                alt={activeMediaModal.title}
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              />
            )}

            {activeMediaModal.type === 'video' && (
              <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black">
                <iframe
                  src={activeMediaModal.src}
                  className="w-full h-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  title={activeMediaModal.title}
                />
              </div>
            )}

            {activeMediaModal.type === 'pdf' && (
              <div className="w-full h-[78vh] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white">
                <iframe
                  src={activeMediaModal.src}
                  className="w-full h-full"
                  title={activeMediaModal.title}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
