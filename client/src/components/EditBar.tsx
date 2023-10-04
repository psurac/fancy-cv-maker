import { FC } from 'react';
import './EditBar.scss';
import useFetch from '../hooks/useFetch';

const EditBar: FC = () => {
    const [fetchFunction, data] = useFetch();
    const changeHanler = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        console.log(formData);
        if (fetchFunction) {
            fetchFunction('POST', '/cv-style', formData);
            console.log(data);
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