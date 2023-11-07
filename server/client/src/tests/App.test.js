"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const App_1 = __importDefault(require("../App"));
require("@testing-library/jest-dom");
test('renders NavBar', () => {
    (0, react_2.render)(react_1.default.createElement(App_1.default, null));
    const linkElement = react_2.screen.getByText(/fancy cv maker/i);
    expect(linkElement).toBeInTheDocument();
});
test('render style Selector', () => {
    (0, react_2.render)(react_1.default.createElement(App_1.default, null));
    const styleSelectorElement = react_2.screen.getByLabelText(/CV Style/);
    expect(styleSelectorElement).toBeInTheDocument();
});
test('render CVPages', () => {
    (0, react_2.render)(react_1.default.createElement(App_1.default, null));
    const cvPageSelectorElement = react_2.screen.getByTestId(/cv-page/);
    expect(cvPageSelectorElement).toBeInTheDocument();
});
