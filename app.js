const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();

const parentRoutes = require('./routes/parent')
const teacherRoutes = require('./routes/teacher')
const logger = require('./utils/logger');
const port = process.env.PORT

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/parent', parentRoutes);
app.use('/teacher', teacherRoutes);

app.use((req, res, next) => {
    res.status(404).json("page not found")
})


app.listen(port, () => {
    logger.info(`server started at port: ${port}`);
})
