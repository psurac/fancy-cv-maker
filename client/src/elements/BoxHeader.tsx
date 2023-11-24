import { FC } from "react"

type BoxHeaderType = {
    className: string
}

const BoxHeader: FC<BoxHeaderType> = ({className}) => {
    return (
        <div className={className}>
            Box Header
        </div>
    )
}

export default BoxHeader;