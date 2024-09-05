import React from 'react';
import { css } from 'glamor';
import { I18n, Link } from '@shopgate/engage/components';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';
import { addPaddingAroundVideo } from '../config';

let PRIVACY_SETTINGS_PATTERN = null;

try {
  // Try to import cookie consent related modules. "require()" is used since the currently deployed
  // PWA might not have the required modules implemented yet.

  // eslint-disable-next-line global-require
  ({ PRIVACY_SETTINGS_PATTERN } = require('@shopgate/engage/tracking/constants'));
} catch {
  // Nothing to do here
}

const { colors } = themeConfig;

const classes = {
  root: css({
    position: 'absolute',
    height: '100%',
    width: '100%',
    padding: 16,
    fontSize: '0.9rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    gap: 24,
    background: colors.shade10,
    border: `1px solid ${colors.shade5}`,
    ...!addPaddingAroundVideo ? {
      // Remove left and right borders when video container takes full viewport width
      borderLeftWidth: 0,
      borderRightWidth: 0,
    } : {
      // Add a tiny little border radius to make the message container look nice with padding
      borderRadius: 4,
    },
  }),
  link: css({
    textAlign: 'center !important',
    color: colors.primary,
    fontWeight: 500,
  }).toString(),
  icon: css({
    fill: colors.shade5,
    height: 48,
  }),
};

/**
 * SVG Icon for the ConsentMessage
 * @returns {JSX.Element}
 */
const Icon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 110 84"
    version="1.1"
    className={classes.icon}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="matrix(1,0,0,1,-24.6099,-41.8178)">
      <path d="M50.303,68.639L104.088,98.668L56.288,125.172C55.039,125.865 53.518,125.845 52.288,125.12C51.058,124.396 50.303,123.075 50.303,121.648L50.303,68.639ZM50.303,54.702L50.303,45.855C50.303,44.425 51.059,43.102 52.292,42.376C53.524,41.651 55.048,41.631 56.298,42.324C71.141,50.554 109.492,71.82 124.676,80.239C125.95,80.945 126.741,82.288 126.741,83.745C126.741,85.203 125.95,86.545 124.676,87.252L116.612,91.724L50.303,54.702Z" />
      <g transform="matrix(0.944597,0.527391,-0.487489,0.873129,45.7069,-42.8282)">
        <path d="M139,89C139,87.344 137.757,86 136.227,86L26.773,86C25.243,86 24,87.344 24,89C24,90.656 25.243,92 26.773,92L136.227,92C137.757,92 139,90.656 139,89Z" />
      </g>
    </g>
  </svg>
);

/**
 * The ConsentMessage component displays a descriptive text when YouTube videos cannot be shown
 * since comfort cookies are not granted.
 * @returns {JSX.Element}
 */
const ConsentMessage = () => {
  if (!PRIVACY_SETTINGS_PATTERN) {
    // Should never happen, since when consent imports are not possible, comfort cookies are granted
    return null;
  }

  return (
    <div className={classes.root}>
      <Icon />
      <I18n.Text string="shopgateProject-YouTubePdp.consentMessage" />
      <Link className={classes.link} href={PRIVACY_SETTINGS_PATTERN}>
        <I18n.Text string="shopgateProject-YouTubePdp.consentLink" />
      </Link>
    </div>
  );
};

export default ConsentMessage;

