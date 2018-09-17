function walk(node) 
{
    // I stole this function from here:
    // http://is.gd/mwZp7E

    var child, next;

    switch ( node.nodeType )  
    {
        case 1:  // Element
        case 9:  // Document
        case 11: // Document fragment
            child = node.firstChild;
            while ( child ) 
            {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;

        case 3: // Text node
            handleText(node);
            break;
    }
}

function handleText(textNode) {
    var v = textNode.nodeValue;

    // Deal with swedish
    v = v.replace(/(S|s)ju/g, function(match, p1, offset, string) {
    s = String.fromCharCode(p1.charCodeAt(0));
    return s + "tubbe";
    });
    
    // Deal with english
    v = v.replace(/(S|s)even/g, function(match, p1, offset, string) {
    s = String.fromCharCode(p1.charCodeAt(0));
    return s + "tubbe";
    });

    // Deal with numbers in the begining of sentences
    v = v.replace(/^7/gm, "Stubbe");

    // Deal with numbers otherwise
    v = v.replace(/7/g, "stubbe");
    
    textNode.nodeValue = v;
}

walk(document.body);
