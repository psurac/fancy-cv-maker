import { ComponentType, Dispatch, FC, createElement, memo } from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { ItemTypes } from '../constants/ItemTypes';

interface DragWrapperType {
    child: ComponentType<any>
    props?: object
    inBox?: boolean
    setItem?: Dispatch<any>
}

const DragWrapper: FC<DragWrapperType> = ({ child, props, inBox = false, setItem }) => {
    const [, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: { item: child },
        options: {
            dropEffect: inBox ? 'move' : 'copy'
        },
        end: (_,monitor) => {
            monitor.didDrop() && inBox && setItem && setItem(false)
        }
    }))
    return (
        <div ref={drag}>
            {child && createElement(child, props)}
        </div>
    );
};

export default memo(DragWrapper);