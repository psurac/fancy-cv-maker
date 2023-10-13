import { ComponentType, Dispatch, FC, FocusEventHandler, createElement, memo, useCallback } from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { ItemTypes } from '../constants/ItemTypes';
import { Parser } from 'html-to-react'

interface DragWrapperType {
    child: ComponentType<any>
    props?: object
    inBox?: boolean
    editable?: boolean
    item?: object
    setItem?: Dispatch<any>
}

const DragWrapper: FC<DragWrapperType> = (
    { child, props, inBox = false, editable = false, item, setItem }
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

    const onContentBlur = useCallback<FocusEventHandler<HTMLDivElement>>((event) => {
        console.log(event.currentTarget.innerHTML)
        const jsxElement = Parser().parse(event.currentTarget.innerHTML)
        console.log(jsxElement)
        console.log(jsxElement.toString())
        editable && setItem && setItem(jsxElement/* {item: jsxElement.toString()}*/);
    }, [editable]);

    return (
        <div
            ref={drag}
            contentEditable={editable}
            suppressContentEditableWarning={true}
            onBlur={onContentBlur}
        >
            {child && createElement(child, props)}
        </div>
    );
};

export default memo(DragWrapper);