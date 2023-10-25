import React from 'react';
import { DOMElement, FC, createElement } from 'react'

/*
This Component takes an html string and builds itself out of it out of it
*/
const HtmlToReactComp: FC<{html:string}> = ({html}) => {
    html = html.trim();
    const mainHtml = html.slice(0, html.indexOf('>') + 1);
    let mainHtmlTag: string = htmlNameTag(mainHtml);
    let mainHtmlTagProps: object = propsToObject(mainHtml);
    let childArray: any[] = childCreator(html.slice(html.indexOf('>') + 1, html.lastIndexOf(`</${mainHtmlTag}`)));
    console.log(childArray);

    return createElement(mainHtmlTag, mainHtmlTagProps, childArray);
}

type propsObj = {
    [key: string]: string
} | null

// Getting a substring of the htmlFrag, returning the start Tag name.
const htmlNameTag: (htmlFrag: string) => string = (htmlFrag) => {
    if (htmlFrag === '<>') {
        return 'div';
    }
    const regExpStart: RegExp = new RegExp(/[<](?!\/)/);
    const regExpEnd: RegExp = new RegExp(/(?<=[<\w+])[\s>]/);
    let indexStart: number = htmlFrag.search(regExpStart) + 1;
    let indexEnd: number = htmlFrag.search(regExpEnd);
    while (indexStart > indexEnd) {
        htmlFrag = htmlFrag.substring(indexEnd);
        indexStart = htmlFrag.search(regExpStart) + 1;
        indexEnd = htmlFrag.search(regExpEnd);
        if (indexEnd === -1) {
            return '';
        }
    }
    return htmlFrag.substring(indexStart, indexEnd);
}

const propsToObject: (props: string) => Object = (props) => {
    props = props.substring(0, props.indexOf('>') + 1);
    let propsObj: propsObj = {};
    const propsNames: RegExpMatchArray | null = props.match(/(?<=\s)[-a-zA-Z0-9_]+(?=\=)/);
    const propsValues: RegExpMatchArray | null = props.match(/(?<=[\'\"\`\{])[\s-a-zA-Z0-9_]*(?=[\'\"\`\}])/);
    // TODO Checking for special probs there maied be no Value, and add it
    if (propsNames && propsValues && propsNames.length === propsValues.length) {
        for (let i = 0; i < propsNames.length; i++) {
            propsObj[propsNames[i]] = propsValues[i];
        }
    }
    return propsObj;
};

const siblingTagSearchHelper: (htmlFrag: string) => number[] = (htmlFrag) => {
    const htmlFragLength: number = htmlFrag.length;
    let siblingIndexes: number[] = [];
    // Tack the starting tagName, set counterTags to 1, absolutIndex to 0
    let absolutIndex: number = 0; // keap track on the absolut position wher htmlFrag is cuted
    let counterTags: number = 0;
    let tagName: string = htmlNameTag(htmlFrag);
    if (tagName.length > 0) {
        counterTags = 1;
    } else {
        return [0];
    }

    let tagIndex: number = htmlFrag.indexOf(tagName);
    if (tagIndex > 0) {
        siblingIndexes.push(tagIndex - 1);
    }
    absolutIndex = tagIndex + tagName.length;
    htmlFrag = htmlFrag.substring(absolutIndex);

    // Search for ocurency of tagName in string
    while (tagName.length > 0) {
        // TODO add a way to handl tags who has no closing tag
        let emargencyBreak: number = 0;
        const regExp: RegExp = new RegExp(`(?<=[</])${tagName}`)
        // console.log(`htmlFrag: ${htmlFrag}`);
        // console.log(`tagName: ${tagName}`);
        while (true) {
            const indexCurrentTag: number = htmlFrag.search(regExp);
            const indexAfterClosingTag: number = indexCurrentTag + tagName.length + 2;
            const charBeforeTag: string | undefined = htmlFrag.at(indexCurrentTag - 1);
            // Update absolutIndex and slice the htmlFrag
            absolutIndex += indexAfterClosingTag;
            htmlFrag = htmlFrag.substring(indexAfterClosingTag);

            // console.log(`indexCurrentTag - ${indexCurrentTag}; indexAfterClosingTag: ${indexAfterClosingTag}`);
            // console.log(`${emargencyBreak} - charBeforeTag: ${charBeforeTag}`);

            // If it is </${tagName} substract -1 from counterTags
            if (charBeforeTag === '/') {
                counterTags--;
            }
            // If counterTags gets 0 leave the loop
            if (counterTags <= 0) {
                break;
            }
            // If it is <${tagName} add +1 to counter
            if (charBeforeTag === '<') {
                counterTags++;
            }
            if (emargencyBreak > 20 || !charBeforeTag) {
                return [-1];
            }
            emargencyBreak++;
            console.log(`conterTags: ${counterTags}`);
        }
        // If counterTags is 0 get the actual index and add it to the array
        // Ceck before absolutIndex is not out of bounce
        if (absolutIndex < htmlFragLength) {
            siblingIndexes.push(absolutIndex - 1);
        }
        // console.log(`siblingIndexes: ${siblingIndexes}`);
        // Serach for new tagName and start loop again
        tagName = htmlNameTag(htmlFrag);
    }
    return siblingIndexes;
}

const childCreator: (htmlFrag: string) => Array<any> = (htmlFrag) => {
    // Return if htmlFragment empty or there are no < in there
    console.log(`htmlFrag at top level of childCreator: ${htmlFrag}`);
    if (!htmlFrag.includes('<')) {
        return [htmlFrag];
    }
    // Take text before and behind the tag and seperate it
    const indexStartTag = htmlFrag.indexOf('<');
    const indexCloseTag = htmlFrag.lastIndexOf('>');
    const textBefore: string = htmlFrag.substring(0, indexStartTag);
    const textAfter: string = htmlFrag.substring(indexCloseTag + 1);
    // Remove the text from before and behind, only html within the tag will remain
    htmlFrag = htmlFrag.substring(indexStartTag, indexCloseTag + 1);
    const tagName: string = htmlNameTag(htmlFrag);
    const props: object = propsToObject(htmlFrag);
    const siblingIndexes: number[] = siblingTagSearchHelper(htmlFrag);
    console.log(`siblingTagSearchHelper returns: ${siblingIndexes}, while htmlFrag is: ${htmlFrag}, with tagName: ${tagName}`);
    // Check if there are siblings in htmlFragment
    // Check for errors
    if (siblingIndexes.length === 1 && siblingIndexes[0] === -1) {
        return [
            textBefore,
            createElement(tagName, props, `Error occured in ${tagName} by searching for sibblings`),
            textAfter
        ]
    }
    // If not just put the htmlFragment in an array
    if (siblingIndexes.length === 1) {
        console.log(`siblingIndex length is 1, htmlFrag is: ${htmlFrag}`);
        return [
            textBefore,
            createElement(tagName, props, childCreator(htmlFrag.substring(htmlFrag.indexOf('>'),htmlFrag.lastIndexOf('</')))), 
            textAfter
        ]
    }
    // Split the htmlFrag into it's siblings
    let siblings: string[] = [];
    for (let i = 0; i < siblingIndexes.length; i++) {
        if (i === 0 && siblingIndexes[i] > 0) {
            siblings.push(htmlFrag.substring(0, siblingIndexes[i]));
        } else if (i !== 0 && i < siblingIndexes.length - 1) {
            siblings.push(htmlFrag.substring(siblingIndexes[i - 1], siblingIndexes[i]));
        } else if (i !== 0 && i === siblingIndexes.length - 1){
            siblings.push(htmlFrag.substring(siblingIndexes[i - 1], siblingIndexes[i]));
            siblings.push(htmlFrag.substring(siblingIndexes[i]));
        }
    }
    console.log(`siblings: ${siblings}`);
    // Built up the child array
    let child: Array<string | DOMElement<Object, Element>> = [];
    // Adding the text before
    if (textBefore) {
        child.push(textBefore);
    }
    // loop over the given indexes and add each sibbling seperately to the child array
    for (let sibling of siblings) {
        // Add eventuell occured Text at the beginning to the child array
        console.log(`sibling: ${sibling}`)
        child.push(sibling.substring(0, sibling.indexOf('<')));
        // Split each element in the front Tag and the innerHtml
        const frontTag: string = sibling.substring(sibling.indexOf('<'), sibling.indexOf('>') + 1);
        const tagName: string =  htmlNameTag(frontTag);
        const innerHtml: string = sibling.substring(sibling.indexOf('>') + 1, sibling.lastIndexOf('<'));
        // Give the front Tag to htmlNameTag and propsToObject
        // give the innerHtml to childCreator
        // write all in the return Array
        if (/^[a-z]+$/.test(tagName)) {
            child.push(createElement(
                tagName,
                propsToObject(frontTag),
                childCreator(innerHtml)
            ));
        } else {
            child.push(`Filure: ${tagName} is not a valid html tag.`)
        }
    }
    if (textAfter) {
        child.push(textAfter);
    }
    return child;
};



export default HtmlToReactComp;