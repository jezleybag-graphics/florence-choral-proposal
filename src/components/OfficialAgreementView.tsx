import React from 'react';
import { Icon } from '@iconify/react';

interface OfficialAgreementViewProps {
  onBackToDashboard?: () => void;
  onBackToProposal?: () => void;
}

export const OfficialAgreementView: React.FC<OfficialAgreementViewProps> = ({
  onBackToDashboard,
  onBackToProposal,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const BILLING_CYCLES = [
    { cycle: 'Cycle 01', period: '16 Nov 2026 – 15 Dec 2026', base: '€290.00', due: '05 Jan 2027 (Accrued)', note: 'Billed together in First Payment' },
    { cycle: 'Cycle 02', period: '16 Dec 2026 – 15 Jan 2027', base: '€290.00', due: '05 Jan 2027', note: 'First Settlement: €580.00 Total' },
    { cycle: 'Cycle 03', period: '16 Jan 2027 – 15 Feb 2027', base: '€290.00', due: '05 Feb 2027', note: 'Regular monthly cycle' },
    { cycle: 'Cycle 04', period: '16 Feb 2027 – 15 Mar 2027', base: '€290.00', due: '05 Mar 2027', note: 'Regular monthly cycle' },
    { cycle: 'Cycle 05', period: '16 Mar 2027 – 15 Apr 2027', base: '€290.00', due: '05 Apr 2027', note: 'Regular monthly cycle' },
    { cycle: 'Cycle 06', period: '16 Apr 2027 – 15 May 2027', base: '€290.00', due: '05 May 2027', note: 'Regular monthly cycle' },
    { cycle: 'Cycle 07', period: '16 May 2027 – 15 Jun 2027', base: '€290.00', due: '05 Jun 2027', note: 'Regular monthly cycle' },
    { cycle: 'Cycle 08', period: '16 Jun 2027 – 15 Jul 2027', base: '€290.00', due: '05 Jul 2027', note: 'Regular monthly cycle' },
    { cycle: 'Cycle 09', period: '16 Jul 2027 – 15 Aug 2027', base: '€290.00', due: '05 Aug 2027', note: 'Regular monthly cycle' },
    { cycle: 'Cycle 10', period: '16 Aug 2027 – 15 Sep 2027', base: '€290.00', due: '05 Sep 2027', note: 'Regular monthly cycle' },
    { cycle: 'Cycle 11', period: '16 Sep 2027 – 15 Oct 2027', base: '€290.00', due: '05 Oct 2027', note: 'Regular monthly cycle' },
    { cycle: 'Cycle 12', period: '16 Oct 2027 – 15 Nov 2027', base: '€290.00', due: '05 Nov 2027', note: 'Final Cycle of 1-Year Term' },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 font-sans print:bg-white print:text-black">
      {/* Top Floating Action Bar (Hidden on Print) */}
      <nav className="sticky top-0 z-50 bg-neutral-900 text-white px-6 py-4 flex items-center justify-between shadow-md print:hidden">
        <div className="flex items-center gap-3">
          <img
            src="/proposal-assets/jezreel_logo_mark.png"
            alt="Jezreel Dave Leybag"
            className="h-7 w-auto object-contain brightness-0 invert"
          />
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold hidden sm:inline-block">
            Official Agreement Dossier • FC-2026-MSA-01
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {onBackToDashboard && (
            <button
              type="button"
              onClick={onBackToDashboard}
              className="px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold cursor-pointer transition-colors"
            >
              CMS Console ↗
            </button>
          )}
          {onBackToProposal && (
            <button
              type="button"
              onClick={onBackToProposal}
              className="px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold cursor-pointer transition-colors"
            >
              Proposal 📄
            </button>
          )}
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-white text-black text-xs font-bold hover:bg-neutral-200 cursor-pointer shadow-sm transition-all"
          >
            <Icon icon="mage:printer" width={16} height={16} />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </nav>

      {/* Main Printable Legal Document Container */}
      <div className="max-w-4xl mx-auto my-8 p-8 sm:p-14 bg-white shadow-xl rounded-2xl border border-neutral-200 print:shadow-none print:border-none print:m-0 print:p-6 print:rounded-none">
        {/* Document Header */}
        <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-8 border-b-2 border-neutral-900">
          <div>
            <img
              src="/proposal-assets/jezreel_logo_full.png"
              alt="Jezreel Dave Leybag"
              className="h-10 w-auto object-contain mb-3"
            />
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 leading-tight">
              MASTER SERVICES &amp; RETAINER AGREEMENT
            </h1>
            <p className="text-xs uppercase tracking-wider text-neutral-500 font-bold mt-1">
              Annual Partnership • Option C (Performance Hybrid)
            </p>
          </div>

          <div className="sm:text-right shrink-0 text-xs space-y-1">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold tracking-wide border border-emerald-300">
              ✓ ELECTRONICALLY EXECUTED
            </div>
            <div>
              <span className="text-neutral-500">Agreement ID:</span>{' '}
              <strong className="font-mono text-neutral-900">FC-2026-MSA-01</strong>
            </div>
            <div>
              <span className="text-neutral-500">Signing Reference:</span>{' '}
              <strong className="font-mono text-neutral-900">FC-2026-SIG</strong>
            </div>
            <div>
              <span className="text-neutral-500">Execution Date:</span>{' '}
              <strong>16 November 2026</strong>
            </div>
            <div>
              <span className="text-neutral-500">Contract Term:</span>{' '}
              <strong>16 Nov 2026 – 16 Nov 2027 (1 Year)</strong>
            </div>
          </div>
        </header>

        {/* The Parties */}
        <section className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs leading-relaxed">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
              Service Provider
            </span>
            <strong className="text-sm font-bold text-neutral-900 block">Jezreel Dave Leybag</strong>
            <p className="text-neutral-600">AI &amp; Workflow Automation Specialist • Full-Stack Digital Systems</p>
            <p className="text-neutral-500 mt-1">Email: jezreelleybag.graphics@gmail.com</p>
            <p className="text-neutral-500">Creative &amp; Technical Partner Since December 2020</p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
              Client
            </span>
            <strong className="text-sm font-bold text-neutral-900 block">Florence Choral</strong>
            <p className="text-neutral-600">Represented by: <strong>Dr. Leonardo Sagliocca</strong> (Chairman &amp; Artistic Director)</p>
            <p className="text-neutral-500 mt-1">Address: Via Fra' Bartolomeo 8, 50132 Firenze (FI), Italy</p>
            <p className="text-neutral-500">Email: chairman@florencechoral.com • Tel: +39 388 8183714</p>
          </div>
        </section>

        {/* Preamble & Covenant */}
        <section className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed pb-6 border-b border-neutral-200">
          <p>
            This Master Services Agreement ("Agreement") is formally entered into on <strong>16 November 2026</strong>, by and between <strong>Jezreel Dave Leybag</strong> ("Provider") and <strong>Florence Choral</strong> ("Client"), collectively referred to as the "Parties".
          </p>
          <p>
            <strong>WHEREAS</strong>, the Parties have collaborated continuously since December 2020 on prestigious international choral competitions; and <strong>WHEREAS</strong>, Client desires to maintain a dedicated modern digital platform, conductor intake infrastructure, and choir outreach engine under <strong>Option C (Performance Hybrid Retainer)</strong> for a binding term of <strong>one (1) calendar year</strong>.
          </p>
        </section>

        {/* SECTION 1: INCLUDED SERVICES TABLE (EXACT OPTION C SPECIFICATION) */}
        <section className="my-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <h2 className="text-base sm:text-lg font-bold text-neutral-900 uppercase tracking-tight">
              1. Scope of Included Services (Option C • €290.00 / Month)
            </h2>
          </div>
          <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
            In accordance with Option C (Performance Hybrid), the base retainer of <strong>€290.00 EUR/month</strong> directly includes the following deliverables:
          </p>

          <div className="overflow-x-auto border border-neutral-300 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-100 border-b border-neutral-300 text-neutral-900 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5 w-1/4">Deliverable</th>
                  <th className="p-3.5 w-1/2">Technical &amp; Creative Scope</th>
                  <th className="p-3.5 w-1/4 text-right">Option C Coverage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="p-3.5 font-bold text-neutral-900">Upfront Website Build Fee</td>
                  <td className="p-3.5 text-neutral-700 leading-relaxed">
                    Complete front-end re-architecture, mobile optimization, and FormSubmit application integration.
                  </td>
                  <td className="p-3.5 text-right font-bold text-emerald-700">✓ €0 (Included)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-neutral-900">5-Festival Web Platform &amp; Hosting</td>
                  <td className="p-3.5 text-neutral-700 leading-relaxed">
                    Continuous cloud edge hosting, SSL certificates, bug fixes, and domain routing for all 5 Florence Choral festivals.
                  </td>
                  <td className="p-3.5 text-right font-bold text-emerald-700">✓ Included</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-neutral-900">Client CMS &amp; Inquiry Tracker</td>
                  <td className="p-3.5 text-neutral-700 leading-relaxed">
                    Administrative console to track incoming choir inquiries, dates, jury members, and official receipts in real-time.
                  </td>
                  <td className="p-3.5 text-right font-bold text-emerald-700">✓ Included</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-neutral-900">Choir Email List &amp; Outreach</td>
                  <td className="p-3.5 text-neutral-700 leading-relaxed">
                    International choir database curation + two (2) targeted monthly email campaign dispatches to conductors worldwide.
                  </td>
                  <td className="p-3.5 text-right font-bold text-emerald-700">✓ Included (2x/Mo)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-neutral-900">Festival Poster Campaigns (Print PDF)</td>
                  <td className="p-3.5 text-neutral-700 leading-relaxed">
                    Official typographic festival poster suites in certified print master formats (70×100cm, A2, A3, A5) and digital social assets.
                  </td>
                  <td className="p-3.5 text-right font-bold text-emerald-700">✓ Included</td>
                </tr>
                <tr className="bg-emerald-50/70">
                  <td className="p-3.5 font-bold text-emerald-950">Choir Registration Incentive</td>
                  <td className="p-3.5 text-emerald-900 leading-relaxed">
                    Outcome-based success bonus for each confirmed choir registration acquired through the digital platform and outreach.
                  </td>
                  <td className="p-3.5 text-right font-bold text-emerald-900">+ €75 / Confirmed Choir</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 2: EXCLUDED SERVICES TABLE (BILLED SEPARATELY PER-FESTIVAL) */}
        <section className="my-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
            <h2 className="text-base sm:text-lg font-bold text-neutral-900 uppercase tracking-tight">
              2. Excluded Services (Must Be Commissioned Separately at Per-Festival Rates)
            </h2>
          </div>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 leading-relaxed mb-4">
            <strong>CRITICAL SCOPE BOUNDARY:</strong> As specified in the Option C matrix, <strong>31-Page Competition Programme Booklets</strong> and <strong>4K Documentary Video Reportages</strong> are <strong>NOT</strong> covered by the €290.00 base retainer. As practiced since December 2020, they must be commissioned separately per festival edition at the following agreed rates:
          </div>

          <div className="overflow-x-auto border border-neutral-300 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-100 border-b border-neutral-300 text-neutral-900 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5 w-1/3">Separate Deliverable</th>
                  <th className="p-3.5 w-5/12">Scope &amp; Format Specifications</th>
                  <th className="p-3.5 w-1/4 text-right">Per-Festival Pricing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="p-3.5 font-bold text-neutral-900">
                    31-Page Competition Programme Booklet
                  </td>
                  <td className="p-3.5 text-neutral-700 leading-relaxed">
                    Cover-to-cover editorial layout, category rules, repertoire, jury biographies, festival schedule, and certified print-ready PDF master.
                  </td>
                  <td className="p-3.5 text-right font-bold text-neutral-900">
                    €380.00 <span className="text-[10px] font-normal text-neutral-500 block">per booklet edition</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-neutral-900">
                    4K Festival Documentary Video Reportage
                  </td>
                  <td className="p-3.5 text-neutral-700 leading-relaxed">
                    5–7 minute documentary recap, multitrack audio sync from live basilica performances, color grading + vertical 9:16 social reels.
                  </td>
                  <td className="p-3.5 text-right font-bold text-neutral-900">
                    €350.00 <span className="text-[10px] font-normal text-neutral-500 block">per festival reportage</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-neutral-900">
                    Ad-Hoc Print Collaterals (Diplomas, Stage Banners)
                  </td>
                  <td className="p-3.5 text-neutral-700 leading-relaxed">
                    Custom stage backdrops, choir badges, roll-up banners, or award certificate print masters.
                  </td>
                  <td className="p-3.5 text-right font-bold text-neutral-900">
                    €45.00 / hr <span className="text-[10px] font-normal text-neutral-500 block">or quoted flat per item</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: 1-YEAR BILLING SCHEDULE TABLE (UNTIL 16 NOV 2027) */}
        <section className="my-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <h2 className="text-base sm:text-lg font-bold text-neutral-900 uppercase tracking-tight">
              3. 1-Year Retainer Billing Schedule (16 Nov 2026 – 16 Nov 2027)
            </h2>
          </div>
          <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
            As agreed in writing, <strong>service commences immediately on 16 November 2026</strong>. In accordance with the cash flow accommodation granted by Provider, <strong>Cycle 01 is deferred and compounded into the first payment due on 05 January 2027</strong>.
          </p>

          <div className="overflow-x-auto border border-neutral-300 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-100 border-b border-neutral-300 text-neutral-900 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-2.5">Billing Cycle</th>
                  <th className="p-2.5">Coverage Period</th>
                  <th className="p-2.5 text-right">Base Retainer</th>
                  <th className="p-2.5 text-right">Payment Due Date</th>
                  <th className="p-2.5">Billing Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {BILLING_CYCLES.map((row, idx) => (
                  <tr key={idx} className={idx < 2 ? 'bg-blue-50/40' : ''}>
                    <td className="p-2.5 font-bold text-neutral-900">{row.cycle}</td>
                    <td className="p-2.5 text-neutral-700 font-mono text-[11px]">{row.period}</td>
                    <td className="p-2.5 text-right font-bold text-neutral-900">{row.base}</td>
                    <td className="p-2.5 text-right font-semibold text-neutral-900">{row.due}</td>
                    <td className="p-2.5 text-neutral-500 text-[11px]">{row.note}</td>
                  </tr>
                ))}
                <tr className="bg-neutral-900 text-white font-bold">
                  <td className="p-3" colSpan={2}>
                    TOTAL 1-YEAR BASE CONTRACT COMMITMENT
                  </td>
                  <td className="p-3 text-right text-emerald-400">
                    €3,480.00
                  </td>
                  <td className="p-3 text-right" colSpan={2}>
                    (Excluding +€75/Choir performance bonuses)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 4: LEGAL TERMS & BINDING CLAUSES */}
        <section className="my-8 space-y-5 text-xs text-neutral-700 leading-relaxed border-t border-neutral-200 pt-6">
          <h2 className="text-base font-bold text-neutral-900 uppercase tracking-tight">
            4. Legal Provisions &amp; Conditions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-bold text-neutral-900 text-xs uppercase">4.1 Entire Agreement &amp; Integration</h3>
              <p>
                This Agreement constitutes the entire legal agreement between the Parties and supersedes all prior negotiations, verbal statements, or informal messages. No deliverables outside of Section 1 shall be assumed or enforced without an executed addendum or written invoice.
              </p>

              <h3 className="font-bold text-neutral-900 text-xs uppercase">4.2 Performance Incentive Mechanics</h3>
              <p>
                A "Confirmed Choir Registration" is defined as any choir that completes official registration or remits participation fees for a Florence Choral festival following digital outreach or website intake. The €75.00 incentive shall be reconciled monthly upon receipt of conductor fees.
              </p>

              <h3 className="font-bold text-neutral-900 text-xs uppercase">4.3 Payment Terms &amp; Suspension</h3>
              <p>
                All invoices are payable in Euros (€ EUR) via SEPA Bank Transfer / Wire within ten (10) calendar days of the specified Due Date. If any invoice remains delinquent beyond fourteen (14) days past due, Provider reserves the right to suspend web services, hosting, and outreach until arrears are settled.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-neutral-900 text-xs uppercase">4.4 100% Client Ownership</h3>
              <p>
                Upon receipt of full payment for any cycle or deliverable, Florence Choral retains 100% unencumbered, perpetual ownership of all domain names, website source code, choir databases, and commissioned digital master assets.
              </p>

              <h3 className="font-bold text-neutral-900 text-xs uppercase">4.5 Binding 1-Year Term &amp; Renewal</h3>
              <p>
                This Agreement is binding for the twelve (12) month term ending <strong>16 November 2027</strong>. After the initial term, this partnership automatically transitions to a flexible month-to-month retainer cancellable by either party with thirty (30) days written notice.
              </p>

              <h3 className="font-bold text-neutral-900 text-xs uppercase">4.6 Governing Law &amp; Jurisdiction</h3>
              <p>
                This Agreement shall be construed in accordance with standard European business practices and freelance covenants, with disputes settled in good faith between the Parties.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: SIGNATURES & EXECUTION DOSSIER */}
        <section className="my-8 pt-8 border-t-2 border-neutral-900">
          <h2 className="text-base font-bold text-neutral-900 uppercase tracking-tight mb-6">
            5. Execution &amp; Electronic Signature Record
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Provider Signature */}
            <div className="p-5 rounded-xl border border-neutral-300 bg-neutral-50 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                  Service Provider
                </span>
                <div
                  style={{ fontFamily: 'Brush Script MT, cursive' }}
                  className="text-3xl text-neutral-900 mb-2"
                >
                  Jezreel Dave Leybag
                </div>
                <div className="font-bold text-xs text-neutral-900">Jezreel Dave Leybag</div>
                <div className="text-[11px] text-neutral-500">AI &amp; Workflow Automation Specialist</div>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-200 text-[11px] text-neutral-600">
                Date: <strong>16 November 2026</strong> • Status: <strong>Executed</strong>
              </div>
            </div>

            {/* Client Signature */}
            <div className="p-5 rounded-xl border border-emerald-300 bg-emerald-50/40 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-2">
                  Client (Duly Authorized Representative)
                </span>
                <div
                  style={{ fontFamily: 'Brush Script MT, cursive' }}
                  className="text-3xl text-emerald-950 mb-2"
                >
                  Dr. Leonardo Sagliocca
                </div>
                <div className="font-bold text-xs text-neutral-900">Dr. Leonardo Sagliocca</div>
                <div className="text-[11px] text-neutral-500">Chairman &amp; Artistic Director, Florence Choral</div>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-200 text-[11px] text-emerald-900 space-y-0.5">
                <div>Digital Verification ID: <strong className="font-mono">FC-2026-SIG</strong></div>
                <div>Executed on: <strong>16 Nov 2026, 4:10 PM (Rome Time)</strong></div>
                <div>Selection: <strong>Option C (Performance Hybrid • €290/mo)</strong></div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <footer className="pt-6 border-t border-neutral-200 text-center text-[10px] text-neutral-400">
          Florence Choral International Festivals &amp; Jezreel Dave Leybag • Official Retainer Document • Confidential
        </footer>
      </div>
    </div>
  );
};
