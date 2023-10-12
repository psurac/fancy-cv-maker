import { ComponentType, Dispatch, FC, createElement, memo } from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { ItemTypes } from '../constants/ItemTypes';
import sanitizeHTML from "sanitize-html";

interface DragWrapperType {
    child: ComponentType<any>
    props?: object
    inBox?: boolean
    editable?: boolean
    setItem?: Dispatch<any>
}

const DragWrapper: FC<DragWrapperType> = (
    { child, props, inBox = false, editable = false, setItem }
) => {
    const [, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: { item: child },
        options: {
            dropEffect: inBox ? 'move' : 'copy'
        },
        end: (_, monitor) => {
            monitor.didDrop() && inBox && setItem && setItem(false)
        }
    }))
    return (
        <div ref={drag} contentEditable={editable}>
            {child && createElement(child, props)}
        </div>
    );
};

export default memo(DragWrapper);