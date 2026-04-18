"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import EventGalleryCarousel, { PAGE_SIZE } from "./EventGalleryCarousel";
import {
  isLikelyDirectVideoFile,
  isYoutubeUrl,
  parseYoutubeId,
} from "@/lib/videoUrl";

type EventAdditionalVideosProps = {
  videos: string[];
  heading?: string;
};

function VideoThumbnailCell({
  url,
  index,
  total,
  onOpen,
}: {
  url: string;
  index: number;
  total: number;
  onOpen: () => void;
}) {
  const yt = parseYoutubeId(url);

  if (yt) {
    const thumb = `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`;
    return (
      <button
        type="button"
        onClick={onOpen}
        className="group relative aspect-[3/4] w-full max-w-[280px] rounded-xl bg-blue-950/5 ring-1 ring-blue-950/10 transition-shadow hover:ring-2 hover:ring-blue-950/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-950 focus-visible:ring-offset-2"
        aria-label={`Open video ${index + 1} of ${total}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- external YouTube CDN */}
        <img
          src={thumb}
          alt=""
          className="absolute inset-0 h-full w-full object-cover rounded-lg"
        />
        <span className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/25 transition group-hover:bg-black/35">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-blue-950 shadow-md ring-1 ring-blue-950/20">
            <Play className="h-6 w-6 fill-current pl-0.5" aria-hidden />
          </span>
        </span>
      </button>
    );
  }

  if (isLikelyDirectVideoFile(url)) {
    return (
      <button
        type="button"
        onClick={onOpen}
        className="group relative aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-xl bg-blue-950/5 ring-1 ring-blue-950/10 transition-shadow hover:ring-2 hover:ring-blue-950/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-950 focus-visible:ring-offset-2"
        aria-label={`Open video ${index + 1} of ${total}`}
      >
        <video
          src={url}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="metadata"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition group-hover:bg-black/30">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-blue-950 shadow-md ring-1 ring-blue-950/20">
            <Play className="h-6 w-6 fill-current pl-0.5" aria-hidden />
          </span>
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex aspect-[3/4] w-full max-w-[280px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl bg-blue-50/80 p-4 text-center text-sm font-medium text-blue-950 ring-1 ring-blue-950/10 transition hover:ring-2 hover:ring-blue-950/25"
      aria-label={`Open video ${index + 1} of ${total}`}
    >
      <Play className="h-10 w-10 text-blue-950/80" fill="currentColor" aria-hidden />
      <span
        className={
          isYoutubeUrl(url) ? "line-clamp-2 break-all text-xs text-blue-900/70" : "line-clamp-3 break-all text-xs text-blue-900/70"
        }
      >
        {url}
      </span>
    </button>
  );
}

function VideoModalContent({
  url,
  index,
  total,
}: {
  url: string;
  index: number;
  total: number;
}) {
  const yt = parseYoutubeId(url);

  if (yt) {
    return (
      <div className="relative mt-10 aspect-video w-[min(96vw,1200px)] max-w-full sm:mt-0">
        <iframe
          title={`Video ${index + 1} of ${total}`}
          src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0`}
          className="absolute inset-0 h-full w-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (isLikelyDirectVideoFile(url)) {
    return (
      <div className="relative mt-10 w-[min(96vw,1200px)] max-w-full sm:mt-0">
        <video
          src={url}
          controls
          playsInline
          className="max-h-[min(88vh,1200px)] w-full rounded-lg"
          autoPlay
        >
          <track kind="captions" />
        </video>
      </div>
    );
  }

  return (
    <div className="mt-10 max-w-lg rounded-lg bg-white/10 p-6 text-center text-white sm:mt-0">
      <p className="text-sm text-white/80">
        Unsupported or unrecognized video URL. Add a YouTube link or a direct file to{" "}
        <code className="rounded bg-white/10 px-1">.mp4</code>, <code className="rounded bg-white/10 px-1">.webm</code>
        , or <code className="rounded bg-white/10 px-1">.ogg</code>.
      </p>
      <p className="mt-4 break-all text-xs text-white/60">{url}</p>
    </div>
  );
}

export default function EventAdditionalVideos({
  videos,
  heading = "Additional Videos",
}: EventAdditionalVideosProps) {
  const [page, setPage] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const pageCount = Math.ceil(videos.length / PAGE_SIZE);

  useEffect(() => {
    setPage((p) => Math.min(p, Math.max(0, pageCount - 1)));
  }, [videos.length, pageCount]);

  const close = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      return (i - 1 + videos.length) % videos.length;
    });
  }, [videos.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      return (i + 1) % videos.length;
    });
  }, [videos.length]);

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

  if (videos.length === 0) {
    return null;
  }

  const open = lightboxIndex !== null;
  const activeUrl = lightboxIndex !== null ? videos[lightboxIndex] : null;

  const start = page * PAGE_SIZE;
  const slice = videos.slice(start, start + PAGE_SIZE);
  const pageLabel = `${page + 1} / ${pageCount}`;

  return (
    <section className="mt-12 pt-10 border-t border-blue-950/10">
      <h2 className="text-3xl font-semibold text-blue-950 text-left mb-6">
        {heading}
      </h2>
      <EventGalleryCarousel
        page={page}
        pageCount={pageCount}
        onPrevPage={() => setPage((p) => Math.max(0, p - 1))}
        onNextPage={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
        pageLabel={pageLabel}
      >
        <ul className="grid list-none grid-cols-4 gap-2 p-0 sm:gap-4">
          {slice.map((url, localIdx) => {
            const globalIdx = start + localIdx;
            return (
              <li key={`${url}-${globalIdx}`} className="flex min-w-0 justify-center">
                <VideoThumbnailCell
                  url={url}
                  index={globalIdx}
                  total={videos.length}
                  onOpen={() => setLightboxIndex(globalIdx)}
                />
              </li>
            );
          })}
        </ul>
      </EventGalleryCarousel>

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
              Video {lightboxIndex !== null ? lightboxIndex + 1 : 0} of {videos.length}
            </DialogTitle>

            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-3 z-[110] rounded-full bg-white/10 p-2.5 text-white ring-1 ring-white/30 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-5 sm:top-5"
              aria-label="Close video"
            >
              <X className="h-6 w-6" aria-hidden />
            </button>

            {videos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-1 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white ring-1 ring-white/30 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-4"
                  aria-label="Previous video"
                >
                  <ChevronLeft className="h-8 w-8" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-1 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white ring-1 ring-white/30 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4"
                  aria-label="Next video"
                >
                  <ChevronRight className="h-8 w-8" aria-hidden />
                </button>
              </>
            )}

            {activeUrl !== null && (
              <VideoModalContent
                url={activeUrl}
                index={lightboxIndex!}
                total={videos.length}
              />
            )}

            {videos.length > 1 && lightboxIndex !== null && (
              <p className="mt-4 text-sm text-white/80">
                {lightboxIndex + 1} / {videos.length}
              </p>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </section>
  );
}
