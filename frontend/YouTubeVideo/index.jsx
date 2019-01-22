import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { embeddedMedia } from '@shopgate/pwa-common/collections';
import connect from './connector';
import styles from './style';

/**
 * The YouTubeVideo component.
 */
class YouTubeVideo extends Component {
  static propTypes = {
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
    if (!this.props.url) {
      return null;
    }

    return (
      <div className={styles.container} ref={(element) => { this.container = element; }}>
        <iframe
          title="youtube video"
          className={styles.video}
          width="560"
          height="315"
          src={this.props.url}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    );
  }
}

export default connect(YouTubeVideo);
