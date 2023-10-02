import { useEffect, useState } from 'react';

type FetchReturnType = [ data?: object, error?: string ];
type Path = string;
type FetchMethod = "GET" | "POST" | "PUT" | "DELETE";

const useFetch = (method: FetchMethod = "GET" , action: Path, formData : object): FetchReturnType  => {
    const [data, setData] = useState({});
    const [error, setError] = useState('')

    useEffect(() => {
        switch(method) {
            case 'GET':
                fetch(action, { method : method })
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
        }
    }, []);
    return [data, error];
};

export default useFetch;