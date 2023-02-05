module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'react-hooks/exhaustive-deps': 'warn',
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages. `react` related packages come first.
              ['^react', '^@?\\w'],
              ['^@(/.*|$)', '^(api|layouts|components|UI|navigation|store|hooks|utils|types|assets)(/.*|$)'],
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports.
              ['^.+\\.(c|le|sc)ss$'],
            ],
          },
        ],
        'simple-import-sort/exports': 'error',
      },
    },
  ],
};
