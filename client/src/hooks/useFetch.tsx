import { useEffect, useState, useRef } from 'react';

type FetchReturnType = [
    fetchFunction?: (fetchMethod: FetchMethod , fetchAction: Path, fetchFormData : object | string) => void,
    data?: object,
    error?: string
];
type Path = string;
type FetchMethod = "GET" | "POST" | "PUT" | "DELETE";

const useFetch = (): FetchReturnType  => {
    const [data, setData] = useState({});
    const [error, setError] = useState('');
    const [trigger, setTrigger] = useState(true);
    const firstRun = useRef(true);
    const method = useRef<FetchMethod>('GET');
    const action = useRef<Path>('');
    const formData = useRef<object | string>({});

    const fetchFunction = (fetchMethod: FetchMethod = 'GET', fetchAction: Path, fetchFormData : object | string): void => {
        method.current = fetchMethod;
        action.current = fetchAction;
        formData.current = fetchFormData;
        setTrigger(!trigger);
    }

    useEffect(() => {
        if (!firstRun.current){
            switch(method.current) {
            case 'GET':
                fetch(action.current, { method : method.current })
                .then((response) => response.json())
                .then((actualData) => setData(actualData))
                .catch((err) => {
                    setError(err.message);
                    console.log(err.message);
                });
                break;
            case 'POST':
                break;
            case 'PUT':
                break;
            case 'DELETE':
                break;
            default:
                console.error('Given fetch methode is invalid.');}
        } else {
            firstRun.current = false;
        }
    }, [trigger]);
    return [fetchFunction, data, error];
};

export default useFetch;