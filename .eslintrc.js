module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier', '@react-native', 'plugin:jest/recommended'],
  plugins: ['jest'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    'react-native/no-unused-styles': 'warn',
    'react-native/no-inline-styles': 'warn',
    'prettier/prettier': 'error',
  },
};
