import { css } from 'glamor';
import { showSpacingOnTheSides } from '../config';

const main = css({
  paddingBottom: 25,
  paddingLeft: showSpacingOnTheSides ? 16 : 0,
  paddingRight: showSpacingOnTheSides ? 16 : 0,
});

const container = css({
  position: 'relative',
  paddingBottom: '56.25%', /* 16:9 */
  height: 0,
});

const video = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
});

const headline = css({
  fontSize: '1rem',
  fontWeight: 500,
  marginTop: 0,
  marginBottom: '0.5rem',
  marginLeft: 16,
  marginRight: 16,
});

export default {
  main,
  container,
  video,
  headline,
};
