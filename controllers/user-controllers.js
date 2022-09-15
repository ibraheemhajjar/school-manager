const User = require('../models/User');
const resHandler = require('../middleware/resHandler');
const nameFormatter = require('../utils/name-formatter')

const userControllers = {};

userControllers.getAllStudents = async (req, res, next) => {
    const userId = req.userId
    const user = await User.findById(userId);
    try {
        const students = await User.find({
            schoolName: user.schoolName,
            role: 'student'
        });
        res.data = students
        resHandler(null, req, res, next);
    } catch (err) {
        throw err
    }
}

userControllers.getStudentById = async (req, res, next) => {
    const userId = req.userId
    const studentId = req.params.id;
    try {
        const user = await User.findById(userId);
        const student = await User.findById(studentId);
        res.data = student
        resHandler(null, req, res, next);
    } catch (err) {
        throw err
    }
}

userControllers.filterStudents = async (req, res, next) => {
    const userId = req.userId
    const { firstName, lastName, dateOfBirth, address, classRoom } = req.query;
    const query = {};

    if (!firstName && !lastName && !dateOfBirth && !address && !classRoom) {
        const error = new Error();
        error.message = 'invailed query parameters'
        error.statusCode = 422
        return next(error);
    } else {
        if (firstName) query.firstName = { "$regex": `${nameFormatter(firstName)}` };
        if (lastName) query.lastName = { "$regex": `${nameFormatter(lastName)}` };
        if (dateOfBirth) query.dateOfBirth = dateOfBirth;
        if (address) query.address = { "$regex": `${address}` };
        if (classRoom) query.classRoom = classRoom;
        query.role = 'student'
    }
    try {
        const user = await User.findById(userId);
        query.schoolName = user.schoolName;
        const students = await User.find(query)
        res.data = students
        resHandler(null, req, res, next);
    } catch (err) {
        throw err
    }
}

userControllers.addStudent = async (req, res, next) => {
    const userId = req.userId;
    const studentData = req.body;
    try {
        const user = await User.findById(userId);
        studentData.schoolName = user.schoolName
        const newStudent = await User.create(studentData);
        res.data = newStudent
        resHandler(null, req, res, next);
    } catch (err) {
        throw err;
    }

}



module.exports = userControllers
