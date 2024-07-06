const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const User = require('./models/index');
const router = require('./routers/router');


const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

//set paths
app.use(express.static(path.join(__dirname, 'views')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.render('login.html');
  });

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
})

app.get('/adminlogin', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'adminlogin.html'));
})

app.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'error404.html'));
})

app.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'user.html'));
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'aboutus.html'));
})

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'profile.html'));
})

app.get('/support', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'support.html'));
})

app.get('/request_delivery', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'request_delivery.html'));
})

app.get('/bill', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'bill.html'));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
})

app.get('/calculate', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'fare_calculator.html'));
})

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin.html'));
})

app.listen(port , () => {
    console.log(`Server is running on port number http://localhost:${port}`);
});