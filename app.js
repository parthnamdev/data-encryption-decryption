require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// routers
const homeRouter = require('./routers/homeRouter');

// ejs
app.set('view engine', 'ejs')

// middleware
app.use(express.urlencoded({extended: true}));

// database
// const uri = `${"mongodb+srv://"+process.env.ATLAS_USER+":"+process.env.ATLAS_PASSWORD+"@"+process.env.ATLAS_CLUSTER+".fzmhp.mongodb.net/"+process.env.ATLAS_DB_NAME+"?retryWrites=true&w=majority"}`;
const uri = 'mongodb://localhost:27017/isaaDB';
mongoose.connect(uri, { useNewUrlParser:true, useUnifiedTopology:true });
const db = mongoose.connection;

db.on("error", (err) => {
    console.log(err);
});

db.once("open", () => {
    console.log("database connected");
});

// public
app.use('/',express.static(__dirname + '/public'));
app.use('/',express.static(__dirname + "/node_modules/@fortawesome"));

app.use('/view',express.static(__dirname + '/public'));
app.use('/view',express.static(__dirname + "/node_modules/@fortawesome"));

app.use('/edit',express.static(__dirname + '/public'));
app.use('/edit',express.static(__dirname + "/node_modules/@fortawesome"));

// routes
app.use('/', homeRouter);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is running on PORT " + port +"...")
});

app.get('*', (req, res) => {
    res.status(404).render('404');
});
app.post('*', (req, res) => {
    res.status(404).render('404');
});

