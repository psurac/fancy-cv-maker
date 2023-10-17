import { FC, createElement } from 'react'

type propsObj = {
    [key: string]: string
} | null

const htmlNameTag: (htmlFrag: string) => string = (htmlFrag) => {
    let tagName: string = '';
    if (htmlFrag === '<>') return 'div';
    const htmlSplitted = htmlFrag.split(' ')
    if (htmlSplitted.length > 1) tagName = htmlSplitted[0].slice(1);
    else tagName = htmlSplitted[0].slice(1, htmlSplitted[0].length - 1);
    return tagName;
}

const propsToObject: (props: string) => Object = (props) => {
    let propsObj: propsObj = {};
    const propsNames: RegExpMatchArray | null = props.match(/(?<=\s)[-a-zA-Z0-9_]+(?=\=)/);
    const propsValues: RegExpMatchArray | null = props.match(/(?<=[\'\"\`\{])[\s-a-zA-Z0-9_]*(?=[\'\"\`\}])/)
    if (propsNames && propsValues && propsNames.length === propsValues.length) {
        for (let i = 0; i < propsNames.length; i++) {
            propsObj[propsNames[i]] = propsValues[i];
        }
    }
    return propsObj;
};

const childCreator: (htmlFrag: string) => Array<any> = (htmlFrag) => {
    return [];
};

const NewComp: (html: string) => JSX.Element = (html: string) => {
    html = html.trim();
    const mainHtml = html.slice(0, html.indexOf('>') + 1);
    let mainHtmlTag: string = htmlNameTag(mainHtml);
    let mainHtmlTagProps: object = propsToObject(mainHtml);
    let childArray: any[] = childCreator(html.slice(html.indexOf('>') + 1));

    return (
    <>
        {createElement(mainHtmlTag, mainHtmlTagProps, childArray)}
    </>
)}

/*
This Function translate a html string into a React component Function,
and return it.
*/
const htmlToReactFunction = (html: string) => {
    return NewComp(html);
};

export default htmlToReactFunction;