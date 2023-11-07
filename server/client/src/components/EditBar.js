"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./EditBar.scss");
const useFetch_1 = __importDefault(require("../hooks/useFetch"));
const ElementContainer_1 = __importDefault(require("./ElementContainer"));
const EditBar = () => {
    const formElement = (0, react_1.useRef)(null);
    const [fetchFunction, data] = (0, useFetch_1.default)();
    const action = '/cv-style';
    const method = 'POST';
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log(formData);
        if (fetchFunction) {
            fetchFunction(method, action, formData);
            console.log(data);
        }
    };
    return (React.createElement("div", { className: "edit-bar-container" },
        React.createElement("form", { ref: formElement, className: 'select-style', onSubmit: submitHandler, onChange: () => formElement.current?.submit(), method: method, action: action },
            React.createElement("select", { name: 'cv-style', id: 'cv-style' },
                React.createElement("option", { value: 'windows' }, "Windows"),
                React.createElement("option", { value: 'linux' }, "Linux"),
                React.createElement("option", { value: 'github' }, "GitHub"),
                React.createElement("option", { value: 'facebook' }, "Facebook")),
            React.createElement("label", { htmlFor: 'cv-style' }, "CV Style")),
        React.createElement(ElementContainer_1.default, null)));
};
exports.default = EditBar;
