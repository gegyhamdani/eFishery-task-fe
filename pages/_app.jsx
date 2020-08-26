import React from 'react';
import PropTypes from 'prop-types';
import { SWRConfig } from 'swr';
import api from '../src/services/api';

import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <SWRConfig
      value={{
        fetcher: url => api.get(url).then(res => res.data)
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
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
