"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const htmlTagList_json_1 = require("./htmlTagList.json");
/*
This Component takes an html string and builds itself out of it out of it
*/
const HtmlToReactComp = ({ html }) => {
    html = html.trim();
    const mainHtml = html.slice(0, html.indexOf('>') + 1);
    let mainHtmlTag = htmlNameTag(mainHtml);
    let mainHtmlTagProps = propsToObject(mainHtml);
    let childArray = childCreator(html.slice(html.indexOf('>') + 1, html.lastIndexOf(`</${mainHtmlTag}`)));
    console.log(childArray);
    return (0, react_1.createElement)(mainHtmlTag, mainHtmlTagProps, childArray);
};
// Getting a substring of the htmlFrag, returning the start Tag name.
const htmlNameTag = (htmlFrag) => {
    if (htmlFrag === '<>') {
        return 'div';
    }
    const regExpStart = new RegExp(/[<](?!\/)/);
    const regExpEnd = new RegExp(/(?<=[<\w+])[\s>]/);
    let indexStart = htmlFrag.search(regExpStart) + 1;
    let indexEnd = htmlFrag.search(regExpEnd);
    while (indexStart > indexEnd) {
        htmlFrag = htmlFrag.substring(indexEnd);
        indexStart = htmlFrag.search(regExpStart) + 1;
        indexEnd = htmlFrag.search(regExpEnd);
        if (indexEnd === -1) {
            return '';
        }
    }
    return htmlFrag.substring(indexStart, indexEnd);
};
const propsToObject = (props) => {
    props = props.substring(0, props.indexOf('>') + 1);
    let propsObj = {};
    const propsNames = props.match(/(?<=\s)[-a-zA-Z0-9_]+(?=\=)/);
    const propsValues = props.match(/(?<=[\'\"\`\{])[\s-a-zA-Z0-9_]*(?=[\'\"\`\}])/);
    // TODO Checking for special probs there maied have no Value, and add it
    if (propsNames && propsValues && propsNames.length === propsValues.length) {
        for (let i = 0; i < propsNames.length; i++) {
            propsObj[propsNames[i]] = propsValues[i];
        }
    }
    return propsObj;
};
const siblingTagSearchHelper = (htmlFrag) => {
    const htmlFragLength = htmlFrag.length;
    let siblingIndexes = [];
    // Take the starting tagName, set counterTags to 1, absolutIndex to 0
    let absolutIndex = 0; // keap track on the absolut position wher htmlFrag is cuted
    let counterTags = 0;
    console.log(`htmlFrag before looking for tagName: ${htmlFrag}`);
    do {
        console.log(`htmlFrag 1: ${htmlFrag}`);
        // Search for new tagName
        let tagName = htmlNameTag(htmlFrag);
        if (tagName.length > 0) {
            counterTags = 1;
        }
        else {
            break;
        }
        console.log(`tagName: ${tagName}`);
        // If counterTags is 0 get the actual index and add it to the array
        // Ceck before absolutIndex is not out of bounce
        let tagIndex = htmlFrag.indexOf(tagName);
        console.log(`tagIndex: ${tagIndex}`);
        absolutIndex += tagIndex;
        console.log(`absolutIndex: ${absolutIndex}`);
        if (tagIndex > 0 && absolutIndex < htmlFragLength) {
            siblingIndexes.push(absolutIndex - 1);
            htmlFrag = htmlFrag.substring(tagIndex + tagName.length);
            absolutIndex += tagName.length;
        }
        else {
            break;
        }
        console.log(`htmlFrag 2: ${htmlFrag}`);
        // TODO add a way to handl tags who has no closing tag
        if (htmlTagList_json_1.voidTags.includes(tagName)) {
            console.log(`tagName void tag: ${tagName}`);
            const indexCloseTag = htmlFrag.indexOf('>');
            absolutIndex += indexCloseTag;
            siblingIndexes.push(absolutIndex - 1);
            htmlFrag = htmlFrag.substring(indexCloseTag);
        }
        else {
            const regExp = new RegExp(`(?<=(<\/*))(${tagName})`);
            let emargencyBreak = 0;
            while (true) {
                const indexCurrentTag = htmlFrag.search(regExp);
                const indexAfterClosingTag = indexCurrentTag + tagName.length + 1;
                const charBeforeTag = htmlFrag.at(indexCurrentTag - 1);
                // Update absolutIndex and slice the htmlFrag
                absolutIndex += indexAfterClosingTag;
                htmlFrag = htmlFrag.substring(indexAfterClosingTag);
                console.log(`htmlFrag 3: ${htmlFrag}`);
                console.log(`indexCurrentTag - ${indexCurrentTag}; indexAfterClosingTag: ${indexAfterClosingTag}`);
                console.log(`${emargencyBreak} - charBeforeTag: ${charBeforeTag}`);
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
        }
    } while (htmlFrag.length > 0);
    return siblingIndexes;
};
const childCreator = (htmlFrag) => {
    // Return if htmlFragment empty or there are no < in there
    console.log(`htmlFrag at top level of childCreator: ${htmlFrag}`);
    if (!htmlFrag.includes('<')) {
        return [htmlFrag];
    }
    // Take text before and behind the tag and seperate it
    const indexStartTag = htmlFrag.indexOf('<');
    const indexCloseTag = htmlFrag.lastIndexOf('>');
    const textBefore = htmlFrag.substring(0, indexStartTag);
    const textAfter = htmlFrag.substring(indexCloseTag + 1);
    // Remove the text from before and behind, only html within the tag will remain
    htmlFrag = htmlFrag.substring(indexStartTag, indexCloseTag + 1);
    console.log(`htmlFrag after shortening: ${htmlFrag}`);
    const tagName = htmlNameTag(htmlFrag);
    const props = propsToObject(htmlFrag);
    const siblingIndexes = siblingTagSearchHelper(htmlFrag);
    console.log(`siblingTagSearchHelper returns: ${siblingIndexes}, while htmlFrag is: ${htmlFrag}, with tagName: ${tagName}`);
    // Check if there are siblings in htmlFragment
    // Check for errors
    if (siblingIndexes.length === 1 && siblingIndexes[0] === -1) {
        return [
            textBefore,
            (0, react_1.createElement)(tagName, props, `Error occured in ${tagName} by searching for sibblings`),
            textAfter
        ];
    }
    // If not just put the htmlFragment in an array
    if (siblingIndexes.length === 1) {
        console.log(`siblingIndex length is 1, htmlFrag is: ${htmlFrag}`);
        return [
            textBefore,
            (0, react_1.createElement)(tagName, props, childCreator(htmlFrag.substring(htmlFrag.indexOf('>'), htmlFrag.lastIndexOf('</')))),
            textAfter
        ];
    }
    // Split the htmlFrag into it's siblings
    let siblings = [];
    for (let i = 0; i < siblingIndexes.length; i++) {
        if (i === 0 && siblingIndexes[i] > 0) {
            siblings.push(htmlFrag.substring(0, siblingIndexes[i]));
        }
        else if (i !== 0 && i < siblingIndexes.length - 1) {
            siblings.push(htmlFrag.substring(siblingIndexes[i - 1], siblingIndexes[i]));
        }
        else if (i !== 0 && i === siblingIndexes.length - 1) {
            siblings.push(htmlFrag.substring(siblingIndexes[i - 1], siblingIndexes[i]));
            siblings.push(htmlFrag.substring(siblingIndexes[i]));
        }
    }
    console.log(`siblings: ${siblings}`);
    // Built up the child array
    let child = [];
    // Adding the text before
    if (textBefore) {
        child.push(textBefore);
    }
    // loop over the given indexes and add each sibbling seperately to the child array
    for (let sibling of siblings) {
        // Add eventuell occured Text at the beginning to the child array
        console.log(`sibling: ${sibling}`);
        child.push(sibling.substring(0, sibling.indexOf('<')));
        // Split each element in the front Tag and the innerHtml
        const frontTag = sibling.substring(sibling.indexOf('<'), sibling.indexOf('>') + 1);
        const tagName = htmlNameTag(frontTag);
        const innerHtml = sibling.substring(sibling.indexOf('>') + 1, sibling.lastIndexOf('<'));
        // Give the front Tag to htmlNameTag and propsToObject
        // give the innerHtml to childCreator
        // write all in the return Array
        if (/^[a-z]+$/.test(tagName)) {
            child.push((0, react_1.createElement)(tagName, propsToObject(frontTag), childCreator(innerHtml)));
        }
        else {
            child.push(`Failure: ${tagName} is not a valid html tag.`);
        }
    }
    if (textAfter) {
        child.push(textAfter);
    }
    return child;
};
exports.default = HtmlToReactComp;
