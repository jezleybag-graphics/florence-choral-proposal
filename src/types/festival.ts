export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  imageUrl: string;
  ctaLabel: string;
  targetSection: string;
}

export interface ProgrammeDay {
  day: string;
  title: string;
  activities: string[];
}

export interface Festival {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  renaissanceMaster: string;
  masterYears: string;
  masterBio: string;
  edition: string;
  dates: string;
  season: string;
  status: 'Registration Open' | 'Early Bird Open' | 'Dates Announced';
  registrationDeadline: string;
  heroImage: string;
  summary: string;
  highlights: string[];
  categories: string[];
  repertoireRules: string[];
  prizes: string[];
  venues: string[];
  programme: ProgrammeDay[];
}

export interface JuryMember {
  id: string;
  name: string;
  role: string;
  country: string;
  credentials: string;
  festivalYear: string;
  imageUrl: string;
}

export interface HistoricVenue {
  id: string;
  name: string;
  italianName: string;
  district: string;
  significance: string;
  acousticHighlight: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  organization: string;
  country: string;
}

export interface ChoirApplication {
  id: string;
  submittedAt: string;
  choirName: string;
  country: string;
  conductorName: string;
  email: string;
  phone: string;
  festivalId: string;
  festivalName: string;
  category: string;
  singersCount: number;
  requestType: 'Full Application' | 'Brochure Request' | 'Workshop Inquiry';
  notes: string;
  status: 'New' | 'Brochure Sent' | 'Confirmed';
}

export interface SiteConfig {
  siteTitle: string;
  tagline: string;
  email: string;
  phone: string;
  logoUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
  feelFlorenceUrl: string;
  patronageFirenzeLogo: string;
  patronageFirenzePdf: string;
  patronageToscanaLogo: string;
  patronageToscanaUrl: string;
}
