const pg = require('pg');
let pool;

const config = {
    database: 'choral_diversity_db', // the name of the database
    host: 'localhost', // where is your database
    port: 5432, // the port number for your database, 5432 is the default
    max: 10, // how many connections at one time
    idleTimeoutMillis: 30000 // 30 seconds to try to connect
};

if (process.env.DATABASE_URL) {
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
} else {
    pool = new pg.Pool(config);
}

pool.on('connect', (client) => {
    console.log('pg connected');
})

pool.on('error', (err, client) => {
    console.log('Unexpected error on idle pg client', err);
    process.exit(-1);
});

module.exports = pool;