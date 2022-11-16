const database = require('./server/choral diversity database');
const pg = require('pg');
const convertTime = require('./server/public/modules/convertTime')

const pool = new pg.Pool({
    database: 'choral_diversity_db', // name of db; this can change!
    host: 'localhost', // where is your db?
    port: 5432, // default for Postgres
    max: 10, // max queries at one time
    idleTimeoutMillis: 30000 // 30 seconds to try to connect, otherwise cancel query
});

for (let piece of database) {
    // first sanitize the duration
    console.log(piece.duration);
    piece.duration = convertTime(piece.duration) || null;
    // if (piece.duration === NaN) {
    //     piece.duration = null;
    // }

    //empty strings become null
    for (let key in piece) {
        if (piece[key] === "") {
            piece[key] = null;
        }
    }
    // then insert into the table

    const queryText = `INSERT INTO pieces
    ("composer", "url", "title", "date", "text_author", "duration", "difficulty", "voicing", "soloists", "instruments", "language", "link_to_piece", "sample_performance")
    VALUES
    ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
`
    const queryParams = [piece.composer, piece.url, piece.title, piece.date, piece.text_author, piece.duration, piece.difficulty, piece.voicing, piece.soloists, piece.instruments, piece.language, piece.link_to_piece, piece.sample_performance]
    pool.query(queryText, queryParams)
        .catch(err => {
            console.log('could not execute query', piece, err)
        })
}

