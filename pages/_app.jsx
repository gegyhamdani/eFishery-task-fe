import React from 'react';
import PropTypes from 'prop-types';

import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

MyApp.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]),
  pageProps: PropTypes.shape({})
};

MyApp.defaultProps = {
  Component: () => {},
  pageProps: {}
};

export default MyApp;
