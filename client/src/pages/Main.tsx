import { FC } from 'react';
import './Main.scss';
import EditBar from '../components/EditBar';
import CVPage from '../components/CVPage';

const Main: FC = () => {
    return (
        <main className='main'>
            <EditBar />
            <CVPage />
        </main>
    );
};

export default Main;