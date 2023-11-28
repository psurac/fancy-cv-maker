import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { createElement, memo } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../constants/ItemTypes';
import { GenElementType } from '../types/type';

interface DragWrapperType {
    child: GenElementType
    props?: object
    inBox?: boolean
    editable?: boolean
    setItem?: Dispatch<any>
    setInnerHtml?: Dispatch<SetStateAction<string>>
}

const DragWrapper: FC<DragWrapperType> = (
    { child, props, inBox = false, editable = false, setItem, setInnerHtml }
) => {
    const [, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: { child },
        options: {
            dropEffect: inBox ? 'move' : 'copy'
        },
        end: (_, monitor) => {
            monitor.didDrop() && inBox && setItem && setItem('');
            monitor.didDrop() && inBox && setInnerHtml && setInnerHtml('');
        }
    }))

    const [divElement, setDivElement] = useState<HTMLDivElement>();

    useEffect(() => {
        divElement && drag(divElement);
        divElement && console.log(divElement.innerHTML);
        divElement && setInnerHtml && (setInnerHtml(divElement.innerHTML));
    }, [editable]);

    return (
        <div
            ref={drag}
            contentEditable={editable}
            suppressContentEditableWarning={true}
            onChange={(event) => {
                setDivElement(event.currentTarget);
                divElement && drag(divElement);
            }}
        >
            {child && createElement(child, props)}
        </div>
    );
};

export default memo(DragWrapper);