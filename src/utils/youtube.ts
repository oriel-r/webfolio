export type MediaItem =
  | { type: 'image'; src: string }
  | { type: 'youtube'; id: string };

const YT_PATTERNS: RegExp[] = [
  /youtube\.com\/watch\?v=([\w-]{6,})/,
  /youtu\.be\/([\w-]{6,})/,
  /youtube\.com\/embed\/([\w-]{6,})/,
  /youtube\.com\/shorts\/([\w-]{6,})/,
  /youtube\.com\/v\/([\w-]{6,})/,
  /m\.youtube\.com\/watch\?v=([\w-]{6,})/,
];

export function parseYouTubeId(value: string): string {
  const trimmed = value.trim();
  if (/^[\w-]{6,}$/.test(trimmed)) return trimmed;
  for (const pattern of YT_PATTERNS) {
    const match = trimmed.match(pattern);
    if (match) return match[1];
  }
  return trimmed;
}

export function youTubeFacadeImg(id: string): string {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}

export function youTubeFacadeFallbackImg(id: string): string {
  return `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
}

export function youTubeEmbedUrl(id: string): string {
  return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
}

export function getMediaThumbnails(items: MediaItem[] | undefined): string | null {
  if (!items || items.length === 0) return null;
  const image = items.find((m) => m.type === 'image');
  if (image) return image.src;
  const yt = items.find((m) => m.type === 'youtube');
  if (yt) return youTubeFacadeFallbackImg(yt.id);
  return null;
}