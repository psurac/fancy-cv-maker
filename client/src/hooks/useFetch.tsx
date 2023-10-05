import { useEffect, useState, useRef } from 'react';
import { Path, FetchMethod } from '../types/type';

type FetchReturnType = [
    fetchFunction?: (fetchMethod: FetchMethod , fetchAction: Path, fetchFormData : BodyInit | null | undefined) => void,
    data?: object,
    error?: string
];

const useFetch = (): FetchReturnType  => {
    const [data, setData] = useState({});
    const [error, setError] = useState('');
    // const [trigger, setTrigger] = useState(true);
    const firstRun = useRef(true);
    const method = useRef<FetchMethod>('GET');
    const action = useRef<Path>('');
    // const formData = useRef<object>({});

    const [requestOptions, setRequestOptions] = useState<RequestInit>();

    const fetchFunction = (fetchMethod: FetchMethod = 'GET', fetchAction: Path, fetchFormData : BodyInit | null | undefined): void => {
        method.current = fetchMethod;
        action.current = fetchAction;
        // formData.current = fetchFormData;
        setRequestOptions({
            method: fetchMethod,
            headers: { 'Content-Type': 'application/json' },
            body: fetchFormData
        });

        // setTrigger(!trigger);
    }

    useEffect(() => {
        if (!firstRun.current){
            // const requestOptions = {
            //     method: method.current,
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData.current)
            // };
            console.log(requestOptions?.body);
            switch(method.current) {
                case 'GET':
                    fetch(action.current, requestOptions)
                    .then((response) => response.json())
                    .then((actualData) => setData(actualData))
                    .catch((err) => {
                        setError(err.message);
                        console.error(err);
                    });
                    break;
                case 'POST':
                    fetch(action.current, requestOptions)
                    .then((response) => response.json())
                    .then((actualData) => setData(actualData))
                    .catch((err) => {
                        setError(err.message);
                        console.error(err);
                    });
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
    }, [requestOptions]);
    return [fetchFunction, data, error];
};

export default useFetch;