import React, { useState } from 'react';
import {
  PAST_FLORENCE_WORK_FEATURED,
  PAST_WORK_GALLERY_SLOTS,
  type PastWorkItem,
} from '../data/pastWork';

interface InteractiveProposalProps {
  mode?: 'full-proposal' | 'contract-only';
  onOpenPrototype: () => void;
  onOpenDashboard: () => void;
  onSwitchMode: (mode: 'full-proposal' | 'contract-only') => void;
}

interface PrototypeSlide {
  num: string;
  title: string;
  whatWeDid: string;
  designLawTitle: string;
  designLawBody: string;
  img: string;
}

const PROTOTYPE_SLIDES_PAGE_1: PrototypeSlide[] = [
  {
    num: '01',
    title: 'Optical Brand Header & Frosted-Glass "Festivals" Menu',
    whatWeDid:
      'Embedded your transparent Florence Choral Duomo crest directly into the crimson header, paired with a 90%-frosted white glass dropdown listing all 5 festivals and dates.',
    designLawTitle: 'Golden Ratio (1:1.618) & Hick’s Law',
    designLawBody:
      'Optical alignment locks the Duomo emblem to the title cap-height, while Hick’s Law cuts decision time by displaying all 5 festival dates in one clean menu.',
    img: '/proposal-assets/01_header_hero_dropdown_16x9.png',
  },
  {
    num: '02',
    title: 'The 5 Renaissance Master Festivals Directory',
    whatWeDid:
      'Dedicated 3-column directory for Leonardo da Vinci, Verrocchio, Michelangelo, Lorenzo de’ Medici, and Botticelli with status badges and deadlines.',
    designLawTitle: 'Law of Proximity & Visual Hierarchy',
    designLawBody:
      'Groups festival dates, Renaissance master dedications, and deadlines inside uniform containers so conductors can compare all 5 seasons in seconds.',
    img: '/proposal-assets/02a_festivals_grid_top_16x9.png',
  },
  {
    num: '03',
    title: 'Interactive 4-Day Programme & Rules Modal',
    whatWeDid:
      'Instant overlay window showing the Day 1–4 itinerary, competition categories, repertoire rules, prizes, and 1-click application actions.',
    designLawTitle: 'Fitts’s Law & Progressive Disclosure',
    designLawBody:
      'Delivers complete festival rules on demand without page reloads, keeping prominent "Request PDF Brochure" and "Apply" actions within immediate reach.',
    img: '/proposal-assets/03_festival_programme_modal_16x9.png',
  },
];

const PROTOTYPE_SLIDES_PAGE_2: PrototypeSlide[] = [
  {
    num: '04',
    title: '“Our Difference” Pillars with Custom Vector Icons',
    whatWeDid:
      'Highlights Special Features, Bel Canto Workshops, and International Juries using custom geometric SVG icons and 3-point checklists.',
    designLawTitle: 'Law of Prägnanz (Simplicity & Clarity)',
    designLawBody:
      'Replaces dense paragraphs with scannable 3-point checklists that international choir directors can read in under 5 seconds.',
    img: '/proposal-assets/04a_our_difference_cards_16x9.png',
  },
  {
    num: '05',
    title: 'Global Impact Counter Bar & Artistic Committee',
    whatWeDid:
      'Animated Renaissance-Azure counter bar (Events, Choirs, Nations, Participants) with custom choral vectors preceding the Artistic Committee.',
    designLawTitle: 'Authority & Social Proof Principle',
    designLawBody:
      'Quantifies Florence Choral’s global track record at a glance right before introducing Dr. Sagliocca and the international jury panel.',
    img: '/proposal-assets/04b_impact_stats_and_jury_16x9.png',
  },
  {
    num: '06',
    title: 'Historic Venues of Florence Showcase',
    whatWeDid:
      'Authentic photography of Basilica of Santa Croce, Santa Maria Novella, Salone dei Cinquecento (Palazzo Vecchio), Ognissanti, and Sant’Apollonia.',
    designLawTitle: 'Aesthetic-Usability Effect',
    designLawBody:
      'High-resolution architectural imagery creates an immediate emotional desire for visiting choirs to sing inside Florence’s greatest basilicas.',
    img: '/proposal-assets/05_historic_venues_16x9.png',
  },
  {
    num: '07',
    title: 'Official Patronage & Direct Conversion Footer',
    whatWeDid:
      'Preserves the Comune di Firenze (linked to the official PDF decree) and Regione Toscana patronage crests alongside direct WhatsApp & Brochure buttons.',
    designLawTitle: 'Serial Position Effect (Recency & Trust)',
    designLawBody:
      'Anchors the bottom of the page with official government patronage proof and immediate inquiry channels.',
    img: '/proposal-assets/06_footer_and_patronage_16x9.png',
  },
];

export const InteractiveProposal: React.FC<InteractiveProposalProps> = ({
  mode = 'full-proposal',
  onOpenPrototype,
  onOpenDashboard,
  onSwitchMode,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'planA' | 'planB'>('planA');
  const [lightboxImg, setLightboxImg] = useState<{ src: string; title: string } | null>(null);
  const [customPastImages, setCustomPastImages] = useState<Record<string, string>>({});

  // Interactive Calculator State (defaults match our exact annual table)
  const [calcPosters, setCalcPosters] = useState(10); // €50 each = €500
  const [calcBooklets, setCalcBooklets] = useState(6); // €150 each (31p booklet + 5 festival rulebooks/diploma packs) = €900
  const [calcVideos, setCalcVideos] = useState(9); // €150 each (reportages + festival promo reels) = €1,350
  const [calcMonths, setCalcMonths] = useState(12); // Hosting (€75) + Newsletters (€150) + Outreach (€250) = €475/mo = €5,700/yr

  const oneTimePerProject = 1500 + 600; // Website (€1,500) + Dashboard (€600) = €2,100
  const recurringPerProject =
    calcPosters * 50 + calcBooklets * 150 + calcVideos * 150 + calcMonths * (75 + 150 + 250);
  const totalYear1PerProject = oneTimePerProject + recurringPerProject;

  const planAYear1 = 1600 + 500 * calcMonths; // €1,600 down + €500/mo = €7,600
  const planBYear1 = 650 * calcMonths; // €0 down + €650/mo = €7,800

  const activePlanYear1 = selectedPlan === 'planA' ? planAYear1 : planBYear1;
  const year1Savings = totalYear1PerProject - activePlanYear1;
  const year2Savings = recurringPerProject - 500 * calcMonths;

  const handleFileAttach = (slotId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCustomPastImages((prev) => ({ ...prev, [slotId]: url }));
  };

  const getAcceptMailto = () => {
    const planLabel =
      selectedPlan === 'planA'
        ? 'Option A: €1,600 EUR One-Time Setup + €500 EUR / Month All-Inclusive Partnership'
        : 'Option B: €0 Upfront + €650 EUR / Month (Year 1), then €500 EUR / Month';
    const subject = encodeURIComponent(
      `Florence Choral (florencechoral.org) — Partnership Approval [${
        selectedPlan === 'planA' ? '€1,600 + €500/mo' : '€650/mo Zero Upfront'
      }]`
    );
    const body = encodeURIComponent(
      `Dear Jezreel,\n\nI have reviewed the Florence Choral Website Development, Dashboard, Marketing & Unlimited Media Proposal and Terms of Agreement.\n\nI would like to proceed with:\n• Selected Plan: ${planLabel}\n• Included Scope: Full Website Rebuild (florencechoral.org), Custom Admin & Inquiry Dashboard, Cloud Backend & Domain Covered, Monthly Email Newsletters, Global Choir Email Outreach, Unlimited Graphic Design (Posters, 31-Page Booklets, Diplomas), and Unlimited Video Editing (Reportages & Promo Reels).\n\nPlease send the onboarding steps and first invoice so we can launch florencechoral.org.\n\nBest regards,\nDr. Leonardo Sagliocca\nFounder & Artistic Director, Florence Choral`
    );
    return `mailto:jezreelleybag@gmail.com?subject=${subject}&body=${body}`;
  };

  const renderTemplateHeader = (title: string, pillText: string, icon: React.ReactNode) => (
    <header className="flex items-center justify-between mb-6 relative z-10">
      <h2 className="tpl-font-heading text-[31px] font-semibold uppercase tracking-[-0.01em] text-[#0B0C0E] leading-none">
        {title}
      </h2>
      <div className="flex items-center gap-[3px] shrink-0">
        <div className="h-[36px] min-w-[102px] px-3.5 rounded-full border-[1.5px] border-[#0B0C0E] bg-white/40 flex items-center justify-center gap-2">
          <img
            src="/proposal-assets/jezreel_logo_mark.png"
            alt="JD"
            className="h-3.5 w-auto object-contain"
          />
          <span className="tpl-font-heading text-[10px] font-bold uppercase tracking-[0.06em] text-[#0B0C0E]">
            {pillText}
          </span>
        </div>
        <div className="w-[36px] h-[36px] rounded-full bg-[#F79223] border-[1.5px] border-[#0B0C0E] flex items-center justify-center text-[#0B0C0E]">
          {icon}
        </div>
      </div>
    </header>
  );

  const renderPageFooter = (pageNum: number, totalPages: number, label: string) => (
    <footer className="mt-auto pt-3 border-t border-black/10 flex items-center justify-between text-[10.5px] text-neutral-600 relative z-10">
      <div className="flex items-center gap-2">
        <img src="/proposal-assets/jezreel_logo_mark.png" alt="" className="h-3 w-auto" />
        <span>
          <strong className="text-[#0B0C0E]">Jezreel Dave Leybag</strong> • {label}
        </span>
      </div>
      <span className="tpl-font-heading font-semibold text-[#0B0C0E]">
        Page {String(pageNum).padStart(2, '0')} of {String(totalPages).padStart(2, '0')}
      </span>
    </footer>
  );

  const renderBrowserMockup = (src: string, title: string) => (
    <div className="tpl-browser-backdrop" style={{ padding: '10px 14px' }}>
      <div
        onClick={() => setLightboxImg({ src, title })}
        className="bg-[#0B0C0E] rounded-[10px] overflow-hidden border border-black/80 shadow-lg cursor-zoom-in group relative"
      >
        <div className="bg-[#F4F4F5] h-[15px] px-2 flex items-center justify-between border-b border-neutral-300">
          <div className="flex flex-col gap-[2px]">
            <span className="w-2.5 h-[1.3px] bg-neutral-800 block" />
            <span className="w-2.5 h-[1.3px] bg-neutral-800 block" />
            <span className="w-2.5 h-[1.3px] bg-neutral-800 block" />
          </div>
          <span className="text-[8px] font-mono text-neutral-500 truncate max-w-[180px]">
            florencechoral.org
          </span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full border border-neutral-800 bg-[#F79223]" />
            <span className="w-1.5 h-1.5 rounded-full border border-neutral-800 bg-white" />
            <span className="w-1.5 h-1.5 rounded-full border border-neutral-800 bg-white" />
          </div>
        </div>
        <img
          src={src}
          alt={title}
          className="w-full h-[156px] object-cover object-top block group-hover:scale-[1.01] transition-transform"
        />
        <div className="no-print absolute bottom-2 right-2 bg-black/75 text-white text-[9px] font-semibold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          Click to Enlarge (16:9)
        </div>
      </div>
    </div>
  );

  const renderPastWorkPrototypeSlot = (item: PastWorkItem, compact = false) => {
    const attachedSrc = customPastImages[item.id] || item.src;
    const slotHeightClass = compact ? 'h-[132px]' : 'h-[146px]';
    return (
      <div className="tpl-browser-backdrop" style={{ padding: compact ? '8px 10px' : '10px 14px' }}>
        <div className="bg-[#F4F4F5] rounded-[9px] overflow-hidden border border-black/80 shadow-md">
          {/* Top Window Bar (Exact Template Page 3 Style) */}
          <div className="bg-white h-[15px] px-2 flex items-center justify-between border-b border-neutral-300">
            <div className="flex flex-col gap-[2px]">
              <span className="w-2.5 h-[1.3px] bg-neutral-800 block" />
              <span className="w-2.5 h-[1.3px] bg-neutral-800 block" />
              <span className="w-2.5 h-[1.3px] bg-neutral-800 block" />
            </div>
            <span className="text-[7.5px] font-semibold uppercase tracking-wider text-neutral-500">
              {item.historicalRate}
            </span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full border border-neutral-800 bg-[#F79223]" />
              <span className="w-1.5 h-1.5 rounded-full border border-neutral-800 bg-white" />
              <span className="w-1.5 h-1.5 rounded-full border border-neutral-800 bg-white" />
            </div>
          </div>

          {attachedSrc ? (
            <div
              onClick={() => setLightboxImg({ src: attachedSrc, title: item.title })}
              className="relative cursor-zoom-in"
            >
              <img
                src={attachedSrc}
                alt={item.title}
                className={`w-full ${slotHeightClass} object-cover block`}
              />
            </div>
          ) : (
            <label
              className={`w-full ${slotHeightClass} bg-gradient-to-br from-[#1F242D] via-[#151821] to-[#2B1D12] flex flex-col items-center justify-center text-center p-2.5 cursor-pointer relative group`}
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileAttach(item.id, e)}
              />
              <div className="w-7 h-7 rounded-full bg-[#F79223]/20 border border-[#F79223] flex items-center justify-center text-[#F79223] mb-1 group-hover:scale-110 transition-transform">
                {item.category === 'video' ? (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : item.category === 'booklet' ? (
                  <svg
                    className="w-3.5 h-3.5 stroke-current"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />
                  </svg>
                ) : (
                  <svg
                    className="w-3.5 h-3.5 stroke-current"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                )}
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#F79223]">
                Prototype Project Slot • {item.year}
              </span>
              <span className="text-[10.5px] font-semibold text-white mt-0.5 line-clamp-1">
                {item.title}
              </span>
              <span className="text-[8.5px] text-neutral-300 mt-0.5 line-clamp-1">
                {item.deliverables}
              </span>
              <span className="no-print mt-1 text-[8px] bg-white/10 border border-white/20 text-white px-2 py-0.5 rounded-full group-hover:bg-[#F79223] group-hover:text-black transition-colors">
                + Click to Attach Project Image
              </span>
            </label>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#16171B] text-[#0B0C0E] tpl-font-body">
      {/* =====================================================================
          STICKY INTERACTIVE PRESENTATION BAR (WEB ONLY — HIDDEN IN PRINT/PDF)
          ===================================================================== */}
      <div className="no-print sticky top-0 z-50 bg-[#0B0C0E]/95 backdrop-blur-md border-b border-white/10 text-white px-4 py-2.5">
        <div className="max-w-[1180px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/proposal-assets/jezreel_logo_mark.png"
              alt="Jezreel Dave"
              className="h-6 w-auto"
            />
            <div>
              <div className="tpl-font-heading text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <span>Florence Choral — Interactive Proposal &amp; Contract</span>
                <span className="bg-[#F79223]/20 text-[#F79223] border border-[#F79223]/40 px-2 py-0.5 rounded-full text-[10px]">
                  Private Client Link
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Prepared by Jezreel Dave Leybag for Dr. Leonardo Sagliocca (florencechoral.org)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Switch between Full Proposal and Standalone Contract */}
            <div className="bg-white/10 p-0.5 rounded-full flex items-center text-xs">
              <button
                onClick={() => onSwitchMode('full-proposal')}
                className={`px-3 py-1 rounded-full font-semibold transition-colors cursor-pointer ${
                  mode === 'full-proposal'
                    ? 'bg-[#F79223] text-[#0B0C0E]'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                Full Proposal (12 Pages)
              </button>
              <button
                onClick={() => onSwitchMode('contract-only')}
                className={`px-3 py-1 rounded-full font-semibold transition-colors cursor-pointer ${
                  mode === 'contract-only'
                    ? 'bg-[#F79223] text-[#0B0C0E]'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                Standalone Contract (2 Pages)
              </button>
            </div>

            <button
              onClick={onOpenPrototype}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Open Live Website Prototype</span>
              <span>↗</span>
            </button>

            <button
              onClick={onOpenDashboard}
              className="px-3 py-1.5 rounded-full bg-[#136597] hover:bg-[#1778b3] text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Preview Admin Dashboard</span>
              <span>↗</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-full bg-white text-[#0B0C0E] hover:bg-neutral-200 text-xs font-bold transition-colors cursor-pointer"
            >
              Print / Save PDF
            </button>

            <a
              href={getAcceptMailto()}
              className="px-3.5 py-1.5 rounded-full bg-[#F79223] hover:bg-[#ffa53e] text-[#0B0C0E] text-xs font-bold transition-colors"
            >
              Accept Proposal ✉
            </a>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MAIN DOCUMENT STACK (816x1056 US LETTER PAGES)
          ===================================================================== */}
      <div className="tpl-print-wrapper py-8 px-3 flex flex-col gap-8 items-center">
        {mode === 'full-proposal' && (
          <>
            {/* ===============================================================
                PAGE 01: DARK COVER PAGE (MEASURED TEMPLATE PAGE 1)
                =============================================================== */}
            <section className="tpl-page tpl-page-cover">
              {/* Top Metadata Bar */}
              <div className="px-4 pb-3.5 border-b border-white/80 flex items-end justify-between text-[12px] text-white/90">
                <div>
                  <div className="text-white/70">Prepared on:</div>
                  <div className="font-semibold mt-0.5">2026-11-15</div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 border border-[#F79223]/50 px-3.5 py-1 rounded-full">
                  <img
                    src="/proposal-assets/jezreel_logo_mark.png"
                    alt="Jezreel Dave"
                    className="h-4 w-auto"
                  />
                  <span className="tpl-font-heading text-[10.5px] font-bold tracking-[0.08em] uppercase">
                    <span className="text-[#F79223]">J</span>EZREEL DAVE • DIGITAL &amp; MEDIA
                    PARTNER
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-white/70">Valid until:</div>
                  <div className="font-semibold mt-0.5">2026-12-31</div>
                </div>
              </div>

              {/* Hero Rounded Gradient Card (Measured 616px height, radius 32px) */}
              <div
                className="rounded-[32px] p-9 flex flex-col justify-between text-[#0B0C0E]"
                style={{
                  height: '616px',
                  background:
                    'radial-gradient(circle at 12% 88%, #F79223 0%, #FFAE45 34%, rgba(247, 146, 35, 0.32) 62%, transparent 84%), linear-gradient(145deg, #E5E5E3 0%, #DEDEDC 58%, #F5C384 100%)',
                }}
              >
                {/* Window Chrome Controls */}
                <div className="pb-5 border-b-[1.5px] border-[#0B0C0E] flex items-center justify-end gap-1.5">
                  <span className="w-[26px] h-[26px] rounded-full bg-[#F79223] border-[1.5px] border-[#0B0C0E]" />
                  <span className="w-[26px] h-[26px] rounded-full bg-transparent border-[1.5px] border-[#0B0C0E]" />
                  <span className="w-[82px] h-[26px] rounded-full bg-transparent border-[1.5px] border-[#0B0C0E]" />
                </div>

                {/* Display Title */}
                <div className="my-auto py-4">
                  <div className="inline-block tpl-font-heading text-[11px] font-bold uppercase tracking-[0.12em] bg-white/70 border border-[#0B0C0E] px-3.5 py-1 rounded-full mb-4">
                    florencechoral.org • Website, Dashboard, Marketing &amp; Unlimited Media
                  </div>
                  <h1 className="tpl-font-heading text-[58px] font-normal uppercase leading-[1.05] tracking-[0.01em] text-[#0B0C0E]">
                    WEBSITE
                    <br />
                    DEVELOPMENT
                    <br />
                    PROPOSAL
                    <svg
                      className="inline-block w-[54px] h-[54px] ml-3 -translate-y-1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M18 11V6C18 4.89543 17.1046 4 16 4C14.8954 4 14 4.89543 14 6V10M14 10V4.5C14 3.39543 13.1046 2.5 12 2.5C10.8954 2.5 10 3.39543 10 4.5V10M10 10V5.5C10 4.39543 9.10457 3.5 8 3.5C6.89543 3.5 6 4.39543 6 5.5V14L4.46482 12.1578C3.7322 11.2786 2.39913 11.2248 1.59792 12.04C0.903497 12.7466 0.874903 13.8712 1.53266 14.6122L6.3519 20.0413C7.47926 21.3113 9.09614 22 10.7935 22H14.5C17.8137 22 20.5 19.3137 20.5 16V11C20.5 9.89543 19.6046 9 18.5 9C17.3954 9 18 9.89543 18 11Z"
                        stroke="#0B0C0E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <br />
                    &amp; PARTNERSHIP
                  </h1>
                </div>

                {/* Bottom Subtitle Strip inside Hero Card */}
                <div className="pt-3 border-t border-black/20 flex items-center justify-between text-[12px] font-semibold">
                  <span>Custom Platform &amp; Dashboard</span>
                  <span>•</span>
                  <span>Global Choir Email Marketing</span>
                  <span>•</span>
                  <span>Unlimited Design &amp; Video</span>
                </div>
              </div>

              {/* Bottom Split Card (Measured 244px height, radius 32px) */}
              <div
                className="rounded-[32px] px-9 py-7 grid grid-cols-[1fr_1.5px_1fr] gap-8 items-stretch text-[#0B0C0E]"
                style={{
                  height: '244px',
                  background:
                    'radial-gradient(circle at 88% 84%, #F79223 0%, #FFAE45 32%, rgba(247, 146, 35, 0.25) 62%, transparent 85%), linear-gradient(135deg, #E5E5E3 0%, #DEDEDC 62%, #F3B973 100%)',
                }}
              >
                <div className="flex flex-col justify-between">
                  <div className="tpl-font-heading text-[18px] font-medium uppercase tracking-[0.01em]">
                    PREPARED BY:
                  </div>
                  <div className="my-auto">
                    <img
                      src="/proposal-assets/jezreel_logo_tagline.png"
                      alt="Jezreel Dave"
                      className="h-11 w-auto object-contain"
                    />
                  </div>
                  <div className="text-[13px] leading-snug">
                    <div className="font-bold text-[#0B0C0E]">Jezreel Dave Leybag</div>
                    <div>Jezreel Dave Digital &amp; Media</div>
                  </div>
                </div>

                <div className="bg-[#0B0C0E] w-[1.5px] h-full" />

                <div className="flex flex-col justify-between">
                  <div className="tpl-font-heading text-[18px] font-medium uppercase tracking-[0.01em]">
                    PREPARED FOR:
                  </div>
                  <div className="my-auto flex items-center gap-3">
                    <img
                      src="/proposal-assets/Florence_choral_quadrato.jpg"
                      alt="Florence Choral"
                      className="h-11 w-11 rounded-xl object-cover border border-black/20"
                    />
                    <span className="tpl-font-heading font-bold text-[15px] uppercase tracking-tight">
                      Florence Choral
                    </span>
                  </div>
                  <div className="text-[13px] leading-snug">
                    <div className="font-bold text-[#0B0C0E]">Dr. Leonardo Sagliocca</div>
                    <div>Founder &amp; Artistic Director • florencechoral.org</div>
                  </div>
                </div>
              </div>
            </section>

            {/* ===============================================================
                PAGE 02: INTRODUCTION (MEASURED TEMPLATE PAGE 2)
                =============================================================== */}
            <section className="tpl-page tpl-ambient-bottom">
              <div>
                {renderTemplateHeader(
                  'INTRODUCTION',
                  '01 / STORYLINE',
                  <svg
                    className="w-4 h-4 stroke-current"
                    fill="none"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}

                <p className="text-center text-[22px] leading-[1.42] text-[#0B0C0E] max-w-[680px] mx-auto mt-6 mb-8">
                  Thank you for the opportunity to expand our collaboration on{' '}
                  <strong className="font-semibold underline decoration-[#F79223] decoration-2">
                    Florence Choral
                  </strong>
                  . After working together on your festival posters, 31-page booklets, and 4-day
                  video reportages, I have built a complete working prototype for{' '}
                  <strong className="font-semibold">florencechoral.org</strong> to permanently solve
                  the broken links on your old website.
                </p>

                <div className="tpl-frosted-card space-y-4 text-[14.2px] leading-[1.6] text-[#141416]">
                  <p>
                    At <strong>Jezreel Dave Digital &amp; Media</strong>, I hold one goal above all
                    others: making sure your 5 annual Renaissance festivals look world-class and
                    consistently attract visiting choirs from around the globe. Because I am also a
                    trained choral singer and choirmaster, I understand the exact details conductors
                    look for—from competition categories and Vytautas Miškinis scores to Bel Canto
                    workshops and historic Florentine basilicas.
                  </p>

                  <p>
                    Right now, international conductors visiting <strong>florencechoral.com</strong>{' '}
                    encounter <em>403 Forbidden</em> errors on inner pages and have no direct way to
                    compare all 5 festivals or apply online. Furthermore, running 5 international
                    festivals solo leaves little time to design newsletters or email hundreds of
                    choral groups worldwide every month.
                  </p>

                  <p>
                    In this proposal, you will see our past work together, a 16:9 desktop
                    walkthrough of the new <strong>florencechoral.org</strong> website and{' '}
                    <strong>Admin Dashboard</strong>, and a transparent comparison showing how a
                    monthly partnership saves you thousands of Euros compared to paying per project.
                  </p>

                  <div className="pt-4 text-center">
                    <div className="text-[19px] font-normal text-[#0B0C0E] mb-4">
                      Thanks again for your trust and artistic partnership!
                    </div>
                    <img
                      src="/proposal-assets/jezreel_logo_tagline.png"
                      alt="Jezreel Dave"
                      className="h-9 w-auto mx-auto mb-1"
                    />
                    <div className="text-[12.5px] font-semibold text-[#0B0C0E]">
                      Jezreel Dave Leybag • Jezreel Dave Digital &amp; Media
                    </div>
                  </div>
                </div>
              </div>

              {renderPageFooter(2, 12, 'Introduction & Partnership Overview')}
            </section>

            {/* ===============================================================
                PAGE 03: EXECUTIVE SUMMARY & PAST WORK (MEASURED TEMPLATE PAGE 3)
                =============================================================== */}
            <section className="tpl-page">
              <div>
                {renderTemplateHeader(
                  'EXECUTIVE SUMMARY',
                  '02 / TRACK RECORD',
                  <svg
                    className="w-4 h-4 stroke-current"
                    fill="none"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                )}

                <p className="text-center text-[17px] leading-[1.38] text-[#0B0C0E] max-w-[690px] mx-auto mb-2">
                  <strong>Florence Choral</strong> requires a unified digital platform,{' '}
                  <strong>Admin &amp; Inquiry Dashboard</strong>, and year-round{' '}
                  <strong>international choir email marketing</strong> to grow choir registrations
                  across all 5 annual festivals.
                </p>

                <p className="text-center text-[12px] leading-[1.45] text-neutral-700 max-w-[650px] mx-auto mb-3">
                  Having already produced your official festival posters, 31-page programme
                  booklets, jury cards, and 4-day video reportages since 2022, I already know your
                  brand identity and quality standards inside-out.
                </p>

                <h3 className="text-center text-[16px] font-normal text-[#0B0C0E] mb-2.5">
                  Our past work together for Florence Choral includes:
                </h3>

                {/* 3 Rows of Past Work (Template Page 3 Exact 5-col / 7-col Grid) */}
                <div className="flex flex-col gap-2.5">
                  {PAST_FLORENCE_WORK_FEATURED.map((item, idx) => (
                    <div
                      key={item.id}
                      className="tpl-grid-12 bg-white/45 rounded-[20px] p-3 border border-black/10"
                    >
                      <div className="col-span-5 pr-2">
                        <div className="inline-block text-[9px] font-bold uppercase tracking-wider bg-[#F79223]/25 border border-[#0B0C0E] px-2 py-0.5 rounded-full mb-1">
                          Past Project 0{idx + 1} • {item.historicalRate}
                        </div>
                        <h4 className="tpl-font-heading text-[14px] font-bold text-[#0B0C0E] leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-neutral-700 mt-0.5 leading-snug">
                          {item.subtitle}
                        </p>
                        <div className="mt-1.5 text-[10px] bg-white/80 border-l-[3px] border-[#F79223] px-2 py-1 rounded">
                          <strong>Deliverables:</strong> {item.deliverables}
                        </div>
                      </div>
                      <div className="col-span-7">{renderPastWorkPrototypeSlot(item, true)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {renderPageFooter(3, 12, 'Executive Summary & Past Collaboration History')}
            </section>

            {/* ===============================================================
                PAGE 04: PAST WORK ARCHIVE SLOTS (6-PROJECT TEMPLATE GALLERY)
                =============================================================== */}
            <section className="tpl-page">
              <div>
                {renderTemplateHeader(
                  'PAST WORK ARCHIVE',
                  '2022 – 2024',
                  <svg
                    className="w-4 h-4 stroke-current"
                    fill="none"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                )}

                <p className="text-center text-[13.5px] leading-[1.4] text-neutral-800 max-w-[680px] mx-auto mb-3.5">
                  Prototype showcase slots for our completed{' '}
                  <strong>Florence Choral (2022–2024)</strong> posters, jury cards, 31-page booklet,
                  and 4-day festival video reportages.{' '}
                  <span className="no-print text-[#B45309] font-semibold">
                    (Click any slot below to attach or preview project files.)
                  </span>
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {PAST_WORK_GALLERY_SLOTS.map((slot) => (
                    <div
                      key={slot.id}
                      className="bg-white/55 rounded-[18px] p-2.5 border border-black/10 flex flex-col justify-between"
                    >
                      {renderPastWorkPrototypeSlot(slot, true)}
                      <div className="mt-2 px-1 flex items-start justify-between gap-2">
                        <div>
                          <h4 className="tpl-font-heading text-[12.5px] font-bold text-[#0B0C0E] leading-tight">
                            {slot.title}
                          </h4>
                          <p className="text-[10.5px] text-neutral-600 mt-0.5">{slot.subtitle}</p>
                        </div>
                        <span className="shrink-0 text-[9px] font-bold bg-[#0B0C0E] text-[#F79223] px-2 py-0.5 rounded-full">
                          {slot.historicalRate}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {renderPageFooter(4, 12, 'Past Florence Choral Deliverables (2022–2024)')}
            </section>

            {/* ===============================================================
                PAGE 05: SOLUTION OUTLINE & ADMIN DASHBOARD (TEMPLATE PAGE 4)
                =============================================================== */}
            <section className="tpl-page tpl-ambient-center">
              <div>
                {renderTemplateHeader(
                  'SOLUTION OUTLINE',
                  '03 / PLATFORM',
                  <svg
                    className="w-4 h-4 stroke-current"
                    fill="none"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}

                <p className="text-[13.8px] leading-[1.6] text-[#0B0C0E] mb-6">
                  <strong>Jezreel Dave Digital &amp; Media</strong> has engineered{' '}
                  <strong>florencechoral.org</strong> with a custom{' '}
                  <strong>Admin &amp; Choir Inquiry Dashboard</strong>, managed cloud backend (
                  <strong>$28/mo server cost included</strong>), and official domain setup (
                  <strong>$10/yr included</strong>). This complete system allows you to do the
                  following as soon as your website is launched:
                </p>

                {/* Central Frosted Card with Vertical Divider Lines (Exact Template Page 4 Pattern) */}
                <div className="tpl-frosted-card py-10 px-10 text-center my-4">
                  <div className="text-[22px] leading-[1.35] text-[#0B0C0E]">
                    Easily update festival dates, 4-day programmes, and jury rosters via your{' '}
                    <strong className="font-semibold">Admin Dashboard</strong>
                  </div>

                  <div className="w-[1.5px] h-[36px] bg-[#0B0C0E] mx-auto my-4" />

                  <div className="text-[22px] leading-[1.35] text-[#0B0C0E]">
                    Send monthly <strong className="font-semibold">email newsletters</strong> and
                    proactive invitations to{' '}
                    <strong className="font-semibold">choral groups around the world</strong>
                  </div>

                  <div className="w-[1.5px] h-[36px] bg-[#0B0C0E] mx-auto my-4" />

                  <div className="text-[22px] leading-[1.35] text-[#0B0C0E]">
                    Receive unlimited{' '}
                    <strong className="font-semibold">
                      posters, 31-page booklets, diplomas, and festival reportage videos
                    </strong>{' '}
                    year-round
                  </div>

                  {/* Interactive Demo Buttons (Web Only) */}
                  <div className="no-print mt-7 pt-5 border-t border-black/10 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={onOpenPrototype}
                      className="px-5 py-2.5 rounded-full bg-[#0B0C0E] text-white text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      Explore Live Website Prototype ↗
                    </button>
                    <button
                      onClick={onOpenDashboard}
                      className="px-5 py-2.5 rounded-full bg-[#F79223] text-[#0B0C0E] border border-[#0B0C0E] text-xs font-bold hover:bg-[#ffa742] transition-colors cursor-pointer"
                    >
                      Test Live Admin &amp; Choir Inquiry Dashboard ↗
                    </button>
                  </div>
                </div>

                <p className="text-center text-[18px] leading-[1.45] text-[#0B0C0E] max-w-[670px] mx-auto mt-7">
                  Your site and database are hosted on modern cloud infrastructure with{' '}
                  <strong>100% Client-Owned source code and admin keys</strong>—ensuring your
                  website is fast, secure, and can never be locked away from you again.
                </p>
              </div>

              {renderPageFooter(5, 12, 'Solution Outline, Admin Dashboard & Cloud Infrastructure')}
            </section>

            {/* ===============================================================
                PAGE 06: PROTOTYPE WALKTHROUGH 1/2 (16:9 DESKTOP SCREENSHOTS)
                =============================================================== */}
            <section className="tpl-page">
              <div>
                {renderTemplateHeader(
                  'PROTOTYPE WALKTHROUGH',
                  '16:9 DESKTOP (1/2)',
                  <svg
                    className="w-4 h-4 stroke-current"
                    fill="none"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" strokeLinecap="round" />
                  </svg>
                )}

                <p className="text-[12.5px] text-neutral-700 mb-3.5">
                  Captured in <strong>16:9 widescreen desktop resolution</strong>. Every section was
                  designed using established <strong>UX/UI Design Laws</strong> so visiting choir
                  directors can compare festivals and register effortlessly:
                </p>

                <div className="flex flex-col gap-3.5">
                  {PROTOTYPE_SLIDES_PAGE_1.map((slide) => (
                    <div
                      key={slide.num}
                      className="tpl-grid-12 bg-white/50 rounded-[20px] p-3 border border-black/10"
                    >
                      <div className="col-span-5 pr-2">
                        <h3 className="tpl-font-heading text-[14.5px] font-bold text-[#0B0C0E] leading-snug">
                          {slide.num}. {slide.title}
                        </h3>
                        <p className="text-[11px] text-neutral-700 mt-1 leading-snug">
                          {slide.whatWeDid}
                        </p>
                        <div className="mt-2 bg-white border border-[#0B0C0E] border-l-4 border-l-[#F79223] rounded-xl p-2 text-[10.5px] leading-snug">
                          <strong className="tpl-font-heading uppercase text-[9.5px] tracking-wider block text-[#0B0C0E] mb-0.5">
                            {slide.designLawTitle}
                          </strong>
                          {slide.designLawBody}
                        </div>
                      </div>
                      <div className="col-span-7">{renderBrowserMockup(slide.img, slide.title)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {renderPageFooter(6, 12, '16:9 Desktop Prototype Walkthrough & UX Design Laws (Part 1)')}
            </section>

            {/* ===============================================================
                PAGE 07: PROTOTYPE WALKTHROUGH 2/2 (16:9 DESKTOP SCREENSHOTS)
                =============================================================== */}
            <section className="tpl-page">
              <div>
                {renderTemplateHeader(
                  'PROTOTYPE WALKTHROUGH',
                  '16:9 DESKTOP (2/2)',
                  <svg
                    className="w-4 h-4 stroke-current"
                    fill="none"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" strokeLinecap="round" />
                  </svg>
                )}

                <div className="flex flex-col gap-2.5">
                  {PROTOTYPE_SLIDES_PAGE_2.map((slide) => (
                    <div
                      key={slide.num}
                      className="tpl-grid-12 bg-white/50 rounded-[18px] p-2.5 border border-black/10"
                    >
                      <div className="col-span-5 pr-1">
                        <h3 className="tpl-font-heading text-[13.5px] font-bold text-[#0B0C0E] leading-tight">
                          {slide.num}. {slide.title}
                        </h3>
                        <p className="text-[10.5px] text-neutral-700 mt-1 leading-snug">
                          {slide.whatWeDid}
                        </p>
                        <div className="mt-1.5 bg-white border border-[#0B0C0E] border-l-4 border-l-[#F79223] rounded-lg p-1.5 text-[10px] leading-snug">
                          <strong className="tpl-font-heading uppercase text-[9px] tracking-wider block text-[#0B0C0E]">
                            {slide.designLawTitle}
                          </strong>
                          {slide.designLawBody}
                        </div>
                      </div>
                      <div className="col-span-7">
                        <div className="tpl-browser-backdrop" style={{ padding: '7px 11px' }}>
                          <div
                            onClick={() => setLightboxImg({ src: slide.img, title: slide.title })}
                            className="bg-[#0B0C0E] rounded-[8px] overflow-hidden border border-black/80 shadow cursor-zoom-in"
                          >
                            <div className="bg-[#F4F4F5] h-[12px] px-2 flex items-center justify-between border-b border-neutral-300">
                              <div className="flex flex-col gap-[1.5px]">
                                <span className="w-2 h-[1.2px] bg-neutral-800 block" />
                                <span className="w-2 h-[1.2px] bg-neutral-800 block" />
                                <span className="w-2 h-[1.2px] bg-neutral-800 block" />
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full border border-neutral-800 bg-[#F79223]" />
                                <span className="w-1.5 h-1.5 rounded-full border border-neutral-800 bg-white" />
                                <span className="w-1.5 h-1.5 rounded-full border border-neutral-800 bg-white" />
                              </div>
                            </div>
                            <img
                              src={slide.img}
                              alt={slide.title}
                              className="w-full h-[116px] object-cover object-top block"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {renderPageFooter(7, 12, '16:9 Desktop Prototype Walkthrough & UX Design Laws (Part 2)')}
            </section>

            {/* ===============================================================
                PAGE 08: SITE STRUCTURE, INTEGRATIONS & ADDITIONAL FEATURES (TEMPLATE PAGE 5)
                =============================================================== */}
            <section className="tpl-page">
              <div className="flex flex-col justify-between flex-1 pb-3">
                {/* Band 1: Site Structure */}
                <div>
                  <div className="tpl-grid-12 items-start mb-4">
                    <div className="col-span-5">
                      <h2 className="tpl-font-heading text-[28px] font-semibold uppercase leading-[1.08] text-[#0B0C0E]">
                        SITE
                        <br />
                        STRUCTURE
                      </h2>
                    </div>
                    <div className="col-span-7 text-[14.5px] leading-relaxed text-[#0B0C0E]">
                      Your new <strong>florencechoral.org</strong> website includes all core
                      navigation views, interactive festival rule modals, and historical archives:
                    </div>
                  </div>

                  <div className="tpl-pill-banner">
                    <div className="flex items-center justify-around text-center pb-4">
                      <span className="text-[20px] font-normal flex-1">Home &amp; Hero</span>
                      <span className="w-[1.5px] h-9 bg-[#0B0C0E]" />
                      <span className="text-[20px] font-normal flex-1">5 Festivals</span>
                      <span className="w-[1.5px] h-9 bg-[#0B0C0E]" />
                      <span className="text-[20px] font-normal flex-1">Artistic Committee</span>
                      <span className="w-[1.5px] h-9 bg-[#0B0C0E]" />
                      <span className="text-[20px] font-normal flex-1">Historic Venues</span>
                    </div>
                    <div className="flex items-center justify-around text-center pt-3 border-t border-black/15">
                      <span className="text-[13px] flex-1">Composers &amp; Hymn</span>
                      <span className="w-[1.2px] h-5 bg-[#0B0C0E]" />
                      <span className="text-[13px] flex-1">Testimonials</span>
                      <span className="w-[1.2px] h-5 bg-[#0B0C0E]" />
                      <span className="text-[13px] flex-1">Photo &amp; Video Archives</span>
                      <span className="w-[1.2px] h-5 bg-[#0B0C0E]" />
                      <span className="text-[13px] flex-1">Florence &amp; Contacts</span>
                    </div>
                  </div>
                </div>

                {/* Band 2: Site Integrations */}
                <div>
                  <div className="tpl-grid-12 items-start mb-4">
                    <div className="col-span-5">
                      <h2 className="tpl-font-heading text-[28px] font-semibold uppercase leading-[1.08] text-[#0B0C0E]">
                        SITE
                        <br />
                        INTEGRATIONS
                      </h2>
                    </div>
                    <div className="col-span-7 text-[14.5px] leading-relaxed text-[#0B0C0E]">
                      <strong>Jezreel Dave Digital &amp; Media</strong> integrates your site with
                      the following management and international marketing systems:
                    </div>
                  </div>

                  <div className="tpl-pill-banner">
                    <div className="flex items-center justify-around text-center">
                      <span className="text-[19px] leading-snug flex-1">
                        Admin &amp; Inquiry
                        <br />
                        Dashboard
                      </span>
                      <span className="w-[1.5px] h-11 bg-[#0B0C0E]" />
                      <span className="text-[19px] leading-snug flex-1">
                        Monthly Email
                        <br />
                        Newsletters
                      </span>
                      <span className="w-[1.5px] h-11 bg-[#0B0C0E]" />
                      <span className="text-[19px] leading-snug flex-1">
                        Global Choir
                        <br />
                        Email Outreach
                      </span>
                    </div>
                    <p className="text-center text-[12px] text-[#0B0C0E] mt-4 pt-3 border-t border-black/15 max-w-[560px] mx-auto">
                      These integrations turn <strong>florencechoral.org</strong> into a proactive
                      international recruitment engine that brings more participating choirs to
                      Florence every season.
                    </p>
                  </div>
                </div>

                {/* Band 3: Additional Features */}
                <div>
                  <div className="tpl-grid-12 items-start mb-4">
                    <div className="col-span-5">
                      <h2 className="tpl-font-heading text-[28px] font-semibold uppercase leading-[1.08] text-[#0B0C0E]">
                        ADDITIONAL
                        <br />
                        FEATURES
                      </h2>
                    </div>
                    <div className="col-span-7 text-[14.5px] leading-relaxed text-[#0B0C0E]">
                      Based on your festival calendar and annual media requirements, your monthly
                      partnership also includes:
                    </div>
                  </div>

                  <div className="tpl-pill-banner">
                    <div className="flex items-center justify-around text-center py-2">
                      <span className="text-[18px] leading-snug flex-1">
                        Unlimited Posters
                        <br />
                        &amp; Stage Banners
                      </span>
                      <span className="w-[1.5px] h-10 bg-[#0B0C0E]" />
                      <span className="text-[18px] leading-snug flex-1">
                        31-Page Booklets
                        <br />
                        &amp; Choir Diplomas
                      </span>
                      <span className="w-[1.5px] h-10 bg-[#0B0C0E]" />
                      <span className="text-[18px] leading-snug flex-1">
                        5–7 Min Video
                        <br />
                        Reportages &amp; Reels
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {renderPageFooter(
                8,
                12,
                'Site Structure, Marketing Integrations & Unlimited Media Studio'
              )}
            </section>

            {/* ===============================================================
                PAGE 09: EXECUTION TIMELINE (MEASURED TEMPLATE PAGE 6)
                =============================================================== */}
            <section className="tpl-page tpl-ambient-center">
              <div>
                {renderTemplateHeader(
                  'EXECUTION TIMELINE',
                  '04 / ROADMAP',
                  <svg
                    className="w-4 h-4 stroke-current"
                    fill="none"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" strokeLinecap="round" />
                  </svg>
                )}

                <p className="text-center text-[23px] leading-[1.4] text-[#0B0C0E] max-w-[660px] mx-auto mt-6 mb-8">
                  The following table details our projected execution timeline for launching{' '}
                  <strong>florencechoral.org</strong> and starting your year-round marketing and
                  media operations.
                </p>

                <div className="tpl-frosted-card py-10 px-11">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b-[1.5px] border-[#0B0C0E] text-[14.5px] font-bold">
                        <th className="pb-3 w-[56%]">Stage</th>
                        <th className="pb-3">Completion Date / Target</th>
                      </tr>
                    </thead>
                    <tbody className="text-[14px] divide-y divide-[#0B0C0E]">
                      <tr>
                        <td className="py-4 font-medium">
                          1. Functional Website Prototype &amp; UI Architecture
                        </td>
                        <td className="py-4 font-bold text-[#B45309]">
                          Completed &amp; Ready for Review Today
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 font-medium">
                          2. Domain Setup (florencechoral.org) &amp; Cloud Backend
                        </td>
                        <td className="py-4">Within 48 Hours of Agreement</td>
                      </tr>
                      <tr>
                        <td className="py-4 font-medium">
                          3. Admin &amp; Choir Inquiry Dashboard Activation
                        </td>
                        <td className="py-4">Week 1 of Partnership</td>
                      </tr>
                      <tr>
                        <td className="py-4 font-medium">
                          4. Official Festival Posters, Brochures &amp; Booklet Updates
                        </td>
                        <td className="py-4">Weeks 1 – 2 (Then On-Demand)</td>
                      </tr>
                      <tr>
                        <td className="py-4 font-medium">
                          5. Global Choir Database &amp; First Outreach Newsletter
                        </td>
                        <td className="py-4">Week 2 (Then Every Month)</td>
                      </tr>
                      <tr className="border-b-[1.5px] border-[#0B0C0E]">
                        <td className="py-4 font-medium">
                          6. Ongoing Web Maintenance, Design, Video &amp; Outreach
                        </td>
                        <td className="py-4 font-semibold">Continuous Year-Round (All 5 Festivals)</td>
                      </tr>
                    </tbody>
                  </table>

                  <p className="text-[11px] leading-[1.45] text-neutral-700 mt-8">
                    Note: Because the working prototype of <strong>florencechoral.org</strong> and
                    the <strong>Admin Dashboard</strong> have already been engineered ahead of our
                    meeting, we can transition your live domain immediately without waiting weeks
                    for initial development.
                  </p>
                </div>
              </div>

              {renderPageFooter(9, 12, 'Execution Timeline & Immediate Launch Roadmap')}
            </section>

            {/* ===============================================================
                PAGE 10: PROJECT COSTS & PER-PROJECT SAVINGS COMPARISON (TEMPLATE PAGE 7)
                =============================================================== */}
            <section className="tpl-page tpl-ambient-center">
              <div>
                {renderTemplateHeader(
                  'PROJECT COSTS & SAVINGS',
                  '05 / VALUE MATH',
                  <svg
                    className="w-4 h-4 stroke-current"
                    fill="none"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M17.5 7.5C16.2 6.2 14.4 5.5 12.5 5.5 8.6 5.5 5.5 8.6 5.5 12.5s3.1 7 7 7c1.9 0 3.7-.7 5-2M4 10.5h9.5M4 14.5h9.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}

                <p className="text-center text-[17px] leading-[1.4] text-[#0B0C0E] max-w-[690px] mx-auto mb-4">
                  Below is the transparent comparison between paying <strong>per project</strong>{' '}
                  (using our exact historical rates of <strong>€50/poster set</strong>,{' '}
                  <strong>€150/booklet</strong>, and <strong>€150/video reportage</strong> plus the
                  new website, dashboard, hosting, and global choir outreach) versus our{' '}
                  <strong>Monthly Partnership Plan</strong>:
                </p>

                <div className="tpl-frosted-card py-5 px-6">
                  {/* Interactive Sliders on Web Only */}
                  <div className="no-print mb-3 p-3 rounded-2xl bg-white/80 border border-black/15">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#0B0C0E] mb-2 flex items-center justify-between">
                      <span>Interactive Annual Workload Simulator (Adjust Sliders to Test):</span>
                      <button
                        onClick={() => {
                          setCalcPosters(10);
                          setCalcBooklets(6);
                          setCalcVideos(9);
                          setCalcMonths(12);
                        }}
                        className="text-[10px] underline text-[#B45309] cursor-pointer"
                      >
                        Reset to 5-Festival Standard
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-[11px]">
                      <label className="flex flex-col">
                        <span className="font-semibold">
                          Poster Sets / Yr: <strong>{calcPosters}</strong> (€{calcPosters * 50})
                        </span>
                        <input
                          type="range"
                          min={5}
                          max={20}
                          value={calcPosters}
                          onChange={(e) => setCalcPosters(Number(e.target.value))}
                          className="accent-[#F79223]"
                        />
                      </label>
                      <label className="flex flex-col">
                        <span className="font-semibold">
                          Booklets &amp; Rulebooks: <strong>{calcBooklets}</strong> (€
                          {calcBooklets * 150})
                        </span>
                        <input
                          type="range"
                          min={1}
                          max={10}
                          value={calcBooklets}
                          onChange={(e) => setCalcBooklets(Number(e.target.value))}
                          className="accent-[#F79223]"
                        />
                      </label>
                      <label className="flex flex-col">
                        <span className="font-semibold">
                          Reportages &amp; Promo Videos: <strong>{calcVideos}</strong> (€
                          {calcVideos * 150})
                        </span>
                        <input
                          type="range"
                          min={2}
                          max={15}
                          value={calcVideos}
                          onChange={(e) => setCalcVideos(Number(e.target.value))}
                          className="accent-[#F79223]"
                        />
                      </label>
                    </div>
                  </div>

                  <table className="w-full border-collapse text-left text-[11.5px]">
                    <thead>
                      <tr className="border-b-[1.5px] border-[#0B0C0E] tpl-font-heading text-[10.5px] uppercase">
                        <th className="py-2 w-[42%]">Annual Deliverable / Service</th>
                        <th className="py-2 w-[20%]">Per-Project Rate</th>
                        <th className="py-2 w-[18%]">Per-Project / Yr</th>
                        <th className="py-2 w-[20%] text-right">Monthly Partnership</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/15">
                      <tr>
                        <td className="py-2">
                          <strong>1. Full Website Rebuild (florencechoral.org)</strong>
                        </td>
                        <td className="py-2">€1,500 one-time</td>
                        <td className="py-2 font-semibold">€1,500 EUR</td>
                        <td className="py-2 text-right font-bold text-[#0B0C0E]">
                          Covered by €1,600
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">
                          <strong>2. Custom Admin &amp; Choir Inquiry Dashboard</strong>
                        </td>
                        <td className="py-2">€600 one-time</td>
                        <td className="py-2 font-semibold">€600 EUR</td>
                        <td className="py-2 text-right font-bold text-[#0B0C0E]">
                          Downpayment (Saves €500)
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">
                          <strong>3. Cloud Backend ($28/mo), Domain ($10/yr) &amp; Updates</strong>
                        </td>
                        <td className="py-2">€75 / month × 12</td>
                        <td className="py-2 font-semibold">€900 EUR / yr</td>
                        <td className="py-2 text-right font-bold text-[#B45309]">
                          ✓ Included (I pay server)
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">
                          <strong>4. Festival Poster Sets &amp; Social Packs</strong> (Your €50
                          rate)
                        </td>
                        <td className="py-2">€50 × {calcPosters} sets/yr</td>
                        <td className="py-2 font-semibold">€{calcPosters * 50} EUR / yr</td>
                        <td className="py-2 text-right font-bold text-[#B45309]">
                          ✓ Unlimited Included
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">
                          <strong>5. 31-Page Booklets, Rulebooks &amp; Diplomas</strong> (Your €150
                          rate)
                        </td>
                        <td className="py-2">€150 × {calcBooklets} editions/yr</td>
                        <td className="py-2 font-semibold">€{calcBooklets * 150} EUR / yr</td>
                        <td className="py-2 text-right font-bold text-[#B45309]">
                          ✓ Unlimited Included
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">
                          <strong>6. Video Reportages (5–7m) &amp; Trailers</strong> (Your €150
                          rate)
                        </td>
                        <td className="py-2">€150 × {calcVideos} videos/yr</td>
                        <td className="py-2 font-semibold">€{calcVideos * 150} EUR / yr</td>
                        <td className="py-2 text-right font-bold text-[#B45309]">
                          ✓ Unlimited Included
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">
                          <strong>7. Monthly Email Newsletters to Contacts</strong> (2/mo)
                        </td>
                        <td className="py-2">€150 / month × 12</td>
                        <td className="py-2 font-semibold">€1,800 EUR / yr</td>
                        <td className="py-2 text-right font-bold text-[#B45309]">
                          ✓ Included Every Month
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">
                          <strong>8. Global Choir Email Outreach</strong> (Recruiting Choirs)
                        </td>
                        <td className="py-2">€250 / month × 12</td>
                        <td className="py-2 font-semibold">€3,000 EUR / yr</td>
                        <td className="py-2 text-right font-bold text-[#B45309]">
                          ✓ Included Every Month
                        </td>
                      </tr>
                      <tr className="border-t-2 border-[#0B0C0E] bg-white/70 font-bold text-[12px]">
                        <td className="py-2.5 pl-2">TOTAL YEAR 1 VALUE vs. PARTNERSHIP COST</td>
                        <td className="py-2.5">All 8 Pillars Above</td>
                        <td className="py-2.5 line-through text-red-700">
                          €{totalYear1PerProject.toLocaleString()} EUR
                        </td>
                        <td className="py-2.5 pr-2 text-right text-[#0B0C0E]">
                          €{planAYear1.toLocaleString()} EUR (€1,600 + €500/mo)
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Savings & Choir Registration ROI Callout */}
                  <div className="mt-3.5 bg-[#0B0C0E] text-white rounded-2xl p-3.5 flex items-center justify-between gap-4">
                    <div className="text-[11px] leading-snug">
                      <div className="text-[#F79223] font-bold uppercase tracking-wider text-[10px]">
                        Immediate Savings + Choir Registration Return on Investment
                      </div>
                      <div className="mt-0.5 text-neutral-200">
                        With your festival fees (<strong>€200 base registration</strong> +{' '}
                        <strong>€150 additional category</strong> +{' '}
                        <strong>€40 composition entry</strong> + official hotel packages),
                        recruiting just <strong>1–2 extra visiting choirs per festival</strong> from
                        our global email outreach pays for the entire year.
                      </div>
                    </div>
                    <div className="shrink-0 bg-[#F79223] text-[#0B0C0E] px-4 py-2 rounded-xl text-center">
                      <div className="text-[9.5px] font-bold uppercase">You Save</div>
                      <div className="tpl-font-heading text-[18px] font-extrabold leading-none">
                        €{year1Savings.toLocaleString()} EUR
                      </div>
                      <div className="text-[9px] font-semibold mt-0.5">
                        in Year 1 (€{year2Savings.toLocaleString()}/yr after)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {renderPageFooter(
                10,
                12,
                'Annual Expense Breakdown: Per-Project vs. Monthly Salary Savings'
              )}
            </section>

            {/* ===============================================================
                PAGE 11: ONGOING MONTHLY FEES & PAYMENT PLAN SELECTOR (TEMPLATE PAGE 8)
                =============================================================== */}
            <section className="tpl-page tpl-ambient-center">
              <div>
                {renderTemplateHeader(
                  'ONGOING FEES & OFFER',
                  '06 / PARTNERSHIP',
                  <svg
                    className="w-4 h-4 stroke-current"
                    fill="none"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v4l2.5 2.5" strokeLinecap="round" />
                  </svg>
                )}

                <p className="text-center text-[20px] leading-[1.42] text-[#0B0C0E] max-w-[670px] mx-auto mt-3 mb-6">
                  Choose the payment structure that works best for{' '}
                  <strong>Florence Choral’s</strong> festival calendar. Both options include the
                  exact same <strong>all-inclusive scope</strong> and{' '}
                  <strong>100% Client Ownership</strong>:
                </p>

                <div className="tpl-frosted-card py-7 px-8">
                  <div className="grid grid-cols-2 gap-5">
                    {/* Option A: Recommended (€1,600 Down + €500/mo) */}
                    <div
                      onClick={() => setSelectedPlan('planA')}
                      className={`rounded-[24px] p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        selectedPlan === 'planA'
                          ? 'bg-white border-[#0B0C0E] shadow-xl ring-2 ring-[#F79223]'
                          : 'bg-white/60 border-black/20 hover:bg-white/80'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="tpl-font-heading text-[10px] font-bold uppercase tracking-wider bg-[#F79223] text-[#0B0C0E] px-2.5 py-0.5 rounded-full">
                            Option A • Recommended (Maximum Savings)
                          </span>
                          {selectedPlan === 'planA' && (
                            <span className="text-xs font-bold text-[#0B0C0E]">✓ Selected</span>
                          )}
                        </div>
                        <h3 className="tpl-font-heading text-[20px] font-bold text-[#0B0C0E]">
                          Setup + Low Monthly Salary
                        </h3>
                        <div className="mt-3 pb-3 border-b border-black/15">
                          <div className="tpl-font-heading text-[28px] font-extrabold text-[#0B0C0E] leading-none">
                            €1,600 EUR{' '}
                            <span className="text-[13px] font-semibold text-neutral-600">
                              One-Time Downpayment
                            </span>
                          </div>
                          <div className="tpl-font-heading text-[22px] font-bold text-[#B45309] mt-1">
                            + €500 EUR / Month
                          </div>
                        </div>

                        <ul className="mt-3 space-y-1.5 text-[12px] text-neutral-800">
                          <li>
                            ✓ <strong>€1,600 Downpayment</strong> covers Full Website Rebuild
                            (florencechoral.org) + Custom Admin Dashboard.
                          </li>
                          <li>
                            ✓ <strong>€500/Month Salary</strong> covers all ongoing web updates,{' '}
                            <strong>$28/mo backend &amp; $10/yr domain</strong>.
                          </li>
                          <li>
                            ✓ <strong>Unlimited Graphic Design</strong> (All 5 festival poster sets,
                            31-page booklets, diplomas &amp; banners).
                          </li>
                          <li>
                            ✓ <strong>Unlimited Video Editing</strong> (5–7 min festival reportages,
                            trailers &amp; reels).
                          </li>
                          <li>
                            ✓ <strong>Monthly Newsletters &amp; Global Choir Outreach</strong>.
                          </li>
                        </ul>
                      </div>

                      <div className="mt-4 pt-3 border-t border-black/10 text-[11.5px] font-bold text-[#0B0C0E] flex items-center justify-between">
                        <span>Year 1 Total: €7,600 EUR</span>
                        <span className="text-green-800">Saves €2,950 EUR</span>
                      </div>
                    </div>

                    {/* Option B: Zero Upfront (€0 Down + €650/mo Year 1, then €500/mo) */}
                    <div
                      onClick={() => setSelectedPlan('planB')}
                      className={`rounded-[24px] p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        selectedPlan === 'planB'
                          ? 'bg-white border-[#0B0C0E] shadow-xl ring-2 ring-[#F79223]'
                          : 'bg-white/60 border-black/20 hover:bg-white/80'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="tpl-font-heading text-[10px] font-bold uppercase tracking-wider bg-[#0B0C0E] text-white px-2.5 py-0.5 rounded-full">
                            Option B • Zero Upfront Cash-Flow Plan
                          </span>
                          {selectedPlan === 'planB' && (
                            <span className="text-xs font-bold text-[#0B0C0E]">✓ Selected</span>
                          )}
                        </div>
                        <h3 className="tpl-font-heading text-[20px] font-bold text-[#0B0C0E]">
                          Zero Downpayment Flat Monthly
                        </h3>
                        <div className="mt-3 pb-3 border-b border-black/15">
                          <div className="tpl-font-heading text-[28px] font-extrabold text-[#0B0C0E] leading-none">
                            €0 EUR{' '}
                            <span className="text-[13px] font-semibold text-neutral-600">
                              Upfront Downpayment
                            </span>
                          </div>
                          <div className="tpl-font-heading text-[22px] font-bold text-[#B45309] mt-1">
                            €650 EUR / Month{' '}
                            <span className="text-[11.5px] font-medium text-neutral-600">
                              (Drops to €500/mo in Yr 2)
                            </span>
                          </div>
                        </div>

                        <ul className="mt-3 space-y-1.5 text-[12px] text-neutral-800">
                          <li>
                            ✓ <strong>€0 Upfront:</strong> Spreads the website &amp; dashboard build
                            smoothly across Year 1.
                          </li>
                          <li>
                            ✓ <strong>Automatically drops to €500/month</strong> after Month 12 so
                            you never overpay for the website build.
                          </li>
                          <li>
                            ✓ Includes <strong>$28/mo backend &amp; $10/yr domain</strong> covered
                            by me.
                          </li>
                          <li>
                            ✓ Includes <strong>Unlimited Graphic Design &amp; Video Editing</strong>
                            .
                          </li>
                          <li>
                            ✓ Includes{' '}
                            <strong>Monthly Newsletters &amp; Global Choir Outreach</strong>.
                          </li>
                        </ul>
                      </div>

                      <div className="mt-4 pt-3 border-t border-black/10 text-[11.5px] font-bold text-[#0B0C0E] flex items-center justify-between">
                        <span>Year 1 Total: €7,800 EUR</span>
                        <span className="text-green-800">Saves €2,750 EUR</span>
                      </div>
                    </div>
                  </div>

                  {/* Hard Infrastructure Cost Transparency Note */}
                  <div className="mt-5 p-3.5 rounded-2xl bg-white/80 border border-black/15 text-[11.5px] text-neutral-800 flex items-center justify-between gap-4">
                    <div>
                      <strong>Infrastructure Included at €0 Extra Cost to You:</strong> I cover the
                      annual domain renewal (<strong>florencechoral.org</strong>), the{' '}
                      <strong>$28/month cloud backend &amp; database</strong>, and professional
                      creative/email software tools out of my monthly retainer.
                    </div>
                    <a
                      href={getAcceptMailto()}
                      className="no-print shrink-0 px-4 py-2 rounded-full bg-[#0B0C0E] text-[#F79223] font-bold text-xs hover:bg-neutral-800 transition-colors"
                    >
                      Approve {selectedPlan === 'planA' ? 'Option A' : 'Option B'} ✉
                    </a>
                  </div>
                </div>
              </div>

              {renderPageFooter(
                11,
                12,
                'Ongoing Monthly Fees & Flexible Payment Structure Selection'
              )}
            </section>
          </>
        )}

        {/* ===================================================================
            PAGE 12 (OR PAGE 1 OF STANDALONE CONTRACT): TERMS OF AGREEMENT (TEMPLATE PAGES 9 & 10)
            =================================================================== */}
        <section className="tpl-page tpl-ambient-bottom">
          <div>
            {renderTemplateHeader(
              'TERMS OF AGREEMENT',
              selectedPlan === 'planA' ? '€1,600 + €500/MO' : '€650/MO PLAN',
              <svg
                className="w-4 h-4 stroke-current"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M8.5 12.5l2.3 2.3 4.7-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}

            {/* Parties Strip */}
            <div className="bg-white/70 border border-[#0B0C0E] rounded-[20px] p-3.5 mb-5 grid grid-cols-[1fr_1.5px_1fr] gap-5 items-center text-[12px]">
              <div className="flex items-center gap-3">
                <img
                  src="/proposal-assets/jezreel_logo_mark.png"
                  alt="Jezreel Dave"
                  className="h-7 w-auto"
                />
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-[#0B0C0E] text-[#F79223] px-2 py-0.5 rounded">
                    Service Provider
                  </span>
                  <div className="font-bold text-[#0B0C0E] mt-0.5">
                    Jezreel Dave Leybag • Jezreel Dave Digital &amp; Media
                  </div>
                </div>
              </div>
              <div className="bg-[#0B0C0E] w-[1.5px] h-full" />
              <div className="flex items-center gap-3">
                <img
                  src="/proposal-assets/Florence_choral_quadrato.jpg"
                  alt="Florence Choral"
                  className="h-8 w-8 rounded-lg object-cover border border-black/20"
                />
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-[#0B0C0E] text-[#F79223] px-2 py-0.5 rounded">
                    Client
                  </span>
                  <div className="font-bold text-[#0B0C0E] mt-0.5">
                    Dr. Leonardo Sagliocca • Florence Choral (florencechoral.org)
                  </div>
                </div>
              </div>
            </div>

            {/* Template Page 9–10 Two-Column Clauses (3 cols label / 9 cols content) */}
            <div className="space-y-3.5 text-[12px] leading-[1.48] text-[#141416]">
              <div className="tpl-grid-12 items-start pb-3 border-b border-black/15">
                <div className="col-span-3 tpl-font-heading text-[14.5px] font-semibold text-[#0B0C0E]">
                  Authorization &amp; Scope
                </div>
                <div className="col-span-9">
                  <strong>Florence Choral (Dr. Leonardo Sagliocca)</strong> engages{' '}
                  <strong>Jezreel Dave Leybag</strong> as an independent contractor for the{' '}
                  <strong>florencechoral.org</strong> website rebuild, Admin &amp; Inquiry
                  Dashboard, cloud hosting/domain administration, monthly email newsletters,
                  international choir email outreach, and unlimited graphic design (posters, 31-page
                  booklets, diplomas, banners) and video editing (5–7 min festival reportages &amp;
                  promotional reels) across all five (5) annual festivals.
                </div>
              </div>

              <div className="tpl-grid-12 items-start pb-3 border-b border-black/15">
                <div className="col-span-3 tpl-font-heading text-[14.5px] font-semibold text-[#0B0C0E]">
                  Payment &amp; Inclusions
                </div>
                <div className="col-span-9">
                  {selectedPlan === 'planA' ? (
                    <>
                      <strong>Option A (Setup + Monthly Salary):</strong> A one-time setup fee of{' '}
                      <strong>€1,600.00 EUR</strong> upon agreement to launch{' '}
                      <strong>florencechoral.org</strong> and the Admin Dashboard, followed by a
                      flat monthly retainer of <strong>€500.00 EUR / month</strong>.
                    </>
                  ) : (
                    <>
                      <strong>Option B (Zero Upfront Plan):</strong> <strong>€0 upfront</strong> and
                      a flat monthly fee of <strong>€650.00 EUR / month</strong> during Year 1,
                      automatically reducing to <strong>€500.00 EUR / month</strong> from Month 13
                      onward.
                    </>
                  )}{' '}
                  All website hosting, backend database ($28/mo), and domain ($10/yr) costs are
                  covered by the Service Provider. Billed monthly via international bank transfer /
                  Wise.
                </div>
              </div>

              <div className="tpl-grid-12 items-start pb-3 border-b border-black/15">
                <div className="col-span-3 tpl-font-heading text-[14.5px] font-semibold text-[#0B0C0E]">
                  Workflow &amp; Revisions
                </div>
                <div className="col-span-9">
                  The Client may submit an unlimited number of web updates, graphic design tasks,
                  newsletter dispatches, and video editing requests via Email or WhatsApp. Standard
                  updates and graphics are delivered within 24–48 hours; 31-page booklets and 5–7
                  min video reportages are delivered within 2–4 business days.{' '}
                  <strong>Unlimited revisions</strong> are included at zero extra charge.
                </div>
              </div>

              <div className="tpl-grid-12 items-start pb-3 border-b border-black/15">
                <div className="col-span-3 tpl-font-heading text-[14.5px] font-semibold text-[#0B0C0E]">
                  Copyright to Project
                </div>
                <div className="col-span-9">
                  <strong>Jezreel Dave Leybag</strong> guarantees that full source code, domain
                  names (<strong>florencechoral.org</strong>), choir contact databases, print design
                  files, 31-page booklets, and edited video masters are the{' '}
                  <strong>
                    100% sole property of Dr. Leonardo Sagliocca / Florence Choral
                  </strong>
                  . The Client holds direct Owner credentials to the GitHub repository, domain
                  registrar, and dashboard at all times.
                </div>
              </div>

              <div className="tpl-grid-12 items-start pb-2">
                <div className="col-span-3 tpl-font-heading text-[14.5px] font-semibold text-[#0B0C0E]">
                  Flexible Term
                </div>
                <div className="col-span-9">
                  This Agreement operates on a flexible <strong>month-to-month basis</strong>.
                  Either party may pause or terminate with 30 days’ written notice via email, with
                  100% handover of all active code, domains, and media archives.
                </div>
              </div>
            </div>

            {/* Bottom Signature & Electronic Approval Block (Template Page 10 Bottom Style) */}
            <div className="mt-5 bg-white/80 border-[1.5px] border-[#0B0C0E] rounded-[22px] p-5">
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <div className="border-t-[1.5px] border-[#0B0C0E] pt-2 mt-7 font-bold text-[13.5px] text-[#0B0C0E]">
                    Jezreel Dave Leybag
                  </div>
                  <div className="text-[11.5px] text-neutral-700">
                    Jezreel Dave Digital &amp; Media
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-1">Date: 2026-11-15</div>
                </div>
                <div>
                  <div className="border-t-[1.5px] border-[#0B0C0E] pt-2 mt-7 font-bold text-[13.5px] text-[#0B0C0E]">
                    Dr. Leonardo Sagliocca
                  </div>
                  <div className="text-[11.5px] text-neutral-700">
                    Founder &amp; Artistic Director, Florence Choral
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-1">
                    Date: ____________________________
                  </div>
                </div>
              </div>

              <div className="no-print mt-4 pt-3 border-t border-black/10 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11.5px] font-medium text-neutral-700">
                  Ready to proceed? Click below to send your pre-filled approval email:
                </span>
                <a
                  href={getAcceptMailto()}
                  className="px-5 py-2 rounded-full bg-[#F79223] hover:bg-[#ffa742] text-[#0B0C0E] border border-[#0B0C0E] font-bold text-xs transition-colors"
                >
                  Accept Proposal &amp; Send Confirmation Email ✉
                </a>
              </div>
            </div>
          </div>

          {renderPageFooter(
            mode === 'full-proposal' ? 12 : 1,
            mode === 'full-proposal' ? 12 : 1,
            'Terms of Agreement & Client Ownership Guarantee'
          )}
        </section>
      </div>

      {/* =====================================================================
          16:9 FULLSCREEN LIGHTBOX MODAL (WEB ONLY)
          ===================================================================== */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="no-print fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-[1280px] w-full bg-[#0B0C0E] rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
          >
            <div className="px-4 py-3 bg-[#16171B] flex items-center justify-between text-white border-b border-white/10">
              <span className="font-bold text-sm">{lightboxImg.title} (16:9 Desktop View)</span>
              <button
                onClick={() => setLightboxImg(null)}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <img
              src={lightboxImg.src}
              alt={lightboxImg.title}
              className="w-full h-auto max-h-[82vh] object-contain block mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};
