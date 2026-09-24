import type { ImageMetadata } from 'astro';

/**
 * Pre-import all project cover images from src/assets/projects/.
 * import.meta.glob with `eager: true` makes them available at build time
 * for Astro's <Image /> component (sharp pipeline: WebP/AVIF, srcset, quality).
 */
const projectImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/projects/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
);

/**
 * Pre-import all profile images from src/assets/profile/.
 */
const profileImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/profile/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
);

/**
 * Resolve a project cover image path (e.g. "/leads_insights_generator_cover.png")
 * to its ImageMetadata for use with Astro's <Image /> component.
 *
 * Falls back to the raw path string if the image can't be found in src/assets.
 */
export function resolveProjectImage(src: string): ImageMetadata | string {
  // Normalize: strip leading slash, extract filename
  const filename = src.replace(/^\//, '');
  const key = `/src/assets/projects/${filename}`;

  if (key in projectImages) {
    return projectImages[key].default;
  }

  // Fallback: return as-is (for remote URLs or images that weren't migrated)
  return src;
}

/**
 * Resolve a profile image path to ImageMetadata.
 */
export function resolveProfileImage(src: string): ImageMetadata | string {
  const filename = src.replace(/^\//, '');
  const key = `/src/assets/profile/${filename}`;

  if (key in profileImages) {
    return profileImages[key].default;
  }

  return src;
}

/**
 * Type guard to check if a value is ImageMetadata (from Astro import).
 */
export function isImageMetadata(value: unknown): value is ImageMetadata {
  return typeof value === 'object' && value !== null && 'src' in value && 'width' in value && 'height' in value;
}
