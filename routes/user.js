const express = require('express')
const router = express.Router();
const userControllers = require('../controllers/user-controllers')
const isAuth = require('../middleware/is-auth')

// user routes
// "student" users routes
router.get('/students', isAuth, userControllers.getAllStudents);
router.get('/students/:id', isAuth, userControllers.getStudentById);
router.get('/students/filter', isAuth, userControllers.filterStudents);
router.post('/students/addStudent', isAuth, userControllers.addStudent);
// router.put('/students/edit/:id', userControllers.editStudent);
// router.delete('/students/deleteStudent/:id', userControllers.deleteStudent);
// "student" users routes
// router.get('/teachers', userControllers.getAllTeachers);
// router.get('/teachers/:id', userControllers.getTeacherById);
// router.get('/teachers/filter', userControllers.filterTeachers);
// router.post('/teachers/addTeacher', userControllers.addTeacher);
// router.put('/teachers/edit/:id', userControllers.editTeacher);
// router.delete('/teachers/deleteTeacher/:id', userControllers.deleteTeacher);

module.exports = router;
