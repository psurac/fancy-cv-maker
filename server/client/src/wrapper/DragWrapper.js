"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_dnd_1 = require("react-dnd");
const ItemTypes_1 = require("../constants/ItemTypes");
const DragWrapper = ({ child, props, inBox = false, editable = false, setItem, setInnerHtml }) => {
    const [, drag] = (0, react_dnd_1.useDrag)(() => ({
        type: ItemTypes_1.ItemTypes.BOX,
        item: { child },
        options: {
            dropEffect: inBox ? 'move' : 'copy'
        },
        end: (_, monitor) => {
            monitor.didDrop() && inBox && setItem && setItem('');
            monitor.didDrop() && inBox && setInnerHtml && setInnerHtml('');
        }
    }));
    /* useEffect(() => {
        console.log(typeof(child));
        console.log(child);
    },[]) */
    const onContentBlur = (0, react_1.useCallback)((event) => {
        console.log(event.currentTarget.innerHTML);
        setInnerHtml && (setInnerHtml(event.currentTarget.innerHTML));
    }, [editable]);
    return (React.createElement("div", { ref: drag, contentEditable: editable, suppressContentEditableWarning: true, onBlur: onContentBlur }, child && (0, react_1.createElement)(child, props)));
};
exports.default = (0, react_1.memo)(DragWrapper);
