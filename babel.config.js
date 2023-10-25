module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module-resolver", {
        "alias": {
          "@comps": "./src/comps/index.js",
          "@screens": "./src/screens/index.js",
          "@utils" : './src/utils/index.js',
          "@images": "./src/images.js",
          "@icons" : "./src/icons.js",
          "@theme": "./src/theme.js",
          "@uc" : "./src/context/UserContext.js",
          "@data" : './src/data/index.js',
        },
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
        ]
      }],
    ]
  };
};