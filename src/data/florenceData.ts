import type {
  SiteConfig,
  HeroSlide,
  Festival,
  JuryMember,
  HistoricVenue,
  Testimonial,
  ChoirApplication,
} from '../types/festival';

export const INITIAL_SITE_CONFIG: SiteConfig = {
  siteTitle: 'Florence Choral',
  tagline: 'Festivals recommended by the Greats',
  email: 'chairman@florencechoral.com',
  phone: '+39 388 8183714',
  logoUrl: '/Florence_choral_quadrato.jpg',
  facebookUrl: 'https://www.facebook.com/florencechoralfestivals',
  twitterUrl: 'https://twitter.com/florencechoral',
  youtubeUrl: 'https://www.youtube.com/channel/UCJPbqo-uoYmdLoSgygYQtOQ',
  instagramUrl: 'https://www.instagram.com/florence.choral',
  feelFlorenceUrl: 'http://www.feelflorence.it/en',
  patronageFirenzeLogo:
    'https://www.florencechoral.com/wp-content/uploads/2017/02/logo_Firenze.jpg',
  patronageFirenzePdf:
    'https://www.florencechoral.com/wp-content/uploads/2017/06/Patrocinio-Town-Council-Florence-Choral.pdf',
  patronageToscanaLogo:
    'https://www.florencechoral.com/wp-content/uploads/2017/03/stemma-Regione-Toscana-e1490712109123.jpg',
  patronageToscanaUrl: 'http://www.regione.toscana.it/',
};

export const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    title: 'Where Opera was born',
    subtitle:
      'Perform in the historic basilicas and Renaissance palazzos of Florence, the cradle of European musical heritage and Bel Canto.',
    badge: 'Florence, Italy • Official Municipal & Regional Patronage',
    imageUrl:
      'https://www.florencechoral.com/wp-content/uploads/2017/09/SIB_8925-1280x400.jpg',
    ctaLabel: 'Explore the 5 Festivals',
    targetSection: 'festivals',
  },
  {
    id: 'slide-2',
    title: 'From Beijing to sing here',
    subtitle:
      'Welcoming international choirs, youth ensembles, and orchestras from every continent to unite in harmony in the heart of Tuscany.',
    badge: 'Global Cultural Exchange',
    imageUrl:
      'https://www.florencechoral.com/wp-content/uploads/2016/08/foto4_1580x500-1280x400.jpg',
    ctaLabel: 'Request Official Brochure',
    targetSection: 'apply',
  },
  {
    id: 'slide-3',
    title: 'Singing in a dream',
    subtitle:
      'Unforgettable final gala concerts with prearranged programmes conducted by world-renowned conductors and Grand Piano in historic venues.',
    badge: 'Grand Gala & Competition',
    imageUrl:
      'https://www.florencechoral.com/wp-content/uploads/2017/09/SIB_6647-e1506018371643.jpg',
    ctaLabel: 'View Historic Venues',
    targetSection: 'venues',
  },
  {
    id: 'slide-4',
    title: 'The light of Renaissance',
    subtitle:
      'Five signature international festivals dedicated to the immortal masters of Florence: Leonardo da Vinci, Michelangelo, Lorenzo de’ Medici, Verrocchio, and Botticelli.',
    badge: 'About the Great Masters',
    imageUrl:
      'https://www.florencechoral.com/wp-content/uploads/2016/08/SIB_6255-1280x400.jpg',
    ctaLabel: 'Discover the Great Masters',
    targetSection: 'festivals',
  },
  {
    id: 'slide-5',
    title: 'Surrounded by art',
    subtitle:
      'Attend masterclasses and workshops in Renaissance polyphony and Italian Bel Canto guided by internationally acclaimed conductors and opera masters.',
    badge: 'Workshops & Masterclasses',
    imageUrl:
      'https://www.florencechoral.com/wp-content/uploads/2017/09/SIB_5161-e1506018442480.jpg',
    ctaLabel: 'Meet the Artistic Committee',
    targetSection: 'committee',
  },
  {
    id: 'slide-6',
    title: 'The Hymn of the Andrea’s Festival',
    subtitle:
      'Composed exclusively for Florence Choral by Maestro Vytautas Miškinis — performed jointly by all participating international choirs.',
    badge: 'composed by Vytautas Miskinis',
    imageUrl:
      'https://www.florencechoral.com/wp-content/uploads/2017/01/Diverse-voci-Miskinis-2.jpg',
    ctaLabel: 'Composers’ Corner',
    targetSection: 'composers',
  },
];

export const OUR_DIFFERENCE_PILLARS = [
  {
    id: 'special-features',
    title: 'Special Features',
    mageIcon: 'mage:trophy-star',
    description:
      'Final concerts for all participants with prearranged programmes conducted by renowned conductors, Grand Piano in all possible venues, money prizes, special prizes made by notable Florentine artisans and much more.',
    highlights: [
      'Grand Piano provided in all competition & gala venues',
      'Handcrafted trophies by master Florentine artisans',
      'Joint final concert conducted by international Maestros',
    ],
  },
  {
    id: 'workshops',
    title: 'Workshops',
    mageIcon: 'mage:workshops',
    description:
      'Your Choir is in Italy, the Country of Renaissance and ‘bel canto’. Why not taking profit of this opportunity to attend a workshop with experts in these subjects? For choirs and individuals, in historical venues.',
    highlights: [
      'Italian Bel Canto vocal technique for choirs & soloists',
      'Renaissance sacred & secular polyphony interpretation',
      'Hosted inside authentic 15th-century Florentine halls',
    ],
  },
  {
    id: 'juries',
    title: 'Juries',
    mageIcon: 'mage:juries',
    description:
      'Members of Juries of our Competitions are selected only among great Conductors, Composers, Opera Singers, famous worldwide. Warranty of impartiality and prestige.',
    highlights: [
      'World-renowned choral composers & conductors',
      'Principal opera singers & conservatory professors',
      'Transparent international adjudication standards',
    ],
  },
];

export const INITIAL_FESTIVALS: Festival[] = [
  {
    id: 'leonardo-da-vinci',
    slug: 'leonardo-da-vinci-choral-festival',
    name: 'Leonardo Da Vinci International Choral Festival',
    shortName: 'Leonardo Da Vinci Festival',
    renaissanceMaster: 'Leonardo da Vinci',
    masterYears: '1452 – 1519',
    masterBio:
      'Universal genius of the Florentine Renaissance whose studies in acoustics, harmony, proportional beauty, and polyphonic instruments inspired the flagship summer festival of Florence Choral.',
    edition: '9th International Edition',
    dates: 'July 14 – 17, 2027',
    season: 'Summer Flagship Edition',
    status: 'Registration Open',
    registrationDeadline: 'March 31, 2027',
    heroImage:
      'https://www.florencechoral.com/wp-content/uploads/2017/09/SIB_8925-1280x400.jpg',
    summary:
      'Our flagship summer choral and orchestral festival celebrating universal artistry in the monumental basilicas of Florence. Features competitive categories, friendship concerts, Bel Canto workshops, and the Grand Closing Gala.',
    highlights: [
      'Opening Ceremony in the Basilica of Santa Maria Novella or Santa Trinita',
      'International Jury chaired by world-famous composers and conductors',
      'Grand Prize Trophy crafted by Florentine goldsmiths + Monetary Awards',
      'Joint performance of the Festival Hymn by all participating choirs',
    ],
    categories: [
      'Category A: Mixed Adult Choirs (min. 16 singers)',
      'Category B: Equal Voices Choirs (Male / Female)',
      'Category C: Youth & University Choirs (ages 15–25)',
      'Category D: Children’s Choirs (up to 14 years)',
      'Category E: Sacred Music & Polyphony',
      'Category F: Folk, Spiritual, Gospel & Pop/Modern Ensembles',
      'Category G: Chamber Choirs & Vocal Ensembles (8–15 singers)',
      'Category H: Non-Competitive Festival Participation (Friendship Concerts & Workshops)',
    ],
    repertoireRules: [
      'Each competitive choir presents 3 compositions (maximum total performance time: 20 minutes).',
      'Piece 1: A work composed before 1800 or by a classic international master.',
      'Piece 2: A choral work by a composer from the choir’s home country or cultural tradition.',
      'Piece 3: Free choice work highlighting the ensemble’s expressive and technical excellence.',
    ],
    prizes: [
      'Grand Prix "Leonardo Da Vinci" Trophy & Monetary Award',
      'Gold, Silver, and Bronze Diplomas in each category',
      'Special Prize for Best Conductor & Best Soloist',
      'Special Prize for Best Interpretation of a Contemporary Work',
    ],
    venues: [
      'Basilica of Santa Croce',
      'Basilica of Santa Maria Novella',
      'Auditorium Sant’Apollonia',
      'Salone dei Cinquecento — Palazzo Vecchio',
    ],
    programme: [
      {
        day: 'Day 1',
        title: 'Arrival, Rehearsals & Grand Opening Concert',
        activities: [
          'Welcome registration & conductor briefing with Artistic Director Dr. Leonardo Sagliocca',
          'Acoustic stage rehearsals in historic churches',
          'Evening Opening Ceremony & Welcome Concert in a monumental Florentine Basilica',
        ],
      },
      {
        day: 'Day 2',
        title: 'Bel Canto Workshops & Friendship Concerts',
        activities: [
          'Morning Workshop: Italian Bel Canto & Renaissance Vocal Production',
          'Rehearsal of the joint Festival Hymn with guest International Conductor',
          'Afternoon & Evening Friendship Concerts across historic churches of Florence',
        ],
      },
      {
        day: 'Day 3',
        title: 'International Competition & Gala Evening',
        activities: [
          'Morning & Afternoon Competition sessions before the International Jury',
          'Individual feedback roundtable between Conductors and Jury Members',
          'Evening Sacred & Secular Gala Concerts in Florence’s historic center',
        ],
      },
      {
        day: 'Day 4',
        title: 'Award Ceremony, Joint Finale & Farewell',
        activities: [
          'Official Reception with City of Florence representatives',
          'Grand Final Concert & Joint Festival Hymn performance',
          'Award Ceremony: Gold/Silver/Bronze Diplomas & Florentine Artisan Trophies',
        ],
      },
    ],
  },
  {
    id: 'andrea-del-verrocchio',
    slug: 'andrea-del-verrocchio-choral-festival',
    name: 'Andrea Del Verrocchio International Choral Festival',
    shortName: 'Andrea Del Verrocchio Festival',
    renaissanceMaster: 'Andrea del Verrocchio',
    masterYears: '1435 – 1488',
    masterBio:
      'Master sculptor, painter, and musician whose legendary Florentine workshop trained Leonardo da Vinci, Pietro Perugino, and Sandro Botticelli — symbolizing mentorship and artistic mastery.',
    edition: '8th International Edition',
    dates: 'April 22 – 25, 2027',
    season: 'Spring Edition',
    status: 'Registration Open',
    registrationDeadline: 'January 30, 2027',
    heroImage:
      'https://www.florencechoral.com/wp-content/uploads/2017/01/Diverse-voci-Miskinis-2.jpg',
    summary:
      'Home to "The Hymn of the Andrea’s Festival" composed specifically for Florence Choral by Vytautas Miškinis. Dedicated to master mentorship, choral excellence, and spring performances in Florence.',
    highlights: [
      'Features the official Festival Hymn composed by Vytautas Miškinis',
      'Masterclasses led by world-renowned choral composers',
      'Performances in Basilica di Santa Trinita and Church of Ognissanti',
      'Artisan prizes inspired by Verrocchio’s Florentine workshop',
    ],
    categories: [
      'Mixed Choirs, Equal Voices, Youth & Children’s Choirs',
      'Sacred Polyphony & Renaissance Motets',
      'Contemporary Choral Music & Folk Traditions',
      'Non-Competitive Festival & Workshop Track',
    ],
    repertoireRules: [
      '3 contrasting pieces (up to 18 minutes pure singing time).',
      'At least one a cappella work required for competitive choral categories.',
      'All choirs perform the Festival Hymn by Vytautas Miškinis at the Grand Finale.',
    ],
    prizes: [
      'Grand Prix "Andrea Del Verrocchio" Florentine Bronze/Silver Artisan Award',
      'Category Gold, Silver & Bronze Diplomas',
      'Vytautas Miškinis Interpretation Award',
    ],
    venues: [
      'Church of Ognissanti',
      'Basilica of Santa Trinita',
      'Auditorium Sant’Apollonia',
    ],
    programme: [
      {
        day: 'Day 1',
        title: 'Welcome to Florence & Opening Basilica Concert',
        activities: [
          'Ensemble check-in & acoustic warm-ups',
          'Opening Ceremony and International Welcome Concert',
        ],
      },
      {
        day: 'Day 2',
        title: 'Miškinis Hymn Rehearsal & Competition Round I',
        activities: [
          'Combined rehearsal of "The Hymn of the Andrea’s Festival"',
          'Competition sessions & afternoon Friendship Concerts',
        ],
      },
      {
        day: 'Day 3',
        title: 'Workshops & Historic Church Concerts',
        activities: [
          'Choral conducting & Bel Canto vocal clinic',
          'Evening sacred music concerts in Renaissance churches',
        ],
      },
      {
        day: 'Day 4',
        title: 'Grand Finale & Awards Ceremony',
        activities: [
          'Final Gala Concert of all ensembles',
          'Presentation of Diplomas, Special Prizes, and Grand Prix',
        ],
      },
    ],
  },
  {
    id: 'michelangelo',
    slug: 'michelangelo-international-music-festival',
    name: 'Michelangelo International Music Festival',
    shortName: 'Michelangelo Music Festival',
    renaissanceMaster: 'Michelangelo Buonarroti',
    masterYears: '1475 – 1564',
    masterBio:
      'Il Divino — sculptor of the David and architect of the Laurentian Library, whose monumental expressive power inspires our combined Choir and Orchestra celebration.',
    edition: '7th International Edition',
    dates: 'May 27 – 30, 2027',
    season: 'Late Spring Edition',
    status: 'Early Bird Open',
    registrationDeadline: 'February 28, 2027',
    heroImage:
      'https://www.florencechoral.com/wp-content/uploads/2016/08/foto4_1580x500-1280x400.jpg',
    summary:
      'Expanding beyond choral music to embrace symphonic orchestras, chamber ensembles, and choral-orchestral masterpieces in the monumental halls and churches associated with Michelangelo.',
    highlights: [
      'Open to Choirs, Youth Orchestras, Wind Bands, and Chamber Ensembles',
      'Special Golden David Trophy sculpted by Florentine artisans',
      'Grand Piano & full stage support across competition auditoriums',
    ],
    categories: [
      'Choral Divisions (Adult, Youth, Children, Chamber)',
      'Symphonic & String Orchestras (Youth & Adult)',
      'Choral-Orchestral Masterworks & Sacred Music',
      'Non-Competitive Festival Showcase',
    ],
    repertoireRules: [
      '3 works totaling maximum 20 minutes of stage performance.',
      'Instrumental and vocal-instrumental repertoire permitted.',
      'Scores must be submitted in 5 copies for the International Jury.',
    ],
    prizes: [
      'The "Golden David" Grand Prize Trophy & Cash Award',
      'Gold, Silver & Bronze Diplomas across Choral and Orchestral divisions',
      'Best Conductor & Best Instrumental/Vocal Soloist Awards',
    ],
    venues: [
      'Basilica of Santa Croce',
      'Salone dei Cinquecento — Palazzo Vecchio',
      'Auditorium Sant’Apollonia',
    ],
    programme: [
      {
        day: 'Day 1',
        title: 'Ensemble Arrival & Opening Gala',
        activities: [
          'Stage and orchestra seating checks',
          'Grand Opening Concert in the heart of Florence',
        ],
      },
      {
        day: 'Day 2',
        title: 'Masterclasses & Piazza / Basilica Concerts',
        activities: [
          'Workshops with international conductors',
          'Afternoon and evening concerts across Florence',
        ],
      },
      {
        day: 'Day 3',
        title: 'Choral & Orchestral Competition',
        activities: [
          'Adjudicated performances before the International Jury',
          'Evening Friendship Concert celebration',
        ],
      },
      {
        day: 'Day 4',
        title: 'Golden David Award Ceremony & Closing Gala',
        activities: [
          'Final Gala Concert & joint finale',
          'Presentation of the Golden David & Category Diplomas',
        ],
      },
    ],
  },
  {
    id: 'lorenzo-de-medici',
    slug: 'lorenzo-de-medici-choral-festival',
    name: "Lorenzo De' Medici International Choral Festival",
    shortName: "Lorenzo De' Medici Festival",
    renaissanceMaster: "Lorenzo de' Medici (Il Magnifico)",
    masterYears: '1449 – 1492',
    masterBio:
      'Poet, statesman, and the greatest patron of Renaissance Florence, who championed Franco-Flemish polyphonists like Heinrich Isaac and transformed Florence into the cultural capital of Europe.',
    edition: '8th International Edition',
    dates: 'October 14 – 17, 2027',
    season: 'Autumn Edition',
    status: 'Early Bird Open',
    registrationDeadline: 'June 30, 2027',
    heroImage:
      'https://www.florencechoral.com/wp-content/uploads/2017/09/SIB_6647-e1506018371643.jpg',
    summary:
      'An autumn celebration of choral patronage, Renaissance madrigals, sacred polyphony, and international choral fellowship in the historic Medici churches of Florence.',
    highlights: [
      'Performances linked to historic Medici landmarks including San Lorenzo',
      'Special prize for Renaissance & Madrigal interpretation',
      'Intimate autumn atmosphere in Florence with expert Bel Canto workshops',
    ],
    categories: [
      'Mixed, Equal Voices, Chamber & Youth Choirs',
      'Renaissance Madrigals & Sacred Polyphony',
      'Folklore, Spiritual & Contemporary Choral Music',
    ],
    repertoireRules: [
      '3 pieces up to 20 minutes total duration.',
      'Optional special prize track for a Renaissance or Baroque composition.',
    ],
    prizes: [
      'Grand Prix "Il Magnifico" Artisan Trophy & Cash Prize',
      'Gold, Silver & Bronze Category Diplomas',
      'Medici Special Prize for Best Renaissance Polyphony Performance',
    ],
    venues: [
      'Basilica of San Lorenzo',
      'Basilica of Santa Maria Novella',
      'Chiesa di Santa Felicita',
    ],
    programme: [
      {
        day: 'Day 1',
        title: 'Opening Ceremony in Medici Florence',
        activities: [
          'Registration & conductor welcome reception',
          'Opening Concert in a historic Florentine Basilica',
        ],
      },
      {
        day: 'Day 2',
        title: 'Polyphony Workshop & Friendship Concerts',
        activities: [
          'Workshop on Italian Madrigals & Bel Canto phrasing',
          'Evening Friendship Concerts',
        ],
      },
      {
        day: 'Day 3',
        title: 'Competition Day & Jury Roundtable',
        activities: [
          'Category competitions & Jury adjudication',
          'Conductor consultation with the International Jury',
        ],
      },
      {
        day: 'Day 4',
        title: 'Closing Gala & Award Presentation',
        activities: [
          'Joint Finale Concert & Award Ceremony',
        ],
      },
    ],
  },
  {
    id: 'botticelli',
    slug: 'botticelli-international-choral-festival',
    name: 'Botticelli International Choral Festival',
    shortName: 'Botticelli Choral Festival',
    renaissanceMaster: 'Sandro Botticelli',
    masterYears: '1445 – 1510',
    masterBio:
      'Master of poetic line and luminous grace whose masterpieces "Primavera" and "The Birth of Venus" embody the lyricism of Florentine art — buried in Florence’s own Church of Ognissanti.',
    edition: '7th International Edition',
    dates: 'March 18 – 21, 2027',
    season: 'Early Spring / Primavera Edition',
    status: 'Dates Announced',
    registrationDeadline: 'December 15, 2026',
    heroImage:
      'https://www.florencechoral.com/wp-content/uploads/2017/09/SIB_5161-e1506018442480.jpg',
    summary:
      'Welcoming the Florentine spring ("Primavera") with lyrical choral artistry, youth and university choir showcases, and concerts inside the very Church of Ognissanti where Sandro Botticelli rests.',
    highlights: [
      'Special concert inside the Church of Ognissanti (resting place of Botticelli)',
      'Dedicated categories for Youth, Children, and Adult Vocal Ensembles',
      'Spring vocal masterclasses with Italian opera and choral specialists',
    ],
    categories: [
      'Children, Youth & University Choirs',
      'Adult Mixed & Chamber Choirs',
      'Sacred, Lyric & Folk Choral Categories',
    ],
    repertoireRules: [
      '3 works (max 18–20 minutes total stage time).',
      'Open to both competitive and non-competitive international choirs.',
    ],
    prizes: [
      'Grand Prix "Primavera di Botticelli" Trophy',
      'Gold, Silver & Bronze Diplomas',
      'Special Prize for Lyrical Expression & Vocal Blend',
    ],
    venues: [
      'Church of Ognissanti',
      'Basilica of Santissima Annunziata',
      'Auditorium Sant’Apollonia',
    ],
    programme: [
      {
        day: 'Day 1',
        title: 'Primavera Welcome & Opening Concert',
        activities: [
          'Arrival in Florence & acoustic check',
          'Opening Concert in the Church of Ognissanti',
        ],
      },
      {
        day: 'Day 2',
        title: 'Bel Canto Workshop & Ensemble Showcases',
        activities: [
          'Morning workshop on Italian lyricism and diction',
          'Afternoon Friendship Concerts',
        ],
      },
      {
        day: 'Day 3',
        title: 'Competition Sessions & Evening Gala',
        activities: [
          'Adjudicated performances by category',
          'Evening Gala Concert',
        ],
      },
      {
        day: 'Day 4',
        title: 'Awards & Joint Finale',
        activities: [
          'Final Combined Choir performance & Awards Ceremony',
        ],
      },
    ],
  },
];

export const INITIAL_JURY_MEMBERS: JuryMember[] = [
  {
    id: 'jury-sagliocca',
    name: 'Dr. Leonardo Sagliocca',
    role: 'Founder & Artistic Director',
    country: 'Italy',
    credentials:
      'Internationally renowned Florentine Bass-Baritone (trained under Rolando Panerai and Leo Nucci), soloist across major European and Asian opera houses, and Founder of Florence Choral.',
    festivalYear: 'Permanent Artistic Director',
    imageUrl: '/Florence_choral_quadrato.jpg',
  },
  {
    id: 'jury-miskinis',
    name: 'Prof. Vytautas Miškinis',
    role: 'Honorary Jury Member & Festival Hymn Composer',
    country: 'Lithuania',
    credentials:
      'World-acclaimed composer of over 800 choral works, Artistic Director of the Kaunas Boys’ Choir, Professor at the Lithuanian Academy of Music, and composer of "The Hymn of the Andrea’s Festival".',
    festivalYear: '2024 – 2027 Committee',
    imageUrl:
      'https://www.florencechoral.com/wp-content/uploads/2017/01/Diverse-voci-Miskinis-2.jpg',
  },
  {
    id: 'jury-sharp',
    name: 'Dr. Tim Sharp',
    role: 'International Jury & Guest Conductor',
    country: 'United States',
    credentials:
      'Former Executive Director of the American Choral Directors Association (ACDA), Vice-President of the International Federation for Choral Music (IFCM), and published composer.',
    festivalYear: '2024 – 2027 Jury',
    imageUrl:
      'https://www.florencechoral.com/wp-content/uploads/2017/09/SIB_8925-1280x400.jpg',
  },
  {
    id: 'jury-phoenix',
    name: 'Paul Phoenix',
    role: 'International Adjudicator & Masterclass Clinician',
    country: 'United Kingdom',
    credentials:
      'Two-time Grammy Award winner and former tenor of the legendary King’s Singers for 17 years; global choral clinician and ensemble coach.',
    festivalYear: '2024 – 2027 Jury',
    imageUrl:
      'https://www.florencechoral.com/wp-content/uploads/2017/09/SIB_6647-e1506018371643.jpg',
  },
  {
    id: 'jury-bellocci',
    name: 'Maestro Paolo Bellocci',
    role: 'Artistic Committee & Grand Piano Master',
    country: 'Italy',
    credentials:
      'Principal coach and accompanist at Teatro del Maggio Musicale Fiorentino, collaborating with legendary conductors Zubin Mehta and Riccardo Muti.',
    festivalYear: 'Permanent Committee',
    imageUrl:
      'https://www.florencechoral.com/wp-content/uploads/2016/08/SIB_6255-1280x400.jpg',
  },
];

export const INITIAL_VENUES: HistoricVenue[] = [
  {
    id: 'venue-santa-croce',
    name: 'Basilica of Santa Croce',
    italianName: 'Basilica di Santa Croce',
    district: 'Piazza di Santa Croce, Historic Center',
    significance:
      'Known as the "Temple of the Italian Glories" — the final resting place of Michelangelo, Galileo Galilei, Rossini, and Machiavelli, adorned with Giotto frescoes.',
    acousticHighlight:
      'Monumental Gothic nave offering a 4.5-second warm reverberation ideal for sacred polyphony.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/4/4d/Bas%C3%ADlica_de_la_Santa_Cruz%2C_Florencia%2C_Italia%2C_2022-09-18%2C_DD_95.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original',
  },
  {
    id: 'venue-santa-maria-novella',
    name: 'Basilica of Santa Maria Novella',
    italianName: 'Basilica di Santa Maria Novella',
    district: 'Piazza di Santa Maria Novella',
    significance:
      'Masterpiece of Florentine Gothic and early Renaissance architecture featuring Leon Battista Alberti’s marble facade and Masaccio’s Holy Trinity.',
    acousticHighlight:
      'Rich, enveloping acoustics used for Opening Ceremonies and Grand Evening Concerts.',
    imageUrl:
      'https://www.toscana.info/en/wp-content/uploads/sites/205/santa-maria-novella-hd.jpg',
  },
  {
    id: 'venue-palazzo-vecchio',
    name: 'Salone dei Cinquecento — Palazzo Vecchio',
    italianName: 'Palazzo della Signoria',
    district: 'Piazza della Signoria',
    significance:
      'The grand civic hall of the Florentine Republic commissioned in 1494, where Leonardo da Vinci and Michelangelo were both commissioned to paint monumental frescoes.',
    acousticHighlight:
      'Prestigious ceremonial hall hosting official receptions, award ceremonies, and gala finals.',
    imageUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Piazza_della_signoria%2C_palazzo_vecchio%2C_veduta_01.jpg/1280px-Piazza_della_signoria%2C_palazzo_vecchio%2C_veduta_01.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail',
  },
  {
    id: 'venue-ognissanti',
    name: 'Church of Ognissanti',
    italianName: 'Chiesa di San Salvatore in Ognissanti',
    district: 'Borgo Ognissanti, Lungarno',
    significance:
      'Founded in 1251, housing masterpieces by Ghirlandaio and Sandro Botticelli, and serving as Botticelli’s final resting place.',
    acousticHighlight:
      'Intimate Baroque interior offering crystal-clear vocal articulation for chamber and youth choirs.',
    imageUrl:
      'https://campusflorence.com/wp-content/uploads/2021/02/0f930-ognissanti-644-x-460.jpg?w=640',
  },
  {
    id: 'venue-sant-apollonia',
    name: 'Auditorium Sant’Apollonia',
    italianName: 'Cenacolo di Sant’Apollonia',
    district: 'Via Ventisette Aprile, San Marco',
    significance:
      'Former 14th-century Benedictine monastery adjacent to Andrea del Castagno’s famous Last Supper fresco.',
    acousticHighlight:
      'Equipped with concert Grand Piano and tiered seating for adjudicated competition rounds and Bel Canto workshops.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwv3DIIsMmtNgLpk8gO641ZLwBab4Q9baIMZCbS1mpXJ0Eo9sC-An1dog&s=10',
  },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote:
      'To sing in Florence, surrounded by the art of Leonardo and Michelangelo, with an organization that truly understands voices and choirs, is an unforgettable gift for any conductor and ensemble.',
    author: 'Prof. Vytautas Miškinis',
    title: 'Composer & Artistic Director',
    organization: 'Lithuanian Academy of Music & Theatre',
    country: 'Lithuania',
  },
  {
    id: 'test-2',
    quote:
      'Dr. Leonardo Sagliocca brings the heart of an international opera singer to choral festival organization. Every venue, piano, and jury panel reflects the highest artistic integrity.',
    author: 'Dr. Tim Sharp',
    title: 'Former Executive Director, ACDA',
    organization: 'International Federation for Choral Music (IFCM)',
    country: 'United States',
  },
  {
    id: 'test-3',
    quote:
      'Our singers traveled from Beijing to Florence and experienced four days that transformed our choir forever — singing together in historic basilicas and learning authentic Italian Bel Canto.',
    author: 'Mei-Ling Zhang',
    title: 'Artistic Director',
    organization: 'Beijing Youth Chamber Choir',
    country: 'China',
  },
];

export const INITIAL_APPLICATIONS: ChoirApplication[] = [
  {
    id: 'app-101',
    submittedAt: '2026-11-14 18:20 CET',
    choirName: 'Coro Polifonico San Marco',
    country: 'Spain',
    conductorName: 'Maestro Carlos Mendoza',
    email: 'c.mendoza@corosanmarco.es',
    phone: '+34 612 889 304',
    festivalId: 'leonardo-da-vinci',
    festivalName: 'Leonardo Da Vinci International Choral Festival',
    category: 'Category A: Mixed Adult Choirs (min. 16 singers)',
    singersCount: 38,
    requestType: 'Full Application',
    notes: 'We would also like to book the Bel Canto workshop on Day 2 for all 38 singers.',
    status: 'New',
  },
  {
    id: 'app-102',
    submittedAt: '2026-11-13 11:05 CET',
    choirName: 'Nordic Voices Youth Ensemble',
    country: 'Sweden',
    conductorName: 'Astrid Lindqvist',
    email: 'astrid@nordicvoices.se',
    phone: '+46 70 554 1920',
    festivalId: 'andrea-del-verrocchio',
    festivalName: 'Andrea Del Verrocchio International Choral Festival',
    category: 'Category C: Youth & University Choirs (ages 15–25)',
    singersCount: 28,
    requestType: 'Brochure Request',
    notes: 'Requesting official 2027 rules PDF and hotel package information for 28 singers + 3 chaperones.',
    status: 'Brochure Sent',
  },
];
