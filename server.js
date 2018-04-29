const express =     require('express')
const bodyParser =  require('body-parser')
const mysql =       require('mysql')
const multer =      require('multer');
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
app.use(session({ secret: 'this-is-a-secret-token', cookie: { maxAge: 14 * 24 * 3600000 }}))
app.use('/css', express.static('assets/css'));
app.use('/js', express.static('assets/js'));
app.use('/img', express.static('assets/img'));
app.use('/fonts', express.static('assets/fonts'));

var connexion = function () {
    return mysql.createConnection({
        host: 'mysql-bonne-franquette.alwaysdata.net',
        user: '158558',
        password: 'totolola42',
        database: 'bonne-franquette_bdd'
    })
}

//config bodyParser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./assets/img");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: Storage }).array("file", 3); //Field name and max count

app.set('views',  __dirname + '/views')

app.get('/', function (req, res) {
    var user = null
    if (req.session.someAttribute != undefined) {
        user = req.session.someAttribute
    }
    res.render('index.twig', {
        user: user
    })
})

app.get('/autocomplete', function (req, res) {
    console.log(req.query.q)
    let co = connexion()
    co.connect()
    co.query("SELECT * FROM definitions WHERE name LIKE '" + req.query.q + "%'", function (error, results, fields) {
        if (error) return console.error(error)
        if (results.length > 0) {
            res.send({words: results})
        } else {
            res.send({words: false})
        }
    })
})

app.get('/inscription', function (req, res) {
    res.render('inscription.twig')
})

app.post('/inscription', function (req, res) {
    let q = "select * from users where email like '" + req.body.email + "';",
        co = connexion();
    co.connect();
    co.query(q, function (error, results, fields) {
        if (error) return console.log(error);
        if (results.length > 0) {
            console.log('email deja existant')
            res.redirect('/');//cet email est deja existant
        } else {
            upload(req, res, function (err) {
                console.log(req.files[0].path)
                let file = req.files[0].path.split('\\')
                if (err) {
                    return err;
                }
                var hash = bcrypt.hashSync(req.body.password, 10);
                let q = "insert into users (`lastname`, `firstname`, `pseudo`, `picture_path`, `email`, `password`) values ('" + req.body.lastname + "', '" + req.body.firstname + "', '" + req.body.pseudo + "', '" + file[2] + "', '" + req.body.email + "', '" + hash + "')";
                co.query(q, function (error, results, fields) {
                    if (error) return console.log(error);
                    var sessData = req.session;
                    console.log(results.insertId)
                    sessData.someAttribute = results.insertId;
                    res.redirect("/profil");
                })
            });
        }
    })
})

app.get('/connexion', function (req, res) {
    res.render('connexion.twig')
})

app.post('/connexion', function (req, res) {
    console.log('connexion', JSON.stringify(req.body))
    let co = connexion();
    co.connect();
    co.query("select * from users where pseudo like '" + req.body.pseudo + "';", function (error, results, fields) {
        if (error) return console.log(error);
        if (results.length > 0) {
            bcrypt.compare(req.body.password, results[0].password).then(function (password) {
                if (password === true) {
                    var sessData = req.session;
                    sessData.someAttribute = results[0].id;
                    res.redirect('/profil');
                } else {
                    res.redirect('/connexion', {checkPassword: password})
                }
            })
        } else {
            res.redirect('/connexion')
        }
    })
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