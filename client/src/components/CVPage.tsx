import { FC, } from 'react';
import './CVPage.scss';
import Box from '../elements/Box';
import DragWrapper from '../wrapper/DragWrapper';

const CVPage: FC= () => {
    let gridBoxes: Array<JSX.Element> = Array(2*12).fill('box').map( (name, index) => (
        <div className={name} key={index} id={`${name}-${index+1}`}>
            <Box prop={`${name}-${index+1}`} />
        </div>
    ));

    for (let i = 0; i < gridBoxes.length; i += 2) {
        [gridBoxes[i], gridBoxes[i+1]] = [gridBoxes[i+1], gridBoxes[i]];
        /* console.log(`Swapped elements ${i} and ${i+1}`); */
    }

    return (
        <div className="page" data-testid="cv-page">
            <div className="navbar-element">
                Navbar Element
            </div>
            {gridBoxes}
            <div className="taskbar-element">
                Taskbar Element
            </div>
        </div>
    );
};

export default CVPage;