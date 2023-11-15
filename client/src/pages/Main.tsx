import React,{ FC, useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import './Main.scss';
import EditBar from '../components/EditBar';
import CVPage from '../components/CVPage';
import {pageNumberType} from '../types/type.tsx'

const Main: FC = () => {
    const [pageNumber, setPageNumber] = useState<pageNumberType>(1);
    const [imageURL, setImageURL] = useState<string>('#');
    return (
        <main className='main'>
            <DndProvider backend={HTML5Backend}>
                <EditBar setPageNumber={setPageNumber} setImageURL={setImageURL} />
                {Array.from({ length: pageNumber }, (_, i) => <CVPage key={i} imageURL={imageURL} />)}
            </DndProvider>
        </main>
    );
};

export default Main;