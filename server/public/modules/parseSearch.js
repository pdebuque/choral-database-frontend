/*

search term parser: separate one search string and send to appropriate searches

default: by title
[] by composer: c:[search term]
[] by date: d:[start]-[end]
[] by voicing: v:
[] by length: l:[number of seconds]

get by date range
input: start to end
to server: 'GET', url: '/songs?start=[start]&end=[end]

all go to a get /songs

*/
/* 
    sample query term: d:1920-1980 l>180 acc:pno
    
    we want output object, eg. {
        datemin: 1920,
        datemax: 1980,
        lengthmax: 180,
        acc: pno
    }
    
    then send a GET with these params
    */

function parseSearch(queryTerm) {

    const parsedSearch = {};
    function isComplex(string) {
        return /:|<|>/.test(string); // will return true if the term has a specification symbol
    }
    // if the term has no specification symbols, we simply search by title
    if (!isComplex(queryTerm)) {
        parsedSearch.title = queryTerm;
        return parsedSearch;
    } else {
        const paramsArr = queryTerm.split(' ')
        const titleSearch = [];// each element of the array is a parameter
        for (let param of paramsArr) { // this only works if users are limited to one plain string with no spaces. e.g., "ave maria c:hailstork" will not work

            if (!isComplex(param)) {
                titleSearch.push(param);
            } else if (param.includes(':')) {
                const splitParam = param.split(':')
                if (splitParam[1].includes('-')) {
                    splitParam2 = splitParam[1].split('-')
                    parsedSearch[`${splitParam[0]}min`] = splitParam2[0];
                    parsedSearch[`${splitParam[0]}max`] = splitParam2[1];
                } else {
                    parsedSearch[splitParam[0]] = splitParam[1];
                }
            } else if (param.includes('<')) {
                const splitParam = param.split('<');
                parsedSearch[`${splitParam[0]}max`] = splitParam[1];
            } else if (param.includes('>')) {
                const splitParam = param.split('>');
                parsedSearch[`${splitParam[0]}min`] = splitParam[1];
            }
        }
        parsedSearch.title = titleSearch.join(' ')
        return parsedSearch;
    }
}

// module.exports = parseSearch;