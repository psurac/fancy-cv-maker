"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_dnd_1 = require("react-dnd");
const ItemTypes_1 = require("../constants/ItemTypes");
const DragWrapper_1 = __importDefault(require("../wrapper/DragWrapper"));
const HtmlToReactComp_1 = __importDefault(require("../utility/HtmlToReactComp"));
const Box = ({ prop }) => {
    const [item, setItem] = (0, react_1.useState)();
    const [key, setKey] = (0, react_1.useState)(0);
    const [editable, setEditable] = (0, react_1.useState)(false);
    const [innerHtml, setInnerHtml] = (0, react_1.useState)('');
    const [, drop] = (0, react_dnd_1.useDrop)(() => ({
        accept: ItemTypes_1.ItemTypes.BOX,
        drop(itemDrag, monitor) {
            console.log(itemDrag);
            console.log(itemDrag.child);
            console.log(typeof (itemDrag.child));
            setItem(() => itemDrag.child);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }));
    (0, react_1.useEffect)(() => {
        setKey(key + 1);
        innerHtml && console.log((0, HtmlToReactComp_1.default)({ html: innerHtml }));
    }, [item, setItem, innerHtml]);
    return (React.createElement("div", { ref: drop, key: key, style: { backgroundColor: "#FF0000" } },
        prop,
        React.createElement("button", { type: "button", value: "delete", onClick: () => setItem('') }, "Delete"),
        React.createElement("button", { type: "button", value: "edit", onClick: () => setEditable(!editable) }, "Edit"),
        innerHtml ? (React.createElement(DragWrapper_1.default, { child: () => (0, HtmlToReactComp_1.default)({ html: innerHtml }), inBox: true, editable: editable, setItem: setItem, setInnerHtml: setInnerHtml })) : item && (React.createElement(DragWrapper_1.default, { child: item, inBox: true, editable: editable, setItem: setItem, setInnerHtml: setInnerHtml }))));
};
exports.default = (0, react_1.memo)(Box);
