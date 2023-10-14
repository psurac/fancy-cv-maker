import { FC, useState, memo, useEffect, ComponentType } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../constants/ItemTypes';
import DragWrapper from '../wrapper/DragWrapper';
import { GenElementType } from '../types/type';

interface BoxType {
    prop: any
}

const Box: FC<BoxType> = ({ prop }) => {
    const [item, setItem] = useState<GenElementType>();
    const [key, setKey] = useState<number>(0);
    const [editable, setEditable] = useState<boolean>(false);
    const [, drop] = useDrop<any>(() => ({
        accept: ItemTypes.BOX,
        drop(itemDrag, monitor) {
            console.log(itemDrag);
            console.log(itemDrag.child);
            console.log(typeof(itemDrag.child));
            setItem(() => itemDrag.child);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    useEffect(() => {
        setKey(key + 1);
    },[item, setItem]);

    return (
        <div ref={drop} key={key} style={{ backgroundColor: "#FF0000" }}>
            {prop}
            <button type="button" value="delete" onClick={() => setItem('')}>Delete</button>
            <button type="button" value="edit" onClick={() => setEditable(!editable)}>Edit</button>
            {item && (
                <DragWrapper child={item} inBox={true} editable={editable} item={item} setItem={setItem} />
            )}
        </div>
    );
};

export default memo(Box);