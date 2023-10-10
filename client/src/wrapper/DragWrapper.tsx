import { ComponentType, FC, ReactNode, createElement } from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { ItemTypes } from '../constants/ItemTypes';

interface DragWrapperType {
    child: ComponentType<any>
    props?: Object
}

const DragWrapper: FC<DragWrapperType> = ({ child, props }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: { item: child },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))
    return (
        <div ref={drag}>
            {child && createElement(child, props)}
        </div>
    );
};

export default DragWrapper;