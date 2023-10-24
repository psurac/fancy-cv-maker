module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
  plugins: ["@babel/plugin-transform-runtime"],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!@react-dnd|react-dnd|dnd-core|react-dnd-html5-backend)/",
  ],
  };
