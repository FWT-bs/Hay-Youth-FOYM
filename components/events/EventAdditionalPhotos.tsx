"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type EventAdditionalPhotosProps = {
  images: string[];
  heading?: string;
};

export default function EventAdditionalPhotos({
  images,
  heading = "Additional Photos",
}: EventAdditionalPhotosProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      return (i - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      return (i + 1) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
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
  }, [lightboxIndex, goPrev, goNext]);

  if (images.length === 0) {
    return null;
  }

  const open = lightboxIndex !== null;
  const activeSrc = lightboxIndex !== null ? images[lightboxIndex] : null;

  return (
    <section className="mt-12 pt-10 border-t border-blue-950/10">
      <h2 className="text-3xl font-semibold text-blue-950 text-left mb-6">
        {heading}
      </h2>
      <ul className="grid list-none grid-cols-2 gap-3 p-0 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
        {images.map((src, i) => (
          <li key={`${src}-${i}`} className="flex justify-center">
            <button
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group relative h-[min(220px,42vw)] w-full max-w-[280px] cursor-zoom-in rounded-xl bg-blue-50/80 ring-1 ring-blue-950/10 transition-shadow hover:ring-2 hover:ring-blue-950/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-950 focus-visible:ring-offset-2"
              aria-label={`View photo ${i + 1} of ${images.length} full size`}
            >
              <Image
                src={src}
                alt=""
                fill
                quality={90}
                className="object-contain object-center p-1.5 rounded-lg pointer-events-none"
                sizes="(max-width: 768px) 45vw, (max-width: 1280px) 30vw, 280px"
                priority={i < 4}
              />
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={open} onClose={close} className="relative z-[100]">
        <DialogBackdrop
          transition
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 z-[101] overflow-y-auto overflow-x-hidden">
          <DialogPanel
            transition
            className="flex min-h-full flex-col items-center justify-center p-3 sm:p-6 outline-none data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <DialogTitle className="sr-only">
              Photo {lightboxIndex !== null ? lightboxIndex + 1 : 0} of{" "}
              {images.length} — full size
            </DialogTitle>

            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-3 z-[110] rounded-full bg-white/10 p-2.5 text-white ring-1 ring-white/30 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-5 sm:top-5"
              aria-label="Close full screen photo"
            >
              <X className="h-6 w-6" aria-hidden />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-1 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white ring-1 ring-white/30 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-4"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-8 w-8" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-1 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white ring-1 ring-white/30 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-8 w-8" aria-hidden />
                </button>
              </>
            )}

            {activeSrc !== null && (
              <div className="relative mt-10 h-[min(88vh,1200px)] w-[min(96vw,1600px)] max-w-full sm:mt-0">
                <Image
                  src={activeSrc}
                  alt={`Event photo ${lightboxIndex! + 1} of ${images.length}, full size`}
                  fill
                  quality={95}
                  priority
                  className="object-contain object-center"
                  sizes="96vw"
                />
              </div>
            )}

            {images.length > 1 && lightboxIndex !== null && (
              <p className="mt-4 text-sm text-white/80">
                {lightboxIndex + 1} / {images.length}
              </p>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </section>
  );
}
