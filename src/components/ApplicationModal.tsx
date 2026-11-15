import React, { useEffect, useId, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import type { Festival, ChoirApplication } from '../types/festival';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  festivals: Festival[];
  initialFestivalId?: string;
  initialRequestType?: 'Full Application' | 'Brochure Request';
  onSubmitApplication: (app: Omit<ChoirApplication, 'id' | 'submittedAt' | 'status'>) => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  festivals,
  initialFestivalId,
  initialRequestType = 'Brochure Request',
  onSubmitApplication,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const [choirName, setChoirName] = useState('');
  const [country, setCountry] = useState('');
  const [conductorName, setConductorName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [festivalId, setFestivalId] = useState(initialFestivalId || festivals[0]?.id || '');
  const [category, setCategory] = useState('Category A: Mixed Adult Choirs (min. 16 singers)');
  const [singersCount, setSingersCount] = useState(30);
  const [requestType, setRequestType] = useState<'Full Application' | 'Brochure Request' | 'Workshop Inquiry'>(
    initialRequestType
  );
  const [notes, setNotes] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (initialFestivalId) setFestivalId(initialFestivalId);
    if (initialRequestType) setRequestType(initialRequestType);
  }, [initialFestivalId, initialRequestType]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      setSubmittedSuccess(false);
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Modern Web Guidance: closedby="any" fallback + returnValue reset
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = '';
      onClose();
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
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedFest = festivals.find((f) => f.id === festivalId) || festivals[0];
    onSubmitApplication({
      choirName,
      country,
      conductorName,
      email,
      phone,
      festivalId: selectedFest.id,
      festivalName: selectedFest.name,
      category,
      singersCount,
      requestType,
      notes,
    });
    setSubmittedSuccess(true);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      {...({ closedby: 'any' } as React.DialogHTMLAttributes<HTMLDialogElement>)}
      className="w-full max-w-2xl rounded-3xl p-0 bg-white text-[#3B3B3B] shadow-2xl border border-slate-200 m-auto"
    >
      <div className="flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#DC143C] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-white/85 block">
              Florence Choral • Direct Intake
            </span>
            <h2 id={titleId} className="font-display text-xl sm:text-2xl font-extrabold">
              {requestType === 'Brochure Request'
                ? 'Request Official Festival Brochure & Rules'
                : 'Submit Choir / Orchestra Application'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close application form"
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer apple-pressable"
          >
            <Icon icon="mage:multiply" width={19} height={19} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {submittedSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Icon icon="mage:check-circle-fill" width={36} height={36} />
              </div>
              <h3 className="font-display text-2xl font-extrabold text-[#3B3B3B]">
                Grazie! Your Request Has Been Logged
              </h3>
              <p className="text-sm text-[#4A5568] max-w-md mx-auto leading-relaxed">
                Your submission for <strong>{choirName}</strong> has been recorded directly into Dr.
                Leonardo Sagliocca’s Festival Dashboard, and the official brochure package is ready.
              </p>
              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://www.florencechoral.com/wp-content/uploads/2017/06/Patrocinio-Town-Council-Florence-Choral.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#136597] text-white text-xs sm:text-sm font-semibold apple-pressable"
                >
                  <Icon icon="mage:file-download" width={17} height={17} />
                  <span>View Official Patronage PDF</span>
                </a>
                <button
                  type="button"
                  onClick={() => dialogRef.current?.close()}
                  className="px-5 py-2.5 rounded-xl bg-[#DC143C] text-white text-xs sm:text-sm font-semibold cursor-pointer apple-pressable"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Request Type Selector */}
              <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-slate-100">
                {(['Brochure Request', 'Full Application', 'Workshop Inquiry'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setRequestType(type)}
                    className={`py-2 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer apple-pressable ${
                      requestType === type
                        ? 'bg-[#DC143C] text-white shadow-sm'
                        : 'text-[#3B3B3B] hover:bg-white/60'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-choir-name" className="block text-xs font-bold text-[#3B3B3B] mb-1">
                    Choir / Orchestra Name *
                  </label>
                  <input
                    id="modal-choir-name"
                    type="text"
                    required
                    autoFocus
                    value={choirName}
                    onChange={(e) => setChoirName(e.target.value)}
                    placeholder="e.g., St. Cecilia Chamber Choir"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#DC143C]"
                  />
                  <div className="field-error-msg">
                    <span role="img" aria-label="Error">❌</span> Please enter your choir or ensemble name.
                  </div>
                </div>

                <div>
                  <label htmlFor="modal-country" className="block text-xs font-bold text-[#3B3B3B] mb-1">
                    Country *
                  </label>
                  <input
                    id="modal-country"
                    type="text"
                    required
                    autoComplete="country-name"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g., Germany, USA, China"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#DC143C]"
                  />
                  <div className="field-error-msg">
                    <span role="img" aria-label="Error">❌</span> Please specify your ensemble’s country.
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-conductor" className="block text-xs font-bold text-[#3B3B3B] mb-1">
                    Conductor / Contact Person *
                  </label>
                  <input
                    id="modal-conductor"
                    type="text"
                    required
                    autoComplete="name"
                    value={conductorName}
                    onChange={(e) => setConductorName(e.target.value)}
                    placeholder="Maestro / Director Full Name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#DC143C]"
                  />
                  <div className="field-error-msg">
                    <span role="img" aria-label="Error">❌</span> Please enter the conductor or contact name.
                  </div>
                </div>

                <div>
                  <label htmlFor="modal-singers" className="block text-xs font-bold text-[#3B3B3B] mb-1">
                    Estimated Participants
                  </label>
                  <input
                    id="modal-singers"
                    type="number"
                    min={4}
                    max={250}
                    required
                    value={singersCount}
                    onChange={(e) => setSingersCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#DC143C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-email" className="block text-xs font-bold text-[#3B3B3B] mb-1">
                    Official Email Address *
                  </label>
                  <span id="modal-email-hint" className="block text-[11px] text-slate-500 mb-1">
                    Format: conductor@choir.org
                  </span>
                  <input
                    id="modal-email"
                    type="email"
                    required
                    autoComplete="email"
                    aria-describedby="modal-email-hint"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="director@ensemble.org"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#DC143C]"
                  />
                  <div className="field-error-msg">
                    <span role="img" aria-label="Error">❌</span> Enter an email address in the format you@example.com.
                  </div>
                </div>

                <div>
                  <label htmlFor="modal-phone" className="block text-xs font-bold text-[#3B3B3B] mb-1">
                    Phone / WhatsApp (with Country Code) *
                  </label>
                  <span id="modal-phone-hint" className="block text-[11px] text-slate-500 mb-1">
                    Example: +39 388 8183714
                  </span>
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    aria-describedby="modal-phone-hint"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 / +44 / +39 ..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#DC143C]"
                  />
                  <div className="field-error-msg">
                    <span role="img" aria-label="Error">❌</span> Please enter a valid phone or WhatsApp number.
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-festival" className="block text-xs font-bold text-[#3B3B3B] mb-1">
                    Target Festival *
                  </label>
                  <select
                    id="modal-festival"
                    value={festivalId}
                    onChange={(e) => setFestivalId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#DC143C]"
                  >
                    {festivals.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.shortName} ({f.dates})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="modal-category" className="block text-xs font-bold text-[#3B3B3B] mb-1">
                    Preferred Division
                  </label>
                  <select
                    id="modal-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#DC143C]"
                  >
                    <option value="Category A: Mixed Adult Choirs">Category A: Mixed Adult Choirs</option>
                    <option value="Category B: Equal Voices">Category B: Equal Voices</option>
                    <option value="Category C: Youth & University Choirs">Category C: Youth &amp; University Choirs</option>
                    <option value="Category D: Children's Choirs">Category D: Children’s Choirs</option>
                    <option value="Category E: Sacred Music & Polyphony">Category E: Sacred Music &amp; Polyphony</option>
                    <option value="Category F: Orchestras & Instrumental">Category F: Orchestras &amp; Ensembles</option>
                    <option value="Non-Competitive Festival & Workshops">Non-Competitive Festival &amp; Workshops</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="modal-notes" className="block text-xs font-bold text-[#3B3B3B] mb-1">
                  Repertoire Notes, Workshop Interest or Accommodation Questions
                </label>
                <textarea
                  id="modal-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell Dr. Leonardo Sagliocca about your choir, preferred workshop topics, or travel dates..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#DC143C]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => dialogRef.current?.close()}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-[#3B3B3B] cursor-pointer apple-pressable"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#DC143C] hover:bg-[#B81032] text-white text-xs sm:text-sm font-semibold shadow-md cursor-pointer apple-pressable"
                >
                  <Icon icon="mage:send" width={17} height={17} />
                  <span>Submit to Florence Choral</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
};
