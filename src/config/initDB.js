const mongoose = require('mongoose');

const config = require('./index');

async function init(){
    mongoose.set('strictQuery', false);

    await mongoose.connect(config.DB_URI);
    console.log('DB is connected');
};

module.exports = init;

