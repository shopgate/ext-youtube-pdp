import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withCurrentProduct } from '@shopgate/engage/core';
import { embeddedMedia } from '@shopgate/pwa-common/collections';
import connect from './connector';
import styles from './style';
import { portalName, videoIdPrefix, videoId } from '../config';

/**
 * The YouTubeVideo component.
 */
class YouTubeVideo extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
  };

  static defaultProps = {
    url: null,
  };

  /**
   * Handle YouTubeVideo on did mount
   */
  componentDidMount() {
    if (this.container) {
      embeddedMedia.add(this.container);
    }
  }

  /**
   * Handle YouTubeVideo on will unmount
   */
  componentWillUnmount() {
    if (this.container) {
      embeddedMedia.remove(this.container);
    }
  }

  /**
   * Renders the component.
   * @returns {JSX}
   */
  render() {
    if (!this.props.url && (!videoId || !videoIdPrefix)) {
      return null;
    }

    if (this.props.name !== portalName) {
      return null;
    }
    console.log(`${videoIdPrefix}${videoId}`)
    return (
      <div className={styles.main}>
        <div className={styles.container} ref={(element) => { this.container = element; }}>
          <iframe
            title="youtube video"
            className={styles.video}
            width="560"
            height="315"
            src={this.props.url? this.props.url: `${videoIdPrefix}${videoId}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    );
  }
}

export default withCurrentProduct(connect(YouTubeVideo));
