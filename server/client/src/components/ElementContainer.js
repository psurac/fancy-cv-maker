"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DragWrapper_1 = __importDefault(require("../wrapper/DragWrapper"));
const ListUO_1 = __importDefault(require("../elements/ListUO"));
const Image_1 = __importDefault(require("../elements/Image"));
const ListOL_1 = __importDefault(require("../elements/ListOL"));
const ElementContainer = () => {
    return (React.createElement("div", null,
        React.createElement(DragWrapper_1.default, { child: ListUO_1.default }),
        React.createElement(DragWrapper_1.default, { child: Image_1.default }),
        React.createElement(DragWrapper_1.default, { child: ListOL_1.default })));
};
exports.default = ElementContainer;
