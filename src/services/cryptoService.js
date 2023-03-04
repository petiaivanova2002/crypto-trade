const Crypto = require('../models/Crypto');


exports.getOne = (cryptoId) => Crypto.findById({ cryptoId });

exports.getAllCrypto = () => Crypto.find({});

exports.createCrypto = (name, image, price, description, payment, owner) => Crypto.create({ name, image, price, description, payment, buyer, owner });

exports.updatePage = (cryptoId, data) => Crypto.findByIdAndUpdate(cryptoId, data, { runValidators: true });

exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);

exports.buy = async (userId,cryptoId) => {
    const crypto = await Crypto.findById(cryptoId)
    crypto.buyer.push(userId)
    return crypto.save();
}