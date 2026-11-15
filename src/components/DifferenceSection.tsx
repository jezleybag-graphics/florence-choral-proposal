import React from 'react';
import { Icon } from '@iconify/react';
import { OUR_DIFFERENCE_PILLARS } from '../data/florenceData';

interface DifferenceSectionProps {
  onOpenApplication: (festivalId?: string, requestType?: 'Full Application' | 'Brochure Request') => void;
}

export const DifferenceSection: React.FC<DifferenceSectionProps> = ({ onOpenApplication }) => {
  return (
    <section className="py-16 sm:py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Original "Our Difference" Heading with #DC143C Crimson Underline */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="apple-display-section font-extrabold florence-section-title">
            Our Difference
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#4A5568]">
            Why choirs, conductors, and youth orchestras from around the world choose Florence
            Choral as their premier Italian festival experience.
          </p>
        </div>

        {/* 3 Pillars Matching Original Site */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {OUR_DIFFERENCE_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="apple-card rounded-2xl p-7 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Original Enigma Service Crimson Icon Circle */}
                <div className="w-16 h-16 rounded-2xl border-4 border-[#DC143C] bg-[#DC143C] text-white group-hover:bg-white group-hover:text-[#DC143C] transition-colors flex items-center justify-center shadow-md">
                  {pillar.id === 'workshops' ? (
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M18.6121 10.8202L12.8745 2.9411C12.7762 2.80565 12.6454 2.69503 12.4931 2.61865C12.3409 2.54227 12.1717 2.50238 12 2.50238C11.8283 2.50238 11.6591 2.54227 11.5069 2.61865C11.3546 2.69503 11.2238 2.80565 11.1255 2.9411L5.38787 10.8202C5.13545 11.1657 5 11.5777 5 12C5 12.4223 5.13545 12.8343 5.38787 13.1798L11.1255 21.0588C11.2238 21.1943 11.3546 21.3049 11.5069 21.3813C11.6591 21.4576 11.8283 21.4975 12 21.4975C12.1717 21.4975 12.3409 21.4576 12.4931 21.3813C12.6454 21.3049 12.7762 21.1943 12.8745 21.0588L18.6121 13.1798C18.8645 12.8343 19 12.4223 19 12C19 11.5777 18.8645 11.1657 18.6121 10.8202Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.01462 12.1949L12 15.0778L18.9854 12.1949"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 2.5V15.0778V21.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : pillar.id === 'juries' ? (
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M17.9281 19.6343H20.0657C20.2539 19.6375 20.4401 19.5951 20.6083 19.5106C20.7766 19.4261 20.9218 19.3021 21.0316 19.1491C21.1413 18.9962 21.2124 18.8189 21.2386 18.6325C21.2649 18.4461 21.2455 18.2561 21.1822 18.0788C20.637 16.9119 19.7739 15.9223 18.692 15.2236C17.6101 14.5248 16.3531 14.1451 15.0652 14.1281"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.0652 11.3701C15.5465 11.3701 16.023 11.2754 16.4676 11.0912C16.9122 10.907 17.3161 10.6371 17.6564 10.2968C17.9967 9.95657 18.2666 9.5526 18.4508 9.10801C18.6349 8.66341 18.7297 8.18691 18.7297 7.70568C18.731 7.22366 18.6371 6.74612 18.4535 6.30042C18.2699 5.85473 18.0002 5.44964 17.6598 5.10835C17.3194 4.76706 16.915 4.49628 16.4698 4.31153C16.0246 4.12678 15.5473 4.03168 15.0652 4.03168"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.0251 20.8271C14.3771 20.8263 14.7221 20.7281 15.0218 20.5434C15.3215 20.3587 15.5643 20.0947 15.7233 19.7807C15.8823 19.4666 15.9513 19.1146 15.9228 18.7638C15.8942 18.4129 15.7692 18.0767 15.5615 17.7925C14.8329 16.8246 13.8947 16.0342 12.8171 15.4805C11.7396 14.9269 10.5507 14.6243 9.33953 14.5956C8.1284 14.6243 6.93948 14.9269 5.86193 15.4805C4.78437 16.0342 3.84614 16.8246 3.11758 17.7925C2.90988 18.0767 2.78484 18.4129 2.75629 18.7638C2.72774 19.1146 2.79678 19.4666 2.95579 19.7807C3.11481 20.0947 3.35759 20.3587 3.6573 20.5434C3.957 20.7281 4.30195 20.8263 4.65398 20.8271H14.0251Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.3395 11.4847C10.4413 11.4822 11.4972 11.0427 12.2754 10.2627C13.0536 9.48267 13.4907 8.42583 13.4907 7.324C13.4907 6.22305 13.0533 5.16718 12.2748 4.38869C11.4963 3.6102 10.4405 3.17285 9.3395 3.17285C8.23855 3.17285 7.18269 3.6102 6.4042 4.38869C5.62571 5.16718 5.18835 6.22305 5.18835 7.324C5.18835 8.42583 5.6254 9.48267 6.40362 10.2627C7.18184 11.0427 8.23768 11.4822 9.3395 11.4847Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <Icon icon={pillar.mageIcon} width={30} height={30} />
                  )}
                </div>

                <h3 className="font-display text-xl font-extrabold text-[#3B3B3B] group-hover:text-[#DC143C] transition-colors">
                  {pillar.title}
                </h3>

                {/* Exact Verbatim Copy from florencechoral.com */}
                <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed">
                  {pillar.description}
                </p>

                <ul className="space-y-2 pt-2 border-t border-slate-100">
                  {pillar.highlights.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#3B3B3B]">
                      <Icon icon="mage:check-circle-fill" width={16} height={16} className="text-[#136597] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => onOpenApplication(undefined, 'Brochure Request')}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#DC143C] hover:text-[#B81032] cursor-pointer apple-pressable"
                >
                  <span>Request Full Festival Package</span>
                  <Icon icon="mage:arrow-right" width={16} height={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
