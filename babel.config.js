module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-classname-to-style',
    [
      'react-native-platform-specific-extensions',
      {
        extensions: ['scss', 'sass'],
      },
    ],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          /**
           * Regular expression is used to match all files inside `./src` directory and map each `.src/folder/[..]` to `~folder/[..]` path
           */
          '^@/(.+)': './src/\\1',
        },
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.json',
          '.tsx',
          '.ts',
          '.native.js',
        ],
      },
    ],
  ],
};
