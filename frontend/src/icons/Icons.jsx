/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { theme } from '@binarycapsule/ui-capsules';

export const IconFormatBold = ({ size, primaryColor, ...other }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" {...other}>
    <path
      fill={primaryColor}
      d="M3 19V1h8a5 5 0 0 1 3.88 8.16A5.5 5.5 0 0 1 11.5 19H3zm7.5-8H7v5h3.5a2.5 2.5 0 1 0 0-5zM7 4v4h3a2 2 0 1 0 0-4H7z"
    />
  </svg>
);

IconFormatBold.defaultProps = {
  size: 20,
  primaryColor: theme.neutral400,
};

IconFormatBold.propTypes = {
  size: PropTypes.number,
  primaryColor: PropTypes.string,
};

export const IconFormatItalic = ({ size, primaryColor, ...other }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" {...other}>
    <path fill={primaryColor} d="M8 1h9v2H8V1zm3 2h3L8 17H5l6-14zM2 17h9v2H2v-2z" />
  </svg>
);

IconFormatItalic.defaultProps = {
  size: 20,
  primaryColor: theme.neutral400,
};

IconFormatItalic.propTypes = {
  size: PropTypes.number,
  primaryColor: PropTypes.string,
};

export const IconFormatUnderline = ({ size, primaryColor, ...other }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" {...other}>
    <path fill={primaryColor} d="M16 9A6 6 0 1 1 4 9V1h3v8a3 3 0 0 0 6 0V1h3v8zM2 17h16v2H2v-2z" />
  </svg>
);

IconFormatUnderline.defaultProps = {
  size: 20,
  primaryColor: theme.neutral400,
};

IconFormatUnderline.propTypes = {
  size: PropTypes.number,
  primaryColor: PropTypes.string,
};

export const IconFormatCode = ({ size, primaryColor, ...other }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" {...other}>
    <path
      fill={primaryColor}
      d="M.7 9.3l4.8-4.8 1.4 1.42L2.84 10l4.07 4.07-1.41 1.42L0 10l.7-.7zm18.6 1.4l.7-.7-5.49-5.49-1.4 1.42L17.16 10l-4.07 4.07 1.41 1.42 4.78-4.78z"
    />
  </svg>
);

IconFormatCode.defaultProps = {
  size: 20,
  primaryColor: theme.neutral400,
};

IconFormatCode.propTypes = {
  size: PropTypes.number,
  primaryColor: PropTypes.string,
};

export const IconFormatHeading1 = ({ size, primaryColor, ...other }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" {...other}>
    <path
      fill={primaryColor}
      d="M5 13.9v.9c0 .3-.2.5-.5.5H.7c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.5.5-.5h.7V6.6H.7c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.5.5-.5h3.8c.2 0 .5.2.5.5v.9c0 .3-.2.5-.5.5h-.8V9h4.1V6.6h-.7c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.5.5-.5h3.8c.3 0 .5.2.5.5v.9c0 .3-.2.5-.5.5h-.7v6.8h.7c.3 0 .5.2.5.5v.9c0 .3-.2.5-.5.5H7.1c-.3 0-.5-.2-.5-.5v-.9c0-.3.2-.5.5-.5h.7V11H3.7v2.4h.7c.3 0 .6.2.6.5zm12.2-9.2H16c-.1 0-.3.1-.4.1L13.3 7c-.2.2-.2.5 0 .8l.7.7c.2.2.5.2.8 0l.6-.6v5.3h-1.7c-.3 0-.5.2-.5.5v1c0 .3.2.5.5.5h5.7c.3 0 .5-.2.5-.5v-1c0-.3-.2-.5-.5-.5h-1.7v-8c0-.3-.3-.5-.5-.5z"
    />
  </svg>
);

IconFormatHeading1.defaultProps = {
  size: 20,
  primaryColor: theme.neutral400,
};

IconFormatHeading1.propTypes = {
  size: PropTypes.number,
  primaryColor: PropTypes.string,
};

export const IconFormatHeading2 = ({ size, primaryColor, ...other }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" {...other}>
    <path
      fill={primaryColor}
      d="M14.9 13.8h4.7c.2 0 .4.2.4.4v.8c0 .2-.2.4-.4.4h-6.3c-.2 0-.4-.1-.4-.4v-.6c0-3.8 5.1-4.4 5.1-6.7 0-.9-.7-1.5-1.7-1.5-.8 0-1.4.4-1.8 1.1-.1.2-.4.2-.6.1l-.7-.4c-.2-.2-.3-.4-.2-.6.2-.3.4-.6.7-.8.5-.5 1.4-1 2.6-1 2 0 3.5 1.3 3.5 3.2 0 3.3-4.6 4-4.9 6zm-10.4.6v.7c0 .2-.2.4-.4.4H.4c-.2 0-.4-.2-.4-.4v-.7c0-.3.2-.4.4-.4h.9V6.2H.4C.2 6.2 0 6 0 5.8v-.7c0-.2.2-.4.4-.4H4c.2 0 .4.2.4.4v.7c0 .2-.2.4-.4.4h-.9v3.1h5V6.2h-.8c-.3 0-.4-.2-.4-.4v-.7c0-.2.2-.4.4-.4h3.6c.2 0 .4.2.4.4v.7c0 .2-.2.4-.4.4H10V14h.9c.2 0 .4.2.4.4v.7c0 .2-.2.4-.4.4H7.3c-.2 0-.4-.2-.4-.4v-.7c0-.3.1-.4.4-.4h.9v-3.1h-5V14h.9c.2 0 .4.1.4.4z"
    />
  </svg>
);

IconFormatHeading2.defaultProps = {
  size: 20,
  primaryColor: theme.neutral400,
};

IconFormatHeading2.propTypes = {
  size: PropTypes.number,
  primaryColor: PropTypes.string,
};

export const IconFormatQuote = ({ size, primaryColor, ...other }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" {...other}>
    <path
      fill={primaryColor}
      d="M12.5 10c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5l0.016 0.5c0 3.866-3.134 7-7 7v-2c1.336 0 2.591-0.52 3.536-1.464 0.182-0.182 0.348-0.375 0.497-0.578-0.179 0.028-0.362 0.043-0.549 0.043zM3.5 10c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5l0.016 0.5c0 3.866-3.134 7-7 7v-2c1.336 0 2.591-0.52 3.536-1.464 0.182-0.182 0.348-0.375 0.497-0.578-0.179 0.028-0.362 0.043-0.549 0.043z"
    />
  </svg>
);

IconFormatQuote.defaultProps = {
  size: 16,
  primaryColor: theme.neutral400,
};

IconFormatQuote.propTypes = {
  size: PropTypes.number,
  primaryColor: PropTypes.string,
};

export const IconFormatListNumber = ({ size, primaryColor, ...other }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...other}>
    <path
      fill={primaryColor}
      d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"
    />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

IconFormatListNumber.defaultProps = {
  size: 24,
  primaryColor: theme.neutral400,
};

IconFormatListNumber.propTypes = {
  size: PropTypes.number,
  primaryColor: PropTypes.string,
};

export const IconFormatListBullet = ({ size, primaryColor, ...other }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...other}>
    <path
      fill={primaryColor}
      d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"
    />
    <path fill="none" d="M0 0h24v24H0V0z" />
  </svg>
);

IconFormatListBullet.defaultProps = {
  size: 24,
  primaryColor: theme.neutral400,
};

IconFormatListBullet.propTypes = {
  size: PropTypes.number,
  primaryColor: PropTypes.string,
};

export const IconRightThickArrow = ({
  size,
  withCircle,
  primaryColor,
  secondaryColor,
  ...other
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...other}>
    {withCircle && <circle fill={secondaryColor} cx="12" cy="12" r="10" />}
    <path
      fill={primaryColor}
      d="M12 14H7a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h5V8a1 1 0 0 1 1.7-.7l4 4a1 1 0 0 1 0 1.4l-4 4A1 1 0 0 1 12 16v-2z"
    />
  </svg>
);

IconRightThickArrow.defaultProps = {
  size: 24,
  withCircle: false,
  primaryColor: theme.neutral700,
  secondaryColor: theme.neutral300,
};

IconRightThickArrow.propTypes = {
  size: PropTypes.number,
  withCircle: PropTypes.bool,
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
};
