import { useState, useEffect, useCallback, useRef } from "react";

interface Slide {
  img: string;
  badge: string;
  subtitle: string;
  tag: string;
  accent: string;
}

const SLIDES: Slide[] = [
  {
    img: "/hero-event.png",
    badge: "🎵",
    subtitle: "Jakarta Music Festival 2026",
    tag: "Musik",
    accent: "#6C5CE7",
  },
  {
    img: "/hero-business.png",
    badge: "💼",
    subtitle: "Indonesia Business Summit",
    tag: "Bisnis",
    accent: "#FDCB6E",
  },
  {
    img: "/cat-tech.png",
    badge: "💻",
    subtitle: "Tech Innovation Conference",
    tag: "Teknologi",
    accent: "#667EEA",
  },
  {
    img: "/cat-music.png",
    badge: "🎤",
    subtitle: "Neon Lights Concert Series",
    tag: "Konser",
    accent: "#FD79A8",
  },
  {
    img: "/cat-sports.png",
    badge: "🏃",
    subtitle: "Bandung City Marathon 2026",
    tag: "Olahraga",
    accent: "#00B894",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const autoPlayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent((index + SLIDES.length) % SLIDES.length);
      setTimeout(() => setIsAnimating(false), 450);
    },
    [isAnimating]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    autoPlayRef.current = setTimeout(next, 5000);
    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    };
  }, [current, next]);

  const handleDragStart = (x: number) => {
    if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    setDragStart(x);
    setDragOffset(0);
  };
  const handleDragMove = (x: number) => {
    if (dragStart === null) return;
    setDragOffset(x - dragStart);
  };
  const handleDragEnd = () => {
    if (dragOffset > 60) prev();
    else if (dragOffset < -60) next();
    setDragStart(null);
    setDragOffset(0);
  };

  const slide = SLIDES[current];

  return (
    <div
      className="relative w-full select-none overflow-hidden"
      style={{ userSelect: "none" }}
    >
      {/* ── Banner Image ─────────────────────────── */}
      <div
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
        style={{
          borderRadius: 24,
          height: 380,
          touchAction: "pan-y",
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
        }}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        {/* Slide image with fade */}
        <img
          key={current}
          src={slide.img}
          alt={slide.subtitle}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            animation: "carouselFadeIn 0.45s ease-out",
            pointerEvents: "none",
          }}
        />

        {/* Subtle bottom gradient just for dots readability */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "30%",
            background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Dot indicators — inside the image at the bottom center */}
        <div
          className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5"
          style={{ zIndex: 5 }}
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goTo(i); }}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === current ? 28 : 8,
                height: 8,
                borderRadius: 100,
                background: i === current ? "#fff" : "rgba(255,255,255,0.45)",
                border: "none",
                transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                padding: 0,
                cursor: "pointer",
              }}
            />
          ))}
        </div>

      {/* Arrow LEFT — floating on the edge */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        aria-label="Previous"
        className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center transition-all hover:scale-105 active:scale-95 z-20"
        style={{
          left: -20,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          color: "#1A1D2E",
          border: "1px solid var(--border)",
          cursor: "pointer",
          fontSize: 22,
          fontWeight: 900,
          lineHeight: 1,
        }}
      >
        ‹
      </button>

      {/* Arrow RIGHT — floating on the edge */}
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        aria-label="Next"
        className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center transition-all hover:scale-105 active:scale-95 z-20"
        style={{
          right: -20,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          color: "#1A1D2E",
          border: "1px solid var(--border)",
          cursor: "pointer",
          fontSize: 22,
          fontWeight: 900,
          lineHeight: 1,
        }}
      >
        ›
      </button>
      </div>
    </div>
  );
}
