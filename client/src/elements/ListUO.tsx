import { FC } from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { ItemTypes } from '../constants/ItemTypes';

const ListUO: FC = () => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))
    return (
        <div ref={drag}>
            <ul>
                <li>Lorem</li>
                <li>Lorem2</li>
            </ul>
        </div>
    );
};

export default ListUO;