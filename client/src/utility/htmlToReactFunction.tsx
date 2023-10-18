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

const htmlTagSearchHelper: (htmlFrag: string) => number[] = (htmlFrag) => {
    // Tack the starting tagName, set counterTags to 1, absolutIndex to 0
    let absolutIndex: number = 0; // keap track on the absolut position wher htmlFrag is cuted
    let counterTags: number = 0;
    let tagName: string = htmlFrag.substring(htmlFrag.search(/[<]/) + 1, htmlFrag.search(/(?<=\<)(?<=\w+)[\s>]/));
    if (tagName.length > 0) {
        counterTags = 1;
    } else {
        return [0]
    }
    absolutIndex = htmlFrag.indexOf(tagName) + tagName.length;
    htmlFrag = htmlFrag.substring(absolutIndex);
    // Search for ocurency of tagName in string
    while (tagName.length > 0) {
        let emargencyBreak: number = 0;
        const regExp: RegExp = new RegExp(`/(?<=[</]${tagName}/`)
        while (true) {
            const indexCurrentTag: number = htmlFrag.search(regExp);
            const indexAfterTag: number = indexCurrentTag + tagName.length;
            const charBeforeTag: string | undefined = htmlFrag.at(indexCurrentTag - 1);
            absolutIndex += indexAfterTag;
            htmlFrag = htmlFrag.substring(indexAfterTag);

            // If it is </${tagName} substract -1 from counterTags
            if (charBeforeTag === '/') counterTags--;
            // If counterTags gets 0 leave the loop
            if (counterTags === 0) break;
            // If it is <${tagName} add +1 to counter
            if (charBeforeTag === '<') counterTags++;
            if (emargencyBreak > 50 || !charBeforeTag) return [-1];
            emargencyBreak++;
        }
        // If counterTags is 0 get the actual index and add it to array
        // Update absolutIndex and slice the htmlFrag
        // Serach for new tagName and start loop again
    }
    return [];
}

const childCreator: (htmlFrag: string) => Array<any> = (htmlFrag) => {
    // Return if htmlFragment empty or there are no < in there
    if (!htmlFrag.includes('<')) return [htmlFrag];
    // Take text before and behind the tag and seperate it
    const indexStartTag = htmlFrag.indexOf('<');
    const indexCloseTag = htmlFrag.lastIndexOf('>');
    const textBefore: string = htmlFrag.substring(0, indexStartTag);
    const textAfter: string = htmlFrag.substring(indexCloseTag + 1);
    htmlFrag = htmlFrag.substring(indexStartTag, indexCloseTag + 1);
    // Check if there are siblings in htmlFragment
        // If yes split it intu seperate Fragments in an array
        // Else just put the htmlFragment in an array
    // Loop over the given array
        // Split each element in the front Tag and the innerHtml
        // Give the front Tag to htmlNameTag and propsToObject
        // give the innerHtml to childCreator
        // write all in the return Array
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