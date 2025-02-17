export default {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
    'next/babel',
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
  ignore: ['/node_modules/'],
};
