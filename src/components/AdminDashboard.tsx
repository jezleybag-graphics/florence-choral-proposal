import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import type {
  Festival,
  JuryMember,
  ChoirApplication,
  SiteConfig,
} from '../types/festival';

interface AdminDashboardProps {
  config: SiteConfig;
  festivals: Festival[];
  juryMembers: JuryMember[];
  applications: ChoirApplication[];
  onUpdateFestival: (updated: Festival) => void;
  onAddJuryMember: (member: Omit<JuryMember, 'id'>) => void;
  onUpdateApplicationStatus: (id: string, status: ChoirApplication['status']) => void;
  onResetDemoData: () => void;
  onSwitchToPublic: () => void;
}

const CODE_FILES_PREVIEW: Record<
  string,
  { path: string; description: string; language: string; snippet: string }
> = {
  'florenceData.ts': {
    path: 'src/data/florenceData.ts',
    description:
      'Contains all 5 Renaissance Festivals, 4-day programmes, rules, venues, jury members, and original image URLs.',
    language: 'TypeScript',
    snippet: `export const INITIAL_SITE_CONFIG: SiteConfig = {
  siteTitle: 'Florence Choral',
  tagline: 'Festivals recommended by the Greats',
  email: 'chairman@florencechoral.com',
  phone: '+39 388 8183714',
  logoUrl: '/Florence_choral_quadrato.jpg',
  patronageFirenzePdf: 'https://www.florencechoral.com/wp-content/uploads/2017/06/Patrocinio-Town-Council-Florence-Choral.pdf',
};

// All 5 Festivals: Leonardo Da Vinci, Andrea Del Verrocchio,
// Michelangelo, Lorenzo De' Medici, and Botticelli`,
  },
  'index.css': {
    path: 'src/index.css',
    description:
      'Master Design Tokens preserving original #DC143C Florentine Crimson, #136597 Renaissance Azure, and modern typography.',
    language: 'CSS',
    snippet: `:root {
  --color-primary: #DC143C;        /* Original Florentine Crimson */
  --color-primary-hover: #B81032;
  --color-secondary: #136597;      /* Original Renaissance Azure */
  --color-heading: #3B3B3B;
  --font-display: 'Plus Jakarta Sans', 'Poppins', sans-serif;
  --font-sans: 'Inter', sans-serif;
}`,
  },
  'Header.tsx': {
    path: 'src/components/Header.tsx',
    description:
      'Top Crimson contact bar, official social logos (FB, X, YouTube, IG, WhatsApp), and translucent sticky navigation.',
    language: 'TypeScript / React',
    snippet: `// Renders the top #DC143C Crimson Header Bar + Sticky Glass Navigation
// Includes direct links to Festivals, Art. Committee, Composers,
// Venues, Testimonials, Archives, FeelFlorence, and Contacts.`,
  },
  'FestivalsSection.tsx': {
    path: 'src/components/FestivalsSection.tsx',
    description:
      'Interactive grid of the 5 Renaissance Festivals and the native <dialog> Programme & Rules modal.',
    language: 'TypeScript / React',
    snippet: `// Renders each Festival card and opens the 4-tab modal:
// 1. 4-Day Programme Schedule
// 2. Competition Categories & Repertoire Rules
// 3. Trophies, Prizes & Historic Basilica Venues
// 4. About the Renaissance Master`,
  },
  'PROJECT_DOCUMENTATION.md': {
    path: 'PROJECT_DOCUMENTATION.md',
    description:
      'Full engineering handoff manual documenting every file, asset URL, and deployment step for Dr. Leonardo Sagliocca.',
    language: 'Markdown',
    snippet: `# Florence Choral Platform — Official Engineering & Architecture Documentation
Client: Dr. Leonardo Sagliocca (Founder & Artistic Director)
Guarantee: 100% Source Code, GitHub Repository, Domain & Dashboard Ownership.`,
  },
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  config,
  festivals,
  juryMembers,
  applications,
  onUpdateFestival,
  onAddJuryMember,
  onUpdateApplicationStatus,
  onResetDemoData,
  onSwitchToPublic,
}) => {
  const [activeTab, setActiveTab] = useState<'code' | 'festivals' | 'applications' | 'jury'>('code');
  const [selectedFileKey, setSelectedFileKey] = useState<string>('florenceData.ts');
  const [editingFestivalId, setEditingFestivalId] = useState<string>(festivals[0]?.id || '');
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // New Jury Member Form State
  const [newJuryName, setNewJuryName] = useState('');
  const [newJuryRole, setNewJuryRole] = useState('International Jury Member');
  const [newJuryCountry, setNewJuryCountry] = useState('');
  const [newJuryCredentials, setNewJuryCredentials] = useState('');

  const currentFestival = festivals.find((f) => f.id === editingFestivalId) || festivals[0];

  const handleDownloadFullBackup = () => {
    const backupPayload = {
      exportedAt: new Date().toISOString(),
      owner: 'Dr. Leonardo Sagliocca (chairman@florencechoral.com)',
      config,
      festivals,
      juryMembers,
      applications,
    };
    const blob = new Blob([JSON.stringify(backupPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'florence-choral-full-site-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFestivalFieldChange = (field: keyof Festival, value: string) => {
    if (!currentFestival) return;
    onUpdateFestival({
      ...currentFestival,
      [field]: value,
    });
    setSavedNotice('Live website updated! Switch to "View Live Website" to see your change immediately.');
    setTimeout(() => setSavedNotice(null), 4000);
  };

  const handleAddJurySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJuryName.trim()) return;
    onAddJuryMember({
      name: newJuryName,
      role: newJuryRole,
      country: newJuryCountry || 'Italy',
      credentials: newJuryCredentials,
      festivalYear: '2027 Jury Panel',
      imageUrl:
        'https://www.florencechoral.com/wp-content/uploads/2017/09/SIB_8925-1280x400.jpg',
    });
    setNewJuryName('');
    setNewJuryCountry('');
    setNewJuryCredentials('');
    setSavedNotice('New Jury Member added to the live website!');
    setTimeout(() => setSavedNotice(null), 4000);
  };

  return (
    <section className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Owner Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DC143C] text-white text-xs font-bold uppercase tracking-wider">
              <Icon icon="mage:key" width={15} height={15} />
              <span>Full Owner Access • Dr. Leonardo Sagliocca</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold">
              Florence Choral — Source Code Vault &amp; CMS Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              You hold 100% of the keys: inspect and download the source code files directly, manage
              all 5 festivals in real time, and review incoming Choir Applications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleDownloadFullBackup}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold cursor-pointer apple-pressable"
            >
              <Icon icon="mage:file-download" width={18} height={18} />
              <span>Export Full Site JSON Backup</span>
            </button>
            <button
              type="button"
              onClick={onSwitchToPublic}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#DC143C] hover:bg-[#B81032] text-white text-xs sm:text-sm font-bold shadow-lg cursor-pointer apple-pressable"
            >
              <Icon icon="mage:globe" width={18} height={18} />
              <span>View Live Website</span>
            </button>
          </div>
        </div>

        {savedNotice && (
          <div className="p-4 rounded-2xl bg-emerald-600 text-white text-sm font-semibold flex items-center justify-between shadow-lg">
            <span className="flex items-center gap-2">
              <Icon icon="mage:check-circle-fill" width={20} height={20} />
              <span>{savedNotice}</span>
            </span>
            <button
              type="button"
              onClick={onSwitchToPublic}
              className="px-3 py-1 rounded-lg bg-white text-emerald-700 text-xs font-bold cursor-pointer"
            >
              Preview Live Now
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer apple-pressable ${
              activeTab === 'code'
                ? 'bg-[#DC143C] text-white shadow'
                : 'text-[#3B3B3B] hover:bg-slate-100'
            }`}
          >
            <Icon icon="mage:folder-open" width={18} height={18} />
            <span>1. Source Code Files &amp; Keys</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('festivals')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer apple-pressable ${
              activeTab === 'festivals'
                ? 'bg-[#DC143C] text-white shadow'
                : 'text-[#3B3B3B] hover:bg-slate-100'
            }`}
          >
            <Icon icon="mage:edit" width={18} height={18} />
            <span>2. Edit 5 Festivals (Live CMS)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('applications')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer apple-pressable ${
              activeTab === 'applications'
                ? 'bg-[#DC143C] text-white shadow'
                : 'text-[#3B3B3B] hover:bg-slate-100'
            }`}
          >
            <Icon icon="mage:inbox" width={18} height={18} />
            <span>3. Choir Applications ({applications.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('jury')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer apple-pressable ${
              activeTab === 'jury'
                ? 'bg-[#DC143C] text-white shadow'
                : 'text-[#3B3B3B] hover:bg-slate-100'
            }`}
          >
            <Icon icon="mage:users" width={18} height={18} />
            <span>4. Artistic Committee ({juryMembers.length})</span>
          </button>
        </div>

        {/* TAB 1: SOURCE CODE FILES & KEYS VAULT */}
        {activeTab === 'code' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Ownership Keys & Guarantees */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h2 className="font-display text-lg font-extrabold text-[#3B3B3B] flex items-center gap-2">
                  <Icon icon="mage:shield-check" width={22} height={22} className="text-[#DC143C]" />
                  <span>Dr. Leo’s Anti-Lockout Ownership Protocol</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
                  Unlike the old WordPress installation that was lost when your phone and ID card
                  were stolen, this new architecture guarantees you always retain direct access to
                  every code file and account:
                </p>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-display font-bold text-xs sm:text-sm text-[#3B3B3B] flex items-center justify-between">
                      <span>1. Full Source Code Repository (GitHub)</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                        Owner Access
                      </span>
                    </div>
                    <p className="text-xs text-[#4A5568] mt-1">
                      All React, TypeScript, CSS, and image files are stored in a dedicated Git
                      repository where <strong>{config.email}</strong> holds full Owner permissions
                      and can download the complete ZIP at any time.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-display font-bold text-xs sm:text-sm text-[#3B3B3B] flex items-center justify-between">
                      <span>2. Domain Registrar (florencechoral.org)</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                        Direct Control
                      </span>
                    </div>
                    <p className="text-xs text-[#4A5568] mt-1">
                      Registered directly under your personal email with backup recovery codes so no
                      third-party company can ever hijack your domain again.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-display font-bold text-xs sm:text-sm text-[#3B3B3B] flex items-center justify-between">
                      <span>3. Step-by-Step Documentation</span>
                      <span className="px-2 py-0.5 rounded bg-[#136597]/15 text-[#136597] text-[11px] font-bold">
                        PROJECT_DOCUMENTATION.md
                      </span>
                    </div>
                    <p className="text-xs text-[#4A5568] mt-1">
                      Every single file, image asset, and update is documented in plain English inside
                      the codebase.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Code File Inspector */}
            <div className="lg:col-span-7 bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-lg flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#DC143C] font-bold block">
                      Live Codebase File Tree
                    </span>
                    <h3 className="font-display text-lg font-bold">
                      Inspect Project Source Code Files
                    </h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-white/10 text-slate-300 font-mono">
                    florence-choral/
                  </span>
                </div>

                {/* File Selector Pills */}
                <div className="flex flex-wrap gap-2">
                  {Object.keys(CODE_FILES_PREVIEW).map((fileKey) => (
                    <button
                      key={fileKey}
                      type="button"
                      onClick={() => setSelectedFileKey(fileKey)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono cursor-pointer transition-colors ${
                        selectedFileKey === fileKey
                          ? 'bg-[#DC143C] text-white font-bold'
                          : 'bg-white/8 text-slate-300 hover:bg-white/15'
                      }`}
                    >
                      {fileKey}
                    </button>
                  ))}
                </div>

                {/* Selected File Info & Code View */}
                {CODE_FILES_PREVIEW[selectedFileKey] && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                      <span className="font-mono text-emerald-400">
                        {CODE_FILES_PREVIEW[selectedFileKey].path}
                      </span>
                      <span className="text-slate-400">
                        {CODE_FILES_PREVIEW[selectedFileKey].language}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      {CODE_FILES_PREVIEW[selectedFileKey].description}
                    </p>
                    <pre className="p-4 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                      <code>{CODE_FILES_PREVIEW[selectedFileKey].snippet}</code>
                    </pre>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                <span>All source files are modular, human-readable, and 100% owned by Florence Choral.</span>
                <button
                  type="button"
                  onClick={onResetDemoData}
                  className="text-slate-300 hover:text-white underline cursor-pointer"
                >
                  Reset Demo State to Defaults
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EDIT 5 FESTIVALS (LIVE CMS) */}
        {activeTab === 'festivals' && currentFestival && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="font-display text-xl font-extrabold text-[#3B3B3B]">
                  Live Festival Editor
                </h2>
                <p className="text-xs sm:text-sm text-[#4A5568]">
                  Select any of your 5 festivals below to update its dates, edition, status, or
                  description on the live website.
                </p>
              </div>

              <select
                value={editingFestivalId}
                onChange={(e) => setEditingFestivalId(e.target.value)}
                className="px-4 py-2.5 rounded-xl border-2 border-[#DC143C] text-sm font-bold text-[#3B3B3B] bg-white"
              >
                {festivals.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-[#3B3B3B] mb-1">
                  Festival Dates (Displayed on Card &amp; Banner)
                </label>
                <input
                  type="text"
                  value={currentFestival.dates}
                  onChange={(e) => handleFestivalFieldChange('dates', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3B3B3B] mb-1">
                  Edition Label
                </label>
                <input
                  type="text"
                  value={currentFestival.edition}
                  onChange={(e) => handleFestivalFieldChange('edition', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3B3B3B] mb-1">
                  Registration Status Badge
                </label>
                <select
                  value={currentFestival.status}
                  onChange={(e) =>
                    handleFestivalFieldChange(
                      'status',
                      e.target.value as Festival['status']
                    )
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                >
                  <option value="Registration Open">Registration Open</option>
                  <option value="Early Bird Open">Early Bird Open</option>
                  <option value="Dates Announced">Dates Announced</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-[#3B3B3B] mb-1">
                  Application Deadline
                </label>
                <input
                  type="text"
                  value={currentFestival.registrationDeadline}
                  onChange={(e) =>
                    handleFestivalFieldChange('registrationDeadline', e.target.value)
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3B3B3B] mb-1">
                  Season Subtitle
                </label>
                <input
                  type="text"
                  value={currentFestival.season}
                  onChange={(e) => handleFestivalFieldChange('season', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3B3B3B] mb-1">
                Festival Overview Description
              </label>
              <textarea
                rows={3}
                value={currentFestival.summary}
                onChange={(e) => handleFestivalFieldChange('summary', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>
        )}

        {/* TAB 3: CHOIR APPLICATIONS & BROCHURE REQUESTS */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <div>
              <h2 className="font-display text-xl font-extrabold text-[#3B3B3B]">
                Incoming Choir Applications &amp; Brochure Inquiries
              </h2>
              <p className="text-xs sm:text-sm text-[#4A5568]">
                Every submission from the public website appears here automatically with 1-click
                Email and WhatsApp follow-up actions.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase text-[11px]">
                    <th className="py-3 px-3">Choir &amp; Country</th>
                    <th className="py-3 px-3">Conductor &amp; Contact</th>
                    <th className="py-3 px-3">Festival &amp; Type</th>
                    <th className="py-3 px-3">Singers</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Direct Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50">
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-[#3B3B3B]">{app.choirName}</div>
                        <div className="text-xs text-slate-500">
                          {app.country} • {app.submittedAt}
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="font-semibold text-[#3B3B3B]">{app.conductorName}</div>
                        <div className="text-xs text-[#136597]">{app.email}</div>
                        <div className="text-xs text-slate-500">{app.phone}</div>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="font-semibold text-[#3B3B3B]">{app.festivalName}</div>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-slate-100 text-[11px] font-semibold">
                          {app.requestType}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-bold text-[#3B3B3B]">
                        {app.singersCount}
                      </td>
                      <td className="py-3.5 px-3">
                        <select
                          value={app.status}
                          onChange={(e) =>
                            onUpdateApplicationStatus(
                              app.id,
                              e.target.value as ChoirApplication['status']
                            )
                          }
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                            app.status === 'Confirmed'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : app.status === 'Brochure Sent'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-rose-50 text-[#DC143C] border-rose-200'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Brochure Sent">Brochure Sent</option>
                          <option value="Confirmed">Confirmed</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${app.email}?subject=Florence Choral Festival — ${encodeURIComponent(
                              app.choirName
                            )}`}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold inline-flex items-center gap-1"
                          >
                            <Icon icon="mage:email" width={14} height={14} />
                            <span>Email</span>
                          </a>
                          <a
                            href={`https://wa.me/${app.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-semibold inline-flex items-center gap-1"
                          >
                            <Icon icon="simple-icons:whatsapp" width={13} height={13} />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ARTISTIC COMMITTEE & JURY */}
        {activeTab === 'jury' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-display text-lg font-extrabold text-[#3B3B3B]">
                Add International Jury Member
              </h3>
              <form onSubmit={handleAddJurySubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#3B3B3B] mb-1">
                    Full Name &amp; Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newJuryName}
                    onChange={(e) => setNewJuryName(e.target.value)}
                    placeholder="e.g., Maestro Andrea Angelini"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#3B3B3B] mb-1">
                      Role
                    </label>
                    <input
                      type="text"
                      value={newJuryRole}
                      onChange={(e) => setNewJuryRole(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#3B3B3B] mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      required
                      value={newJuryCountry}
                      onChange={(e) => setNewJuryCountry(e.target.value)}
                      placeholder="e.g., Italy"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3B3B3B] mb-1">
                    Biography &amp; Credentials *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newJuryCredentials}
                    onChange={(e) => setNewJuryCredentials(e.target.value)}
                    placeholder="Conductor, composer, and international adjudicator..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#DC143C] hover:bg-[#B81032] text-white text-sm font-bold cursor-pointer apple-pressable"
                >
                  Add to Artistic Committee
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-display text-lg font-extrabold text-[#3B3B3B]">
                Current Artistic Committee Roster
              </h3>
              <div className="space-y-3">
                {juryMembers.map((m) => (
                  <div
                    key={m.id}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="font-display font-bold text-sm text-[#3B3B3B]">
                        {m.name} ({m.country})
                      </div>
                      <div className="text-xs font-semibold text-[#136597]">{m.role}</div>
                      <p className="text-xs text-[#4A5568] mt-1">{m.credentials}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
