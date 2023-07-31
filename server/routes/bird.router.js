const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const axios = require('axios');


const key = `${process.env.NUTHATCH_API_KEY}`;

// This route *should* return the logged in users birds
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('Bird Search GET route');

    if (req.isAuthenticated()) {
        axios.get(`https://nuthatch.lastelm.software/v2/birds?page=1&pageSize=25&operator=AND`, { headers: {'API-Key': key, 'accept': 'application/json'} })
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