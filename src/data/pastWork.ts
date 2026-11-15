export interface PastWorkItem {
  id: string;
  category: 'poster' | 'booklet' | 'video' | 'jury-card';
  title: string;
  subtitle: string;
  festival: string;
  year: string;
  historicalRate: string;
  deliverables: string;
  aspectRatio: '16/9' | '3/4' | '4/3';
  /**
   * Leave `src: null` to render the clean Prototype Attachment Slot.
   * Drop an image into `/public/past-work/...` and set its path here later.
   */
  src: string | null;
  videoUrl?: string | null;
}

export const PAST_FLORENCE_WORK_FEATURED: PastWorkItem[] = [
  {
    id: 'past-posters-series',
    category: 'poster',
    title: 'Official Festival Poster Campaigns & Jury Cards',
    subtitle: 'Leonardo da Vinci • Verrocchio • Michelangelo • Lorenzo de’ Medici • Verdi Requiem',
    festival: 'All 5 Annual Festivals (2022–2024)',
    year: '2022–2024',
    historicalRate: '€50 EUR / Poster Set (5 Sizes)',
    deliverables: '70×100cm Print Master, A2, A3, A5 & 2×2 Social Media / Jury Announcement Cards',
    aspectRatio: '16/9',
    src: null,
  },
  {
    id: 'past-booklet-31p',
    category: 'booklet',
    title: '31-Page Official Festival Programme & Booklet',
    subtitle: '6th Leonardo Da Vinci International Choral Festival — Cover-to-Cover Print Layout',
    festival: 'Leonardo Da Vinci ICF',
    year: '2023–2024',
    historicalRate: '€150 EUR / Complete 31-Page Booklet',
    deliverables: 'Front & Back Covers, 31 Interior Pages, Repertoire Schedules, Jury Bios & Patronage Seals',
    aspectRatio: '16/9',
    src: null,
  },
  {
    id: 'past-video-reportage',
    category: 'video',
    title: '4-Day Festival Video Reportages (5–7 Mins)',
    subtitle: 'Full Post-Production, Basilica Audio Mastering, Logo Openers & Multi-Day Highlight Cuts',
    festival: 'Florence Choral International Festivals',
    year: '2022–2024',
    historicalRate: '€150 EUR / 5–7 Min Video Reportage',
    deliverables: 'Custom Animated Logo Opener, Basilica Live Sound Leveling, 4-Day Documentary Edit',
    aspectRatio: '16/9',
    src: null,
    videoUrl: null,
  },
];

export const PAST_WORK_GALLERY_SLOTS: PastWorkItem[] = [
  {
    id: 'slot-poster-leonardo',
    category: 'poster',
    title: 'Leonardo Da Vinci ICF Poster Set',
    subtitle: '4th, 5th, 6th & 7th Edition Print & Digital Suite',
    festival: 'Leonardo Da Vinci Festival',
    year: '2022–2024',
    historicalRate: '€50 / set (5 sizes)',
    deliverables: '70×100 • A2 • A3 • A5 • Social',
    aspectRatio: '3/4',
    src: null,
  },
  {
    id: 'slot-poster-verrocchio',
    category: 'poster',
    title: 'Andrea Del Verrocchio ICF Poster Set',
    subtitle: '4th & 5th Edition Print & Digital Suite',
    festival: 'Verrocchio Festival',
    year: '2023–2024',
    historicalRate: '€50 / set (5 sizes)',
    deliverables: '70×100 • A2 • A3 • A5 • Social',
    aspectRatio: '3/4',
    src: null,
  },
  {
    id: 'slot-poster-lorenzo-mimf',
    category: 'poster',
    title: 'Lorenzo De’ Medici & Michelangelo Posters',
    subtitle: 'Lorenzo (2022–2024) & 4th MIMF Print Suite',
    festival: 'Lorenzo & Michelangelo',
    year: '2022–2024',
    historicalRate: '€50 / set (5 sizes)',
    deliverables: '70×100 • A2 • A3 • A5 • Social',
    aspectRatio: '3/4',
    src: null,
  },
  {
    id: 'slot-jury-verdi',
    category: 'jury-card',
    title: 'Verdi Requiem & Jury Spotlight Series',
    subtitle: 'Saunder Choi, Andrea Portera, Ken Steven, T. Pavlovitch',
    festival: 'Special Gala & Juries',
    year: '2022–2023',
    historicalRate: '€50 / campaign',
    deliverables: 'HD Poster + Individual Jury Cards',
    aspectRatio: '3/4',
    src: null,
  },
  {
    id: 'slot-booklet-spread',
    category: 'booklet',
    title: '31-Page Festival Booklet (Cover-to-Cover)',
    subtitle: '6th Leonardo Da Vinci ICF Official Print Booklet',
    festival: 'Full 31-Page Publication',
    year: '2023',
    historicalRate: '€150 / booklet',
    deliverables: 'Cover + 31 Print-Ready Pages',
    aspectRatio: '4/3',
    src: null,
  },
  {
    id: 'slot-reportage-video',
    category: 'video',
    title: '4-Day Festival Video Reportage (5–7 Mins)',
    subtitle: 'Full Audio Mastering, Logo Opener & Basilica Highlights',
    festival: 'Multi-Camera Reportage',
    year: '2022–2024',
    historicalRate: '€150 / reportage',
    deliverables: '16:9 Master + Social Cutdowns',
    aspectRatio: '16/9',
    src: null,
  },
];
