"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 4;

export { PAGE_SIZE };

type EventGalleryCarouselProps = {
  page: number;
  pageCount: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  /** Shown between arrows, e.g. "1 / 3" for pages */
  pageLabel: string;
  children: React.ReactNode;
};

/**
 * One “page” of up to four items; left/right moves between pages of the grid.
 */
export default function EventGalleryCarousel({
  page,
  pageCount,
  onPrevPage,
  onNextPage,
  pageLabel,
  children,
}: EventGalleryCarouselProps) {
  const showNav = pageCount > 1;

  return (
    <div className="relative">
      <div
        className={
          showNav
            ? "flex flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-3"
            : ""
        }
      >
        {showNav && (
          <button
            type="button"
            onClick={onPrevPage}
            disabled={page <= 0}
            className="hidden shrink-0 self-center rounded-full bg-blue-50/90 p-2.5 text-blue-950 shadow-sm ring-1 ring-blue-950/15 transition hover:bg-white disabled:pointer-events-none disabled:opacity-35 sm:flex sm:h-11 sm:w-11 sm:items-center sm:justify-center"
            aria-label="Previous page of items"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden />
          </button>
        )}

        <div className="min-w-0 flex-1">{children}</div>

        {showNav && (
          <button
            type="button"
            onClick={onNextPage}
            disabled={page >= pageCount - 1}
            className="hidden shrink-0 self-center rounded-full bg-blue-50/90 p-2.5 text-blue-950 shadow-sm ring-1 ring-blue-950/15 transition hover:bg-white disabled:pointer-events-none disabled:opacity-35 sm:flex sm:h-11 sm:w-11 sm:items-center sm:justify-center"
            aria-label="Next page of items"
          >
            <ChevronRight className="h-6 w-6" aria-hidden />
          </button>
        )}
      </div>

      {showNav && (
        <>
          <div className="mt-4 flex items-center justify-center gap-4 sm:hidden">
            <button
              type="button"
              onClick={onPrevPage}
              disabled={page <= 0}
              className="rounded-full bg-blue-50/90 p-2.5 text-blue-950 shadow-sm ring-1 ring-blue-950/15 disabled:opacity-35"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <span className="min-w-[4rem] text-center text-sm font-medium text-blue-950/70">
              {pageLabel}
            </span>
            <button
              type="button"
              onClick={onNextPage}
              disabled={page >= pageCount - 1}
              className="rounded-full bg-blue-50/90 p-2.5 text-blue-950 shadow-sm ring-1 ring-blue-950/15 disabled:opacity-35"
              aria-label="Next page"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          <p className="mt-2 hidden text-center text-sm text-blue-950/60 sm:block">
            {pageLabel}
          </p>
        </>
      )}
    </div>
  );
}
