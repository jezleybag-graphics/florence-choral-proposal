import React from 'react';
import { Icon } from '@iconify/react';
import type { JuryMember, HistoricVenue, Testimonial } from '../types/festival';

interface VenuesAndCommitteeProps {
  juryMembers: JuryMember[];
  venues: HistoricVenue[];
  testimonials: Testimonial[];
  onOpenApplication: (festivalId?: string, requestType?: 'Full Application' | 'Brochure Request') => void;
}

export const VenuesAndCommittee: React.FC<VenuesAndCommitteeProps> = ({
  juryMembers,
  venues,
  testimonials,
  onOpenApplication,
}) => {
  return (
    <>
      {/* Artistic Committee & International Juries (#committee) */}
      <section id="committee" className="py-16 sm:py-24 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#136597]/10 text-[#136597] text-xs font-bold uppercase tracking-wider mb-3">
              <Icon icon="mage:award" width={15} height={15} />
              <span>Warranty of Impartiality &amp; Prestige</span>
            </span>
            <h2 className="apple-display-section font-extrabold florence-section-title">
              Artistic Committee &amp; International Jury
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#4A5568]">
              Founded and directed by Florentine bass-baritone Dr. Leonardo Sagliocca, our juries
              bring together world-renowned composers, conductors, and opera masters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {juryMembers.map((member, index) => (
              <div
                key={member.id}
                className={`apple-card rounded-2xl overflow-hidden flex flex-col ${
                  index === 0 ? 'md:col-span-2 lg:col-span-1 ring-2 ring-[#DC143C]' : ''
                }`}
              >
                <div className="h-48 relative bg-slate-900 overflow-hidden">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    loading="lazy"
                    width={400}
                    height={220}
                    className="w-full h-full object-cover object-center opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#DC143C] text-white text-[11px] font-bold">
                    {member.country}
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-xs font-semibold text-white/80 block">
                      {member.festivalYear}
                    </span>
                    <h3 className="font-display text-lg font-extrabold">{member.name}</h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="text-xs font-bold text-[#136597] uppercase tracking-wider mb-2">
                      {member.role}
                    </div>
                    <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
                      {member.credentials}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Composers' Corner & The Hymn of the Andrea's Festival (#composers) */}
      <section id="composers" className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DC143C] text-white text-xs font-bold uppercase tracking-wider">
                <Icon icon="mage:music-note" width={16} height={16} />
                <span>Composers’ Corner • Exclusive Commission</span>
              </div>
              <h2 className="apple-display-section font-extrabold text-white">
                The Hymn of the Andrea’s Festival — Composed by Vytautas Miškinis
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Florence Choral honors living choral composition alongside Renaissance polyphony.
                Acclaimed Lithuanian maestro <strong className="text-white">Vytautas Miškinis</strong>{' '}
                composed the official Hymn of the Andrea del Verrocchio International Choral
                Festival — performed jointly by all participating international choirs during the
                Grand Closing Concert in Florence.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/8 border border-white/15">
                  <div className="flex items-center gap-2 font-display font-bold text-sm text-white mb-1">
                    <Icon icon="mage:file-2" width={18} height={18} className="text-[#DC143C]" />
                    <span>Official Choral Score Sent Upon Registration</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    All registered ensembles receive the official performance score for the joint
                    final concert conducted by our guest Maestro.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/8 border border-white/15">
                  <div className="flex items-center gap-2 font-display font-bold text-sm text-white mb-1">
                    <Icon icon="mage:trophy-star" width={18} height={18} className="text-[#DC143C]" />
                    <span>International Composers Competition</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Dedicated award track for sacred and secular choral works inspired by the
                    Florentine Renaissance.
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenApplication('andrea-del-verrocchio', 'Brochure Request')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#DC143C] hover:bg-[#B81032] text-white text-sm font-semibold cursor-pointer apple-pressable"
                >
                  <Icon icon="mage:file-download" width={18} height={18} />
                  <span>Request Score &amp; Festival Rules</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl relative">
                <img
                  src="https://www.florencechoral.com/wp-content/uploads/2017/01/Diverse-voci-Miskinis-2.jpg"
                  alt="The Hymn of the Andrea's Festival - Vytautas Miskinis"
                  loading="lazy"
                  width={540}
                  height={360}
                  className="w-full h-72 sm:h-80 object-cover"
                />
                <div className="p-4 bg-black/75 backdrop-blur-md text-xs text-white/90 flex items-center justify-between">
                  <span>Original Archival Score &amp; Dedication by Vytautas Miškinis</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#DC143C] font-bold">Florence Choral</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historic Venues of Florence (#venues) */}
      <section id="venues" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DC143C]/10 text-[#DC143C] text-xs font-bold uppercase tracking-wider mb-3">
              <Icon icon="mage:building-tree" width={15} height={15} />
              <span>Where Opera Was Born • Architectural Landmarks</span>
            </span>
            <h2 className="apple-display-section font-extrabold florence-section-title">
              Historic Venues of Florence
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#4A5568]">
              Perform inside the world’s most treasured Renaissance basilicas, monumental palazzos,
              and historic auditoriums — with a Grand Piano provided in all possible venues.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {venues.map((venue) => (
              <div key={venue.id} className="apple-card rounded-2xl overflow-hidden flex flex-col">
                <div className="h-48 relative bg-slate-900 overflow-hidden">
                  <img
                    src={venue.imageUrl}
                    alt={venue.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    width={420}
                    height={240}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[11px] font-semibold text-white/80 block">
                      {venue.district}
                    </span>
                    <h3 className="font-display text-lg font-extrabold">{venue.name}</h3>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
                    {venue.significance}
                  </p>
                  <div className="p-3 rounded-xl bg-[#F8F9FA] border border-slate-200/80 text-xs text-[#3B3B3B] flex items-start gap-2">
                    <Icon icon="mage:volume-up" width={17} height={17} className="text-[#DC143C] shrink-0 mt-0.5" />
                    <span>{venue.acousticHighlight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Testimonials ("Festivals recommended by the Greats") (#testimonials) */}
      <section id="testimonials" className="py-16 sm:py-24 bg-[#F8F9FA] border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="apple-display-section font-extrabold florence-section-title">
              Our Testimonials
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#4A5568]">
              “Festivals recommended by the Greats” — words from international jury members and
              visiting choir conductors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {testimonials.map((item) => (
              <blockquote
                key={item.id}
                className="apple-card rounded-2xl p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#DC143C]">
                    <Icon icon="mage:star-fill" width={16} height={16} />
                    <Icon icon="mage:star-fill" width={16} height={16} />
                    <Icon icon="mage:star-fill" width={16} height={16} />
                    <Icon icon="mage:star-fill" width={16} height={16} />
                    <Icon icon="mage:star-fill" width={16} height={16} />
                  </div>
                  <p className="text-sm sm:text-base text-[#3B3B3B] italic leading-relaxed">
                    “{item.quote}”
                  </p>
                </div>
                <footer className="pt-3 border-t border-slate-100">
                  <div className="font-display font-bold text-sm text-[#3B3B3B]">{item.author}</div>
                  <div className="text-xs text-[#136597] font-semibold">
                    {item.title} • {item.organization} ({item.country})
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Archives Gallery Section (#archives) */}
      <section id="archives" className="py-16 sm:py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="apple-display-section font-extrabold florence-section-title">
                Festival Archives (2016 – 2026)
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#4A5568]">
                Original photography from past editions of our Florence Choral festivals, workshops,
                and basilica gala concerts.
              </p>
            </div>
            <a
              href="https://www.youtube.com/channel/UCJPbqo-uoYmdLoSgygYQtOQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-[#DC143C] text-white text-xs sm:text-sm font-semibold transition-colors apple-pressable self-start"
            >
              <Icon icon="simple-icons:youtube" width={16} height={16} />
              <span>Watch Official YouTube Archives</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                src: 'https://www.florencechoral.com/wp-content/uploads/2017/09/SIB_8925-1280x400.jpg',
                caption: 'Grand Opening Concert — Historic Basilica Ensemble Performance',
              },
              {
                src: 'https://www.florencechoral.com/wp-content/uploads/2016/08/foto4_1580x500-1280x400.jpg',
                caption: 'International Youth & Adult Choirs — "From Beijing to sing here"',
              },
              {
                src: 'https://www.florencechoral.com/wp-content/uploads/2017/09/SIB_6647-e1506018371643.jpg',
                caption: 'Adjudicated Competition Round & Gala Showcase',
              },
              {
                src: 'https://www.florencechoral.com/wp-content/uploads/2016/08/SIB_6255-1280x400.jpg',
                caption: 'The Light of Renaissance — Sacred Polyphony in Florence',
              },
              {
                src: 'https://www.florencechoral.com/wp-content/uploads/2017/09/SIB_5161-e1506018442480.jpg',
                caption: 'Surrounded by Art — Masterclasses & Bel Canto Workshops',
              },
              {
                src: 'https://www.florencechoral.com/wp-content/uploads/2017/01/Diverse-voci-Miskinis-2.jpg',
                caption: 'The Hymn of the Andrea’s Festival — Composed by Vytautas Miškinis',
              },
            ].map((photo, idx) => (
              <figure
                key={idx}
                className="apple-card rounded-2xl overflow-hidden group relative h-56 bg-slate-900"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  width={420}
                  height={240}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white text-xs font-medium">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
