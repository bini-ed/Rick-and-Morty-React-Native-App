/** @type {import('jest').Config} */
module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  //   transform: {
  //   '^.+\\.(ts|tsx)?$': 'ts-jest',
  //   "^.+\\.(js|jsx)$": "babel-jest",
  // }
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation|react-native-toast-message|axios|react-native-gesture-handler)',
  ],
  // transformIgnorePatterns: [
  //   'node_modules/(?!(react-native' +
  //     '|react-navigation-tabs' +
  //     '|react-native-splash-screen' +
  //     '|react-native-screens' +
  //     '|react-native-reanimated' +
  //     '|react-native-toast-message' +
  //     ')/)',
  // ],
};
