const bcrypt = require('bcrypt');

const authControllers = {};

authControllers.getLogin = (req, res) => {
    res.status(200).json('login page');
}

authControllers.postLogin = (req, res) => {

}

module.exports = authControllers;
