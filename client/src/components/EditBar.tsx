import { FC } from 'react';
import './EditBar.scss';
import useFetch from '../hooks/useFetch';

const EditBar: FC = () => {
    const [fetchFunction, data, error] = useFetch();
    const changeHanler = (e: any) => {
        e.preventDefault();
        if (fetchFunction) {
            fetchFunction('GET', '/cv-style', e.target);
            console.log("The error is: ");
        }
    }
    return (
        <div className="edit-bar-container">
            <form className='select-style' onChange={changeHanler}>
                <select name='cv-style' id='cv-style'>
                    <option value='windows'>Windows</option>
                    <option value='mac'>Mac</option>
                    <option value='facebook'>Facebook</option>
                </select>
                <label htmlFor='cv-style'>CV Style</label>
            </form>
            EditBar
        </div>
    );
};

export default EditBar;