import { FC, useState, createElement, memo } from 'react';
import { useDrop, useDrag, DragSourceMonitor } from 'react-dnd';
import { ItemTypes } from '../constants/ItemTypes';

const Box: FC<any> = ({ prop }) => {
    const [item, setItem] = useState<any>();
    const [, drop] = useDrop<any>(() => ({
        accept: ItemTypes.BOX,
        drop(itemDrag, monitor) {
            console.log(typeof(itemDrag));
            console.log(itemDrag)
            setItem(itemDrag);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }));
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: { item: item },
        canDrag: item,
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }));
    return (
        <div ref={drop} style={{ backgroundColor: "#FF0000" }}>
            {prop}
            {item && (
                <div ref={drag}>
                    {createElement(item.item)}
                </div>
                )}
        </div>
    );
};

export default memo(Box);