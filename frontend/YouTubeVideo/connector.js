import { connect } from 'react-redux';
import { getAreComfortCookiesAccepted } from '@shopgate/engage/tracking/selectors';
import { getCurrentYoutubeUrl } from './selectors';

/**
 * Provide fallback for consent selector when deployed with a PWA version that has no support yet.
 * @returns {boolean}
 */
const getConsent = getAreComfortCookiesAccepted || (() => true);

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @param {Object} props The props.
 * @return {Object} The extended component props.
 */
const mapStateToProps = (state, props) => ({
  comfortCookiesAccepted: getConsent(state),
  url: getCurrentYoutubeUrl(state, props),
});

/**
 * Connects a component to the store.
 * @param {Object} Component A react component.
 * @return {Object} The react component with extended props.
 */
export default connect(mapStateToProps);
