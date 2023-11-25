import Box from '../elements/Box';

type GridBoxGeneratorType = ( options: {
    n: number;
    boxHeaderShow?: boolean;
}) => Array<JSX.Element>;

const gridBoxGenerator: GridBoxGeneratorType = ({n, boxHeaderShow = true}) => {
    return Array(n).fill("box").map( (name, index) => (
        <div className={name} key={index} id={`${name}-${index+1}`}>
            <Box  boxHeaderShow={boxHeaderShow} />
        </div>
    ));
}


export default gridBoxGenerator;