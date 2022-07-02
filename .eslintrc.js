module.exports = {
  root: true,
  extends: [
    'airbnb-base',
  ],
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: { mocha: true },
    },
  ],
  rules: {
  },
};
