const database = require('./server/choral diversity database');
const pg = require('pg');
const convertTime = require('./server/modules/convertTime')

const pool = new pg.Pool({
    database: 'choral_diversity_db', // name of db; this can change!
    host: 'localhost', // where is your db?
    port: 5432, // default for Postgres
    max: 10, // max queries at one time
    idleTimeoutMillis: 30000 // 30 seconds to try to connect, otherwise cancel query
});



for (let piece of database) {

    // first sanitize the date
    piece.duration = convertTime(piece.duration);
    // then insert into the table

    const queryText = `INSERT INTO pieces
    ("composer", "url", "title", "date", "text_author", "duration", "difficulty", "voicing", "soloists", "instruments", "language", "link_to_piece", "sample_performance")
    VALUES
`
}

