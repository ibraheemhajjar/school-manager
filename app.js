//package imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

//local imports
const parentRoutes = require('./routes/parent');
const teacherRoutes = require('./routes/teacher');
const logger = require('./utils/logger');

//environment variables
const port = process.env.PORT;
const DB_URI = process.env.DB_URI;

//main application
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use('/parent', parentRoutes);
app.use('/teacher', teacherRoutes);

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
