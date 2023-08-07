const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const axios = require('axios');


// Fetch results from API by bird name searched
router.get('/:birdName', rejectUnauthenticated, (req, res) => {
    const query = req.params.birdName;
    const key = `${process.env.NUTHATCH_API_KEY}`;

    if (req.isAuthenticated()) {
        axios.get(
            `https://nuthatch.lastelm.software/v2/birds?page=1&operator=AND&name=${query}`,
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

module.exports = router;