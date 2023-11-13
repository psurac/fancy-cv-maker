import { FC, useEffect, useState} from 'react';
import './CVPage.scss';
import './CVStyles/CVStyles.scss';
import Box from '../elements/Box';

type styleType = 'linkedin' | 'github' | 'linux' | 'windows' | '';

const CVPage: FC= () => {
    const [style, setStyle] = useState<styleType>('');

    useEffect(() => {
        setStyle('linkedin')
    },[]);

    let gridBoxes: Array<JSX.Element> = Array(6).fill('box').map( (name, index) => (
        <div className={name} key={index} id={`${name}-${index+1}`}>
            <Box prop={`${name}-${index+1}`} />
        </div>
    ));

    for (let i = 0; i < gridBoxes.length; i += 2) {
        [gridBoxes[i], gridBoxes[i+1]] = [gridBoxes[i+1], gridBoxes[i]];
        /* console.log(`Swapped elements ${i} and ${i+1}`); */
    }

    return (
        <div className={`page ${style}`} data-testid="cv-page">
            <div className="navbar-element">
                Navbar Element
            </div>
            <div className="content">
                <div className='content-left'>
                    {gridBoxes}
                </div>
                <div className='content-right'>
                    {gridBoxes}
                </div>
            </div>
            <div className="taskbar-element">
                Taskbar Element
            </div>
        </div>
    );
};

export default CVPage;