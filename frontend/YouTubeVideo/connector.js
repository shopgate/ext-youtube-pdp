import { connect } from 'react-redux';
import { getCurrentYoutubeUrl } from './selectors';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @param {Object} props The props.
 * @return {Object} The extended component props.
 */
const mapStateToProps = (state, props) => ({
  url: getCurrentYoutubeUrl(state, props),
});

/**
 * Connects a component to the store.
 * @param {Object} Component A react component.
 * @return {Object} The react component with extended props.
 */
export default connect(mapStateToProps);
