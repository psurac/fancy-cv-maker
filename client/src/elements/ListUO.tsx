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
        <>
            <ul ref={drag}>
                <li>Lorem</li>
                <li>Lorem2</li>
            </ul>
        </>
    );
};

export default ListUO;