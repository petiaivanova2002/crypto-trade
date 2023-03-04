const express = require('express');
const routes = require('./routes');
const config = require('./config');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const {authentication} = require('./middlewares/authMiddleware')


const initDB = require('./config/initDB')

const app = express();

app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', './src/views');


app.use(express.static('./src/public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authentication);
app.use(routes)

initDB()
    .then(() => app.listen(config.PORT, () => console.log('Server is listening!')))
    .catch((error) => console.log('Error'));
