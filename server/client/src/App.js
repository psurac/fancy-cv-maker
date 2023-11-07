"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./App.scss");
const react_2 = require("react");
const NavBar_1 = __importDefault(require("./components/NavBar"));
const Main_1 = __importDefault(require("./pages/Main"));
const App = () => {
    const [data, setData] = (0, react_2.useState)();
    (0, react_2.useEffect)(() => {
        fetch('/api')
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement("header", { className: "App-header" },
            react_1.default.createElement(NavBar_1.default, null)),
        react_1.default.createElement(Main_1.default, null),
        react_1.default.createElement("p", null, !data ? "Loading..." : data)));
};
exports.default = App;
