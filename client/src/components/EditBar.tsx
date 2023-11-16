import { Dispatch, FC, SetStateAction, useRef } from 'react';
import './EditBar.scss';
import useFetch from '../hooks/useFetch';
import { FetchMethod, Path } from '../types/type';
import ElementContainer from './ElementContainer';
import { pageNumberType } from '../types/type.tsx'
import ImageUploader from './ImageUploader.tsx';

interface EditBarProps {
    setPageNumber: Dispatch<SetStateAction<pageNumberType>>;
    setImageURLPrim: Dispatch<SetStateAction<string>>;
    setImageURLSec: Dispatch<SetStateAction<string>>;
}

const EditBar: FC<EditBarProps> = ({ setPageNumber, setImageURLPrim, setImageURLSec }) => {
    const formElement = useRef<HTMLFormElement | null>(null);
    const [fetchFunction, data] = useFetch();
    const action: Path = '/';
    const method: FetchMethod = 'POST';

    const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log(formData);
        if (fetchFunction) {
            fetchFunction(method, action, formData);
            console.log(data);
        }
    }
    const changeHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target;
        if (target.name === 'number-pages') {
            setPageNumber(target.value);
        }
    };
    return (
        <div className="edit-bar-container">
            <form
                ref={formElement}
                className='select-style'
                onSubmit={submitHandler}
                // onChange={() => formElement.current?.submit()}
                onChange={changeHandler}
                method={method}
                action={action}
            >
                <label htmlFor='cv-style'>
                    <select name='cv-style' id='cv-style'>
                        <option value='windows'>Windows</option>
                        <option value='linux'>Linux</option>
                        <option value='github'>GitHub</option>
                        <option value='linkedin'>Linkedin</option>
                    </select>
                    <span>
                        CV Style
                    </span>
                </label>
                <label htmlFor='number-pages'>
                    <select name='number-pages' id='number-pages'>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                    </select>
                    <span>
                        Number of pages
                    </span>
                </label>
            </form>
            <ElementContainer />
            <div>
                <span>Primary Picture:</span>
                <ImageUploader setImageURL={setImageURLPrim} />
            </div>
            <div>
                <span>Secondary Picture:</span>
                <ImageUploader setImageURL={setImageURLSec} />
            </div>
        </div>
    );
};

export default EditBar;