const express = require('express');
const router = express.Router();
const database = require('../choral diversity database')
const pool = require('../modules/pool')
const createQuery = require('../modules/createQuery')
// -------------------- GET ------------------------


router.get('/', (req, res) => {
    console.log('search received', req.query);
    // create sanitized query - no undefined values. will work better with coalesce commands in Postsgres
    // probably possible to do this better with a loop.
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

    const queryString = createQuery(cleanQuery);
    console.log(queryString)
    // const queryText = `SELECT * FROM pieces
    //                     WHERE 
    //                         composer ILIKE coalesce($1, '%') AND
    //                         title ILIKE coalesce ($2, '%') AND
    //                         (date > $3 AND date < $4 OR date IS NULL) AND
    //                         (duration > $5 AND duration < $6 OR duration IS NULL) AND
    //                         voicing ILIKE coalesce ($7, '%') AND
    //                         instruments ILIKE ($8, '%')AND
    //                         (difficulty > $9 AND difficulty <$10 OR difficulty = $11 OR difficulty IS NULL)`

    // (${cleanQuery.c} IS NULL OR composer ILIKE ['%' + ${cleanQuery.c} + '%']) AND

    // const queryText = `SELECT * FROM pieces WHERE 
    //     (title ILIKE '%' || '${cleanQuery.title}' || '%' OR '${cleanQuery.title}' is null);
    //     `

    // const queryParams = [`%${req.query.c}%`, `%${cleanQuery.title}%`, cleanQuery.dmin, cleanQuery.dmax, cleanQuery.lmin, cleanQuery.lmax, `%${cleanQuery.v}%`, `%${cleanQuery.acc}%`, cleanQuery.diffmin, cleanQuery.diffmax, cleanQuery.diff]

    // const queryParams

    pool.query(queryString)
        .then(result => {
            console.log('search result: ', result.rows.length)
            res.send(result.rows)
        })
        .catch(err => {
            console.log('could not complete search request -', err)
        })
})







module.exports = router;