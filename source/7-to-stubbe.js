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

    // Deal with 7
    v = v.replace(/7/g, "stubbe");

    // Hyphonate
    v = v.replace(/(\d)stubbe/g, function(match, p1, offset, string) {
        return p1 + "-stubbe";
    });
    v = v.replace(/stubbe(\d)/g, function(match, p1, offset, string) {
        return "stubbe-" + p1;
    });
    v = v.replace(/(stubbe)+/g, function(match, p1, offset, string) {
        amount = match.length / 6;
        text = "stubbe";
        for (var i = 1; i < amount; i++) {
            text = text + "-stubbe";
        }
        return text;
    });

    // Deal with 7 in the begining of sentences
    v = v.replace(/^stubbe/gm, "Stubbe");

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
    
    textNode.nodeValue = v;
}

walk(document.body);
