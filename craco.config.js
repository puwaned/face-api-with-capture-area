const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            // modifyVars: {
            //   "@primary-color": '#2F9A5D',
            // },
          },
        },
      },
    },
  ],
};
