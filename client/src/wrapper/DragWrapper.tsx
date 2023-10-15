import { ComponentType, Dispatch, FC, FocusEventHandler, useState } from 'react';
import { createElement, memo, useCallback, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../constants/ItemTypes';
import { GenElementType } from '../types/type';
import { Parser } from 'html-to-react'

interface DragWrapperType {
    child: GenElementType
    props?: object
    inBox?: boolean
    editable?: boolean
    item?: ComponentType<any> | FC<any> | string
    setItem?: Dispatch<any>
}

const DragWrapper: FC<DragWrapperType> = (
    { child, props, inBox = false, editable = false, item, setItem }
) => {
    let NewComp: GenElementType;

    const [, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: { child },
        options: {
            dropEffect: inBox ? 'move' : 'copy'
        },
        end: (_, monitor) => {
            monitor.didDrop() && inBox && setItem && setItem('')
        }
    }))

    useEffect(() => {
        console.log(typeof(child));
        console.log(child);
    },[])

    const onContentBlur = useCallback<FocusEventHandler<HTMLDivElement>>((event) => {
        const innerHTML = event.currentTarget.innerHTML;
        const reactComp = Parser().parse(innerHTML);
        console.log(typeof(reactComp));
        console.log(reactComp);
        NewComp = () => {return <>{innerHTML}</>}
        editable && setItem && setItem(() => NewComp);
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