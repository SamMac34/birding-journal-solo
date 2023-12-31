const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
        // console.log('file is:', file)
        let fileType = file.mimetype.split('/')[1]
        // console.log('fileType is:', fileType)
        cb(null, file.originalname + '.' + fileType)
    }
});

const upload = multer({ storage: storage })


// Add bird to my_collection table (with Image)
router.post('/collectionWithImage', upload.single('image'), rejectUnauthenticated, (req, res) => {
    console.log('req.file is:', req.file);
    // console.log('req.file.filename is:', req.file.filename);
    console.log('req.body is:', req.body);
    const imageUrl = './images/' + req.file.filename
    const newBird = req.body;
    const queryText = `INSERT INTO "my_collection" ("user_id", "common_name", "location", "date", "time", "notes", "bird_image")
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id;`;

    if (req.isAuthenticated()) {
        pool.query(queryText, [newBird.userId, newBird.common_name, newBird.location, newBird.date, newBird.time, newBird.notes, imageUrl])
            .then(() => res.sendStatus(201))
            .catch((error) => {
                console.log('Error adding bird to "my_collection" table:', error);
                res.sendStatus(500);
            });
    }
    else {
        res.sendStatus(403);
    }
});

// Add bird to my_collection table (no image)
router.post('/collection', rejectUnauthenticated, (req, res) => {
    console.log('req.body is:', req.body);
    let imageUrl = req.body.image
    if(req.body.image === '') {
        imageUrl = "./images/image-not-available.png"
    }
    const newBird = req.body;
    const queryText = `INSERT INTO "my_collection" ("user_id", "common_name", "location", "date", "time", "notes", "bird_image")
      VALUES ($1, $2, $3, $4, $5, $6, $7);`;

    if (req.isAuthenticated()) {
        pool.query(queryText, [newBird.userId, newBird.common_name, newBird.location, newBird.date, newBird.time, newBird.notes, imageUrl])
            .then(() => res.sendStatus(201))
            .catch((error) => {
                console.log('Error adding bird to "my_collection" table:', error);
                res.sendStatus(500);
            });
    }
    else {
        res.sendStatus(403);
    }
});

// Fetch all birds from my_collection table
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('req.params is:', req.params)
    const userId = req.params.id;
    const queryText = `SELECT "id", "common_name", "location", "notes", "bird_image", 
    TO_CHAR("time", 'HH12:MI AM') AS "time", TO_CHAR("date", 'DD Mon YYYY') AS "date"
     FROM "my_collection" WHERE "user_id" = $1
     ORDER BY "date" DESC, "time" DESC;`;

    if (req.isAuthenticated()) {
        pool.query(queryText, [userId])
            .then(response => { res.send(response.rows) })
            .catch(error => {
                console.log('Error fetching birds from "my_collection" table:', error);
                res.sendStatus(500);
            });
    }
    else {
        res.sendStatus(403);
    }
});

// Edit bird info in my_collection table
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('In PUT my_collection, req.body is:', req.body)
    const idToUpdate = req.params.id;
    const editBird = req.body;
    const queryText = `UPDATE "my_collection" SET common_name = $1, location = $2, date = $3, time = $4, notes = $5, bird_image = $6 WHERE "id" = $7;`;

    if (req.isAuthenticated()) {
        pool
            .query(queryText, [editBird.common_name, editBird.location, editBird.date, editBird.time, editBird.notes, editBird.bird_image, idToUpdate])
            .then(() => res.sendStatus(200))
            .catch((error) => {
                console.log('Error editing bird in "my_collection" table:', error);
                res.sendStatus(500);
            });
    }
    else {
        res.sendStatus(403);
    }
});

// Delete bird from my_collection table
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const idToDelete = req.params.id;
    const queryText = `DELETE FROM "my_collection" WHERE "id" = $1;`;

    if (req.isAuthenticated()) {
        pool
            .query(queryText, [idToDelete])
            .then(() => res.sendStatus(200))
            .catch((error) => {
                console.log('Error deleting bird in "my_collection" table:', error);
                res.sendStatus(500);
            });
    }
    else {
        res.sendStatus(403);
    }
});

// Fetch all birds from my_wishlist table
router.get('/wishlist/:id', rejectUnauthenticated, (req, res) => {
    const userId = req.params.id;
    const queryText = `SELECT * FROM "my_wishlist" WHERE "user_id" = $1;`;
    // console.log('userId is:', userId)
    // console.log('req.params is:', req.params)

    if (req.isAuthenticated()) {
        pool.query(queryText, [userId])
            .then(response => { res.send(response.rows) })
            .catch(error => {
                console.log('Error fetching birds from "my_wishlist":', error);
                res.sendStatus(500);
            });
    }
    else {
        res.sendStatus(403);
    }
});

// Add bird to my_wishlist table
router.post('/wishlist', rejectUnauthenticated, (req, res) => {
    console.log('In POST to WL, req.body is:', req.body)
    let imageUrl = req.body.image
    if(req.body.image === '') {
        imageUrl = "./images/image-not-available.png"
    }
    const newBird = req.body;
    const queryText = `INSERT INTO "my_wishlist" ("user_id", "common_name", "sci_name", "region", "family", "bird_image", "status", "order")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;

    if (req.isAuthenticated()) {
        pool
            .query(queryText, [newBird.userId, newBird.common_name, newBird.sci_name, newBird.region, newBird.family, newBird.image, newBird.status, newBird.order])
            .then(() => res.sendStatus(201))
            .catch((error) => {
                console.log('Error adding bird to "my_wishlist":', error);
                res.sendStatus(500);
            });
    }
    else {
        res.sendStatus(403);
    }
});

// Delete bird from my_wishlist table
router.delete('/wishlist/:id', rejectUnauthenticated, (req, res) => {
    const idToDelete = req.params.id;
    const queryText = `DELETE FROM "my_wishlist" WHERE "id" = $1;`;

    if (req.isAuthenticated()) {
        pool
            .query(queryText, [idToDelete])
            .then(() => res.sendStatus(200))
            .catch((error) => {
                console.log('Error deleting bird from "my_wishlist" table:', error);
                res.sendStatus(500);
            });
    }
    else {
        res.sendStatus(403);
    }
});



module.exports = router;