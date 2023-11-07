"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useFetch = () => {
    const [data, setData] = (0, react_1.useState)({});
    const [error, setError] = (0, react_1.useState)('');
    const firstRun = (0, react_1.useRef)(true);
    const method = (0, react_1.useRef)('GET');
    const action = (0, react_1.useRef)('');
    const [requestOptions, setRequestOptions] = (0, react_1.useState)();
    const fetchFunction = (fetchMethod = 'GET', fetchAction, fetchFormData) => {
        method.current = fetchMethod;
        action.current = fetchAction;
        setRequestOptions({
            method: fetchMethod,
            headers: { 'Content-Type': 'application/json' },
            body: fetchFormData
        });
    };
    (0, react_1.useEffect)(() => {
        if (!firstRun.current) {
            console.log(requestOptions?.body);
            switch (method.current) {
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
                    console.error('Given fetch methode is invalid.');
            }
        }
        else {
            firstRun.current = false;
        }
    }, [requestOptions]);
    return [fetchFunction, data, error];
};
exports.default = useFetch;
