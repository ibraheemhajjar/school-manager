//package imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const session = require('express-session')
const MongoDBSessionStore = require('connect-mongodb-session')(session);

//local imports
const parentRoutes = require('./routes/parent');
const teacherRoutes = require('./routes/teacher');
const authRoutes = require('./routes/auth');
const logger = require('./utils/logger');

//environment variables
const port = process.env.PORT;
const DB_URI = process.env.DB_URI;
const SECRET = process.env.SECRET;

//main application
const app = express();
const sessionStore = new MongoDBSessionStore({
    uri: DB_URI,
    collection: 'sessions',
    maxAge: 14 * 24 * 60 * 60 * 1000 // session age in mongodb store is 14 days converted to milliseconds
})
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 14 * 24 * 60 * 60 * 1000, // session age is 14 days converted to milliseconds
    },
    store: sessionStore
}))

//routes
app.use('/parent', parentRoutes);
app.use('/teacher', teacherRoutes);
app.use(authRoutes);

//non existing routes handling
app.use((req, res, next) => {
    res.status(404).json("page not found")
})

//database connection
mongoose.connect(DB_URI, () => {

    logger.info('database connected successfully!')

    app.listen(port, () => {
        logger.info(`server started at port: ${port}`);
    })

});
