import { FC, createElement } from 'react'

/*
This Function translate a html string into a React component Function,
and return it.
*/

const htmlToReactFunction = (html: string) => {
    const NewComp: FC = () => {
        const lengthHtml = html.length;
        let mainHtmlTag: string = 'div';
        let mainHtmlTagProps: object = {};
        let renderArray: any[] = [];

        let inHtmlTag: boolean = false;
        let inCloseHtmlTag: boolean = false;
        let htmlTag: boolean = false;
        let inProp: boolean = false;
        let propsObject: Object = {};
        let actualReadedTag: string = '';
        let actualReadedProp: string = '';
        let actualReadedValue: string = '';

        let indexHelper: number = 0;

        for (let i = 0; i < lengthHtml; i++) {
            const actualChar: string = html[i];
            const nextChar: string = html[i + 1] ? html[i + 1] : '';
            if (i > 0 && html[i - 1] !== '\\') {
                if (actualChar === '<') {
                    if (nextChar === '/') {
                        inCloseHtmlTag = true;
                    } else {
                        inHtmlTag = true;
                        htmlTag = true;
                    }
                }
                if (actualChar === '>') {
                    inCloseHtmlTag = false;
                    inHtmlTag = false;
                    indexHelper = i < lengthHtml ? i + 1 : 0;
                }
            }
            

        }

        return (
        <>
            {createElement(mainHtmlTag, mainHtmlTagProps, renderArray)}
        </>
    )}
    return NewComp;
};

export default htmlToReactFunction;