const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const axios = require('axios');


// Fetch all birds in 'my_collection'
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "my_collection" WHERE "user_id" = $1`;
    const userId = req.params.id;

    if (req.isAuthenticated()) {
        pool.query(queryText, [userId])
        .then(response => { res.send(response.rows) })
        .catch(err => {
            console.log('Error fetching birds from "my_collection" table:', err);
            res.sendStatus(500);
        });
    }
    else {
        res.sendStatus(403);
    }
});

module.exports = router;