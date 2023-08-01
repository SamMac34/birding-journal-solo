const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const axios = require('axios');


const key = `${process.env.NUTHATCH_API_KEY}`;

// 
router.get('/:birdName', rejectUnauthenticated, (req, res) => {
    const query = req.params.birdName;

    if (req.isAuthenticated()) {
        console.log('SEARCH BIRDS.ROUTER, REQ.BODY IS:', query);

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

module.exports = router;