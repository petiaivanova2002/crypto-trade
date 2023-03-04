const jwt = require('../lib/jsonwebtoken');
const config = require('../config')

exports.authentication = async (req, res, next) => {
    const token = req.cookies['auth'];
    if (token) {

        try {
            const decodedToken = await jwt.verify(token, config.SECRET);
            req.user = decodedToken;

            res.locals.isAuthenticated = true;
            res.locals.user = decodedToken;

        } catch (error) {
            res.clearCookie('auth');
            return res.status(401).render('home/404',{error: error.message});
        }
    }

    next();
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    next();
};