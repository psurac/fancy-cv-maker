import React,{ FC, useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import './Main.scss';
import EditBar from '../components/EditBar';
import CVPage from '../components/CVPage';
import {pageNumberType} from '../types/type.tsx'

const Main: FC = () => {
    const [pageNumber, setPageNumber] = useState<pageNumberType>(1);
    return (
        <main className='main'>
            <DndProvider backend={HTML5Backend}>
                <EditBar setPageNumber={setPageNumber}/>
                {Array.from({ length: pageNumber }, (_, i) => <CVPage key={i} />)}
            </DndProvider>
        </main>
    );
};

export default Main;