const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [5, 'Username should be 5 or more characters long!']
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: [10, 'Email should be 10 or more characters long!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password should be 4 or more characters long!']
    },
    // confirmPassword: {
    //     type: String,
    //     required: [true, 'Confirm is required!'],
    //     match: this.password
    // }
});

const User = mongoose.model('User', userSchema);

module.exports = User;