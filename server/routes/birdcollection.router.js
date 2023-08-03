const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const axios = require('axios');


// Fetch all birds from my_collection table
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

// Add bird to my_collection table
router.post('/', rejectUnauthenticated, (req, res) => {
    const newBird = req.body;
    const queryText = `INSERT INTO "my_collection" (user_id, bird_name, location, date, time, notes, bird_image)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`;

    if (req.isAuthenticated()) {
        pool
            .query(queryText, [newBird.userId, newBird.name, newBird.location, newBird.date, newBird.time, newBird.notes, newBird.image])
            .then(() => res.sendStatus(201))
            .catch((err) => {
                console.log('Error adding bird to "my_collection" table:', err);
                res.sendStatus(500);
            });
    }
    else {
        res.sendStatus(403);
    }
});

// Edit bird info in my_collection table
router.put('/', rejectUnauthenticated, (req, res) => {
    const editBird = req.body;
    const queryText = `INSERT INTO "my_collection" (user_id, bird_name, location, date, time, notes, bird_image)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`;

    if (req.isAuthenticated()) {
        pool
            .query(queryText, [editBird.userId, editBird.name, editBird.location, editBird.date, editBird.time, editBird.notes, editBird.image])
            .then(() => res.sendStatus(200))
            .catch((err) => {
                console.log('Error editing bird in "my_collection" table:', err);
                res.sendStatus(500);
            });
    }
    else {
        res.sendStatus(403);
    }
});

// Delete bird from my_collection table

module.exports = router;