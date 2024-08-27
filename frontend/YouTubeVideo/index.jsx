import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withCurrentProduct, embeddedMedia } from '@shopgate/engage/core';
import connect from './connector';
import styles from './style';
import { portalName, headlineText } from '../config';
import ConsentMessage from './ConsentMessage';

/**
 * The YouTubeVideo component.
 * @param {Object} props Component props
 * @returns {JSX.Element}
 */
const YouTubeVideo = ({
  name,
  url,
  comfortCookiesAccepted,
}) => {
  const containerRef = useRef();

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    // Linter proposal when refs are referenced in useEffect cleanup functions
    const refCopy = containerRef.current;

    embeddedMedia.add(refCopy);

    return () => {
      embeddedMedia.remove(refCopy);
    };
  }, []);

  if (!url) {
    return null;
  }

  if (name !== portalName) {
    return null;
  }

  return (
    <div>
      { headlineText ? <h1 className={styles.headline}>{headlineText}</h1> : null }
      <div className={styles.main}>
        <div className={styles.container} ref={containerRef}>
          { comfortCookiesAccepted ? (
            <iframe
              title="youtube video"
              className={styles.video}
              width="560"
              height="315"
              src={url}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <ConsentMessage />
          )}
        </div>
      </div>
    </div>
  );
};

YouTubeVideo.propTypes = {
  name: PropTypes.string.isRequired,
  comfortCookiesAccepted: PropTypes.bool,
  url: PropTypes.string,
};

YouTubeVideo.defaultProps = {
  url: null,
  comfortCookiesAccepted: false,
};

export default withCurrentProduct(connect(YouTubeVideo));
