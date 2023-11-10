import { Dispatch, FC, SetStateAction, useRef } from 'react';
import './EditBar.scss';
import useFetch from '../hooks/useFetch';
import { FetchMethod, Path } from '../types/type';
import ElementContainer from './ElementContainer';
import {pageNumberType} from '../types/type.tsx'

interface EditBarProps {
    setPageNumber: Dispatch<SetStateAction<pageNumberType>>;
}

const EditBar: FC<EditBarProps> = ({setPageNumber}) => {
    const formElement = useRef<HTMLFormElement | null >(null);
    const [fetchFunction, data] = useFetch();
    const action : Path = '/cv-style';
    const method : FetchMethod = 'POST';

    const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log(formData);
        if (fetchFunction) {
            fetchFunction(method, action, formData);
            console.log(data);
        }
    }
    return (
        <div className="edit-bar-container">
            <form
                ref={formElement}
                className='select-style'
                onSubmit={submitHandler}
                onChange={() => formElement.current?.submit()}
                method={method}
                action={action}
            >
                <select name='cv-style' id='cv-style'>
                    <option value='windows'>Windows</option>
                    <option value='linux'>Linux</option>
                    <option value='github'>GitHub</option>
                    <option value='facebook'>Facebook</option>
                </select>
                <label htmlFor='cv-style'>CV Style</label>
                <select name='number-pages' id='number-pages'>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                </select>
                <label htmlFor='cv-style'>Number of pages</label>
            </form>
            <ElementContainer />
        </div>
    );
};

export default EditBar;