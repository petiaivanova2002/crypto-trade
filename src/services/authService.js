const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');
const config = require('../config');
const {getErrorMessage} = require('../utils/errorUtils')

exports.getUserByUsername = (username) => User.findOne({ username });
exports.getUserByEmail = (email) => User.findOne({ email });

exports.registerUser = async (username, email, password, confirmPassword) => {  
    
    if (password !== confirmPassword ) {       
        throw new Error('The password missmatch!');              
    };
    if(password.length < 4){
        throw new Error ('Password should have at least 4 characters!')
    }

    const existUser = await this.getUserByUsername(username);
    if (existUser) {       
         throw new Error('The username already exist!');     
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });

    return this.loginUser(email, password);
};

exports.loginUser = async (email, password) => {
    const user = await this.getUserByEmail(email);

    if (!user) {
        throw new Error('Invalid email or password');
    };

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Invalid email or password');
    }; 

    const payload = {
        _id: user._id,
        email,
        username: user.username
    };
    const token = await jwt.sign(payload, config.SECRET);
    return token;

};