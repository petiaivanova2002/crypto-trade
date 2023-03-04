const authService = require('../services/authService');
const { getErrorMessage } = require('../utils/errorUtils')

exports.getRegisterPage = (req, res) => {
    res.render('auth/register')
};

exports.getLoginPage = (req, res) => {
    res.render('auth/login');
};

exports.postRegisterPage = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    try {
        const token = await authService.registerUser(username, email, password, confirmPassword);
        res.cookie('auth', token)
        res.redirect('/');

    } catch (error) {
        res.status(401).render('auth/register', { error: getErrorMessage(error) });
    }
};

exports.postLoginPage = async (req, res) => {
    const { email, password } = req.body;

    try {

        const token = await authService.loginUser(email, password);
        res.cookie('auth', token);
        res.redirect('/');

    } catch (error) {
        return res.status(401).render('auth/login', { error: getErrorMessage(error) });
    }

};

exports.logoutPage = (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
}