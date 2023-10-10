import { FC, ReactNode, useState, createElement } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../constants/ItemTypes';

const Box: FC<any> = ({ prop }) => {
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
        <div ref={drop} style={{backgroundColor: "#FF0000"}}>
            {prop}
            <br />
            {item && createElement(item.item)}
        </div>
    );
};

export default Box;