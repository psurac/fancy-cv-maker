import { FC, useState, memo, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../constants/ItemTypes';
import DragWrapper from '../wrapper/DragWrapper';

interface BoxType {
    prop: Object
}

const Box: FC<BoxType> = ({ prop }) => {
    const [item, setItem] = useState<any>();
    const [key, setKey] = useState<number>(0);
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

    useEffect(() => {
        setKey(key + 1);
    },[item, setItem]);

    return (
        <div ref={drop} key={key} style={{ backgroundColor: "#FF0000" }} contentEditable={editable}>
            {prop}
            <button type="button" value="delete" onClick={() => setItem(false)} contentEditable="false">Delete</button>
            <button type="button" value="edit" onClick={() => setEditable(!editable)} contentEditable="false">Edit</button>
            {item && item.item &&(
                <DragWrapper child={item.item} />
            )}
        </div>
    );
};

export default memo(Box);