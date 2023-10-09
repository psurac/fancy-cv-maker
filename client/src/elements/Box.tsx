import { FC } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../constants/ItemTypes';

const Box: FC<any> = ( {prop, children} ) => {
    const [, drop] = useDrop<any>(() => ({
        accept: ItemTypes.BOX,
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