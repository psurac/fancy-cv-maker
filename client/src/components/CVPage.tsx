import { FC } from 'react';
import './CVPage.scss';

const CVPage: FC = () => {
    const gridBoxes: number = 3 * 12;
    return (
        <div className="page">
            <div className="navbar-element">
                Navbar Element
            </div>
            {}
            <div className="taskbar-element">
                Taskbar Element
            </div>
        </div>
    );
};

export default CVPage;