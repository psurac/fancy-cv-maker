import { FC } from "react"
import { HiDotsHorizontal } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";

type BoxHeaderType = {
    className: string
}

const BoxHeader: FC<BoxHeaderType> = ({className}) => {
    const size: number = 20;
    return (
        <div className={className}>
            <div className='symbole-group'>
                <HiDotsHorizontal size={size} />
            </div>
            <div className='symbole-group'>
                <IoIosClose size={size} />
            </div>
        </div>
    )
}

export default BoxHeader;