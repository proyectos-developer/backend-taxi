const cors = require('cors')

const express = require ('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require ('connect-flash')
const session = require ('express-session')
const mysqlstore = require('express-mysql-session')
const passport = require('passport')

const { database } = require('./keys')

const app = express()
app.use(cors())
require ('./lib/passport')

const admin = require('firebase-admin')
const serviceAccount = require('./keyaccount.json')

const config_firebase = {
    apiKey: "AIzaSyD4Ua7VkZvjjzMktGX449aPUszce7udZEg",
    authDomain: "taxi-24-7-90a56.firebaseapp.com",
    databaseURL: "https://taxi-24-7-90a56-default-rtdb.firebaseio.com",
    projectId: "taxi-24-7-90a56",
    storageBucket: "taxi-24-7-90a56.appspot.com",
    messagingSenderId: "125447927007",
    appId: "1:125447927007:web:7dbe118882c81c938e256a",
    measurementId: "G-FK01YMHX01"
}

admin.initializeApp({
    credential: admin.credential.cert (serviceAccount),
    databaseURL: config_firebase.databaseURL,
    storageBucket: config_firebase.storageBucket
})

/**Configuraciones */
app.set ('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); 
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs', 
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(
    session({
        secret: 'faztmysqlnodesession',
        resave: false,
        saveUninitialized: false,
        store: new mysqlstore(database)
    })
)

app.use(flash())
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

//Variables globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success')
    app.locals.message = req.flash('message')
    app.locals.users = req.users
    next()
})
 
//Rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'))

//app.use(require('./routes/sms.js'))
app.use(require('./routes/carros.js'))
app.use(require('./routes/tokens.js'))
app.use(require('./routes/conductores.js'))
app.use(require('./routes/viajeros.js'))
app.use(require('./routes/viajes.js'))
app.use(require('./routes/cupones.js'))
app.use(require('./routes/calificaciones.js'))
app.use(require('./routes/compartir.js'))
app.use(require('./routes/notificaciones.js'))
app.use(require('./routes/tour.js'))
app.use(require('./routes/correo.js'))

//Publico
app.use(express.static(path.join(__dirname, 'public')))

//Iniciar el servidor
app.listen (app.get('port'), () => {
    console.log ('Server en puerto ', app.get ('port'))
})
