const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const cryptoController = require('./controllers/cryptoController')
const { isAuth } = require('./middlewares/authMiddleware');

router.get('/', homeController.getHomePage);

router.get('/register', authController.getRegisterPage);
router.post('/register', authController.postRegisterPage);
router.get('/login', authController.getLoginPage);
router.post('/login', authController.postLoginPage);
router.get('/logout', isAuth, authController.logoutPage);

router.get('/catalog', cryptoController.getAllCryptos);
router.get('/catalog/:cryptoId/details', cryptoController.getCryptoDetails);
router.get('/create', cryptoController.getCreateCrypto);
router.post('/create', isAuth, cryptoController.postCreateCrypto);
router.get('/catalog/:cryptoId/edit', cryptoController.getEditPage);
router.post('/catalog/:cryptoId/edit', isAuth, cryptoController.postUpdateCrypto);
router.get('/catalog/:cryptoId/delete', isAuth, cryptoController.postDeleteCrypto);
router.get('/catalog/:cryptoId/buy', isAuth, cryptoController.getBoughtCrypto);
router.get('/search', isAuth, cryptoController.getSearchPage);

router.all('*', (req, res) => {
    res.render('home/404');
});

module.exports = router;