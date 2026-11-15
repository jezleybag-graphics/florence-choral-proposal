/**
 * ARCHIVED PRICING MODEL — V1 (High-Ticket International Agency Tier)
 * Saved on: 2026-11-16
 * Purpose: Preserved for future international/high-ticket client proposals.
 */

export interface ArchivedPricingOption {
  id: 'planA' | 'planB';
  badge: string;
  title: string;
  monthlyPrice: number;
  setupFee: number;
  yearlyPrice?: number;
  yearlyMonthlyEquivalent?: number;
  yearlySavings?: number;
  highlightNote: string;
  inclusions: {
    label: string;
    value: string;
  }[];
}

export const ARCHIVED_PRICING_MODEL_V1: Record<'planA' | 'planB', ArchivedPricingOption> = {
  planA: {
    id: 'planA',
    badge: 'Option A • Recommended',
    title: 'Setup + Monthly',
    monthlyPrice: 499,
    setupFee: 1599,
    highlightNote: 'Saves €17 per month vs Option B monthly**',
    inclusions: [
      { label: 'Client Dashboard & Inquiry Tracker', value: '✓ Live Tracker Included' },
      { label: '5-Festival Modern Web Platform', value: '✓ Included (100% Owned)' },
      { label: 'Unlimited Festival Poster Campaigns', value: '✓ Unlimited PDF Masters' },
      { label: '31-Page Competition Booklets', value: '✓ Unlimited Digital Layouts' },
      { label: '5–7 Min 4K Documentary Video Reportages', value: '✓ Unlimited Renders' },
      { label: 'Global Choir Outreach & Newsletters', value: '✓ 2 / Month + Outbound' },
    ],
  },
  planB: {
    id: 'planB',
    badge: 'Option B • Zero Upfront',
    title: 'Monthly or Yearly',
    monthlyPrice: 649,
    setupFee: 0,
    yearlyPrice: 6853,
    yearlyMonthlyEquivalent: 571,
    yearlySavings: 935,
    highlightNote: 'Zero setup fee upfront',
    inclusions: [
      { label: 'Client Dashboard & Inquiry Tracker', value: '✓ Live Tracker Included' },
      { label: '5-Festival Modern Web Platform', value: '✓ Included (100% Owned)' },
      { label: 'Unlimited Festival Poster Campaigns', value: '✓ Unlimited PDF Masters' },
      { label: '31-Page Competition Booklets', value: '✓ Unlimited Digital Layouts' },
      { label: '5–7 Min 4K Documentary Video Reportages', value: '✓ Unlimited Renders' },
      { label: 'Global Choir Outreach & Newsletters', value: '✓ 2 / Month + Outbound' },
    ],
  },
};
