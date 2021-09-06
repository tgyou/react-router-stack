module.exports = {
  rules: {
    'prettier/prettier': ['error'],

    // More rules
    'linebreak-style': ['error', 'unix'],
    'prefer-const': 'error',
    'no-var': 'error',
    'no-console': 'warn',

    // Use typescript-eslint rules instead eslint
    'no-unused-vars': 'warn',
    'no-redeclare': 'warn',

    // React
    'react/display-name': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-vars': 'error',
    'react/prop-types': 'warn',

    // a11y
    'jsx-a11y/label-has-for': [
      2,
      {
        components: ['Label'],
        required: {
          every: ['id'],
        },
        allowChildren: false,
      },
    ],
    'padding-line-between-statements': ['error', { blankLine: 'always', prev: '*', next: 'return' }],
    'sort-imports': 'off',
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier', 'react-app', 'plugin:jsx-a11y/recommended'],
  plugins: ['react', 'prettier', 'jsx-a11y', 'simple-import-sort'],
  settings: {
    react: {
      pragma: 'React',
      version: '16.7.0',
    },
  },
};
