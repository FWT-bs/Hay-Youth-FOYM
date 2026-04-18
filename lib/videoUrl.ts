/** YouTube video id from watch, youtu.be, or embed URLs; null if not YouTube */
export function parseYoutubeId(url: string): string | null {
  try {
    const u = new URL(url.trim());
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      return id || null;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      const v = u.searchParams.get("v");
      if (v) return v;
      const embed = u.pathname.match(/\/embed\/([^/?]+)/);
      if (embed) return embed[1];
      const shorts = u.pathname.match(/\/shorts\/([^/?]+)/);
      if (shorts) return shorts[1];
    }
  } catch {
    return null;
  }
  return null;
}

export function isYoutubeUrl(url: string): boolean {
  return parseYoutubeId(url) !== null;
}

/** True for paths like /videos/a.mp4 or https://.../clip.mp4 */
export function isLikelyDirectVideoFile(url: string): boolean {
  const pathOnly = url.split("?")[0].split("#")[0].toLowerCase();
  return /\.(mp4|webm|ogg)$/.test(pathOnly);
}
