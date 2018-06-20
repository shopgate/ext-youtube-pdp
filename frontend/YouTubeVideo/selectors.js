import { createSelector } from 'reselect';
import { getCurrentProductId, getProductPropertiesState } from '@shopgate/pwa-common-commerce/product/selectors/product';
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

    return (entry.properties[videoProperty] || null);
  }
);

