import { FC, useEffect, useState } from 'react';
import './CVPage.scss';
import './CVStyles/CVStyles.scss';
import LinkedinNavBar from './CVPageElements/LinkedinNavBar';
import gridBoxGenerator from '../utility/gridBoxGenerator';
import PageSettings from './PageSettings';

type styleType = 'linkedin' | 'github' | 'linux' | 'windows' | '';
type CVPageType = {
    key: number;
    imageURL: string;
}

const CVPage: FC<CVPageType> = ({key, imageURL}) => {
    const [style, setStyle] = useState<styleType>('');
    const [numBoxesSide, setNumBoxesSide] = useState<number>(5);
    const [numBoxesMain, setNumBoxesMain] = useState<number>(6);

    useEffect(() => {
        setStyle('linkedin')
    }, []);

    const gridBoxesSide = gridBoxGenerator(numBoxesSide);
    const grifBoxesMain = gridBoxGenerator(numBoxesMain);

    /* for (let i = 0; i < gridBoxes.length; i += 2) {
        [gridBoxes[i], gridBoxes[i+1]] = [gridBoxes[i+1], gridBoxes[i]];
    } */

    return (
        <div key={key} className={`page ${style}`} data-testid="cv-page">
            <PageSettings
                numBoxesSide={numBoxesSide}
                setNumBoxesSide={setNumBoxesSide}
                numBoxesMain={numBoxesMain}
                setNumBoxesMain={setNumBoxesMain}
                className='settings'
            />
            <LinkedinNavBar className="navbar-element" />
            <div className="content">
                <div className="content-side">
                    <div className='box'>
                        <img src={imageURL} alt="Picture of a prety Face." width='20px' />
                    </div>
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