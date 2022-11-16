const express = require('express');
const router = express.Router();
const database = require('../choral diversity database')
const pool = require('../modules/pool')

// -------------------- GET ------------------------

router.get('/', (req, res) => {
    console.log('search received', req.query);

    const queryText = `SELECT * FROM pieces
                        WHERE 
                            composer ILIKE $1 AND
                            title ILIKE $2 AND
                            (date > $3 AND date < $4 OR date IS NULL) AND
                            (duration > $5 AND duration < $6 OR duration IS NULL) AND
                            (voicing ILIKE $7 OR voicing IS NULL) AND
                            (instruments ILIKE $8 OR instruments IS NULL) AND
                            (difficulty > $9 AND difficulty <$10 OR difficulty = $11 OR difficulty IS NULL)`

    const queryParams = [`%${req.query.c}%`, `%${req.query.title}%`, req.query.dmin, req.query.dmax, req.query.lmin, req.query.lmax, `%${req.query.v}%`, `%${req.query.acc}%`, req.query.diffmin, req.query.diffmax, req.query.diff]

    pool.query(queryText, queryParams)
        .then(result => {
            res.send(result.rows)
        })
        .catch(err => {
            console.log('could not complete search request', err)
        })
})







module.exports = router;