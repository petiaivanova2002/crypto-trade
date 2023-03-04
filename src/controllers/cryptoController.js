

const Crypto = require('../models/Crypto');
const cryptoService = require('../services/cryptoService')
const cryptoUtils = require('../utils/cryptoUtils');
const { getErrorMessage } = require('../utils/errorUtils')

exports.getAllCryptos = async (req, res) => {
    const cryptos = await cryptoService.getAllCrypto().lean();
    res.render('home/catalog', { cryptos });
};

exports.getCryptoDetails = async (req, res) => {
    const crypto = await Crypto.findById(req.params.cryptoId).lean();
    if (!req.user) {
        res.render('crypto/details', { crypto });
    } else {
        const isOwner = crypto.owner == req.user._id;

        const isBuyer = crypto.buyer.some(id => id == req.user._id);

        res.render('crypto/details', { crypto, isOwner, isBuyer });
    };

};

exports.getCreateCrypto = (req, res) => {
    res.render('crypto/create');
};

exports.postCreateCrypto = async (req, res) => {
    const { name, image, price, description, payment } = req.body;

    try {
        const crypto = await Crypto.create({ name, image, price, description, payment, buyer, owner: req.user._id });
        res.redirect('/catalog');
    } catch (error) {
        return res.status(401).render('crypto/create', { error: getErrorMessage(error) })
    }

};

exports.getEditPage = async (req, res) => {
    const crypto = await Crypto.findById(req.params.cryptoId).lean();
    const paymentMethods = cryptoUtils.generatePayments(crypto.payment);

    if (!cryptoUtils.isOwner(crypto, req.user)) {
        return res.redirect('/404')
    }

    res.render('crypto/edit', { crypto, paymentMethods })
}

exports.getDeletePage = async (req, res) => {

    const crypto = await Crypto.findById(req.params.cryptoId).lean();
    const paymentMethods = cryptoUtils.generatePayments(crypto.payment);

    res.render('crypto/delete', { crypto, paymentMethods })
};

exports.postUpdateCrypto = async (req, res) => {
    const { name, image, price, description, payment } = req.body;
    try {
        await cryptoService.updatePage(req.params.cryptoId, { name, image, price, description, payment });
    } catch (error) {
        res.status(401).render('crypto/edit', { error: getErrorMessage(error) });
    }


    res.redirect(`/catalog/${req.params.cryptoId}/details`);
};

exports.postDeleteCrypto = async (req, res) => {
    await cryptoService.delete(req.params.cryptoId);
    res.redirect('/catalog')
};

exports.getBoughtCrypto = async (req, res) => {
    const crypto = await cryptoService.getOne(per.params.cryptoId)
    try {
        await cryptoService.buy(req.user._id, req.params.cryptoId);
        res.redirect(`/catalog/${req.params.cryptoId}/details`);
        
    } catch (error) {
        res.status(404).render('crypto/details', { crypto, error: getErrorMessage(error) })
    }

};

exports.getSearchPage = async (req, res) => {
    const { text, payment } = req.query;
    let cryptos = await cryptoService.getAllCrypto().lean();

    if (text) {
        cryptos = cryptos.filter(x => x.name.toLowerCase().includes(text.toLowerCase()));
    }

    if (payment) {
        cryptos = cryptos.filter(x => x.payment == payment);
    }
    res.render('crypto/search', { cryptos })
};

