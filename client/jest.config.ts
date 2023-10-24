import {defaults} from 'jest-config';

const config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
    verbose: true,
    globals: {
      "ts-jest": {
        babelConfig: true,
      },
    },
    preset: "ts-jest/presets/js-with-ts",
    testEnvironment: "jsdom",
    testPathIgnorePatterns: ["<rootDir>/node_modules/"],
    setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
    testRegex: ".test.(tsx?)$",
    moduleNameMapper : {
      '^react-dnd$': 'react-dnd/dist/cjs',
      '^react-dnd-html5-backend$': 'react-dnd-html5-backend/dist/cjs',
      '^dnd-core$': 'dnd-core/dist/cjs',
    },
    transform: {
        '\\.[jt]sx?$': 'babel-jest',
        "<rootDir>/node_modules/(react-dnd|dnd-core|react-dnd-html5-backend)/dist/(.+).js": "ts-jest",
        "<rootDir>/node_modules/@react-dnd/(invariant|asap|shallowequal)?/dist/(.+).js": "ts-jest",
      },
      transformIgnorePatterns: [
        "<rootDir>/node_modules/(?!@react-dnd|react-dnd|core-dnd|dnd-core|react-dnd-html5-backend)/",
      ],
    };

    export default config;