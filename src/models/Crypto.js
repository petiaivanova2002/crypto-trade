
const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name should be 2 or more characters long!']
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        match: [/^https?:\/\//, 'Image should starts with http:// or https://']
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: [0, 'Price must be positive!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description should be at least 10 characters long!']
    },
    payment: {
        type: String,
        enum: {
            values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
            message: 'Value is not valid!'
        }
    },
    buyer: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;