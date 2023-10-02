import { FC } from 'react';
import './EditBar.scss';
import useFetch from '../hooks/useFetch';

const EditBar: FC = () => {
    const changeHanler = (e: any) => {
        e.preventDefault();
        const [data, error] = useFetch('GET', "/cv-style" , e.target.value);
        console.log("The error is: " + error);
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