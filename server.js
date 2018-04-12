const express =     require('express')
const bodyParser =  require('body-parser')
const mysql =       require('mysql')
const Twig =        require('twig')
const bcrypt =      require('bcrypt')
const session =     require('express-session')
const app =         express();

/* CREATION DU SERVER */
const server = require('http').createServer(app);
var users = null;

/* variable globales */
var port = 1337;

/* ROAD TO ASSETS DIRECTORY */
app.use(session({ secret: 'this-is-a-secret-token'}))
app.use('/css', express.static('assets/css'));
app.use('/js', express.static('assets/js'));
app.use('/img', express.static('assets/img'));
app.use('/fonts', express.static('assets/fonts'));

//config bodyParser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.set('views',  __dirname + '/views')

app.get('/', function (req, res) {
    res.render('index.twig')
})

app.get('/inscription', function (req, res) {
    res.render('inscription.twig')
})

app.get('/connexion', function (req, res) {
    res.render('connexion.twig')
})

app.get('/profil', function (req, res) {
    res.render('profil.twig')
})

app.get('/validate', function (req, res) {
    res.render('validate.twig')
})

app.get('/add', function (req, res) {
    res.render('add.twig')
})

app.get('/definition', function (req, res) {
    res.render('definition.twig')
})

app.get('/lobby', function (req, res) {
    res.render('lobby.twig')
})

server.listen(port);
console.log("application live on port " + port);