const
    express = require('express'),
    app = express(),
    ejs = require('ejs'),
    ejsLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    flash = require('connect-flash'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session),
    passport = require('passport')

// environment port
const
port = process.env.PORT || 3000,
mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/passport-authentication'

// mongoose connection
mongoose.connect(mongoConnectionString, (err) => {
console.log(err || "Connected to MongoDB (passport-authentication)")
})

// will store session information as a 'sessions' collection in Mongo
const store = new MongoDBStore({
uri: mongoConnectionString,
collection: 'sessions'
});

// middleware
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(flash())

// ejs configuration
app.set('view engine', 'ejs')
app.use(ejsLayouts)

//root route
app.get('/', (req,res) => {
res.render('index')
})

app.listen(port, (err) => {
console.log(err || "Server running on port " + port)
})