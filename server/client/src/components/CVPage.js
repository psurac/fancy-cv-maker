"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./CVPage.scss");
const Box_1 = __importDefault(require("../elements/Box"));
const CVPage = () => {
    let gridBoxes = Array(2 * 12).fill('box').map((name, index) => (React.createElement("div", { className: name, key: index, id: `${name}-${index + 1}` },
        React.createElement(Box_1.default, { prop: `${name}-${index + 1}` }))));
    for (let i = 0; i < gridBoxes.length; i += 2) {
        [gridBoxes[i], gridBoxes[i + 1]] = [gridBoxes[i + 1], gridBoxes[i]];
        /* console.log(`Swapped elements ${i} and ${i+1}`); */
    }
    return (React.createElement("div", { className: "page", "data-testid": "cv-page" },
        React.createElement("div", { className: "navbar-element" }, "Navbar Element"),
        gridBoxes,
        React.createElement("div", { className: "taskbar-element" }, "Taskbar Element")));
};
exports.default = CVPage;
