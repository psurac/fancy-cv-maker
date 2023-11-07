"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
/*
This Function translate a html string into a React component Function,
and return it.
*/
const htmlToReactFunction = (html) => {
    return NewComp(html);
};
const htmlNameTag = (htmlFrag) => {
    if (htmlFrag === '<>') {
        return 'div';
    }
    return htmlFrag.substring(htmlFrag.search(/[<]/) + 1, htmlFrag.search(/(?<=\<)(?<=\w+)[\s>]/));
};
const propsToObject = (props) => {
    props = props.substring(0, props.indexOf('>') + 1);
    let propsObj = {};
    const propsNames = props.match(/(?<=\s)[-a-zA-Z0-9_]+(?=\=)/);
    const propsValues = props.match(/(?<=[\'\"\`\{])[\s-a-zA-Z0-9_]*(?=[\'\"\`\}])/);
    // TODO Checking for special probs there maied be no Value, and add it
    if (propsNames && propsValues && propsNames.length === propsValues.length) {
        for (let i = 0; i < propsNames.length; i++) {
            propsObj[propsNames[i]] = propsValues[i];
        }
    }
    return propsObj;
};
const siblingTagSearchHelper = (htmlFrag) => {
    let siblingIndexes = [];
    // Tack the starting tagName, set counterTags to 1, absolutIndex to 0
    let absolutIndex = 0; // keap track on the absolut position wher htmlFrag is cuted
    let counterTags = 0;
    let tagName = htmlNameTag(htmlFrag);
    if (tagName.length > 0) {
        counterTags = 1;
    }
    else {
        return [0];
    }
    let tagIndex = htmlFrag.indexOf(tagName);
    if (tagIndex > 0)
        siblingIndexes.push(tagIndex);
    absolutIndex = tagIndex + tagName.length;
    htmlFrag = htmlFrag.substring(absolutIndex);
    // Search for ocurency of tagName in string
    while (tagName.length > 0) {
        // TODO add a way to handl tags who has no closing tag
        let emargencyBreak = 0;
        const regExp = new RegExp(`/(?<=[</])${tagName}/`);
        while (true) {
            const indexCurrentTag = htmlFrag.search(regExp);
            const indexAfterClosingTag = indexCurrentTag + tagName.length + 2;
            const charBeforeTag = htmlFrag.at(indexCurrentTag - 1);
            // Update absolutIndex and slice the htmlFrag
            absolutIndex += indexAfterClosingTag;
            htmlFrag = htmlFrag.substring(indexAfterClosingTag);
            // If it is </${tagName} substract -1 from counterTags
            if (charBeforeTag === '/') {
                counterTags--;
            }
            // If counterTags gets 0 leave the loop
            if (counterTags === 0) {
                break;
            }
            // If it is <${tagName} add +1 to counter
            if (charBeforeTag === '<') {
                counterTags++;
            }
            if (emargencyBreak > 50 || !charBeforeTag) {
                return [-1];
            }
            emargencyBreak++;
        }
        // If counterTags is 0 get the actual index and add it to the array
        siblingIndexes.push(absolutIndex);
        // Serach for new tagName and start loop again
        tagName = htmlNameTag(htmlFrag);
    }
    return siblingIndexes;
};
const childCreator = (htmlFrag) => {
    // Return if htmlFragment empty or there are no < in there
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
    const tagName = htmlNameTag(htmlFrag);
    const props = propsToObject(htmlFrag);
    const siblingIndexes = siblingTagSearchHelper(htmlFrag);
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
        return [
            textBefore,
            (0, react_1.createElement)(tagName, props, childCreator(htmlFrag.substring(htmlFrag.indexOf('>'), htmlFrag.lastIndexOf('</')))),
            textAfter
        ];
    }
    // Split the htmlFrag into it's siblings
    let siblings = [];
    for (let i = 0; i < siblingIndexes.length; i++) {
        if (i === 0) {
            siblings.push(htmlFrag.substring(0, siblingIndexes[i]));
        }
        else if (i < siblingIndexes.length - 1) {
            siblings.push(htmlFrag.substring(siblingIndexes[i - 1], siblingIndexes[i]));
        }
        else {
            siblings.push(htmlFrag.substring(siblingIndexes[i - 1], siblingIndexes[i]));
            siblings.push(htmlFrag.substring(siblingIndexes[i]));
        }
    }
    // Built up the child array
    let child = [textBefore]; // Adding the text before
    // loop over the given indexes and add each sibbling seperately to the child array
    for (let sibling of siblings) {
        // Add eventuell occured Text at the beginning to the child array
        child.push(sibling.substring(0, sibling.indexOf('<')));
        // Split each element in the front Tag and the innerHtml
        const frontTag = sibling.substring(sibling.indexOf('<'), sibling.indexOf('>') + 1);
        const innerHtml = sibling.substring(sibling.indexOf('>') + 1, sibling.lastIndexOf('<'));
        // Give the front Tag to htmlNameTag and propsToObject
        // give the innerHtml to childCreator
        // write all in the return Array
        child.push((0, react_1.createElement)(htmlNameTag(frontTag), propsToObject(frontTag), childCreator(innerHtml)));
    }
    child.push(textAfter);
    return child;
};
const NewComp = (html) => {
    html = html.trim();
    const mainHtml = html.slice(0, html.indexOf('>') + 1);
    let mainHtmlTag = htmlNameTag(mainHtml);
    let mainHtmlTagProps = propsToObject(mainHtml);
    let childArray = childCreator(html.slice(html.indexOf('>') + 1));
    return (React.createElement(React.Fragment, null, (0, react_1.createElement)(mainHtmlTag, mainHtmlTagProps, childArray)));
};
exports.default = htmlToReactFunction;
