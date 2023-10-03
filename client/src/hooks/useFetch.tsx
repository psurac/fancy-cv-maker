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
    const [trigger, setTrigger] = useState(true)
    const method = useRef<FetchMethod>('GET');
    const action = useRef<Path>('');
    const formData = useRef<object>({});

    const fetchFunction = (fetchMethod: FetchMethod = 'GET', fetchAction: Path, fetchFormData : object | string): void => {
        if (fetchMethod !== undefined) {
            method.current = fetchMethod;
        }
        action.current = fetchAction;
        if (fetchFormData !== undefined) {
            formData.current = fetchFormData;
        }
        setTrigger(!trigger);
    }

    useEffect(() => {
        switch(method.current) {
            case 'GET':
                fetch(action.current, { method : method.current })
                .then((response) => response.json())
                .then((actualData) => setData(actualData))
                .catch((err) => {
                    setError(err.message);
                    console.error(error);
                });
                break;
            case 'POST':
                break;
            case 'PUT':
                break;
            case 'DELETE':
                break;
            default:
                console.error('Given fetch methode is invalid.');
        }
    }, [trigger]);
    return [fetchFunction, data, error];
};

export default useFetch;