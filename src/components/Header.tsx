import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import type { SiteConfig, Festival } from '../types/festival';

interface HeaderProps {
  config: SiteConfig;
  festivals: Festival[];
  activeView: 'public' | 'admin';
  onSwitchView: (view: 'public' | 'admin') => void;
  onSelectFestival: (festival: Festival) => void;
  onOpenApplication: (festivalId?: string, requestType?: 'Full Application' | 'Brochure Request') => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  festivals,
  activeView,
  onSwitchView,
  onSelectFestival,
  onOpenApplication,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [festivalsDropdownOpen, setFestivalsDropdownOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    if (activeView !== 'public') {
      onSwitchView('public');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
    setFestivalsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Original Florence Choral Crimson Header Section (#DC143C) */}
      <div className="bg-[#DC143C] text-white border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Brand Lockup with Optical Alignment, Golden Ratio (1:1.618) Sizing & Law of Proximity Spacing */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onSwitchView('public');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-[18px] sm:gap-[22px] group apple-pressable text-left py-0.5"
          >
            <img
              src="/florence-choral-logo-transparent.png"
              alt="Florence Choral Crest"
              width={111}
              height={51}
              className="h-[46px] sm:h-[51px] w-auto object-contain shrink-0 -translate-y-[3.5px] select-none"
            />
            <div className="flex flex-col justify-center">
              <span className="block font-display text-[1.45rem] sm:text-[1.618rem] font-extrabold tracking-[-0.022em] text-white leading-[1.02] group-hover:underline decoration-white/60 underline-offset-4">
                {config.siteTitle}
              </span>
              <span className="block text-[0.875rem] sm:text-[0.95rem] text-white/95 font-medium mt-[5px] leading-[1.15] tracking-[0.012em]">
                {config.tagline}
              </span>
            </div>
          </a>

          {/* Contact Info & Official Social Brand Icons */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 sm:gap-5">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium">
              <a
                href={`mailto:${config.email}`}
                className="inline-flex items-center gap-1.5 text-white hover:text-white/85 underline-offset-4 hover:underline apple-pressable"
              >
                <Icon icon="mage:email" width={17} height={17} />
                <span>{config.email}</span>
              </a>
              <a
                href={`tel:${config.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1.5 text-white hover:text-white/85 underline-offset-4 hover:underline apple-pressable"
              >
                <Icon icon="mage:phone" width={17} height={17} />
                <span>{config.phone}</span>
              </a>
            </div>

            {/* Official Social Brand Logos */}
            <div className="flex items-center gap-1.5" aria-label="Official Social Channels">
              <a
                href={config.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Florence Choral on Facebook"
                className="w-8 h-8 rounded-lg border border-white/40 bg-white/10 hover:bg-white hover:text-[#1877F2] flex items-center justify-center transition-colors apple-pressable"
              >
                <Icon icon="simple-icons:facebook" width={15} height={15} />
              </a>
              <a
                href={config.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Florence Choral on X (Twitter)"
                className="w-8 h-8 rounded-lg border border-white/40 bg-white/10 hover:bg-white hover:text-black flex items-center justify-center transition-colors apple-pressable"
              >
                <Icon icon="simple-icons:x" width={14} height={14} />
              </a>
              <a
                href={config.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Florence Choral on YouTube"
                className="w-8 h-8 rounded-lg border border-white/40 bg-white/10 hover:bg-white hover:text-[#FF0000] flex items-center justify-center transition-colors apple-pressable"
              >
                <Icon icon="simple-icons:youtube" width={16} height={16} />
              </a>
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Florence Choral on Instagram"
                className="w-8 h-8 rounded-lg border border-white/40 bg-white/10 hover:bg-white hover:text-[#E4405F] flex items-center justify-center transition-colors apple-pressable"
              >
                <Icon icon="simple-icons:instagram" width={15} height={15} />
              </a>
              <a
                href={`https://wa.me/${config.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                title="Direct WhatsApp"
                className="w-8 h-8 rounded-lg border border-white/40 bg-white/10 hover:bg-white hover:text-[#25D366] flex items-center justify-center transition-colors apple-pressable"
              >
                <Icon icon="simple-icons:whatsapp" width={15} height={15} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Apple Translucent Glass Navigation Bar */}
      <nav className="apple-glass-nav" aria-label="Primary Navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Desktop Navigation Links matching original florencechoral.com menu */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Festivals Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setFestivalsDropdownOpen(true)}
                onMouseLeave={() => setFestivalsDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => scrollToSection('festivals')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all cursor-pointer apple-pressable ${
                    festivalsDropdownOpen
                      ? 'bg-[#DC143C]/[0.09] text-[#DC143C]'
                      : 'text-[#1D1D1F] hover:bg-[#DC143C]/[0.08] hover:text-[#DC143C]'
                  }`}
                >
                  <Icon icon="mage:music-square" width={17} height={17} />
                  <span>Festivals</span>
                  <Icon
                    icon="mage:chevron-down"
                    width={15}
                    height={15}
                    className={`transition-transform duration-200 ${
                      festivalsDropdownOpen ? 'rotate-180 text-[#DC143C]' : ''
                    }`}
                  />
                </button>

                {festivalsDropdownOpen && (
                  <div className="absolute left-0 top-full pt-2 w-[23.5rem] z-50">
                    <div className="apple-glass-dropdown text-[#1D1D1F] rounded-2xl p-2">
                      <div className="px-3.5 py-2 text-[10px] uppercase tracking-[0.08em] text-slate-500 font-bold border-b border-slate-200/80 mb-1">
                        The 5 Renaissance Festivals
                      </div>
                      <div className="space-y-0.5">
                        {festivals.map((fest) => (
                          <button
                            key={fest.id}
                            type="button"
                            onClick={() => {
                              setFestivalsDropdownOpen(false);
                              onSelectFestival(fest);
                            }}
                            className="group/item w-full text-left px-3.5 py-2.5 rounded-xl text-[#1D1D1F] hover:bg-[#DC143C]/[0.08] hover:text-[#DC143C] transition-colors flex items-center justify-between gap-3 text-[13px] font-semibold cursor-pointer apple-pressable"
                          >
                            <span className="whitespace-nowrap">{fest.shortName}</span>
                            <span className="text-[11px] font-semibold bg-[#1D1D1F] text-white group-hover/item:bg-[#DC143C] group-hover/item:text-white transition-colors px-2.5 py-0.5 rounded-full shrink-0 shadow-2xs">
                              {fest.dates.split(',')[0]}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => scrollToSection('committee')}
                className="px-3 py-2 rounded-xl text-sm font-semibold text-[#1D1D1F] hover:bg-[#DC143C]/[0.08] hover:text-[#DC143C] whitespace-nowrap transition-colors cursor-pointer apple-pressable"
              >
                Artistic Committee
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('composers')}
                className="px-3 py-2 rounded-xl text-sm font-semibold text-[#1D1D1F] hover:bg-[#DC143C]/[0.08] hover:text-[#DC143C] whitespace-nowrap transition-colors cursor-pointer apple-pressable"
              >
                Composers
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('venues')}
                className="px-3 py-2 rounded-xl text-sm font-semibold text-[#1D1D1F] hover:bg-[#DC143C]/[0.08] hover:text-[#DC143C] whitespace-nowrap transition-colors cursor-pointer apple-pressable"
              >
                Venues
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('testimonials')}
                className="px-3 py-2 rounded-xl text-sm font-semibold text-[#1D1D1F] hover:bg-[#DC143C]/[0.08] hover:text-[#DC143C] whitespace-nowrap transition-colors cursor-pointer apple-pressable"
              >
                Testimonials
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('archives')}
                className="px-3 py-2 rounded-xl text-sm font-semibold text-[#1D1D1F] hover:bg-[#DC143C]/[0.08] hover:text-[#DC143C] whitespace-nowrap transition-colors cursor-pointer apple-pressable"
              >
                Archives
              </button>
              <a
                href={config.feelFlorenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold text-[#1D1D1F] hover:bg-[#DC143C]/[0.08] hover:text-[#DC143C] whitespace-nowrap transition-colors apple-pressable"
              >
                <span>Florence</span>
                <Icon icon="mage:external-link" width={14} height={14} />
              </a>
              <button
                type="button"
                onClick={() => scrollToSection('contacts')}
                className="px-3 py-2 rounded-xl text-sm font-semibold text-[#1D1D1F] hover:bg-[#DC143C]/[0.08] hover:text-[#DC143C] whitespace-nowrap transition-colors cursor-pointer apple-pressable"
              >
                Contacts
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#DC143C] text-white text-xs font-semibold apple-pressable"
              >
                <Icon icon={mobileMenuOpen ? 'mage:multiply' : 'mage:dash-menu'} width={18} height={18} />
                <span>Toggle navigation</span>
              </button>
            </div>

            {/* Right Action Button: Brochure / Apply */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenApplication(undefined, 'Brochure Request')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#DC143C] hover:bg-[#B81032] text-white text-xs sm:text-sm font-semibold shadow-sm cursor-pointer apple-pressable"
              >
                <Icon icon="mage:file-download" width={17} height={17} />
                <span>Apply / Brochure</span>
              </button>
            </div>
          </div>

          {/* Mobile Collapsible Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-3 border-t border-slate-200/80 grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => scrollToSection('festivals')}
                className="text-left px-3 py-2 rounded-xl text-sm font-semibold text-[#1D1D1F] hover:bg-[#DC143C]/[0.08] hover:text-[#DC143C] whitespace-nowrap"
              >
                Festivals
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('committee')}
                className="text-left px-3 py-2 rounded-xl text-sm font-semibold text-[#1D1D1F] hover:bg-[#DC143C]/[0.08] hover:text-[#DC143C] whitespace-nowrap"
              >
                Artistic Committee
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('composers')}
                className="text-left px-3 py-2 rounded-xl text-sm font-semibold text-[#1D1D1F] hover:bg-[#DC143C]/[0.08] hover:text-[#DC143C] whitespace-nowrap"
              >
                Composers
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('venues')}
                className="text-left px-3 py-2 rounded-xl text-sm font-semibold text-[#1D1D1F] hover:bg-[#DC143C]/[0.08] hover:text-[#DC143C] whitespace-nowrap"
              >
                Venues
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('testimonials')}
                className="text-left px-3 py-2 rounded-xl text-sm font-semibold text-[#1D1D1F] hover:bg-[#DC143C]/[0.08] hover:text-[#DC143C] whitespace-nowrap"
              >
                Testimonials
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('archives')}
                className="text-left px-3 py-2 rounded-xl text-sm font-semibold text-[#1D1D1F] hover:bg-[#DC143C]/[0.08] hover:text-[#DC143C] whitespace-nowrap"
              >
                Archives
              </button>
              <a
                href={config.feelFlorenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-left px-3 py-2 rounded-xl text-sm font-semibold text-[#1D1D1F] hover:bg-[#DC143C]/[0.08] hover:text-[#DC143C] whitespace-nowrap inline-flex items-center gap-1"
              >
                <span>Florence</span>
                <Icon icon="mage:external-link" width={14} height={14} />
              </a>
              <button
                type="button"
                onClick={() => scrollToSection('contacts')}
                className="text-left px-3 py-2 rounded-xl text-sm font-semibold text-[#1D1D1F] hover:bg-[#DC143C]/[0.08] hover:text-[#DC143C] whitespace-nowrap"
              >
                Contacts
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
