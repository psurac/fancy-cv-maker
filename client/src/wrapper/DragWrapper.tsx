import { ComponentType, FC, ReactNode, createElement } from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { ItemTypes } from '../constants/ItemTypes';

interface DragWrapperType {
    child: ComponentType<any>
}

const DragWrapper: FC<DragWrapperType> = ({ child }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: { item: child },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))
    return (
        <div ref={drag}>
            {child && createElement(child)}
        </div>
    );
};

export default DragWrapper;