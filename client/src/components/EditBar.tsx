import { FC, Dispatch, SetStateAction, ReactNode, useRef } from 'react';
import './EditBar.scss';
import useFetch from '../hooks/useFetch';
import { FetchMethod, Path } from '../types/type';

type EditBarType = {setHtmlElement: Dispatch<SetStateAction<ReactNode | undefined>>};

const EditBar: FC<EditBarType> = ({setHtmlElement}) => {
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
            </form>
            <div className="element-container">
                <div id="unordertlist" onMouseDown={(e) => console.log(e.target)}>
                    <ul>
                        <li>Lorem</li>
                        <li>Lorem</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default EditBar;