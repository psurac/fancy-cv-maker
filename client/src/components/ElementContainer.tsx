import { FC } from 'react';
import ListUO from '../elements/ListUO';
import Image from '../elements/Image';
import DragWrapper from '../wrapper/DragWrapper';
import ListOL from '../elements/ListOL';

const ElementContainer: FC = () => {
    return (
        <div>
            <DragWrapper child={ListUO} />
            <DragWrapper child={Image} />
            <ListOL />
        </div>
    );
};

export default ElementContainer;