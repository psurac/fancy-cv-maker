import { ComponentType, FC, createElement, memo } from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { ItemTypes } from '../constants/ItemTypes';

interface DragWrapperType {
    child: ComponentType<any>
    props?: object
}

const DragWrapper: FC<DragWrapperType> = ({ child, props }) => {
    const [, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: { item: child },
    }))
    return (
        <div ref={drag}>
            {child && createElement(child, props)}
        </div>
    );
};

export default memo(DragWrapper);