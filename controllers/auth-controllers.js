const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const authControllers = {};

authControllers.getLogin = async (req, res) => {
    res.status(200).json('login page');
}

authControllers.postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json('Wrong username');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return res.status(400).json('Wrong password');
    }
    const token = jwt.sign({ email: email, userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '2h' })
    res.status(200).json({
        token: token,
        userId: user._id.toString()
    });
}

authControllers.getSignup = async (req, res) => {
    res.status(200).json('Signup page');
}

authControllers.postSignup = async (req, res) => {
    const { email, password, firstName, middleName, lastName, confirmPassword, dateOfBirth, identityNumber, address, phoneNumber, parentEmail, parentPhoneNumber, schoolName } = req.body;
    if (password !== confirmPassword) {
        return res
            .status(400)
            .json('passwords do not match');
    }
    let user = await User.findOne({ email });
    if (user) {
        return res
            .status(400)
            .json(`${email}: email already used`);
    }
    const passwordHash = await bcrypt.hash(password, 12);
    user = await User.create({
        email,
        password: passwordHash,
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        identityNumber,
        address,
        phoneNumber,
        parentEmail,
        schoolName,
        parentPhoneNumber
    });
    res.status(201).json(user);
}

authControllers.getSignout = async (req, res) => {
    res.redirect('/login');
}

module.exports = authControllers;
