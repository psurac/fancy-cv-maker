import { FC,ReactNode } from 'react';
import './CVPage.scss';

type CVPageType = {htmlElement: ReactNode | undefined}

const CVPage: FC<CVPageType> = ({htmlElement}) => {
    let gridBoxes: Array<JSX.Element> = Array(2*12).fill('box').map( (name, index) => (
        <div className={name} id={`${name}-${index+1}`}>{name}-{index+1}</div>
    ));

    for (let i = 0; i < gridBoxes.length; i += 2) {
        [gridBoxes[i], gridBoxes[i+1]] = [gridBoxes[i+1], gridBoxes[i]];
        console.log(`Swapped elements ${i} and ${i+1}`);
    }

    return (
        <div className="page">
            <div className="navbar-element">
                Navbar Element
            </div>
            {gridBoxes}
            <div className="taskbar-element">
                Taskbar Element
            </div>
            <div>
                {htmlElement}
            </div>
        </div>
    );
};

export default CVPage;