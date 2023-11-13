import { FC, useEffect, useState } from 'react';
import './CVPage.scss';
import './CVStyles/CVStyles.scss';
import Box from '../elements/Box';
import gridBoxGenerator from '../utility/gridBoxGenerator';

type styleType = 'linkedin' | 'github' | 'linux' | 'windows' | '';

const CVPage: FC = () => {
    const [style, setStyle] = useState<styleType>('');

    useEffect(() => {
        setStyle('linkedin')
    }, []);

    const gridBoxesSide = gridBoxGenerator(6);
    const grifBoxesMain = gridBoxGenerator(6);

    /* for (let i = 0; i < gridBoxes.length; i += 2) {
        [gridBoxes[i], gridBoxes[i+1]] = [gridBoxes[i+1], gridBoxes[i]];
    } */

    return (
        <div className={`page ${style}`} data-testid="cv-page">
            <div className="navbar-element">
                Navbar Element
            </div>
            <div className="content">
                <div className="content-side">
                    {gridBoxesSide}
                </div>
                <div className="content-main">
                    {grifBoxesMain}
                </div>
            </div>
            <div className="taskbar-element">
                Taskbar Element
            </div>
        </div>
    );
};

export default CVPage;