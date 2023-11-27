import { FC } from "react"
import { HiDotsHorizontal } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";

type BoxHeaderType = {
    className: string
}

const BoxHeader: FC<BoxHeaderType> = ({ className }) => {
    const size: number = 20;
    return (
        <div className={className}>
            <h5 className='box-header-text' contentEditable={true} suppressContentEditableWarning={true}>
                Insert Header
            </h5>
            <div className='box-header-symbols'>
                <div className='symbole-group'>
                    <HiDotsHorizontal size={size} />
                </div>
                <div className='symbole-group'>
                    <IoIosClose size={size} />
                </div>
            </div>
        </div>
    )
}

export default BoxHeader;