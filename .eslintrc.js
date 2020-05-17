module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off',
    'max-len': [
      1,
      {
        code: 120,
        ignoreComments: true,
        ignoreUrls: true,
      },
    ],
    'arrow-parens': ['error', 'as-needed'],
  },
};
