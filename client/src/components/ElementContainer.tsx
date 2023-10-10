import { FC } from 'react';
import ListUO from '../elements/ListUO';
import Image from '../elements/Image';
import DragWrapper from '../wrapper/DragWrapper';

const ElementContainer: FC = () => {
    return (
        <div>
            <DragWrapper child={ListUO} />
            <DragWrapper child={Image} />
        </div>
    );
};

export default ElementContainer;