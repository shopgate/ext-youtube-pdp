import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { handleYouTube } from '@shopgate/pwa-common/helpers/html/handleDOM';
import connect from './connector';
import styles from './style';

/**
 * The ChipLayout component.
 */
class YouTubeVideo extends Component {
  static propTypes = {
    url: PropTypes.string,
  };

  static defaultProps = {
    // TODO:
    url: 'https://www.youtube.com/embed/aTKyjuhmZNo',
  };

  componentDidMount() {
    if (this.container) {
      handleYouTube(this.container);
    }
  }

  /**
   * Renders the component.
   * @returns {JSX}
   */
  render() {
    if (this.props.url === null) {
      return null;
    }

    return (
      <div className={styles.container} ref={(element) => { this.container = element; }}>
        <iframe
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
