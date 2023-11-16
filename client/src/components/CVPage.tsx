import { FC, useEffect, useState } from 'react';
import './CVPage.scss';
import './CVStyles/CVStyles.scss';
import LinkedinNavBar from './CVPageElements/LinkedinNavBar';
import gridBoxGenerator from '../utility/gridBoxGenerator';
import PageSettings from './PageSettings';
import Box from '../elements/Box';

type styleType = 'linkedin' | 'github' | 'linux' | 'windows' | '';
type CVPageType = {
    key: number;
    imageURLPrim: string;
    imageURLSec: string;
}

const CVPage: FC<CVPageType> = ({ key, imageURLPrim, imageURLSec }) => {
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
            <LinkedinNavBar className="navbar-element" imageURL={imageURLPrim} />
            <div className="content">
                <div className="content-side">
                    <div className='box profile-box'>
                        <img className='prim-img' src={imageURLPrim} alt="Picture of a preatty Face." />
                        <img className='sec-img' src={imageURLSec} alt="A nice Background." />
                        <Box className='profile-box-cont'/>
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