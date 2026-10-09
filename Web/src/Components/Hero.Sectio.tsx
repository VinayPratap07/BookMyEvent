import { useState, useEffect, useCallback } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiMapPin,
  FiArrowRight,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

export interface CarouselSlide {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  date: string;
  venue: string;
  imageUrl: string;
  ctaText: string;
  ctaLink?: string;
}

const DEFAULT_SLIDES: CarouselSlide[] = [
  {
    id: 1,
    tag: "Live Concert",
    title: "Acoustic Sunsets World Tour",
    subtitle:
      "Experience an unforgettable evening of live vocals and orchestral harmony under the stars.",
    date: "Sat, Nov 14 • 7:00 PM",
    venue: "Grand Open Air Arena",
    imageUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Book Tickets",
  },
  {
    id: 2,
    tag: "Comedy Special",
    title: "Laugh Out Loud: Stand-up Gala",
    subtitle:
      "A stellar lineup featuring the sharpest comic minds touring nationwide this season.",
    date: "Sun, Nov 22 • 8:30 PM",
    venue: "Civic Cultural Center",
    imageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Reserve Seats",
  },
  {
    id: 3,
    tag: "Theatre & Arts",
    title: "Echoes of Broadway: The Musical",
    subtitle:
      "Critically acclaimed choreography, award-winning performers, and a timeless narrative.",
    date: "Fri, Dec 04 • 6:00 PM",
    venue: "Starlight Opera House",
    imageUrl:
      "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Get Passes",
  },
];

function HeroSection() {
  const slides = DEFAULT_SLIDES;
  const autoPlayInterval = 5000;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Handle auto-rotation
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, autoPlayInterval, nextSlide, slides.length]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/60 via-white to-white py-6 md:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner Carousel Card */}
        <div
          className="group relative h-[420px] w-full overflow-hidden rounded-2xl border border-sky-100 shadow-md sm:h-[480px] lg:h-[520px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slides Stack */}
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;

            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive
                    ? "z-10 opacity-100"
                    : "z-0 pointer-events-none opacity-0"
                }`}
              >
                {/* Background Image */}
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="h-full w-full object-cover object-center"
                />

                {/* Soft Gradient Overlay: Light wash on left, clear on right */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-transparent sm:from-slate-950/80 sm:via-slate-900/40" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:justify-center md:max-w-2xl lg:p-14">
                  {/* Category Pill */}
                  <div className="mb-3 inline-flex items-center gap-1.5 self-start rounded-full border border-sky-300/40 bg-sky-500/20 px-3 py-1 text-xs font-semibold tracking-wide text-sky-200 backdrop-blur-md">
                    <HiSparkles className="h-3.5 w-3.5 text-sky-300" />
                    <span>{slide.tag}</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="mt-2 line-clamp-2 text-sm text-slate-200 sm:mt-3 sm:text-base">
                    {slide.subtitle}
                  </p>

                  {/* Meta details: Date & Venue */}
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300 sm:text-sm">
                    <div className="flex items-center gap-1.5">
                      <FiCalendar className="h-4 w-4 text-sky-400" />
                      <span>{slide.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FiMapPin className="h-4 w-4 text-sky-400" />
                      <span>{slide.venue}</span>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="mt-6 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onSlideCtaClick?.(slide)}
                      className="inline-flex items-center gap-2 rounded-lg bg-sky-400 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300 active:bg-sky-600"
                    >
                      <span>{slide.ctaText}</span>
                      <FiArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Navigation Controls: Previous / Next Buttons */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-white/30 p-2.5 text-white backdrop-blur-md transition hover:bg-white hover:text-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300 md:left-5"
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-white/30 p-2.5 text-white backdrop-blur-md transition hover:bg-white hover:text-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300 md:right-5"
          >
            <FiChevronRight className="h-5 w-5" />
          </button>

          {/* Bottom Dot Indicators */}
          <div className="absolute bottom-4 right-6 z-20 flex items-center gap-2 sm:bottom-6 sm:right-10">
            {slides.map((slide, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-7 bg-sky-400 shadow-sm"
                      : "w-2 bg-white/60 hover:bg-white"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
