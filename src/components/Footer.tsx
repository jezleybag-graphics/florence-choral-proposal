import React from 'react';
import { Icon } from '@iconify/react';
import type { SiteConfig, Festival } from '../types/festival';

interface FooterProps {
  config: SiteConfig;
  festivals: Festival[];
  onSelectFestival: (festival: Festival) => void;
  onOpenApplication: (festivalId?: string, requestType?: 'Full Application' | 'Brochure Request') => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  festivals,
  onSelectFestival,
  onOpenApplication,
}) => {
  return (
    <footer id="contacts" className="bg-[#1E2229] text-white">
      {/* Direct Contact & Quick Inquiry Banner */}
      <div className="bg-[#DC143C] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-white/85 block">
              Sing in the Cradle of the Renaissance
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Bring Your Choir or Orchestra to Florence?
            </h2>
            <p className="text-sm sm:text-base text-white/90 max-w-2xl">
              Contact Artistic Director Dr. Leonardo Sagliocca directly or download the official
              2027 Festival Brochure, Rules &amp; Accommodation Packages.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenApplication(undefined, 'Brochure Request')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#DC143C] hover:bg-slate-100 font-bold text-sm shadow-lg cursor-pointer apple-pressable"
            >
              <Icon icon="mage:file-download" width={19} height={19} />
              <span>Request Official Brochure</span>
            </button>
            <a
              href={`https://wa.me/${config.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-lg apple-pressable"
            >
              <Icon icon="simple-icons:whatsapp" width={17} height={17} className="text-[#25D366]" />
              <span>WhatsApp: {config.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Widget Area (Preserving Original Patronage Crests & Links) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: About & Direct Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-[18px]">
              <img
                src="/florence-choral-logo-transparent.png"
                alt="Florence Choral"
                loading="lazy"
                width={100}
                height={46}
                className="h-[46px] w-auto object-contain shrink-0 -translate-y-[3px] select-none"
              />
              <div className="flex flex-col justify-center">
                <h3 className="font-display text-[1.35rem] font-extrabold tracking-[-0.02em] text-white leading-[1.05]">
                  {config.siteTitle}
                </h3>
                <p className="text-[0.835rem] text-slate-300 mt-[4px] leading-[1.15]">{config.tagline}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              International Choral &amp; Orchestra Festivals in Florence, Italy. Founded by
              Florentine Bass-Baritone and Artistic Director Dr. Leonardo Sagliocca.
            </p>

            <div className="space-y-2 text-xs sm:text-sm text-slate-200 pt-1">
              <a
                href={`mailto:${config.email}`}
                className="flex items-center gap-2.5 hover:text-[#DC143C] transition-colors"
              >
                <Icon icon="mage:email" width={18} height={18} className="text-[#DC143C]" />
                <span>{config.email}</span>
              </a>
              <a
                href={`tel:${config.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2.5 hover:text-[#DC143C] transition-colors"
              >
                <Icon icon="mage:phone" width={18} height={18} className="text-[#DC143C]" />
                <span>{config.phone}</span>
              </a>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Icon icon="mage:map-marker" width={18} height={18} className="text-[#DC143C]" />
                <span>Florence (Firenze), Tuscany, Italy</span>
              </div>
            </div>

            {/* Official Social Brand Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={config.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#1877F2] text-white flex items-center justify-center transition-colors apple-pressable"
              >
                <Icon icon="simple-icons:facebook" width={16} height={16} />
              </a>
              <a
                href={config.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-black text-white flex items-center justify-center transition-colors apple-pressable"
              >
                <Icon icon="simple-icons:x" width={15} height={15} />
              </a>
              <a
                href={config.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#FF0000] text-white flex items-center justify-center transition-colors apple-pressable"
              >
                <Icon icon="simple-icons:youtube" width={17} height={17} />
              </a>
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#E4405F] text-white flex items-center justify-center transition-colors apple-pressable"
              >
                <Icon icon="simple-icons:instagram" width={16} height={16} />
              </a>
            </div>
          </div>

          {/* Column 2: The 5 Festivals (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-display text-base font-bold text-white border-b-2 border-[#DC143C] inline-block pb-1">
              Our 5 Renaissance Festivals
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {festivals.map((fest) => (
                <li key={fest.id}>
                  <button
                    type="button"
                    onClick={() => onSelectFestival(fest)}
                    className="text-slate-300 hover:text-white flex items-center gap-2 text-left cursor-pointer apple-pressable"
                  >
                    <Icon icon="mage:chevron-right" width={15} height={15} className="text-[#DC143C] shrink-0" />
                    <span>{fest.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 & 4: Official Patronage Crests from florencechoral.com (4 cols) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-display text-sm font-bold text-white border-b-2 border-[#DC143C] inline-block pb-1">
                Con il Patrocinio del
              </h4>
              <a
                href={config.patronageFirenzePdf}
                target="_blank"
                rel="noopener noreferrer"
                title="View Official Town Council of Florence Patronage PDF"
                className="block p-3 rounded-2xl bg-white hover:ring-4 hover:ring-[#DC143C]/50 transition-all w-fit apple-pressable"
              >
                <img
                  src={config.patronageFirenzeLogo}
                  alt="Logo Comune di Firenze"
                  loading="lazy"
                  width={130}
                  height={120}
                  className="h-28 w-auto object-contain mx-auto"
                />
                <span className="mt-2 block text-[11px] text-center font-bold text-[#3B3B3B]">
                  Comune di Firenze (PDF)
                </span>
              </a>
            </div>

            <div className="space-y-3">
              <h4 className="font-display text-sm font-bold text-white border-b-2 border-[#DC143C] inline-block pb-1">
                Con il Patrocinio di
              </h4>
              <a
                href={config.patronageToscanaUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Regione Toscana Official Portal"
                className="block p-3 rounded-2xl bg-white hover:ring-4 hover:ring-[#DC143C]/50 transition-all w-fit apple-pressable"
              >
                <img
                  src={config.patronageToscanaLogo}
                  alt="Con il Patrocinio di Regione Toscana"
                  loading="lazy"
                  width={100}
                  height={120}
                  className="h-28 w-auto object-contain mx-auto"
                />
                <span className="mt-2 block text-[11px] text-center font-bold text-[#3B3B3B]">
                  Regione Toscana
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar Matching Original Site Credit */}
      <div className="bg-black/40 border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            © 2016 – 2027 Florence Choral Festival • Developed By Leonardo Sagliocca
          </div>
          <div className="text-slate-400">
            Florence (Firenze), Italy • Official Patronage of Comune di Firenze &amp; Regione Toscana
          </div>
        </div>
      </div>
    </footer>
  );
};
