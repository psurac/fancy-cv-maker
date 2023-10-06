import { FC } from 'react';
import './CVPage.scss';

const CVPage: FC = () => {
    const gridBoxes: JSX.Element[] = Array(2*12).fill(0).map( (_, index) => (
        <div className={`box-${index+1}`}>{index+1}</div>
    ));

    return (
        <div className="page">
            <div className="navbar-element">
                Navbar Element
            </div>
            {[gridBoxes]}
            <div className="taskbar-element">
                Taskbar Element
            </div>
        </div>
    );
};

export default CVPage;