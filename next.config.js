const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');

module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]'
  },
  ...withCss({
    webpack(config) {
      return config;
    }
  })
});
