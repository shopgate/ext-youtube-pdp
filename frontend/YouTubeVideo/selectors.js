import { createSelector } from 'reselect';
import { getCurrentProductId, getProductPropertiesState } from '@shopgate/engage/product';
import { videoProperty } from '../config';

/**
 * Generates a YouTube embed URL from either a full YouTube URL or a raw video ID.
 *
 * Supported input formats:
 * - Raw video ID: "zSEmjzsDpLA"
 * - Raw video ID with query: "zSEmjzsDpLA?autoplay=1"
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://m.youtube.com/watch?v=VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID (returns as-is with param merge)
 *
 * If optional parameters are provided, they will override any query parameters
 * already present in the input.
 *
 * @param {string} input - A YouTube video ID or a full YouTube URL.
 * @param {Object} [params={}] - Optional query parameters to include or override.
 * @returns {string|null} - A properly formatted YouTube embed URL, or null if input is invalid.
 */
function getYouTubeEmbedUrl(input, params = {}) {
  if (!input) return null;

  let videoId = null;
  let existingParams = {};

  try {
    // Try to parse the input as a URL
    const parsed = new URL(input);

    // CASE 1: Input is already an embed URL
    if (
      parsed.hostname.includes('youtube.com') &&
      parsed.pathname.startsWith('/embed/')
    ) {
      const embedUrl = new URL(input);

      // Merge new params into the existing query string, overriding duplicates
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(params)) {
        embedUrl.searchParams.set(key, value);
      }

      return embedUrl.toString();
    }

    if (parsed.hostname === 'youtu.be') {
      // CASE 2: Short URL format (e.g. https://youtu.be/VIDEO_ID)
      videoId = parsed.pathname.slice(1); // remove leading slash
      existingParams = Object.fromEntries(parsed.searchParams.entries());
    } else if (
      // CASE 3: Standard YouTube watch page (e.g. https://www.youtube.com/watch?v=VIDEO_ID)
      parsed.hostname.includes('youtube.com') &&
      parsed.pathname === '/watch'
    ) {
      videoId = parsed.searchParams.get('v');
      existingParams = Object.fromEntries(parsed.searchParams.entries());
    } else if (
      // CASE 4: Shorts format (e.g. https://www.youtube.com/shorts/VIDEO_ID)
      parsed.hostname.includes('youtube.com') &&
      parsed.pathname.startsWith('/shorts/')
    ) {
      const [, shortId] = parsed.pathname.split('/shorts/');
      videoId = shortId;
      existingParams = Object.fromEntries(parsed.searchParams.entries());
    }

    // Other formats like playlists or channels are ignored
  } catch {
    // CASE 5: Input is not a valid URL — maybe it's a raw video ID with optional query string

    // Try to split on "?" to separate ID from query parameters
    const [rawId, queryString] = input.split('?');

    // Validate that the ID matches the YouTube video ID format
    if (/^[\w-]{11}$/.test(rawId)) {
      videoId = rawId;

      // Parse additional query string parameters if provided
      if (queryString) {
        const queryParams = new URLSearchParams(queryString);
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of queryParams.entries()) {
          existingParams[key] = value;
        }
      }
    } else {
      // Not a valid ID or URL
      return null;
    }
  }

  // If we couldn't determine a video ID, return null
  if (!videoId) return null;

  // Construct the base embed URL
  const embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`);

  // Merge existing parameters and override with explicit ones from `params`
  const finalParams = { ...existingParams, ...params };

  // Apply all final query parameters to the embed URL
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(finalParams)) {
    embedUrl.searchParams.set(key, value);
  }

  return embedUrl.toString();
}
/**
 * Selects the YouTube url from the current product.
 * @param {Object} state The current application state.
 * @return {string|null}
 */
export const getCurrentYoutubeUrl = createSelector(
  getCurrentProductId,
  getProductPropertiesState,
  (productId, properties) => {
    const entry = properties[productId];
    if (!entry || entry.isFetching || !entry.properties) {
      return null;
    }

    const videoProp = entry.properties.find(prop => prop.label === videoProperty) || {};

    return getYouTubeEmbedUrl(videoProp.value, {
      // Enable the js api to allow sending events to the iframe.
      enablejsapi: 1,
      // Enable controls to avoid the iframe not being resumable because of controls=0 param on ios.
      controls: 1,
    });
  }
);
