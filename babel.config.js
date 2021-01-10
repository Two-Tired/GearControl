module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    }, // env-block from: https://callstack.github.io/react-native-paper/getting-started.html
  };
};
