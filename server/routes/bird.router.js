const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const axios = require('axios');

// if (req.isAuthenticated()) {

// }
// else {
//     res.sendStatus(403);
// }

// Fetch bird search results from API
router.get('/:birdName', rejectUnauthenticated, (req, res) => {
    const query = req.params.birdName;
    const key = `${process.env.NUTHATCH_API_KEY}`;

    if (req.isAuthenticated()) {
        axios.get(
            `https://nuthatch.lastelm.software/v2/birds?page=1&pageSize=5&operator=AND&name=${query}`,
            { headers: {'API-Key': key, 'accept': 'application/json'} })
        .then(response => {
            console.log('response is:', response.data);
            res.send(response.data);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    }
    else {
        res.sendStatus(403);
    }
});

// Add bird to my_collection table
router.post('/', (req, res) => {
    const newBird = req.body;  
    const queryText = `INSERT INTO "my_collection" (user_id, bird_name, location, date, time, notes, bird_image)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`;

    pool
      .query(queryText, [ newBird.userId, newBird.name, newBird.location, newBird.date, newBird.time, newBird.notes, newBird.image ])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('Error adding bird to "my_collection" table:', err);
        res.sendStatus(500);
      });
  });

// Fetch all birds in 'my_collection'
router.get('/:id', (req, res) => {
    const queryText = `SELECT * FROM "my_collection" WHERE "user_id" = $1`;
    const userId = req.params;

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