import { createSelector } from 'reselect';
import { getCurrentProductId, getProductPropertiesState } from '@shopgate/engage/product';
import { videoProperty } from '../config';

/**
 * Selects the youtube url from the current product.
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

    // If we just receive a youtube videos's ID we have to append the embed
    // youtube url before it so that it can be played in the iframe
    if (videoProp.value && !videoProp.value.includes('https://www.youtube.com')) {
      return `https://www.youtube.com/embed/${videoProp.value}`;
    }

    return (videoProp.value || null);
  }
);
