const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const resHandler = require('../middleware/resHandler');

const authControllers = {};

authControllers.getLogin = async (req, res, next) => {
    res.status(200).json('login page');
}

authControllers.postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error();
            error.message = 'user email is not found';
            error.statusCode = 401;
            return next(error);
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            const error = new Error();
            error.message = 'wrong password';
            error.statusCode = 401;
            return next(error);
        }
        const token = jwt.sign({ email: email, userId: user._id.toString(), role: user.role, schoolName: user.schoolName }, process.env.JWT_SECRET, { expiresIn: '14d' })
        res.data = { token: token, userId: user._id.toString() }
        resHandler(null, req, res, next);
    } catch (err) {
        throw err;
    }
}

authControllers.getSignup = async (req, res, next) => {
    res.status(200).json('Signup page');
}

authControllers.postSignup = async (req, res, next) => {
    const { email, password, firstName, middleName, lastName, confirmPassword, dateOfBirth,
        identityNumber, address, phoneNumber, parentEmail, parentPhoneNumber, schoolName } = req.body;
    if (password !== confirmPassword) {
        const error = new Error();
        error.message = 'passwords do not match';
        error.statusCode = 400;
        return next(error);
    }
    try {
        const user = await User.findOne({ email });
        if (user) {
            const error = new Error();
            error.message = 'email already used';
            error.statusCode = 400;
            return next(error);
        }
        const passwordHash = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            email, password: passwordHash, firstName, middleName, lastName, dateOfBirth, identityNumber,
            address, phoneNumber, parentEmail, schoolName, parentPhoneNumber
        });
        if (!newUser) {
            const error = new Error();
            error.message = 'failed to create user';
            error.statusCode = 500;
            return next(error);
        }
        res.data = newUser;
        res.message = 'created successfully!';
        res.statusCode = 201;
        resHandler(null, req, res, next);
    } catch (err) {
        throw err
    }
}

authControllers.getSignout = async (req, res, next) => {
    res.status(302).redirect('/auth/login');
}

module.exports = authControllers;
