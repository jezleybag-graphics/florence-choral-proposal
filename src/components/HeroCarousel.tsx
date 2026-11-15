import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import type { HeroSlide } from '../types/festival';

interface HeroCarouselProps {
  slides: HeroSlide[];
  onCtaClick: (targetSection: string) => void;
}

// Apple WWDC 2018 rubber-band resistance function
function rubberband(overshoot: number, dimension: number, constant = 0.55): number {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

// Apple WWDC 2018 momentum projection function
function project(initialVelocity: number, decelerationRate = 0.998): number {
  return ((initialVelocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides, onCtaClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const pointerStartX = useRef<number | null>(null);
  const velocitySamples = useRef<{ x: number; t: number }[]>([]);

  useEffect(() => {
    if (isPaused || isDragging || slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, isDragging, slides.length]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button, a')) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    pointerStartX.current = e.clientX;
    velocitySamples.current = [{ x: e.clientX, t: performance.now() }];
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerStartX.current === null) return;
    const rawDelta = e.clientX - pointerStartX.current;
    const width = containerRef.current?.clientWidth || 1000;

    const now = performance.now();
    velocitySamples.current.push({ x: e.clientX, t: now });
    if (velocitySamples.current.length > 5) {
      velocitySamples.current.shift();
    }

    // Apply rubber-banding at first and last slide boundaries
    const atStart = activeIndex === 0 && rawDelta > 0;
    const atEnd = activeIndex === slides.length - 1 && rawDelta < 0;
    const effectiveDelta = atStart || atEnd ? rubberband(rawDelta, width) : rawDelta;

    setDragOffset(effectiveDelta);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    const samples = velocitySamples.current;
    let velocity = 0;
    if (samples.length >= 2) {
      const first = samples[0];
      const last = samples[samples.length - 1];
      const dt = Math.max(1, last.t - first.t);
      velocity = ((last.x - first.x) / dt) * 1000; // px/s
    }

    const projectedDelta = dragOffset + project(velocity, 0.992);
    const threshold = (containerRef.current?.clientWidth || 800) * 0.18;

    if (projectedDelta < -threshold && activeIndex < slides.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else if (projectedDelta > threshold && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }

    setIsDragging(false);
    setDragOffset(0);
    pointerStartX.current = null;
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section
      ref={containerRef}
      aria-label="Florence Choral Featured Highlights"
      className="relative w-full h-[460px] sm:h-[540px] lg:h-[600px] overflow-hidden bg-slate-950 select-none touch-pan-y"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Slides Track with 1:1 Pointer Tracking & Spring Return */}
      <div
        className="flex h-full w-full"
        style={{
          transform: `translate3d(calc(${-activeIndex * 100}% + ${dragOffset}px), 0, 0)`,
          transition: isDragging ? 'none' : 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {slides.map((slide, idx) => {
          const isLcpSlide = idx === 0;
          return (
            <div key={slide.id} className="relative min-w-full h-full overflow-hidden">
              {/* Original Image from florencechoral.com with Modern Web Guidance fetchpriority */}
              <img
                src={slide.imageUrl}
                alt={slide.title}
                width={1280}
                height={400}
                {...(isLcpSlide
                  ? { fetchPriority: 'high' as const }
                  : { fetchPriority: 'low' as const, loading: 'lazy' as const })}
                className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
              />

              {/* Multi-layer Scrim for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-slate-950/20" />

              {/* Content Overlay Matching Original Crimson & Azure Slider Bars */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl space-y-4">
                    {/* Top Crimson Pill Badge (#DC143C) */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full apple-glass-crimson text-white text-xs sm:text-sm apple-caption-vibrant">
                      <Icon icon="mage:sparkles" width={16} height={16} />
                      <span>{slide.badge}</span>
                    </div>

                    {/* Original Hero Heading (e.g. "Where Opera was born") */}
                    <h1 className="apple-display-hero font-extrabold text-white drop-shadow-md">
                      {slide.title}
                    </h1>

                    {/* Original Azure Translucent Subtitle Panel (rgba(19, 101, 151, 0.85)) */}
                    <div className="apple-glass-dark rounded-2xl p-4 sm:p-5 text-white/95 text-sm sm:text-base leading-relaxed max-w-xl">
                      <p>{slide.subtitle}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onCtaClick(slide.targetSection)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#DC143C] hover:bg-[#B81032] text-white font-semibold text-sm sm:text-base shadow-lg cursor-pointer apple-pressable"
                      >
                        <span>{slide.ctaLabel}</span>
                        <Icon icon="mage:arrow-right" width={18} height={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onCtaClick('apply')}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/30 font-semibold text-sm sm:text-base cursor-pointer apple-pressable"
                      >
                        <Icon icon="mage:file-download" width={18} height={18} />
                        <span>Download Brochure & Rules</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Previous / Next Controls */}
      <div className="hidden sm:flex items-center gap-2 absolute right-6 bottom-6 z-20">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous slide"
          className="w-11 h-11 rounded-full bg-black/45 hover:bg-[#DC143C] text-white border border-white/30 backdrop-blur-md flex items-center justify-center cursor-pointer apple-pressable"
        >
          <Icon icon="mage:chevron-left" width={22} height={22} />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className="w-11 h-11 rounded-full bg-black/45 hover:bg-[#DC143C] text-white border border-white/30 backdrop-blur-md flex items-center justify-center cursor-pointer apple-pressable"
        >
          <Icon icon="mage:chevron-right" width={22} height={22} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0 flex items-center gap-2 z-20">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setActiveIndex(idx)}
            aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
            className={`h-2.5 rounded-full transition-all cursor-pointer apple-pressable ${
              idx === activeIndex
                ? 'w-9 bg-[#DC143C] shadow-md'
                : 'w-2.5 bg-white/55 hover:bg-white/90'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
