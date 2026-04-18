"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type EventHeroCarouselProps = {
  title: string;
  /** First slide is usually the listing / poster image */
  slides: string[];
};

export default function EventHeroCarousel({ title, slides }: EventHeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const n = slides.length;

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + n) % n);
  }, [n]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % n);
  }, [n]);

  useEffect(() => {
    if (n <= 1) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [n, goPrev, goNext]);

  if (n === 0) {
    return null;
  }

  const src = slides[index];

  return (
    <div className="relative w-full max-w-md mx-auto lg:mx-0">
      <div className="relative w-full aspect-[3/4] rounded-xl shadow-lg overflow-hidden bg-blue-950/5 ring-1 ring-blue-950/10">
        <Image
          src={src}
          alt={`${title} — image ${index + 1} of ${n}`}
          fill
          className="object-contain object-center"
          sizes="(max-width: 1024px) 100vw, 28rem"
          priority={index === 0}
        />
      </div>

      {n > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-blue-950 shadow-md ring-1 ring-blue-950/15 transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-950"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-blue-950 shadow-md ring-1 ring-blue-950/15 transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-950"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" aria-hidden />
          </button>
          <p className="mt-3 text-center text-sm font-medium text-blue-950/70">
            {index + 1} / {n}
          </p>
        </>
      )}
    </div>
  );
}
