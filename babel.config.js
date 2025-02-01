/* eslint-disable no-undef */
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
        root: ['.'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@helpers': './src/helpers',
          '@services': './src/services',
          '@store': './src/store',
          '@ourtypes': './src/types',
          '@tests': './__tests__'
        },
      },
    ],
  ],
};
