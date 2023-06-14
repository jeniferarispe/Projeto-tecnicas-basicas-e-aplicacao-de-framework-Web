const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const flash = require('connect-flash')
const app = express();
//sessão
app.use(session({
    secret: "umasenha",
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: 60000
    }
}))

app.use(flash())
    //Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})

const produtosRotas = require('./routes/produtosRotas');
const adminRotas = require('./routes/adminRotas');
const categoriasRotas = require('./routes/categoriasRotas');

var hbs = require('hbs');
hbs.registerPartials(path.join(__dirname + '/views/partials'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/produtos', produtosRotas);
app.use('/administrador', adminRotas);
app.use('/categorias', categoriasRotas);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;