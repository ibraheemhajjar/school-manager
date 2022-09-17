const express = require('express')
const router = express.Router();
const courseControllers = require('../controllers/course-controllers')
const isAuth = require('../middleware/is-auth')

// course routes
router.get('/', isAuth, courseControllers.getAllCourses);
router.get('/course/:id', isAuth, courseControllers.getCourseById);
router.get('/filterCourses', isAuth, courseControllers.filterCourses);
router.post('/addCourse', isAuth, courseControllers.addCourse);
router.put('/editCourse/:id', isAuth, courseControllers.editCourse);
router.delete('/deleteCourse/:id', isAuth, courseControllers.deleteCourse);

module.exports = router;
