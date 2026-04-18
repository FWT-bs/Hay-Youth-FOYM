"use client";

import { use } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "@/components/sections/nav";
import Footer from "@/components/sections/footer";
import { lunarNewYearEvents, familyTiesEvents, youthMelodyEvents, type Event } from "../../eventsData";
import EventAdditionalPhotos from "@/components/events/EventAdditionalPhotos";
import EventAdditionalVideos from "@/components/events/EventAdditionalVideos";
import EventHeroCarousel from "@/components/events/EventHeroCarousel";

// Combine all events
const allEvents = [...lunarNewYearEvents, ...familyTiesEvents, ...youthMelodyEvents];

function galleryImagesForEvent(event: Event): string[] | undefined {
  if (!event.additionalPhotos?.length) return undefined;
  const skip = new Set(event.programPhotos ?? []);
  const filtered = event.additionalPhotos.filter((src) => !skip.has(src));
  return filtered.length > 0 ? filtered : undefined;
}

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const event = allEvents.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  const gallery = galleryImagesForEvent(event);

  return (
    <div className="font-sans flex-col flex w-screen relative scroll-smooth overflow-x-hidden">
      <Nav />
      <div className="relative bg-[url('/backgroundBlue.png')] bg-cover bg-center min-h-screen">
        <div className="pt-32 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <a
              href="/events"
              className="inline-flex items-center gap-2 text-blue-950 hover:text-blue-800 mb-8 transition-colors font-semibold"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Youth Concert Programs
            </a>

            {/* Event Content */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-white/20 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: poster + program carousel */}
                <div className="flex items-start justify-center lg:justify-start">
                  {event.programPhotos && event.programPhotos.length > 0 ? (
                    <EventHeroCarousel
                      title={event.title}
                      slides={[event.image, ...event.programPhotos]}
                    />
                  ) : (
                    <div className="relative w-full max-w-md">
                      <Image
                        src={event.image}
                        alt={event.title}
                        width={600}
                        height={800}
                        className="w-full h-auto rounded-xl shadow-lg"
                        priority
                      />
                    </div>
                  )}
                </div>

                {/* Right: Event Details */}
                <div className="flex flex-col justify-start">
                  <h1 className="text-3xl sm:text-4xl font-semibold text-blue-950 mb-4">
                    {event.title}
                  </h1>
                  
                  <div className="mb-6">
                    <p className="text-xl font-semibold text-blue-950">
                      Date: <span className="font-normal text-blue-900/80">{event.date}</span>
                    </p>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    {event.description.split('\n\n').map((paragraph, idx) => (
                      <p
                        key={idx}
                        className="text-base text-blue-900/80 leading-relaxed mb-4 whitespace-pre-line"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {gallery && <EventAdditionalPhotos images={gallery} />}
              {event.additionalVideos && event.additionalVideos.length > 0 && (
                <EventAdditionalVideos videos={event.additionalVideos} />
              )}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute left-0 top-0 -z-10 opacity-20">
          <Image
            src="/leftStackBlue.png"
            alt=""
            width={150}
            height={300}
            className="opacity-30"
            aria-hidden="true"
          />
        </div>
        <div className="absolute right-0 bottom-0 -z-10 opacity-20">
          <Image
            src="/leftStack.png"
            alt=""
            width={150}
            height={300}
            className="opacity-30 transform scale-x-[-1]"
            aria-hidden="true"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}


