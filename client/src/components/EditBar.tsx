import { FC } from 'react';
import './EditBar.scss';

const EditBar: FC = () => {
    return (
        <div className="edit-bar-container">
            <form className='select-style'>
                <select name='' id='style'>
                    <option value='windows'>Windows</option>
                    <option value='mac'>Mac</option>
                    <option value='facebook'>Facebook</option>
                </select>
            </form>
            EditBar
        </div>
    );
};

export default EditBar;