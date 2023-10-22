import { ComponentType, Dispatch, FC, FocusEventHandler, SetStateAction } from 'react';
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

    useEffect(() => {
        console.log(typeof(child));
        console.log(child);
    },[])

    const onContentBlur = useCallback<FocusEventHandler<HTMLDivElement>>((event) => {
        console.log(event.currentTarget.innerHTML);
        setInnerHtml && (setInnerHtml(event.currentTarget.innerHTML));
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