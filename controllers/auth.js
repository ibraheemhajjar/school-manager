const User = require('../models/User')
const bcrypt = require('bcrypt');
const session = require('express-session');

const authControllers = {};

authControllers.getLogin = async (req, res) => {
    res.status(200).json('login page');
}

authControllers.postLogin = async (req, res) => {
    const { email, password } = req.body;


    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).render('Wrong username or password');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return res.status(400).render('Wrong username or password');
    }

    res.setHeader('user', user.id);
    req.session.user = user;
    res.status(200).json('welcome to home page');

}

authControllers.getSignup = async (req, res) => {
    res.status(200).json('login page');
}

authControllers.postSignup = async (req, res) => {

    const { firstName, middleName, lastName, email, password, confirmPassword, dateOfBirth } = req.body;

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
        firstName,
        middleName,
        lastName,
        email,
        password: passwordHash,
        dateOfBirth
    });

    req.session.user = user;

    res.status(201).json(user);
}

authControllers.getSignout = async (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}

module.exports = authControllers;
