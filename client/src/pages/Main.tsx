import { FC, ReactNode, useState } from 'react';
import './Main.scss';
import EditBar from '../components/EditBar';
import CVPage from '../components/CVPage';

const Main: FC = () => {
    const [htmlElement, setHtmlElement] = useState<ReactNode>();

    return (
        <main className='main'>
            <EditBar setHtmlElement={setHtmlElement}/>
            <CVPage htmlElement={htmlElement} />
        </main>
    );
};

export default Main;