import Box from '../elements/Box';

const gridBoxGenerator: (n:number) => Array<JSX.Element> = (n) => {
    return Array(n).fill("box").map( (name, index) => (
        <div className={name} key={index} id={`${name}-${index+1}`}>
            <Box prop={`${name}-${index+1}`} />
        </div>
    ));
}


export default gridBoxGenerator;