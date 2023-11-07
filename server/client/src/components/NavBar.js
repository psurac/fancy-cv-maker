"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./NavBar.scss");
const NavBar = () => {
    return (react_1.default.createElement("div", { className: "navbar-container" },
        react_1.default.createElement("h3", null, "Fancy CV Maker"),
        react_1.default.createElement("h4", null, "Login/Register")));
};
exports.default = NavBar;
