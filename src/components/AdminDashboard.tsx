import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { InvoiceModal } from './InvoiceModal';
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
  onResetDemoData?: () => void;
  onSwitchToPublic: () => void;
  onSwitchToProposal?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  config,
  festivals,
  juryMembers,
  applications,
  onUpdateFestival,
  onAddJuryMember,
  onUpdateApplicationStatus,
  onSwitchToPublic,
  onSwitchToProposal,
}) => {
  const [activeTab, setActiveTab] = useState<
    'inclusions' | 'sla' | 'festivals' | 'applications' | 'jury' | 'infrastructure'
  >('inclusions');

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [editingFestivalId, setEditingFestivalId] = useState<string>(festivals[0]?.id || '');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Subscription & Invoice State
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'planB' | 'planA'>('planB');

  // Inclusions Availment State
  const [availedItems, setAvailedItems] = useState<Record<string, boolean>>({
    'video-1': false,
    'video-2': false,
    'poster-1': false,
    'booklet-1': false,
    'news-1': true, // Dispatched on Nov 3
    'news-2': false,
    'web-1': false,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleAvailInclusion = (serviceName: string, id: string) => {
    setAvailedItems((prev) => ({ ...prev, [id]: true }));
    showToast(`Task registered for "${serviceName}". Scheduled within 24–48h priority SLA.`);
  };

  const handleResetInclusions = () => {
    setAvailedItems({
      'video-1': false,
      'video-2': false,
      'poster-1': false,
      'booklet-1': false,
      'news-1': true,
      'news-2': false,
      'web-1': false,
    });
    showToast('Monthly inclusions quota reset to cycle start.');
  };

  // Health Bar Calculations
  const totalQuotaUnits = 8;
  const usedUnits = Object.entries(availedItems).filter(([_, v]) => v).length;
  const availableUnits = Math.max(0, totalQuotaUnits - usedUnits);
  const healthPercent = Math.round((availableUnits / totalQuotaUnits) * 100);

  // Festival Editing
  const currentFestival = festivals.find((f) => f.id === editingFestivalId) || festivals[0];

  const handleFestivalFieldChange = (field: keyof Festival, value: string) => {
    if (!currentFestival) return;
    onUpdateFestival({
      ...currentFestival,
      [field]: value,
    });
    showToast(`Saved changes to ${currentFestival.name}`);
  };

  // New Jury Form
  const [newJuryName, setNewJuryName] = useState('');
  const [newJuryRole, setNewJuryRole] = useState('International Jury Member');
  const [newJuryCountry, setNewJuryCountry] = useState('');
  const [newJuryCredentials, setNewJuryCredentials] = useState('');

  const handleAddJurySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJuryName.trim()) return;
    onAddJuryMember({
      name: newJuryName,
      role: newJuryRole,
      country: newJuryCountry || 'Italy',
      credentials: newJuryCredentials,
      festivalYear: '2027 Jury Panel',
      imageUrl: 'https://www.florencechoral.com/wp-content/uploads/2017/09/SIB_8925-1280x400.jpg',
    });
    setNewJuryName('');
    setNewJuryCountry('');
    setNewJuryCredentials('');
    showToast('New Jury Member added to the live committee roster.');
  };

  // Applications Filter
  const [appFilter, setAppFilter] = useState<'All' | 'New' | 'Brochure Sent' | 'Confirmed'>('All');
  const filteredApps = applications.filter((app) => (appFilter === 'All' ? true : app.status === appFilter));

  // Export JSON Working Function
  const handleExportDataJson = () => {
    const exportPayload = {
      site: config,
      festivals,
      juryMembers,
      applications,
      exportedAt: new Date().toISOString(),
      owner: 'Dr. Leonardo Sagliocca (Florence Choral)',
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'florence-choral-full-data.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Downloaded florence-choral-full-data.json to your device.');
  };

  const navItems = [
    { id: 'inclusions' as const, label: 'Retainer & Quota', icon: 'mage:dashboard', badge: `${healthPercent}%` },
    { id: 'sla' as const, label: 'Delivery & SLA', icon: 'mage:clock-fill', badge: '100%' },
    { id: 'festivals' as const, label: '5 Festivals', icon: 'mage:calendar', badge: '5' },
    { id: 'applications' as const, label: 'Choir Inquiries', icon: 'mage:inbox', badge: `${applications.length}` },
    { id: 'jury' as const, label: 'Artistic Committee', icon: 'mage:users', badge: `${juryMembers.length}` },
    { id: 'infrastructure' as const, label: 'Infrastructure & Keys', icon: 'mage:folder-code' },
  ];

  const renderNavContent = (isMobile: boolean) => (
    <div className="flex flex-col h-full justify-between">
      {/* Top Brand Bar */}
      <div>
        <div className="h-16 px-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#DC143C] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              ⚜
            </div>
            <div>
              <h1 className="font-display font-extrabold text-sm text-slate-900 tracking-tight leading-tight">
                Florence Choral
              </h1>
              <span className="text-[11px] text-slate-400 font-medium">Administration Console</span>
            </div>
          </div>
          {isMobile && (
            <button
              type="button"
              onClick={() => setMobileNavOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <Icon icon="mage:multiply" width={18} height={18} />
            </button>
          )}
        </div>

        {/* Navigation Groups */}
        <div className="p-3 space-y-6">
          <div>
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Console Overview
            </div>
            <nav className="space-y-0.5">
              {navItems.slice(0, 2).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    if (isMobile) setMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                    activeTab === item.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon icon={item.icon} width={16} height={16} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                        activeTab === item.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Festival Management
            </div>
            <nav className="space-y-0.5">
              {navItems.slice(2, 5).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    if (isMobile) setMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                    activeTab === item.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon icon={item.icon} width={16} height={16} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                        activeTab === item.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Settings &amp; Keys
            </div>
            <nav className="space-y-0.5">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('infrastructure');
                  if (isMobile) setMobileNavOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                  activeTab === 'infrastructure'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon icon="mage:folder-code" width={16} height={16} />
                  <span>Infrastructure &amp; Keys</span>
                </div>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Sidebar Footer User Card */}
      <div className="p-3 border-t border-slate-100 space-y-2">
        <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
              LS
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">Dr. Leonardo Sagliocca</div>
              <div className="text-[10.5px] text-slate-500 truncate">Chairman &amp; Artistic Dir.</div>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Active Account" />
        </div>

        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <button
            type="button"
            onClick={onSwitchToPublic}
            className="w-full py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium text-center truncate cursor-pointer transition-colors"
          >
            Live Site ↗
          </button>
          {onSwitchToProposal && (
            <button
              type="button"
              onClick={onSwitchToProposal}
              className="w-full py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium text-center truncate cursor-pointer transition-colors"
            >
              Proposal 📄
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 animate-fadeIn">
          <Icon icon="mage:check-circle-fill" width={18} height={18} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MOBILE DRAWER */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileNavOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 shadow-2xl z-50">
            {renderNavContent(true)}
          </aside>
        </div>
      )}

      {/* DESKTOP SIDEBAR (APPLE MINIMALIST STYLE) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:sticky lg:top-0 h-screen bg-white border-r border-slate-200/80 shrink-0">
        {renderNavContent(false)}
      </aside>

      {/* MAIN CONTENT CANVAS */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 px-6 sm:px-8 border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <Icon icon="mage:menu" width={20} height={20} />
            </button>
            <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <span>Florence Choral</span>
              <span>/</span>
              <span className="text-slate-900 font-bold capitalize">
                {activeTab === 'inclusions' && 'Retainer & Quota'}
                {activeTab === 'sla' && 'Delivery & SLA'}
                {activeTab === 'festivals' && '5 Festivals'}
                {activeTab === 'applications' && 'Choir Inquiries'}
                {activeTab === 'jury' && 'Artistic Committee'}
                {activeTab === 'infrastructure' && 'Infrastructure & Keys'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsInvoiceModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
            >
              <Icon icon="mage:receipt" width={15} height={15} />
              <span>Receipt #FC-2026-11</span>
            </button>

            <button
              type="button"
              onClick={onSwitchToPublic}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#DC143C] hover:bg-[#B81032] text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
            >
              <Icon icon="mage:globe" width={15} height={15} />
              <span>View Live Website</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-w-6xl mx-auto w-full space-y-6">
          {/* TAB 1: RETAINER & QUOTA */}
          {activeTab === 'inclusions' && (
            <div className="space-y-6">
              {/* Subscription Status Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        <span>Active Partnership • Paid In Full</span>
                      </span>
                      <span className="text-xs text-slate-400">Since Dec 2020</span>
                    </div>
                    <h2 className="font-display font-extrabold text-lg sm:text-xl text-slate-900">
                      {selectedPlan === 'planB'
                        ? 'Option B: All-Inclusive Retainer (€649/mo)'
                        : 'Option A: Custom Festival Build & Retainer (€1,599 + €499/mo)'}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsInvoiceModalOpen(true)}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
                    >
                      <Icon icon="mage:receipt" width={15} height={15} />
                      <span>View Official Receipt</span>
                    </button>
                    <div className="flex rounded-lg border border-slate-200 p-0.5 text-xs font-bold text-slate-600">
                      <button
                        type="button"
                        onClick={() => setSelectedPlan('planB')}
                        className={`px-2 py-1 rounded-md cursor-pointer transition-colors ${
                          selectedPlan === 'planB' ? 'bg-slate-900 text-white' : 'hover:text-slate-900'
                        }`}
                      >
                        €649
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPlan('planA')}
                        className={`px-2 py-1 rounded-md cursor-pointer transition-colors ${
                          selectedPlan === 'planA' ? 'bg-slate-900 text-white' : 'hover:text-slate-900'
                        }`}
                      >
                        €499
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3 Status Data Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px] font-medium block">Current Cycle</span>
                    <strong className="text-slate-800 text-sm">15 Nov – 15 Dec 2026</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] font-medium block">Next Scheduled Renewal</span>
                    <strong className="text-slate-800 text-sm">15 December 2026</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] font-medium block">Payment Method</span>
                    <strong className="text-slate-800 text-sm">SEPA Wire (Banca Intesa Sanpaolo)</strong>
                  </div>
                </div>
              </div>

              {/* Segmented Broken Health Bar */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="font-display font-extrabold text-base text-slate-900">
                      Monthly Quota &amp; Deliverable Capacity
                    </h3>
                    <p className="text-xs text-slate-500">
                      {availableUnits} of {totalQuotaUnits} units available for this cycle ({healthPercent}% capacity).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetInclusions}
                    title="Reset Quota State"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
                  >
                    <Icon icon="mage:refresh" width={16} height={16} />
                  </button>
                </div>

                {/* The Discrete Health Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 pt-1">
                  {/* Video 1 */}
                  <div
                    className={`p-3 rounded-xl border text-center flex flex-col justify-between min-h-[84px] transition-all ${
                      availedItems['video-1']
                        ? 'bg-amber-50/60 border-amber-200 text-amber-900'
                        : 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Video #1</div>
                    <div className="text-xs font-bold my-1 text-slate-800">4K Reportage</div>
                    <span
                      className={`text-[9.5px] font-extrabold px-1.5 py-0.5 rounded-md ${
                        availedItems['video-1'] ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {availedItems['video-1'] ? 'IN PRODUCTION' : 'READY'}
                    </span>
                  </div>

                  {/* Video 2 */}
                  <div
                    className={`p-3 rounded-xl border text-center flex flex-col justify-between min-h-[84px] transition-all ${
                      availedItems['video-2']
                        ? 'bg-amber-50/60 border-amber-200 text-amber-900'
                        : 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Video #2</div>
                    <div className="text-xs font-bold my-1 text-slate-800">Social Reel</div>
                    <span
                      className={`text-[9.5px] font-extrabold px-1.5 py-0.5 rounded-md ${
                        availedItems['video-2'] ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {availedItems['video-2'] ? 'IN PRODUCTION' : 'READY'}
                    </span>
                  </div>

                  {/* Poster Suite */}
                  <div
                    className={`p-3 rounded-xl border text-center flex flex-col justify-between min-h-[84px] transition-all ${
                      availedItems['poster-1']
                        ? 'bg-amber-50/60 border-amber-200 text-amber-900'
                        : 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Poster Suite</div>
                    <div className="text-xs font-bold my-1 text-slate-800">5-Size Suite</div>
                    <span
                      className={`text-[9.5px] font-extrabold px-1.5 py-0.5 rounded-md ${
                        availedItems['poster-1'] ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {availedItems['poster-1'] ? 'IN PRODUCTION' : 'READY'}
                    </span>
                  </div>

                  {/* 31p Booklet */}
                  <div
                    className={`p-3 rounded-xl border text-center flex flex-col justify-between min-h-[84px] transition-all ${
                      availedItems['booklet-1']
                        ? 'bg-amber-50/60 border-amber-200 text-amber-900'
                        : 'bg-blue-50/60 border-blue-200 text-blue-900'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-slate-400 uppercase">31p Booklet</div>
                    <div className="text-xs font-bold my-1 text-slate-800">6th Leonardo</div>
                    <span className="text-[9.5px] font-extrabold px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-800">
                      STAGE 3 ACTIVE
                    </span>
                  </div>

                  {/* Newsletter 1 */}
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-center flex flex-col justify-between min-h-[84px]">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Newsletter #1</div>
                    <div className="text-xs font-bold my-1 text-slate-600">420 Choirs</div>
                    <span className="text-[9.5px] font-extrabold px-1.5 py-0.5 rounded-md bg-slate-200 text-slate-600">
                      DELIVERED
                    </span>
                  </div>

                  {/* Newsletter 2 */}
                  <div
                    className={`p-3 rounded-xl border text-center flex flex-col justify-between min-h-[84px] transition-all ${
                      availedItems['news-2']
                        ? 'bg-amber-50/60 border-amber-200 text-amber-900'
                        : 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Newsletter #2</div>
                    <div className="text-xs font-bold my-1 text-slate-800">Dispatch #2</div>
                    <span
                      className={`text-[9.5px] font-extrabold px-1.5 py-0.5 rounded-md ${
                        availedItems['news-2'] ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {availedItems['news-2'] ? 'QUEUED' : 'READY'}
                    </span>
                  </div>

                  {/* Web Updates */}
                  <div
                    className={`p-3 rounded-xl border text-center flex flex-col justify-between min-h-[84px] transition-all ${
                      availedItems['web-1']
                        ? 'bg-amber-50/60 border-amber-200 text-amber-900'
                        : 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Web Updates</div>
                    <div className="text-xs font-bold my-1 text-slate-800">24–48h SLA</div>
                    <span
                      className={`text-[9.5px] font-extrabold px-1.5 py-0.5 rounded-md ${
                        availedItems['web-1'] ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {availedItems['web-1'] ? 'IN QUEUE' : 'READY'}
                    </span>
                  </div>

                  {/* Cloud Hosting */}
                  <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/60 text-center flex flex-col justify-between min-h-[84px]">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Server</div>
                    <div className="text-xs font-bold my-1 text-slate-800">100% Uptime</div>
                    <span className="text-[9.5px] font-extrabold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                      ACTIVE
                    </span>
                  </div>
                </div>
              </div>

              {/* Inclusions Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* 1. Video Reportages */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-sm text-slate-900">
                        Festival Video Reportages &amp; Reels
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700">
                        {availedItems['video-1'] ? '1 Available' : '2 Available'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      5–7 min multi-day documentary cut with live audio leveling, logo openers, and vertical 9:16 social cutdowns.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleAvailInclusion('Festival Video Reportage', 'video-1')}
                      disabled={availedItems['video-1']}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                        availedItems['video-1']
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-[#DC143C] hover:bg-[#B81032] text-white shadow-xs'
                      }`}
                    >
                      {availedItems['video-1'] ? '✓ Request Submitted' : 'Avail Video Edit Request'}
                    </button>
                  </div>
                </div>

                {/* 2. Poster Suites */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-sm text-slate-900">
                        Festival Poster Campaign Suite
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700">
                        {availedItems['poster-1'] ? 'In Design' : '1 Suite Ready'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      70×100cm print master, A2, A3, A5 certified print-ready PDFs, plus 2×2 social media and jury announcement cards.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleAvailInclusion('Festival Poster Campaign', 'poster-1')}
                      disabled={availedItems['poster-1']}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                        availedItems['poster-1']
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                      }`}
                    >
                      {availedItems['poster-1'] ? '✓ Request Submitted' : 'Avail Poster Suite Request'}
                    </button>
                  </div>
                </div>

                {/* 3. 31-Page Booklet */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-sm text-slate-900">
                        31-Page Official Programme &amp; Rulebook
                      </span>
                      <span className="text-[11px] font-bold text-blue-700">Stage 3 Active</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Full cover-to-cover print-ready layout: repertoire schedules, jury biographies, competition categories, and municipal seals.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleAvailInclusion('Booklet Page Updates', 'booklet-1')}
                      className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer transition-colors"
                    >
                      {availedItems['booklet-1'] ? '✓ Revision Queued' : 'Request Booklet Page Updates'}
                    </button>
                  </div>
                </div>

                {/* 4. Monthly Newsletters */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-sm text-slate-900">
                        Monthly Conductor Newsletters
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700">1 Available</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Professionally formatted editorial dispatches sent directly to your international conductor database (420+ contacts).
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleAvailInclusion('Newsletter Dispatch #2', 'news-2')}
                      disabled={availedItems['news-2']}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                        availedItems['news-2']
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-[#DC143C] hover:bg-[#B81032] text-white shadow-xs'
                      }`}
                    >
                      {availedItems['news-2'] ? '✓ Scheduled for Dispatch' : 'Avail Newsletter #2 Draft'}
                    </button>
                  </div>
                </div>

                {/* 5. Global Choir Outreach */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-sm text-slate-900">
                        Global Choir Recruitment Outreach
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700">Active Campaign</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Proactive invitations sent to choral associations, youth choirs, and conservatory ensembles across Europe and worldwide.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => showToast('420 emails dispatched • 68% open rate • 28 brochure downloads')}
                      className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer transition-colors"
                    >
                      View Outreach Engagement Stats
                    </button>
                  </div>
                </div>

                {/* 6. Website Maintenance */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-sm text-slate-900">
                        Website Updates &amp; Content
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700">Unlimited 24–48h SLA</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Update competition rules, publish confirmed international jury members, or publish breaking festival news.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleAvailInclusion('Website Content Update', 'web-1')}
                      className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
                    >
                      {availedItems['web-1'] ? '✓ Update Task Logged' : 'Submit Website Content Update'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DELIVERY & SLA */}
          {activeTab === 'sla' && (
            <div className="space-y-6">
              {/* Historical Track Record Banner */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900">
                    On-Time Delivery Performance
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Partnered since December 2020 • 0 missed festival deadlines
                  </p>
                </div>
                <div className="flex items-center gap-6 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Track Record</span>
                    <strong className="text-emerald-700 text-sm font-bold">100% On-Time</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Average Turnaround</span>
                    <strong className="text-slate-900 text-sm font-bold">22.4 Hours (SLA: 24–48h)</strong>
                  </div>
                </div>
              </div>

              {/* Active Milestone Stepper */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h4 className="font-display font-bold text-sm text-slate-900">
                      6th Leonardo da Vinci ICF — 31-Page Master Booklet
                    </h4>
                    <p className="text-xs text-slate-500">Official Programme &amp; Repertoire Rulebook</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    18 Hours Ahead of Schedule
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-emerald-700 font-bold flex items-center gap-1">
                      <Icon icon="mage:check-circle-fill" width={14} height={14} />
                      <span>Stage 1</span>
                    </div>
                    <div className="font-semibold text-slate-800 mt-1">Repertoire Ingestion</div>
                    <div className="text-[10px] text-slate-400">Completed Nov 12</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-emerald-700 font-bold flex items-center gap-1">
                      <Icon icon="mage:check-circle-fill" width={14} height={14} />
                      <span>Stage 2</span>
                    </div>
                    <div className="font-semibold text-slate-800 mt-1">Patronage Seals</div>
                    <div className="text-[10px] text-slate-400">Completed Nov 14</div>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-300">
                    <div className="text-blue-700 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                      <span>Stage 3 (85%)</span>
                    </div>
                    <div className="font-bold text-slate-900 mt-1">Typography Proofing</div>
                    <div className="text-[10px] text-blue-700 font-semibold">Active Right Now</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-400">
                    <div className="font-semibold">Stage 4</div>
                    <div className="font-medium mt-1">Certified Print PDF</div>
                    <div className="text-[10px] text-slate-400">Due Nov 18, 17:00</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Icon icon="mage:clock" width={15} height={15} className="text-slate-500" />
                    <span>Target Delivery: <strong>Tomorrow, Nov 18 @ 17:00 CET</strong></span>
                  </span>
                  <span className="text-slate-500 font-medium">Print Cutoff: Nov 19</span>
                </div>
              </div>

              {/* The Punctuality Covenant Card */}
              <div className="bg-[#FCFBF8] rounded-2xl p-6 border border-amber-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
                    ⚜
                  </span>
                  <div>
                    <h4 className="font-display font-extrabold text-sm text-slate-900">
                      The Florence Choral Punctuality Covenant
                    </h4>
                    <span className="text-[11px] text-slate-500">Contractual Performance Commitment</span>
                  </div>
                </div>

                <blockquote className="text-xs text-slate-700 leading-relaxed italic bg-white/80 p-3.5 rounded-xl border border-amber-200/60">
                  "If Jezreel Dave ever fails to deliver an agreed festival poster, video reportage, or programme booklet revision before your confirmed festival announcement or printing deadline, Florence Choral automatically receives a <strong>€100 credit</strong> deducted from the subsequent month's invoice, zero questions asked."
                </blockquote>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-slate-900">Jezreel Dave Leybag</strong>
                    <div className="text-[11px] text-slate-500">Continuous Creative &amp; Technical Partner Since Dec 2020</div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Guaranteed
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 5 FESTIVALS */}
          {activeTab === 'festivals' && currentFestival && (
            <div className="space-y-6">
              {/* Festival Selector Bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {festivals.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setEditingFestivalId(f.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                      editingFestivalId === f.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {f.shortName || f.name}
                  </button>
                ))}
              </div>

              {/* Festival Edit Form */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-display font-extrabold text-base text-slate-900">
                      {currentFestival.name}
                    </h3>
                    <p className="text-xs text-slate-500">Live content updates sync instantly to the public website.</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800">
                    {currentFestival.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Festival Dates
                    </label>
                    <input
                      type="text"
                      value={currentFestival.dates}
                      onChange={(e) => handleFestivalFieldChange('dates', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Edition Label
                    </label>
                    <input
                      type="text"
                      value={currentFestival.edition}
                      onChange={(e) => handleFestivalFieldChange('edition', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Registration Status
                    </label>
                    <select
                      value={currentFestival.status}
                      onChange={(e) => handleFestivalFieldChange('status', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-slate-900"
                    >
                      <option value="Registration Open">Registration Open</option>
                      <option value="Early Bird Open">Early Bird Open</option>
                      <option value="Dates Announced">Dates Announced</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Application Deadline
                    </label>
                    <input
                      type="text"
                      value={currentFestival.registrationDeadline}
                      onChange={(e) => handleFestivalFieldChange('registrationDeadline', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Season Subtitle
                    </label>
                    <input
                      type="text"
                      value={currentFestival.season}
                      onChange={(e) => handleFestivalFieldChange('season', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Festival Summary Description
                  </label>
                  <textarea
                    rows={3}
                    value={currentFestival.summary}
                    onChange={(e) => handleFestivalFieldChange('summary', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CHOIR INQUIRIES */}
          {activeTab === 'applications' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-display font-extrabold text-base text-slate-900">
                    Incoming Choir Inquiries ({applications.length})
                  </h3>
                  <p className="text-xs text-slate-500">Real-time submissions from the public website.</p>
                </div>

                {/* Filter Controls */}
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  {(['All', 'New', 'Brochure Sent', 'Confirmed'] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setAppFilter(status)}
                      className={`px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
                        appFilter === status
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10.5px]">
                      <th className="py-2.5 px-3">Choir</th>
                      <th className="py-2.5 px-3">Conductor &amp; Contact</th>
                      <th className="py-2.5 px-3">Festival</th>
                      <th className="py-2.5 px-3">Singers</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredApps.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/60">
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{app.choirName}</div>
                          <div className="text-xs text-slate-400">{app.country} • {app.submittedAt}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-slate-800">{app.conductorName}</div>
                          <div className="text-xs text-slate-500">{app.email}</div>
                          <div className="text-xs text-slate-400">{app.phone}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-medium text-slate-800">{app.festivalName}</div>
                          <span className="text-[10px] text-slate-500 font-semibold">{app.requestType}</span>
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-800">{app.singersCount}</td>
                        <td className="py-3 px-3">
                          <select
                            value={app.status}
                            onChange={(e) =>
                              onUpdateApplicationStatus(app.id, e.target.value as ChoirApplication['status'])
                            }
                            className="px-2 py-1 rounded-lg text-xs font-semibold border border-slate-200 bg-white"
                          >
                            <option value="New">New</option>
                            <option value="Brochure Sent">Brochure Sent</option>
                            <option value="Confirmed">Confirmed</option>
                          </select>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <a
                              href={`mailto:${app.email}?subject=Florence Choral — ${encodeURIComponent(app.choirName)}`}
                              className="px-2 py-1 rounded-lg bg-slate-900 text-white text-xs font-semibold inline-flex items-center gap-1"
                            >
                              <Icon icon="mage:email" width={13} height={13} />
                              <span>Email</span>
                            </a>
                            <a
                              href={`https://wa.me/${app.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-1 rounded-lg bg-[#25D366] text-white text-xs font-semibold inline-flex items-center gap-1"
                            >
                              <Icon icon="simple-icons:whatsapp" width={12} height={12} />
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

          {/* TAB 5: ARTISTIC COMMITTEE */}
          {activeTab === 'jury' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="font-display font-extrabold text-base text-slate-900">
                  Add Committee Member
                </h3>
                <form onSubmit={handleAddJurySubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name &amp; Title</label>
                    <input
                      type="text"
                      required
                      value={newJuryName}
                      onChange={(e) => setNewJuryName(e.target.value)}
                      placeholder="e.g. Maestro Andrea Angelini"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Role</label>
                      <input
                        type="text"
                        value={newJuryRole}
                        onChange={(e) => setNewJuryRole(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Country</label>
                      <input
                        type="text"
                        required
                        value={newJuryCountry}
                        onChange={(e) => setNewJuryCountry(e.target.value)}
                        placeholder="Italy"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Credentials &amp; Bio</label>
                    <textarea
                      rows={3}
                      required
                      value={newJuryCredentials}
                      onChange={(e) => setNewJuryCredentials(e.target.value)}
                      placeholder="Conductor, composer, and international adjudicator..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#DC143C] hover:bg-[#B81032] text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
                  >
                    Add to Committee
                  </button>
                </form>
              </div>

              <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-3">
                <h3 className="font-display font-extrabold text-base text-slate-900">
                  Current Committee ({juryMembers.length})
                </h3>
                <div className="space-y-2.5">
                  {juryMembers.map((m) => (
                    <div
                      key={m.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3"
                    >
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-slate-900">
                          {m.name} <span className="text-slate-400 font-normal">({m.country})</span>
                        </div>
                        <div className="text-xs text-[#136597] font-medium">{m.role}</div>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{m.credentials}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: INFRASTRUCTURE & REPOSITORY (AUTHENTIC CONSOLE, ZERO TRIAL TEXT) */}
          {activeTab === 'infrastructure' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-display font-extrabold text-base text-slate-900">
                      Production Infrastructure &amp; Repository Access
                    </h3>
                    <p className="text-xs text-slate-500">
                      Core web systems, production source code repository, and live DNS credentials.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    100% Operational
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="text-slate-400 font-semibold block text-[11px]">Git Repository</span>
                    <strong className="text-slate-900 block font-mono text-xs">florence-choral-proposal</strong>
                    <div className="text-slate-500 text-[11px]">Branch: main • SHA: c946d86</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="text-slate-400 font-semibold block text-[11px]">Cloud Edge Hosting</span>
                    <strong className="text-slate-900 block text-xs">Vercel Global Edge CDN</strong>
                    <div className="text-slate-500 text-[11px]">TLS 1.3 Certified • Auto-SSL</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="text-slate-400 font-semibold block text-[11px]">Custom Domain</span>
                    <strong className="text-slate-900 block text-xs">florencechoral.com</strong>
                    <div className="text-slate-500 text-[11px]">Primary Registrar Active</div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleExportDataJson}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Icon icon="mage:download" width={16} height={16} />
                    <span>Export All Festival Content (.JSON)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => showToast('Cloud DNS ping: 18ms latency • 0 packet loss')}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Icon icon="mage:refresh" width={15} height={15} />
                    <span>Ping Edge Servers</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Official Florence Choral Invoice Modal */}
      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        planName={
          selectedPlan === 'planB'
            ? 'Option B: All-Inclusive Digital Retainer (€649/mo • €0 Setup Fee)'
            : 'Option A: Custom Festival Build & Maintenance (€1,599 + €499/mo)'
        }
        amount={selectedPlan === 'planB' ? 649 : 499}
        invoiceNumber="FC-2026-11"
        billingPeriod="15 Nov 2026 – 15 Dec 2026"
      />
    </div>
  );
};
