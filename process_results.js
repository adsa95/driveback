/* (c) 2017 Adam Sandström <adsa95@gmail.com> */
"use strict"

module.exports = function(items, search_source, search_dest, notify){
    let matches = [];
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let source_lower = item.source.toLowerCase();
        if(source_lower.indexOf(search_source) == -1) continue;

        let dest_lower = item.destination.toLowerCase();
        if(dest_lower.indexOf(search_dest) == -1) continue;

        matches.push(item);
    }
    return matches;
}
