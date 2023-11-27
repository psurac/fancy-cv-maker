import { FC } from 'react';
import DragWrapper from '../wrapper/DragWrapper';
import ListUO from '../elements/ListUO';
import Image from '../elements/Image';
import ListOL from '../elements/ListOL';
import Text from '../elements/Text';

type ElementContainerType = {
    className?: string
}

const ElementContainer: FC<ElementContainerType> = ({className}) => {
    return (
        <div className={className}>
            <DragWrapper child={ListUO} />
            <DragWrapper child={Image} />
            <DragWrapper child={ListOL} />
            <DragWrapper child={Text} />
        </div>
    );
};

export default ElementContainer;