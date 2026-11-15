import React from 'react';
import { Icon } from '@iconify/react';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceNumber?: string;
  planName?: string;
  amount?: number;
  billingPeriod?: string;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  invoiceNumber = 'FC-2026-11',
  planName = 'Option B — Full-Service Partner Retainer',
  amount = 390,
  billingPeriod = '15 Nov 2026 – 15 Dec 2026',
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar (hidden on print) */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Icon icon="mage:receipt" width={18} height={18} />
            </span>
            <span className="text-sm font-bold">Official Invoice &amp; Payment Receipt</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer transition-colors"
            >
              <Icon icon="mage:printer" width={15} height={15} />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
            >
              <Icon icon="mage:multiply" width={20} height={20} />
            </button>
          </div>
        </div>

        {/* Printable Invoice Body */}
        <div className="p-6 sm:p-10 space-y-8 text-slate-800">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#DC143C] text-white flex items-center justify-center font-bold text-xl shadow-md">
                  ⚜
                </div>
                <div>
                  <h1 className="font-display font-extrabold text-xl text-slate-900 leading-tight">
                    Florence Choral International Festivals
                  </h1>
                  <p className="text-xs text-slate-500">Official Festival Management &amp; Digital Retainer</p>
                </div>
              </div>

              <div className="mt-4 text-xs text-slate-600 space-y-0.5">
                <p className="font-semibold text-slate-800">Florence Choral Association</p>
                <p>Attn: Dr. Leonardo Sagliocca (Chairman &amp; Artistic Director)</p>
                <p>Via Fra' Bartolomeo 8, 50132 Firenze (FI), Italy</p>
                <p>chairman@florencechoral.com • +39 388 8183714</p>
              </div>
            </div>

            <div className="sm:text-right shrink-0">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-black uppercase tracking-wider mb-2">
                ✓ PAID IN FULL
              </div>
              <div className="text-2xl font-black text-slate-900">
                Invoice #{invoiceNumber}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Date: <strong className="text-slate-800">15 November 2026</strong>
              </div>
              <div className="text-xs text-slate-500">
                Cycle: <strong className="text-slate-800">{billingPeriod}</strong>
              </div>
              <div className="text-xs text-slate-500">
                Method: <strong className="text-slate-800">SEPA Bank Transfer / IBAN</strong>
              </div>
            </div>
          </div>

          {/* Provider / Issued By */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Service Provider
              </span>
              <p className="font-bold text-slate-800 text-sm">Jezreel Dave Leybag</p>
              <p className="text-slate-600">AI &amp; Workflow Automation Specialist • Full-Stack Digital Systems</p>
              <p className="text-slate-500">jezreelleybag.graphics@gmail.com</p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Partnership History
              </span>
              <p className="font-semibold text-slate-800">Continuous Creative &amp; Technical Partner</p>
              <p className="text-slate-600">Active Service Since December 2020 (6th Year of Collaboration)</p>
              <p className="text-emerald-700 font-semibold mt-0.5">✓ 100% On-Time SLA Guarantee Active</p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b-2 border-slate-300 text-slate-500 uppercase text-[11px]">
                  <th className="py-3 px-2">Description of Services</th>
                  <th className="py-3 px-2 text-center">Cycle</th>
                  <th className="py-3 px-2 text-right">Rate</th>
                  <th className="py-3 px-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-4 px-2">
                    <div className="font-bold text-slate-900">{planName}</div>
                    <ul className="mt-1.5 space-y-1 text-xs text-slate-600 list-disc list-inside">
                      <li>Full cloud hosting, SSL, and server infrastructure maintenance (100% uptime covered)</li>
                      <li>5 Renaissance Festival CMS real-time updates &amp; choir inquiry intake</li>
                      <li>2x Festival 4K Video Reportages &amp; Social Media Reels per month</li>
                      <li>1x Complete Digital Poster Campaign Suite (70×100cm, A2, A3, A5, 2×2 social cards)</li>
                      <li>31-Page Official Programme &amp; Rulebook cover-to-cover layout &amp; revisions</li>
                      <li>2x Monthly Conductor Email Newsletter dispatches (420+ global choir contacts)</li>
                      <li>Unlimited website maintenance &amp; jury member additions (24–48h SLA)</li>
                    </ul>
                  </td>
                  <td className="py-4 px-2 text-center text-slate-600 font-medium">1 Month</td>
                  <td className="py-4 px-2 text-right text-slate-800 font-semibold">€{amount}.00</td>
                  <td className="py-4 px-2 text-right text-slate-900 font-bold">€{amount}.00</td>
                </tr>
                <tr className="bg-slate-50/60">
                  <td className="py-3.5 px-2">
                    <div className="font-bold text-slate-800">Website Re-Architecture &amp; Performance Modernization</div>
                    <div className="text-xs text-slate-500">
                      Full front-end overhaul, mobile-first optimization, and FormSubmit choir dispatch engine.
                    </div>
                  </td>
                  <td className="py-3.5 px-2 text-center text-slate-600 font-medium">One-Time</td>
                  <td className="py-3.5 px-2 text-right text-slate-400 line-through">€1,599.00</td>
                  <td className="py-3.5 px-2 text-right text-emerald-700 font-bold">INCLUDED (€0.00)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals & Official Stamp */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4 border-t-2 border-slate-300">
            {/* Stamp Box */}
            <div className="border-2 border-dashed border-emerald-500/60 bg-emerald-50/50 rounded-2xl p-4 text-emerald-900 max-w-sm">
              <div className="flex items-center gap-2 font-black uppercase text-xs tracking-wider">
                <Icon icon="mage:check-circle-fill" width={18} height={18} className="text-emerald-600" />
                <span>Payment Confirmed &amp; Cleared</span>
              </div>
              <p className="text-[11px] text-emerald-800 mt-1 leading-relaxed">
                Thank you, Dr. Leonardo! This invoice is paid in full for the current billing cycle. Next scheduled monthly renewal: <strong>15 December 2026</strong>.
              </p>
            </div>

            {/* Calculations */}
            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-800">€{amount}.00</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>VAT / Tax (Exempt/Reverse Charge):</span>
                <span className="font-semibold text-slate-800">€0.00</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Paid:</span>
                <span className="text-[#DC143C]">€{amount}.00</span>
              </div>
              <div className="flex justify-between text-[11px] text-emerald-700 font-bold">
                <span>Balance Due:</span>
                <span>€0.00</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>Florence Choral International Festivals • Official Digital Retainer Record</span>
            <span className="text-slate-500 font-medium">Delivered with pride by Jezreel Dave Leybag</span>
          </div>
        </div>

        {/* Modal Bottom Actions (hidden on print) */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="text-xs text-slate-500">
            Click <strong>Print / Save PDF</strong> to save this receipt for your accounting records.
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5"
            >
              <Icon icon="mage:printer" width={16} height={16} />
              <span>Print Official Receipt</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
