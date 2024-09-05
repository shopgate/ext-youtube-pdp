import { connect } from 'react-redux';
import { getCurrentYoutubeUrl } from './selectors';

let getAreComfortCookiesAccepted;

try {
  // Try to import cookie consent related modules. "require()" is used since the currently deployed
  // PWA might not have the required modules implemented yet.

  // eslint-disable-next-line global-require
  ({ getAreComfortCookiesAccepted } = require('@shopgate/engage/tracking/selectors'));
} catch (e) {
  // Configure fallbacks in case of an import error
  getAreComfortCookiesAccepted = () => true;
}

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @param {Object} props The props.
 * @return {Object} The extended component props.
 */
const mapStateToProps = (state, props) => ({
  comfortCookiesAccepted: getAreComfortCookiesAccepted(state),
  url: getCurrentYoutubeUrl(state, props),
});

/**
 * Connects a component to the store.
 * @param {Object} Component A react component.
 * @return {Object} The react component with extended props.
 */
export default connect(mapStateToProps);
