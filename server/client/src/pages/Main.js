"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
const react_dnd_1 = require("react-dnd");
require("./Main.scss");
const EditBar_1 = __importDefault(require("../components/EditBar"));
const CVPage_1 = __importDefault(require("../components/CVPage"));
const Main = () => {
    return (react_1.default.createElement("main", { className: 'main' },
        react_1.default.createElement(react_dnd_1.DndProvider, { backend: react_dnd_html5_backend_1.HTML5Backend },
            react_1.default.createElement(EditBar_1.default, null),
            react_1.default.createElement(CVPage_1.default, null))));
};
exports.default = Main;
