const express = require('express')
const router = express.Router();
const classControllers = require('../controllers/class-controllers')
const isAuth = require('../middleware/is-auth')

// class routes
router.get('/', isAuth, classControllers.getAllClasses);
router.get('/class/:id', isAuth, classControllers.getClassById);
router.get('/filter', isAuth, classControllers.filterClasses);
router.post('/addClass', isAuth, classControllers.addClass);
router.put('/editClass/:id', isAuth, classControllers.editClass);
router.delete('/deleteClass/:id', isAuth, classControllers.deleteClass);

module.exports = router;
