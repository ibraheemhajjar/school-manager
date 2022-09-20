const express = require('express')
const router = express.Router();
const userControllers = require('../controllers/user-controllers')
const isAuth = require('../middleware/is-auth')

// user routes
// "student" users routes
router.get('/students', isAuth, userControllers.getAllStudents);
router.get('/students/:id', isAuth, userControllers.getStudentById);
router.get('/filterStudents', isAuth, userControllers.filterStudents);
router.post('/students/addStudent', isAuth, userControllers.addStudent);
router.put('/students/edit/:id', isAuth, userControllers.editStudent);
router.delete('/students/deleteStudent/:id', isAuth, userControllers.deleteStudent);
router.get('/student/:studentId/addCourse/:courseId', isAuth, userControllers.addCourse);

// "student" users routes
router.get('/teachers', isAuth, userControllers.getAllTeachers);
router.get('/teachers/:id', isAuth, userControllers.getTeacherById);
router.get('/filterTeachers', isAuth, userControllers.filterTeachers);
router.post('/teachers/addTeacher', isAuth, userControllers.addTeacher);
router.put('/teachers/edit/:id', isAuth, userControllers.editTeacher);
router.delete('/teachers/deleteTeacher/:id', isAuth, userControllers.deleteTeacher);
router.get('/teacher/:teacherId/addCourse/:courseId', isAuth, userControllers.addCourseToTeacher);

module.exports = router;
