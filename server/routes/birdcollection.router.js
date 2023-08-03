const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const axios = require('axios');


// Fetch all birds from my_collection table
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT "id", "user_id", "bird_name", "location", "notes", "bird_image", TO_CHAR("time", 'HH12:MI AM') AS "time", TO_CHAR("date", 'DD Mon YYYY') AS "date" FROM "my_collection" WHERE "user_id" = $1;`;
    const userId = req.params.id;
    console.log('userId is:', userId)
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
        VALUES ($1, $2, $3, $4, $5, $6, $7);`;

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
router.put('/:id', rejectUnauthenticated, (req, res) => {
    const idToUpdate = req.params.id;
    const editBird = req.body;
    const queryText = `UPDATE "my_collection" SET bird_name = $1, location = $2, date = $3, time = $4, notes = $5, bird_image = $6 WHERE "id" = $7;`;

    if (req.isAuthenticated()) {
        pool
            .query(queryText, [editBird.name, editBird.location, editBird.date, editBird.time, editBird.notes, editBird.image, idToUpdate])
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