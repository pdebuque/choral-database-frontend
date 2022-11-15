const express = require('express');
const router = express.Router();
const database = require('../choral diversity database')

// -------------------- GET ------------------------

router.get('/composer/:name', (req, res) => {
    console.log('getting composers with search term', req.params.name)
    const searchTerm = req.params.name.toLowerCase();
    const searchResults = [];
    for (let piece of database) {
        if (piece.composer.toLowerCase().includes(searchTerm)) {
            searchResults.push(piece)
        }
    }
    res.send(searchResults)
})







module.exports = router;