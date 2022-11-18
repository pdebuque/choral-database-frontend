/* 
const cleanQuery = {
        c: req.query.c || null,
        title: req.query.title || null,
        dmin: req.query.dmin || null,
        dmax: req.query.dmax || null,
        lmin: req.query.lmin || null,
        lmax: req.query.lmax || null,
        v: req.query.v || null,
        acc: req.query.acc || null,
        diffmin: req.query.diffmin || null,
        diffmax: req.query.diffmax || null,
        diff: req.query.diff || null
    }

from a query object, create a string like
    title ILIKE %title% AND
    composer ILIKE %composer% AND
    date > lmin AND
    date < lmax AND
    duration > lmin AND
    duration < lmax AND
    v ILIKE %voicing%

*/

function createQuery(queryObject) {
    const queryArray = [];
    const queryObjectEq = {
        composer: queryObject.c,
        title: queryObject.title,
        voicing: queryObject.v
    }
    const queryObjectMin = {
        date: queryObject.dmin,
        duration: queryObject.lmin
    }
    const queryObjectMax = {
        date: queryObject.dmax,
        duration: queryObject.lmax
    }

    for (let key in queryObjectEq) {
        console.log(key, queryObjectEq[key]);
        if (queryObjectEq[key]) {
            queryArray.push(`
                ${key} ILIKE '%' || '${queryObjectEq[key]}' || '%'
            `)
        }
    }

    for (let key in queryObjectMin) {
        if (queryObjectMin[key]) {
            queryArray.push(`
                ${key} > ${queryObjectMin[key]}    
            `)
        }
    }

    for (let key in queryObjectMax) {
        if (queryObjectMax[key]) {
            queryArray.push(`
                ${key} < ${queryObjectMax[key]}    
            `)
        }
    }
    const queryString = queryArray.join(' AND ')

    return `SELECT * FROM pieces WHERE ${queryString}`
}

module.exports = createQuery