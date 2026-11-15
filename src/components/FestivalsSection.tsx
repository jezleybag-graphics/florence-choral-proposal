import React, { useEffect, useId, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import type { Festival } from '../types/festival';

interface FestivalsSectionProps {
  festivals: Festival[];
  selectedFestival: Festival | null;
  onSelectFestival: (festival: Festival | null) => void;
  onOpenApplication: (festivalId: string, requestType: 'Full Application' | 'Brochure Request') => void;
}

export const FestivalsSection: React.FC<FestivalsSectionProps> = ({
  festivals,
  selectedFestival,
  onSelectFestival,
  onOpenApplication,
}) => {
  const [activeTab, setActiveTab] = useState<'programme' | 'rules' | 'prizes' | 'master'>('programme');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogTitleId = useId();

  // Open or close native <dialog> via showModal()
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selectedFestival) {
      setActiveTab('programme');
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [selectedFestival]);

  // Modern Web Guidance: Mandatory fallback for browsers without native closedby="any" support
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = '';
      onSelectFestival(null);
    };

    dialog.addEventListener('close', handleClose);

    let cleanupFallback: (() => void) | undefined;
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      const outside = (e: PointerEvent, dlg: HTMLDialogElement) => {
        const r = dlg.getBoundingClientRect();
        return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
      };
      let pressedOutside = false;
      const onPointerDown = (e: PointerEvent) => {
        pressedOutside = outside(e, dialog);
      };
      const onPointerUp = (e: PointerEvent) => {
        if (pressedOutside && outside(e, dialog)) {
          dialog.close();
        }
      };
      dialog.addEventListener('pointerdown', onPointerDown);
      dialog.addEventListener('pointerup', onPointerUp);
      cleanupFallback = () => {
        dialog.removeEventListener('pointerdown', onPointerDown);
        dialog.removeEventListener('pointerup', onPointerUp);
      };
    }

    return () => {
      dialog.removeEventListener('close', handleClose);
      cleanupFallback?.();
    };
  }, [onSelectFestival]);

  return (
    <section id="festivals" className="py-16 sm:py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading Matching Original Site's "About the Great Masters" & Festivals */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DC143C]/10 text-[#DC143C] text-xs font-bold uppercase tracking-wider mb-3">
            <Icon icon="mage:calendar-2" width={15} height={15} />
            <span>Annual International Calendar</span>
          </span>
          <h2 className="apple-display-section font-extrabold florence-section-title">
            About the Great Masters &amp; Our 5 Festivals
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#4A5568] leading-relaxed">
            Each Florence Choral festival is dedicated to an immortal master of the Florentine
            Renaissance. Click any festival below to inspect its complete 4-day programme, competition
            categories, repertoire rules, and historic basilica venues.
          </p>
        </div>

        {/* Festivals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {festivals.map((festival, idx) => (
            <article
              key={festival.id}
              className={`apple-card rounded-2xl overflow-hidden flex flex-col ${
                idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Card Image Header */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-900">
                <img
                  src={festival.heroImage}
                  alt={festival.name}
                  loading="lazy"
                  width={640}
                  height={320}
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#DC143C] text-white shadow">
                    {festival.status}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/55 text-white backdrop-blur-md border border-white/25">
                    {festival.edition}
                  </span>
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-semibold text-white/85 flex items-center gap-1.5 mb-1">
                    <Icon icon="mage:calendar-check" width={15} height={15} />
                    <span>{festival.dates}</span>
                    <span className="opacity-60">•</span>
                    <span>{festival.season}</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold leading-tight">
                    {festival.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#136597] bg-[#136597]/8 px-3 py-2 rounded-xl">
                    <span className="flex items-center gap-1.5">
                      <Icon icon="mage:user-square" width={16} height={16} />
                      <span>Master: {festival.renaissanceMaster} ({festival.masterYears})</span>
                    </span>
                    <span className="text-[#DC143C]">Deadline: {festival.registrationDeadline}</span>
                  </div>

                  <p className="text-sm text-[#4A5568] leading-relaxed">
                    {festival.summary}
                  </p>

                  {/* Key Highlights */}
                  <ul className="space-y-1.5 pt-1">
                    {festival.highlights.slice(0, 3).map((hl, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#3B3B3B]">
                        <Icon
                          icon="mage:check-circle-fill"
                          width={17}
                          height={17}
                          className="text-[#DC143C] shrink-0 mt-0.5"
                        />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => onSelectFestival(festival)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold cursor-pointer apple-pressable"
                  >
                    <Icon icon="mage:book-open" width={17} height={17} />
                    <span>Programme &amp; Rules</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenApplication(festival.id, 'Full Application')}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#DC143C] hover:bg-[#B81032] text-white text-xs sm:text-sm font-semibold cursor-pointer apple-pressable"
                  >
                    <Icon icon="mage:send" width={16} height={16} />
                    <span>Apply</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Native <dialog> Modal for Festival Programme, Rules & Categories (Modern Web Guidance) */}
      <dialog
        ref={dialogRef}
        aria-labelledby={dialogTitleId}
        {...({ closedby: 'any' } as React.DialogHTMLAttributes<HTMLDialogElement>)}
        className="w-full max-w-4xl rounded-3xl p-0 bg-white text-[#3B3B3B] shadow-2xl border border-slate-200 m-auto backdrop:bg-slate-950/60"
      >
        {selectedFestival && (
          <div className="flex flex-col max-h-[88vh]">
            {/* Modal Banner Header */}
            <div className="relative h-48 sm:h-56 bg-slate-900 shrink-0 overflow-hidden">
              <img
                src={selectedFestival.heroImage}
                alt={selectedFestival.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/20" />

              <button
                type="button"
                autoFocus
                onClick={() => dialogRef.current?.close()}
                aria-label="Close festival details"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-[#DC143C] text-white flex items-center justify-center border border-white/30 cursor-pointer apple-pressable"
              >
                <Icon icon="mage:multiply" width={20} height={20} />
              </button>

              <div className="absolute bottom-5 left-6 right-6 text-white">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold mb-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#DC143C]">
                    {selectedFestival.dates}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md">
                    {selectedFestival.edition}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#136597]">
                    Deadline: {selectedFestival.registrationDeadline}
                  </span>
                </div>
                <h2 id={dialogTitleId} className="font-display text-2xl sm:text-3xl font-extrabold">
                  {selectedFestival.name}
                </h2>
              </div>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 px-6 py-3 bg-slate-100 border-b border-slate-200 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('programme')}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer apple-pressable ${
                  activeTab === 'programme'
                    ? 'bg-[#DC143C] text-white shadow-sm'
                    : 'text-[#3B3B3B] hover:bg-white'
                }`}
              >
                <Icon icon="mage:calendar-2" width={17} height={17} />
                <span>4-Day Programme</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('rules')}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer apple-pressable ${
                  activeTab === 'rules'
                    ? 'bg-[#DC143C] text-white shadow-sm'
                    : 'text-[#3B3B3B] hover:bg-white'
                }`}
              >
                <Icon icon="mage:checklist-note" width={17} height={17} />
                <span>Categories &amp; Rules</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('prizes')}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer apple-pressable ${
                  activeTab === 'prizes'
                    ? 'bg-[#DC143C] text-white shadow-sm'
                    : 'text-[#3B3B3B] hover:bg-white'
                }`}
              >
                <Icon icon="mage:trophy-star" width={17} height={17} />
                <span>Prizes &amp; Venues</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('master')}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer apple-pressable ${
                  activeTab === 'master'
                    ? 'bg-[#DC143C] text-white shadow-sm'
                    : 'text-[#3B3B3B] hover:bg-white'
                }`}
              >
                <Icon icon="mage:sparkles" width={17} height={17} />
                <span>About {selectedFestival.renaissanceMaster}</span>
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {activeTab === 'programme' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedFestival.programme.map((dayItem) => (
                    <div
                      key={dayItem.day}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-lg bg-[#DC143C] text-white text-xs font-bold">
                          {dayItem.day}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">Florence Historic Center</span>
                      </div>
                      <h4 className="font-display font-bold text-base text-[#3B3B3B]">
                        {dayItem.title}
                      </h4>
                      <ul className="space-y-1.5">
                        {dayItem.activities.map((act, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#4A5568]">
                            <Icon
                              icon="mage:check-circle"
                              width={16}
                              height={16}
                              className="text-[#136597] shrink-0 mt-0.5"
                            />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'rules' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-display font-bold text-lg text-[#3B3B3B] flex items-center gap-2">
                      <Icon icon="mage:users" width={20} height={20} className="text-[#DC143C]" />
                      <span>Competition &amp; Festival Categories</span>
                    </h4>
                    <ul className="space-y-2">
                      {selectedFestival.categories.map((cat, i) => (
                        <li
                          key={i}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-[#3B3B3B]"
                        >
                          {cat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-display font-bold text-lg text-[#3B3B3B] flex items-center gap-2">
                      <Icon icon="mage:music-note" width={20} height={20} className="text-[#DC143C]" />
                      <span>Repertoire &amp; Adjudication Rules</span>
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedFestival.repertoireRules.map((rule, i) => (
                        <li
                          key={i}
                          className="p-3.5 rounded-xl bg-[#136597]/6 border border-[#136597]/20 text-xs sm:text-sm text-[#3B3B3B] leading-relaxed"
                        >
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'prizes' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-display font-bold text-lg text-[#3B3B3B] flex items-center gap-2">
                      <Icon icon="mage:trophy-star" width={20} height={20} className="text-[#DC143C]" />
                      <span>Trophies, Diplomas &amp; Awards</span>
                    </h4>
                    <ul className="space-y-2">
                      {selectedFestival.prizes.map((prize, i) => (
                        <li
                          key={i}
                          className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs sm:text-sm font-semibold text-[#3B3B3B] flex items-center gap-2.5"
                        >
                          <Icon icon="mage:award-fill" width={18} height={18} className="text-[#DC143C] shrink-0" />
                          <span>{prize}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-display font-bold text-lg text-[#3B3B3B] flex items-center gap-2">
                      <Icon icon="mage:map-marker" width={20} height={20} className="text-[#DC143C]" />
                      <span>Designated Historic Venues</span>
                    </h4>
                    <ul className="space-y-2">
                      {selectedFestival.venues.map((v, i) => (
                        <li
                          key={i}
                          className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-[#3B3B3B] flex items-center gap-2.5"
                        >
                          <Icon icon="mage:building-tree" width={18} height={18} className="text-[#136597] shrink-0" />
                          <span>{v}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'master' && (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#DC143C]">
                    Florentine Renaissance Dedication
                  </div>
                  <h4 className="font-display text-xl font-extrabold text-[#3B3B3B]">
                    {selectedFestival.renaissanceMaster} ({selectedFestival.masterYears})
                  </h4>
                  <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed">
                    {selectedFestival.masterBio}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <form method="dialog">
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-xs sm:text-sm font-semibold text-[#3B3B3B] cursor-pointer apple-pressable"
                >
                  Close Window
                </button>
              </form>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    const id = selectedFestival.id;
                    dialogRef.current?.close();
                    onOpenApplication(id, 'Brochure Request');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#136597] hover:bg-[#0e4f78] text-white text-xs sm:text-sm font-semibold cursor-pointer apple-pressable"
                >
                  <Icon icon="mage:file-download" width={17} height={17} />
                  <span>Request Official PDF Brochure</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const id = selectedFestival.id;
                    dialogRef.current?.close();
                    onOpenApplication(id, 'Full Application');
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#DC143C] hover:bg-[#B81032] text-white text-xs sm:text-sm font-semibold shadow cursor-pointer apple-pressable"
                >
                  <Icon icon="mage:send" width={17} height={17} />
                  <span>Submit Choir Application</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
};
