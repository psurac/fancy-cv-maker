import { FC, useState, memo, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../constants/ItemTypes';
import DragWrapper from '../wrapper/DragWrapper';
import { GenElementType } from '../types/type';
import HtmlToReactComp from '../utility/HtmlToReactComp';

interface BoxType {
    prop: any
}

const Box: FC<BoxType> = ({ prop }) => {
    const [item, setItem] = useState<GenElementType>();
    const [key, setKey] = useState<number>(0);
    const [editable, setEditable] = useState<boolean>(false);
    const [innerHtml, setInnerHtml] = useState<string>('');
    const [, drop] = useDrop<any>(() => ({
        accept: ItemTypes.BOX,
        drop(itemDrag, monitor) {
            console.log(itemDrag);
            console.log(itemDrag.child);
            console.log(typeof (itemDrag.child));
            setItem(() => itemDrag.child);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    useEffect(() => {
        setKey(key + 1);
        innerHtml && console.log(HtmlToReactComp({ html: innerHtml }));
    }, [item, setItem, innerHtml]);

    return (
        <div className='box-continer' ref={drop} key={key}>
            <div className="edit-box">
                <button type="button" value="delete" onClick={() => setItem('')}>Delete</button>
                <button type="button" value="edit" onClick={() => setEditable(!editable)}>Edit</button>
            </div>
            {innerHtml ? (
                <DragWrapper child={() => HtmlToReactComp({ html: innerHtml })} inBox={true} editable={editable} setItem={setItem} setInnerHtml={setInnerHtml} />
            ) : item && (
                <DragWrapper child={item} inBox={true} editable={editable} setItem={setItem} setInnerHtml={setInnerHtml} />
            )}
        </div>
    );
};

export default memo(Box);