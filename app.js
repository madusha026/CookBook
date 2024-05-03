const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const http = require('http');
const fileUpload = require('express-fileupload');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const flash = require('connect-flash');




require('dotenv').config();

app.use(express.urlencoded( {extended:true }));
app.use(express.static('client'));
app.use(expressLayouts);

app.use(flash());
app.use(fileUpload());

app.use(cookieParser('CookBookSecure'));
app.use(session({
  secret: 'CookBookSecretSession',
  saveUninitialized: true,
  resave: true
}));

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/recipeRoutes.js')
app.use('/', routes);   

var listener = app.listen(port, function(){
    console.log('Listening on port ' + listener.address().port); 
});


