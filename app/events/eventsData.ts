// Events Data - Easy to add new events!
// Just add a new object to the appropriate category array
//
// Optional gallery: add `additionalPhotos` with public URL paths (files must live under `public/`).
// Example: additionalPhotos: ["/my-event-photos/photo1.jpg", "/my-event-photos/photo2.png"]
// Encode spaces as %20, parentheses as %28 and %29, etc., so next/image resolves correctly.
//
// Optional videos: `additionalVideos` — YouTube watch/share URLs or direct files under `public/`
// (e.g. "/videos/recap.mp4"). Same carousel + lightbox layout as additional photos.

export interface Event {
  id: string; // Unique identifier for the event (used in URL)
  title: string;
  date: string;
  image: string; // Path to the event flier/image
  description: string; // Full description for the event page
  shortDescription?: string; // Optional short description for listings
  /** Program pages (etc.): shown in the hero carousel after `image`; omit from `additionalPhotos` to avoid duplicates */
  programPhotos?: string[];
  /** Public paths (/folder/file.jpg) for the Additional Photos grid on the event page */
  additionalPhotos?: string[];
  /** YouTube URLs or /path/to/video.mp4 under `public/` — Additional Videos section (same UX as photos) */
  additionalVideos?: string[];
}

const lunar2024ProgramPhotos = [
  "/2024lunar/Screenshot%202026-04-12%20104959.png",
  "/2024lunar/Screenshot%202026-04-12%20105014.png",
] as const;

const lunar2024Photos = [
  "/2024lunar/2.jpg",
  "/2024lunar/3.jpg",
  "/2024lunar/4.jpg",
  "/2024lunar/5.jpg",
  "/2024lunar/6.jpg",
  "/2024lunar/7.jpg",
  "/2024lunar/8.jpg",
  "/2024lunar/9.jpg",
  "/2024lunar/LNY%202024.jpg",
  "/2024lunar/door.jpg",
  "/2024lunar/food.jpg",
  "/2024lunar/group%20photo.jpg",
] as const;

// Deduped byte-for-byte duplicates removed vs older filenames; program shots live in hero carousel only
const lunar2025Photos = [
  "/2025lunar/2025%20host.jpg",
  "/2025lunar/performance.jpeg",
  "/2025lunar/chang.jpg",
  "/2025lunar/flyer.png",
  "/2025lunar/2025%20lunar%20new%20year%20photo%20combined.jpg",
  "/2025lunar/2025%20-6.jpg",
  "/2025lunar/2025%20concert%20check%20in.jpg",
  "/2025lunar/deco.jpeg",
  "/2025lunar/2025%20concert%20food.jpg",
  "/2025lunar/2025%20concert.jpg",
  "/2025lunar/2025%20lunar%20new%20year%20group%20%281%29.jpeg",
  "/2025lunar/church.jpg",
] as const;

const lunar2025ProgramPhotos = ["/2025lunar/program%201.jpg", "/2025lunar/program%202.jpg"] as const;

const lunar2026HeroScreenshots = [
  "/2026lunar/Screenshot%202026-04-20%20182224.png",
  "/2026lunar/Screenshot%202026-04-20%20182234.png",
  "/2026lunar/Screenshot%202026-04-20%20182247.png",
] as const;

/** All photos in `public/2026lunar/2026 Lunar New Year/` (hero screenshots excluded — they live at folder root) */
const lunar2026AdditionalPhotos = [
  "/2026lunar/2026%20Lunar%20New%20Year/DZ8_6098.jpg",
  "/2026lunar/2026%20Lunar%20New%20Year/DZ8_6185.jpg",
  "/2026lunar/2026%20Lunar%20New%20Year/DZ8_6262.jpg",
  "/2026lunar/2026%20Lunar%20New%20Year/DZ8_6276.jpg",
  "/2026lunar/2026%20Lunar%20New%20Year/DZ8_6281.jpg",
  "/2026lunar/2026%20Lunar%20New%20Year/DZ8_6344.jpg",
  "/2026lunar/2026%20Lunar%20New%20Year/DZ8_6399.jpg",
  "/2026lunar/2026%20Lunar%20New%20Year/DZ8_6409.jpg",
  "/2026lunar/2026%20Lunar%20New%20Year/DZ8_6430.jpg",
  "/2026lunar/2026%20Lunar%20New%20Year/Image_20260419162645_37_1.jpg",
  "/2026lunar/2026%20Lunar%20New%20Year/Image_20260419162653_38_1.jpg",
  "/2026lunar/2026%20Lunar%20New%20Year/Image_20260419162703_40_1.jpg",
  "/2026lunar/2026%20Lunar%20New%20Year/Image_20260419162710_41_1.jpg",
  "/2026lunar/2026%20Lunar%20New%20Year/Image_20260419162722_42_1.jpg",
  "/2026lunar/2026%20Lunar%20New%20Year/Image_20260419162728_43_1.jpg",
  "/2026lunar/2026%20Lunar%20New%20Year/Image_20260419163103_50_1.jpg",
] as const;

const mothersDay2024CarouselPhotos = [
  "/mothersday/Screenshot%202026-04-18%20113803.png",
  "/mothersday/Screenshot%202026-04-18%20113812.png",
] as const;

const mothersDay2024AdditionalPhotos = [
  "/mothersday2024/photo-1.jpg",
  "/mothersday2024/photo-2.jpg",
  "/mothersday2024/photo-3.jpg",
  "/mothersday2024/photo-4.jpg",
  "/mothersday2024/photo-5.jpg",
  "/mothersday2024/photo-6.jpg",
  "/mothersday2024/photo-7.jpg",
] as const;

// Lunar New Year Youth Concert Events — newest first (left in the grid) when you append new years
export const lunarNewYearEvents: Event[] = [
  {
    id: "lunar-new-year-2026",
    title: "2026 Youth Music and Tradition Night",
    date: "January 31, 2026",
    image: lunar2026HeroScreenshots[0],
    programPhotos: [lunar2026HeroScreenshots[1], lunar2026HeroScreenshots[2]],
    additionalPhotos: [...lunar2026AdditionalPhotos],
    description: `2026 Youth Music and Tradition Night

The "2026 Youth Music and Tradition Night," hosted by HAY Youth, was a joyful celebration welcoming the Lunar New Year with music, cultural presentations, and community spirit.

The evening featured wonderful performances by talented young members of the community, whose music filled the space with a rich festive atmosphere. 🎆🎆 From classical pieces to traditional Chinese music and cultural presentations, the program brought cherished memories of the Lunar New Year and created a sense of warmth and familiarity for the community.

For many living far from their homeland, the event fostered a meaningful sense of connection. ❤️❤️

Following the performances, the celebration continued with a lively potluck gathering. Community members shared a variety of traditional foods and exchanged festive greetings, further strengthening the sense of togetherness.

The event also offered engaging cultural activities, including Chinese calligraphy and photo opportunities with a traditional-themed backdrop. A youth-organized fundraising table was also hosted by HAY Youth.

We extend our sincere thanks to all the youth volunteers whose dedication and hard work made this event possible. Their efforts in planning, organizing, and contributing brought the celebration to life and made it truly memorable for everyone involved.`,
  },
  {
    id: "lunar-new-year-2025",
    title: "2025 HAY Youth New Year Concert",
    date: "January 25, 2025",
    image: "/lunar2.png",
    programPhotos: [...lunar2025ProgramPhotos],
    additionalPhotos: [...lunar2025Photos],
    description: `In the Year of the Snake, 2025, HAY Youth presented its annual Lunar New Year's Youth Concert—an event that celebrated both the musical talent of young performers and the dedication of youth volunteers who made the evening possible.

The concert brought together young musicians from diverse cultural backgrounds, each delivering thoughtfully prepared performances. From the dynamic energy of the piano and the graceful melodies of the violin to the bright tones of the flute and the distinctive sound of the Hulusi, every instrument added its own unique color. Together, these performances showcased not only technical skill, but also deep musical expression.

Music is more than an art form—it is a bridge that connects people and strengthens community bonds. This concert served as a meaningful platform for cultural exchange and shared appreciation.

Youth volunteers worked diligently to ensure the event's success. From early planning to on-site coordination, audience guidance, and maintaining operations, the concert relied on strong teamwork and effective communication.

More than just a performance, this event was an enriching experience of growth. Performers and volunteers gained valuable lessons in teamwork, communication, and responsibility—making the 2025 New Year's Concert a truly memorable milestone for everyone involved.`,
  },
  {
    id: "lunar-new-year-2024",
    title: "Spring Festival Melodies: A Youth Music Concert",
    date: "February 3, 2024",
    image: "/lunar1.png",
    programPhotos: [...lunar2024ProgramPhotos],
    additionalPhotos: [...lunar2024Photos],
    description: `HAY Youth presented "Spring Festival Melodies," a Lunar New Year youth concert celebrating the arrival of the new year. The event brought the community together to enjoy live music, traditional food, and a vibrant cultural atmosphere.

Lunar New Year is an important tradition across many Asian countries. For families in our community, it is a meaningful time of celebration. HAY Youth organized this concert to help new immigrants feel at home and connect with others who share their cultural heritage, while also showcasing traditional music to the wider community.

The event featured a variety of activities, including:
Traditional decorations: Creating a festive setting.
Cultural activities: Balloon making and traditional writing.
Fundraising Table: Supporting future HAY Youth initiatives.
Youth Jewelry Sale: Talented young artists selling their creations, with proceeds benefiting HAY Fund sales.
Shared traditional foods: Enhanced the celebration.
Involvement from youth volunteers, demonstrating leadership and dedication.
Traditional gifts presented to performers in appreciation of their contributions.

The concert was a great success, featuring 26 performances and welcoming over 100 attendees. It was a memorable celebration for all. We sincerely thank Light Learning Academy and other supporting organizations for their invaluable support.`,
  },
];

// Family Ties in Harmony Events
export const familyTiesEvents: Event[] = [
  {
    id: "mothers-day-concert-2024",
    title: "Mother's Day Concert - Love in the Heart",
    date: "May 12, 2024",
    image: "/family1.png",
    programPhotos: [...mothersDay2024CarouselPhotos],
    additionalPhotos: [...mothersDay2024AdditionalPhotos],
    description: `On May 12, 2024, Mother's Day, a day filled with gratitude and love, HAY Youth presented "Love in the Heart, a special Mother's Day concert". We invited young performers to use music as a bridge to express their heartfelt appreciation and love for their mothers.

This event was more than a concert—it was a meaningful moment of connection and gratitude. On stage, the youth shared their emotions through music, conveying deep love and thankfulness; off stage, every mother felt immense pride and joy in witnessing their children's growth and dedication. At the conclusion of the event, each performer presented a bouquet of flowers to their mother, allowing warmth and happiness to flow quietly in that unforgettable moment. Love in the Heart was not merely a musical performance, but a touching expression of gratitude and respect for maternal love, shared through the voices and hearts of the next generation.`,
  },
  {
    id: "fathers-day-concert-2025",
    title: "A Melody & a Gift for Dad - Father's Day Concert",
    date: "June 22, 2025",
    image: "/family2.png",
    description: "This poster promotes a Father's Day–themed concert hosted by the Harmony Association for Youth (HAY). The event highlights fatherly love through music, presenting performances by youth as a musical gift for dads.\n\nThe concert is scheduled from 3:00–5:00 PM, with all youth performers participating. A suggested fee of $5 is listed. The location is 1717 Bothell Way NE, Lake Forest Park, WA 98155. The imagery and wording emphasize appreciation, family bonds, and honoring fathers through music.",
  },
];

// Youth Melody for Seniors Events
export const youthMelodyEvents: Event[] = [
  // Add events here following the same format
];
