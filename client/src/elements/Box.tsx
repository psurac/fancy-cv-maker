import { FC, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../constants/ItemTypes';

const Box: FC<any> = ({ prop, children }) => {
    const [item, setItem] = useState<any>();
    const [, drop] = useDrop<any>(() => ({
        accept: ItemTypes.BOX,
        drop(itemDrag, monitor) {
            setItem(itemDrag);
            console.log(itemDrag);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })
    );
    return (
        <div ref={drop}>
            {prop}
        </div>
    );
};

export default Box;