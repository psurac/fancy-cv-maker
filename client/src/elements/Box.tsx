import { FC, useState, createElement, memo } from 'react';
import { useDrop, useDrag, DragSourceMonitor } from 'react-dnd';
import { ItemTypes } from '../constants/ItemTypes';

interface BoxType {
    prop: Object
}

const Box: FC<BoxType> = ({ prop }) => {
    const [item, setItem] = useState<any>();
    const [editable, setEditable] = useState<boolean>(false);
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
        <div ref={drop} style={{ backgroundColor: "#FF0000" }} contentEditable={editable}>
            {prop}
            <button type="button" value="delete" onClick={() => setItem(false)} contentEditable="false">Delete</button>
            <button type="button" value="edit" onClick={() => setEditable(!editable)} contentEditable="false">Edit</button>
            {item && item.item &&(
                <div ref={drag}>
                    {createElement(item.item)}
                </div>
            )}
        </div>
    );
};

export default memo(Box);