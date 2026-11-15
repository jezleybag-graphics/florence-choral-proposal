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
  onResetDemoData: () => void;
  onSwitchToPublic: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  festivals,
  juryMembers,
  applications,
  onUpdateFestival,
  onAddJuryMember,
  onUpdateApplicationStatus,
  onResetDemoData,
  onSwitchToPublic,
}) => {
  const [activeTab, setActiveTab] = useState<
    'inclusions' | 'code' | 'festivals' | 'applications' | 'jury'
  >('inclusions');
  const [editingFestivalId, setEditingFestivalId] = useState<string>(festivals[0]?.id || '');
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Subscription & Invoice State
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'planB' | 'planA'>('planB');

  // Inclusions Availment Mock State
  const [availedItems, setAvailedItems] = useState<Record<string, boolean>>({
    'video-1': false,
    'video-2': false,
    'poster-1': false,
    'booklet-1': false,
    'news-1': true, // Dispatched on Nov 3
    'news-2': false,
    'web-1': false,
  });

  const handleAvailInclusion = (serviceName: string, id: string) => {
    setAvailedItems((prev) => ({ ...prev, [id]: true }));
    setSavedNotice(`✓ Task Request logged for "${serviceName}". Registered in Jezreel's priority production queue (24–48h SLA).`);
    setTimeout(() => setSavedNotice(null), 5000);
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
    setSavedNotice('Monthly Inclusions Quota reset to fresh cycle state.');
    setTimeout(() => setSavedNotice(null), 4000);
  };

  // Health Bar Calculation
  const totalUnits = 8;
  const usedUnits = Object.entries(availedItems).filter(([_, v]) => v).length;
  const availableUnits = Math.max(0, totalUnits - usedUnits);
  const healthPercent = Math.round((availableUnits / totalUnits) * 100);

  // New Jury Member Form State
  const [newJuryName, setNewJuryName] = useState('');
  const [newJuryRole, setNewJuryRole] = useState('International Jury Member');
  const [newJuryCountry, setNewJuryCountry] = useState('');
  const [newJuryCredentials, setNewJuryCredentials] = useState('');

  const currentFestival = festivals.find((f) => f.id === editingFestivalId) || festivals[0];

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
              <Icon icon="mage:lock" width={15} height={15} />
              <span>Interactive Sandbox Preview • Agreement Pending</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold">
              Florence Choral — Festival CMS (Sandbox Demo)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Experience the live festival content management and choir application workflows. Production source code repositories, domain keys, and full site data backups unlock immediately upon contract execution.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setSavedNotice('🔒 Full Source Code Repositories & Data Backups unlock immediately upon signing the Proposal Agreement.');
                setTimeout(() => setSavedNotice(null), 5000);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 border border-white/10 text-xs sm:text-sm font-semibold cursor-pointer"
            >
              <Icon icon="mage:lock" width={18} height={18} className="text-amber-400" />
              <span>Export Full Site JSON Backup (Locked)</span>
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
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('inclusions')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer apple-pressable shrink-0 ${
              activeTab === 'inclusions'
                ? 'bg-[#DC143C] text-white shadow'
                : 'text-[#3B3B3B] hover:bg-slate-100'
            }`}
          >
            <Icon icon="mage:dashboard" width={18} height={18} />
            <span>1. Inclusions &amp; Availment Hub</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-[#F79223] text-black">
              TRACKER
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer apple-pressable shrink-0 ${
              activeTab === 'code'
                ? 'bg-[#DC143C] text-white shadow'
                : 'text-[#3B3B3B] hover:bg-slate-100'
            }`}
          >
            <Icon icon="mage:lock" width={18} height={18} />
            <span>2. Source Code &amp; Keys</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
              LOCKED
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('festivals')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer apple-pressable shrink-0 ${
              activeTab === 'festivals'
                ? 'bg-[#DC143C] text-white shadow'
                : 'text-[#3B3B3B] hover:bg-slate-100'
            }`}
          >
            <Icon icon="mage:edit" width={18} height={18} />
            <span>3. Edit 5 Festivals</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('applications')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer apple-pressable shrink-0 ${
              activeTab === 'applications'
                ? 'bg-[#DC143C] text-white shadow'
                : 'text-[#3B3B3B] hover:bg-slate-100'
            }`}
          >
            <Icon icon="mage:inbox" width={18} height={18} />
            <span>4. Choir Inquiries ({applications.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('jury')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer apple-pressable shrink-0 ${
              activeTab === 'jury'
                ? 'bg-[#DC143C] text-white shadow'
                : 'text-[#3B3B3B] hover:bg-slate-100'
            }`}
          >
            <Icon icon="mage:users" width={18} height={18} />
            <span>5. Artistic Committee ({juryMembers.length})</span>
          </button>
        </div>

        {/* TAB 0: INCLUSIONS & SERVICE AVAILMENT HUB */}
        {activeTab === 'inclusions' && (
          <div className="space-y-6">
            {/* 1. SUBSCRIPTION & PAYMENT STATUS BAR */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl space-y-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-5 border-b border-slate-800">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Partnership Active • Paid In Full</span>
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Partnered Since <strong className="text-slate-200 font-bold">December 2020</strong>
                    </span>
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white">
                    {selectedPlan === 'planB'
                      ? 'Option B: All-Inclusive Retainer (€649/mo • €0 Setup Fee)'
                      : 'Option A: Custom Festival Build & Retainer (€1,599 + €499/mo)'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    Continuous festival management covering cloud hosting ($28/mo covered), 5 festival CMS, 4K video reportages, poster suites, booklet layout, and automated conductor newsletter outreach.
                  </p>
                </div>

                {/* Receipt Trigger & Plan Toggle */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsInvoiceModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs sm:text-sm shadow-lg cursor-pointer transition-all apple-pressable"
                  >
                    <Icon icon="mage:receipt" width={18} height={18} />
                    <span>View Official Receipt (#FC-2026-11)</span>
                  </button>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>Preview Plan:</span>
                    <button
                      type="button"
                      onClick={() => setSelectedPlan('planB')}
                      className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                        selectedPlan === 'planB'
                          ? 'bg-[#DC143C] text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Option B (€649)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPlan('planA')}
                      className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                        selectedPlan === 'planA'
                          ? 'bg-[#DC143C] text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Option A (€499)
                    </button>
                  </div>
                </div>
              </div>

              {/* Billing Cycle Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs">
                <div className="p-3 rounded-2xl bg-slate-800/70 border border-slate-700/60">
                  <div className="text-slate-400 text-[11px] font-medium">Current Billing Period</div>
                  <div className="text-sm font-bold text-white mt-0.5">15 Nov – 15 Dec 2026</div>
                  <div className="text-[10.5px] text-emerald-400 font-semibold mt-0.5">✓ Cleared &amp; Active</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-800/70 border border-slate-700/60">
                  <div className="text-slate-400 text-[11px] font-medium">Next Scheduled Renewal</div>
                  <div className="text-sm font-bold text-white mt-0.5">15 December 2026</div>
                  <div className="text-[10.5px] text-slate-400">Monthly auto-cycle</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-800/70 border border-slate-700/60">
                  <div className="text-slate-400 text-[11px] font-medium">Payment Route on File</div>
                  <div className="text-sm font-bold text-white mt-0.5">SEPA Wire / IBAN</div>
                  <div className="text-[10.5px] text-slate-400">Banca Intesa Sanpaolo</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-800/70 border border-slate-700/60">
                  <div className="text-slate-400 text-[11px] font-medium">Punctuality SLA Status</div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">100% On-Time Record</div>
                  <div className="text-[10.5px] text-slate-400">€100 Late Guarantee</div>
                </div>
              </div>
            </div>

            {/* 2. THE "BROKEN HEALTH BAR" SUBSCRIPTION QUOTA METER */}
            <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                    <Icon icon="mage:battery-charging" width={16} height={16} />
                    <span>Monthly Retainer Health Bar • Deliverable Quota Meter</span>
                  </div>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-white">
                    Cycle Retainer Health: {healthPercent}% Available Capacity
                  </h3>
                  <p className="text-xs text-slate-400">
                    Discrete deliverable cells deplete to amber when availed or in production, proving unspent value every month.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-black text-emerald-400">
                      {availableUnits} of {totalUnits} Units Ready
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {usedUnits} availed / in progress
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetInclusions}
                    title="Reset Health Bar Demo State"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <Icon icon="mage:refresh" width={16} height={16} />
                  </button>
                </div>
              </div>

              {/* Segmented Broken Health Bar Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 pt-2">
                {/* Segment 1: Video 1 */}
                <div
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col justify-between min-h-[92px] ${
                    availedItems['video-1']
                      ? 'bg-amber-500/15 border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                      : 'bg-emerald-500/15 border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Video Slot 1
                  </div>
                  <div className="text-xs font-black my-1 text-white">
                    {availedItems['video-1'] ? '⚡ In 4K Cut' : '✓ 4K Reportage'}
                  </div>
                  <div
                    className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-full ${
                      availedItems['video-1']
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                        : 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
                    }`}
                  >
                    {availedItems['video-1'] ? 'IN PRODUCTION' : 'READY TO AVAIL'}
                  </div>
                </div>

                {/* Segment 2: Video 2 */}
                <div
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col justify-between min-h-[92px] ${
                    availedItems['video-2']
                      ? 'bg-amber-500/15 border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                      : 'bg-emerald-500/15 border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Video Slot 2
                  </div>
                  <div className="text-xs font-black my-1 text-white">
                    {availedItems['video-2'] ? '⚡ In Render' : '✓ Social Reel'}
                  </div>
                  <div
                    className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-full ${
                      availedItems['video-2']
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                        : 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
                    }`}
                  >
                    {availedItems['video-2'] ? 'IN PRODUCTION' : 'READY TO AVAIL'}
                  </div>
                </div>

                {/* Segment 3: Poster Suite */}
                <div
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col justify-between min-h-[92px] ${
                    availedItems['poster-1']
                      ? 'bg-amber-500/15 border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                      : 'bg-emerald-500/15 border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Poster Suite
                  </div>
                  <div className="text-xs font-black my-1 text-white">
                    {availedItems['poster-1'] ? '⚡ In Design' : '✓ 5-Size Suite'}
                  </div>
                  <div
                    className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-full ${
                      availedItems['poster-1']
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                        : 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
                    }`}
                  >
                    {availedItems['poster-1'] ? 'IN PRODUCTION' : 'READY TO AVAIL'}
                  </div>
                </div>

                {/* Segment 4: 31-Page Booklet */}
                <div
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col justify-between min-h-[92px] ${
                    availedItems['booklet-1']
                      ? 'bg-amber-500/15 border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                      : 'bg-blue-500/15 border-blue-500/60 shadow-[0_0_12px_rgba(59,130,246,0.2)]'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    31p Booklet
                  </div>
                  <div className="text-xs font-black my-1 text-white">
                    {availedItems['booklet-1'] ? '⚡ Page Updates' : '6th Leonardo'}
                  </div>
                  <div className="text-[9.5px] font-bold px-1.5 py-0.5 rounded-full bg-blue-400/20 text-blue-300 border border-blue-400/30">
                    STAGE 3 ACTIVE
                  </div>
                </div>

                {/* Segment 5: Newsletter 1 */}
                <div className="p-3 rounded-2xl border border-slate-700 bg-slate-900 text-center flex flex-col justify-between min-h-[92px]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Newsletter #1
                  </div>
                  <div className="text-xs font-black my-1 text-slate-300">
                    ✓ 420 Choirs
                  </div>
                  <div className="text-[9.5px] font-bold px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    DELIVERED NOV 3
                  </div>
                </div>

                {/* Segment 6: Newsletter 2 */}
                <div
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col justify-between min-h-[92px] ${
                    availedItems['news-2']
                      ? 'bg-amber-500/15 border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                      : 'bg-emerald-500/15 border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Newsletter #2
                  </div>
                  <div className="text-xs font-black my-1 text-white">
                    {availedItems['news-2'] ? '⚡ Scheduled' : '✓ Draft Ready'}
                  </div>
                  <div
                    className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-full ${
                      availedItems['news-2']
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                        : 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
                    }`}
                  >
                    {availedItems['news-2'] ? 'QUEUED' : 'READY TO AVAIL'}
                  </div>
                </div>

                {/* Segment 7: Web Fixes A */}
                <div
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col justify-between min-h-[92px] ${
                    availedItems['web-1']
                      ? 'bg-amber-500/15 border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                      : 'bg-emerald-500/15 border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Web Updates
                  </div>
                  <div className="text-xs font-black my-1 text-white">
                    {availedItems['web-1'] ? '⚡ In Revision' : '✓ 24–48h SLA'}
                  </div>
                  <div
                    className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-full ${
                      availedItems['web-1']
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                        : 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
                    }`}
                  >
                    {availedItems['web-1'] ? 'TASK LOGGED' : 'ACTIVE QUEUE'}
                  </div>
                </div>

                {/* Segment 8: Server & Hosting */}
                <div className="p-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-center flex flex-col justify-between min-h-[92px]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Cloud Server
                  </div>
                  <div className="text-xs font-black my-1 text-white">
                    100% Uptime
                  </div>
                  <div className="text-[9.5px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    UNLIMITED 24/7
                  </div>
                </div>
              </div>
            </div>

            {/* 3. ON-TIME DELIVERY SLA ASSURANCE HUB */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
                    <Icon icon="mage:lightning-bolt-fill" width={16} height={16} className="text-amber-500" />
                    <span>Guaranteed Punctuality • SLA Delivery Assurance Engine</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#3B3B3B]">
                    Active Production Steppers &amp; Delivery Covenant
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A5568] mt-1 max-w-2xl">
                    Choral festival printing and announcements cannot wait. Inspect live production milestones and rely on our contractual punctuality guarantee.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shrink-0 text-center sm:text-right">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Historical Track Record
                  </div>
                  <div className="text-lg font-black text-emerald-700 mt-0.5">
                    100% On-Time (0 Missed Deadlines)
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Average Turnaround: 22.4 Hours (SLA: 24–48h)
                  </div>
                </div>
              </div>

              {/* Two Column Layout: Active Workstream Stepper + Covenant Box */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Active Workstream Stepper (Col 7) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-blue-100 text-[#136597]">
                          <Icon icon="mage:book" width={18} height={18} />
                        </span>
                        <div>
                          <h4 className="font-display font-bold text-sm text-[#3B3B3B]">
                            6th Leonardo da Vinci ICF — 31-Page Master Booklet
                          </h4>
                          <p className="text-[11px] text-slate-500">Official Programme &amp; Repertoire Rulebook</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                        ON TRACK (Ahead of Schedule)
                      </span>
                    </div>

                    {/* 4-Step Stepper */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs">
                      <div className="p-2.5 rounded-xl bg-white border border-emerald-300 shadow-xs">
                        <div className="text-emerald-600 font-bold flex items-center justify-center gap-1 text-[11px]">
                          <Icon icon="mage:check-circle-fill" width={14} height={14} />
                          <span>Stage 1</span>
                        </div>
                        <div className="font-semibold text-slate-800 mt-1 text-[11.5px]">Repertoire Intake</div>
                        <div className="text-[10px] text-slate-400">Completed Nov 12</div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-emerald-300 shadow-xs">
                        <div className="text-emerald-600 font-bold flex items-center justify-center gap-1 text-[11px]">
                          <Icon icon="mage:check-circle-fill" width={14} height={14} />
                          <span>Stage 2</span>
                        </div>
                        <div className="font-semibold text-slate-800 mt-1 text-[11.5px]">Patronage Seals</div>
                        <div className="text-[10px] text-slate-400">Completed Nov 14</div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-blue-50/80 border-2 border-blue-400 shadow-xs">
                        <div className="text-blue-700 font-black flex items-center justify-center gap-1 text-[11px]">
                          <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                          <span>Stage 3 (85%)</span>
                        </div>
                        <div className="font-bold text-slate-900 mt-1 text-[11.5px]">Typography Proof</div>
                        <div className="text-[10px] text-blue-700 font-semibold">Active Right Now</div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-100/60 border border-slate-200 text-slate-400">
                        <div className="font-semibold text-[11px]">Stage 4</div>
                        <div className="font-medium mt-1 text-[11.5px]">Certified Print PDF</div>
                        <div className="text-[10px] text-slate-400">Due Nov 18, 17:00</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Icon icon="mage:clock" width={16} height={16} className="text-emerald-600" />
                        <span>Committed Delivery: <strong>Tomorrow, Nov 18 @ 17:00 CET</strong></span>
                      </span>
                      <span className="font-bold text-emerald-800">18 Hours Ahead of Print Deadline</span>
                    </div>
                  </div>

                  {/* Recently Delivered Item */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                        <Icon icon="mage:check-circle-fill" width={16} height={16} />
                      </span>
                      <div>
                        <strong className="text-slate-800">5th Verrocchio ICF — 4K Video Documentary Teaser</strong>
                        <div className="text-slate-500 text-[11px]">Delivered Nov 14 (6 Hours Ahead of SLA) • Available in Archive</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-bold text-slate-700">
                      Delivered
                    </span>
                  </div>
                </div>

                {/* The Punctuality Covenant Card (Col 5) */}
                <div className="lg:col-span-5 bg-gradient-to-br from-amber-50 to-orange-50/40 rounded-2xl p-6 border-2 border-amber-200 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                        ⚜
                      </span>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">
                          Contractual Guarantee
                        </span>
                        <h4 className="font-display font-extrabold text-base text-slate-900">
                          The Florence Choral Punctuality Covenant
                        </h4>
                      </div>
                    </div>

                    <blockquote className="text-xs text-slate-700 leading-relaxed italic bg-white/70 p-3.5 rounded-xl border border-amber-200/60">
                      "If Jezreel Dave ever fails to deliver an agreed festival poster, video reportage, or programme booklet revision before your confirmed festival announcement or printing deadline, Florence Choral automatically receives a <strong>€100 credit</strong> deducted from the subsequent month's invoice, zero questions asked."
                    </blockquote>
                  </div>

                  <div className="pt-3 border-t border-amber-200/80 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-display font-bold text-slate-900">Jezreel Dave Leybag</div>
                      <div className="text-[11px] text-slate-500">Continuous Partner Since Dec 2020</div>
                    </div>
                    <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full">
                      <Icon icon="mage:shield-check-fill" width={14} height={14} className="text-amber-700" />
                      <span>100% Guaranteed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. INCLUSIONS CARDS GRID WITH LOCAL HEALTH METERS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: Video Reportages */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#DC143C]/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="p-2 rounded-xl bg-[#DC143C]/10 text-[#DC143C]">
                      <Icon icon="mage:video" width={22} height={22} />
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {availedItems['video-1'] ? '1 Available (1 In Review)' : '2 Available to Avail'}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-[#3B3B3B]">
                    Festival Video Reportages &amp; Reels
                  </h3>
                  <p className="text-xs text-[#4A5568] mt-1.5 leading-relaxed">
                    5–7 min multi-day documentary cut with Basilica live audio leveling, logo openers, and vertical 9:16 social cutdowns.
                  </p>
                  
                  {/* Discrete Mini Health Bar */}
                  <div className="mt-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between text-[11px] font-bold text-slate-600">
                      <span>Monthly Video Slots:</span>
                      <span className="text-slate-800">{availedItems['video-1'] ? '1 of 2 Ready' : '2 of 2 Ready'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className={`py-1.5 px-2 rounded-lg text-center text-[10px] font-bold border ${
                        availedItems['video-1'] 
                          ? 'bg-amber-100 text-amber-800 border-amber-300' 
                          : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      }`}>
                        Slot 1: {availedItems['video-1'] ? 'In Production' : 'Available'}
                      </div>
                      <div className={`py-1.5 px-2 rounded-lg text-center text-[10px] font-bold border ${
                        availedItems['video-2'] 
                          ? 'bg-amber-100 text-amber-800 border-amber-300' 
                          : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      }`}>
                        Slot 2: {availedItems['video-2'] ? 'In Production' : 'Available'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleAvailInclusion('Festival Video Reportage', 'video-1')}
                    disabled={availedItems['video-1']}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      availedItems['video-1']
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        : 'bg-[#DC143C] hover:bg-[#B81032] text-white shadow'
                    }`}
                  >
                    {availedItems['video-1'] ? '✓ Video Request Logged' : 'Avail Video Edit Request'}
                  </button>
                </div>
              </div>

              {/* Card 2: Festival Poster Suites */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#DC143C]/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="p-2 rounded-xl bg-[#F79223]/15 text-[#B45309]">
                      <Icon icon="mage:image" width={22} height={22} />
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {availedItems['poster-1'] ? 'Active in Design' : '1 Suite Available'}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-[#3B3B3B]">
                    Digital Festival Poster Suite (5 Sizes)
                  </h3>
                  <p className="text-xs text-[#4A5568] mt-1.5 leading-relaxed">
                    70×100cm print master, A2, A3, A5 certified print-ready PDFs, plus 2×2 social media and jury announcement cards.
                  </p>
                  
                  {/* Discrete Mini Health Bar */}
                  <div className="mt-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between text-[11px] font-bold text-slate-600">
                      <span>Monthly Poster Quota:</span>
                      <span className="text-slate-800">{availedItems['poster-1'] ? 'In Production' : '1 Suite Ready'}</span>
                    </div>
                    <div className={`py-1.5 px-2 rounded-lg text-center text-[10px] font-bold border ${
                      availedItems['poster-1'] 
                        ? 'bg-amber-100 text-amber-800 border-amber-300' 
                        : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    }`}>
                      Suite #1: {availedItems['poster-1'] ? 'Generating Master Formats' : 'Available to Avail'}
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleAvailInclusion('Festival Poster Campaign', 'poster-1')}
                    disabled={availedItems['poster-1']}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      availedItems['poster-1']
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        : 'bg-[#0B0C0E] hover:bg-neutral-800 text-white shadow'
                    }`}
                  >
                    {availedItems['poster-1'] ? '✓ Poster Request Submitted' : 'Avail Poster Suite Request'}
                  </button>
                </div>
              </div>

              {/* Card 3: 31-Page Programme Booklets */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#DC143C]/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="p-2 rounded-xl bg-purple-100 text-purple-700">
                      <Icon icon="mage:book" width={22} height={22} />
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Stage 3 Active
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-[#3B3B3B]">
                    31-Page Official Programme &amp; Rulebook
                  </h3>
                  <p className="text-xs text-[#4A5568] mt-1.5 leading-relaxed">
                    Full cover-to-cover print-ready layout: repertoire schedules, jury biographies, competition categories &amp; official Florence patronage seals.
                  </p>
                  
                  {/* Mini Stepper Indicator */}
                  <div className="mt-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex justify-between text-[11px] font-bold text-slate-600">
                      <span>Current Edition:</span>
                      <span className="text-slate-800">6th Leonardo da Vinci</span>
                    </div>
                    <div className="text-[11px] text-blue-700 font-semibold">
                      ⚡ Typesetting &amp; Page Layout (85% Done)
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleAvailInclusion('Booklet Revisions', 'booklet-1')}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
                  >
                    {availedItems['booklet-1'] ? '✓ Revisions Logged' : 'Request Booklet Page Updates'}
                  </button>
                </div>
              </div>

              {/* Card 4: Monthly Email Newsletters */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#DC143C]/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="p-2 rounded-xl bg-blue-100 text-blue-700">
                      <Icon icon="mage:email" width={22} height={22} />
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {availedItems['news-2'] ? '2 of 2 Dispatched' : '1 Dispatch Available'}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-[#3B3B3B]">
                    Monthly Email Newsletter Dispatch
                  </h3>
                  <p className="text-xs text-[#4A5568] mt-1.5 leading-relaxed">
                    Professionally written and formatted editorial emails sent directly to your existing conductor contact database to announce deadlines and repertoire.
                  </p>
                  
                  {/* Discrete Mini Health Bar */}
                  <div className="mt-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between text-[11px] font-bold text-slate-600">
                      <span>Monthly Dispatches:</span>
                      <span className="text-slate-800">2 Dispatches / Month</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="py-1.5 px-2 rounded-lg text-center text-[10px] font-bold bg-slate-200 text-slate-600 border border-slate-300">
                        Dispatch 1: Sent Nov 3
                      </div>
                      <div className={`py-1.5 px-2 rounded-lg text-center text-[10px] font-bold border ${
                        availedItems['news-2'] 
                          ? 'bg-amber-100 text-amber-800 border-amber-300' 
                          : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      }`}>
                        Dispatch 2: {availedItems['news-2'] ? 'Queued' : 'Ready'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleAvailInclusion('Newsletter Dispatch #2', 'news-2')}
                    disabled={availedItems['news-2']}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      availedItems['news-2']
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        : 'bg-[#DC143C] hover:bg-[#B81032] text-white shadow'
                    }`}
                  >
                    {availedItems['news-2'] ? '✓ Scheduled for Dispatch' : 'Avail Newsletter #2 Draft'}
                  </button>
                </div>
              </div>

              {/* Card 5: Global Choir Recruitment Outreach */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#DC143C]/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="p-2 rounded-xl bg-amber-100 text-amber-700">
                      <Icon icon="mage:globe" width={22} height={22} />
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Active Campaign
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-[#3B3B3B]">
                    Global Choir Email Recruitment
                  </h3>
                  <p className="text-xs text-[#4A5568] mt-1.5 leading-relaxed">
                    Proactive outbound outreach sending official festival invitations to choral associations, youth choirs, and university ensembles across Europe and worldwide.
                  </p>
                  <div className="mt-3 text-[11.5px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <strong>Current Progress:</strong> 420 Choirs Contacted • 28 Brochure Downloads
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setSavedNotice('Choir outreach analytics report: 420 emails sent, 68% open rate, 28 brochure downloads!');
                      setTimeout(() => setSavedNotice(null), 5000);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
                  >
                    View Outreach Engagement Stats
                  </button>
                </div>
              </div>

              {/* Card 6: Website Maintenance & Updates */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#DC143C]/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                      <Icon icon="mage:refresh" width={22} height={22} />
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Unlimited Active
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-[#3B3B3B]">
                    Website Maintenance &amp; Changes
                  </h3>
                  <p className="text-xs text-[#4A5568] mt-1.5 leading-relaxed">
                    Update festival competition categories, modify rules, publish newly confirmed international jury members, or post news announcements.
                  </p>
                  <div className="mt-3 text-[11.5px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <strong>Service Guarantee:</strong> Unlimited Tasks (24–48h Turnaround Time)
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleAvailInclusion('Website Content Update', 'web-1')}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#0B0C0E] hover:bg-neutral-800 text-white text-xs font-bold transition-all cursor-pointer shadow"
                  >
                    {availedItems['web-1'] ? '✓ Update Task Logged' : 'Submit Website Content Update'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: SOURCE CODE FILES & KEYS VAULT (LOCKED) */}
        {activeTab === 'code' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center max-w-3xl mx-auto space-y-6">
            <div className="w-20 h-20 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-inner text-3xl">
              🔒
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full">
                Vault Protected • Proposal Execution Required
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#3B3B3B]">
                Source Code &amp; Infrastructure Repository
              </h2>
              <p className="text-sm text-[#4A5568] max-w-xl mx-auto leading-relaxed">
                Full GitHub repository access, production React/TypeScript files, custom domain registrar transfers, and architecture SOP documentation are securely staged and will be officially transferred to Dr. Leonardo Sagliocca immediately upon agreement execution.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-4 border-t border-slate-100">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Icon icon="mage:folder-code" width={16} height={16} className="text-[#DC143C]" />
                  <span>GitHub Repository</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Full commit history &amp; direct ZIP export. <em>(Locked)</em>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Icon icon="mage:globe" width={16} height={16} className="text-[#DC143C]" />
                  <span>Domain &amp; Hosting Keys</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Direct registrar assignment to chairman@florencechoral.com. <em>(Locked)</em>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Icon icon="mage:book" width={16} height={16} className="text-[#DC143C]" />
                  <span>Architecture SOP</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Full handoff &amp; maintenance documentation. <em>(Locked)</em>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/?view=proposal#proposal-acceptance"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black hover:bg-[#222222] text-white text-xs sm:text-sm font-bold shadow-lg transition-all"
              >
                <span>Review Proposal &amp; Sign to Unlock ↗</span>
              </a>
              <button
                type="button"
                onClick={() => setActiveTab('festivals')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                <span>Preview Festival CMS Instead</span>
              </button>
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

        <div className="pt-6 border-t border-slate-200 text-center text-xs text-slate-400 flex flex-wrap items-center justify-between gap-3">
          <span>Florence Choral Client CMS Demo Sandbox • Protected &amp; Secured</span>
          <button
            type="button"
            onClick={onResetDemoData}
            className="text-slate-500 hover:text-slate-800 underline cursor-pointer"
          >
            Reset Sandbox Demo Data
          </button>
        </div>
      </div>

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
    </section>
  );
};
