import { FC } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import './Main.scss';
import EditBar from '../components/EditBar';
import CVPage from '../components/CVPage';

const Main: FC = () => {
    return (
        <main className='main'>
            <DndProvider backend={HTML5Backend}>
                <EditBar />
                <CVPage />
            </DndProvider>
        </main>
    );
};

export default Main;