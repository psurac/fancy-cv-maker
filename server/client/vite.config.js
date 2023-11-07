"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const plugin_react_swc_1 = __importDefault(require("@vitejs/plugin-react-swc"));
// https://vitejs.dev/config/
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_react_swc_1.default)()],
    server: {
        // hmr: {overlay: false},
        // port: 3000,
        proxy: {
            '/api': 'http://localhost:5000/',
        }
    }
});