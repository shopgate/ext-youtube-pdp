import { css } from 'glamor';

const main = css({
  paddingBottom: 25,
});

const container = css({
  position: 'relative',
  paddingBottom: '56.25%', /* 16:9 */
  paddingTop: 25,
  height: 0,
});

const video = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
});

export default {
  main,
  container,
  video,
};
