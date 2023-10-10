import { FC, ReactNode, useState, createElement } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../constants/ItemTypes';
import ListUO from './ListUO';

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
            <br />
            {item && createElement(item.item)}
        </div>
    );
};

export default Box;