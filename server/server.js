const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const multer = require('multer');
const upload = multer({ dest: './public/images'});


const app = express();

app.post('/uploadFile', upload.single('image'), (req, res) => {

  // Detect and attach correct file extension
  let fileType = req.file.mimetype.split('/')[1]
  let newFileName = req.file.filename + "." + fileType
  console.log('newFileName is:', newFileName);
    res.send("200")
})




const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const apiBirdRouter = require('./routes/apiBird.router');
const birdRouter = require('./routes/bird.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/birds', apiBirdRouter);
app.use('/birds', birdRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
