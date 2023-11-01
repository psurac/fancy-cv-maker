module.exports = {
    presets: [
      ['@babel/preset-env', {
        modules: 'commonjs',
        loose: true,
        targets: {node: 'current'}
      }],
      '@babel/preset-typescript',
    ],
    "plugins": [
      /* ["@babel/plugin-proposal-decorators", { "version": "2023-05" }],
      "@babel/plugin-syntax-decorators", */
      "@babel/plugin-transform-react-jsx"
    ],
  };