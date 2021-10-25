const { constants } = require('buffer');
const cookieParser = require('cookie-parser');
const fs = require(`fs`);
const mysql = require(`mysql-await`);

const express = require('express');
const app = express();
var session = require('express-session')
app.use(session({secret:'secret',resave: true,
saveUninitialized: true,
}))
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true })

const { v4: uuidv4 } = require('uuid');
uuidv4();

var session = require('express-session')
app.use(session({secret:'secret',resave: true,
saveUninitialized: true,
}))
 const con = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "Sujanya@1978",
     database: "lms"
 });

 con.connect((err) => {
     if (!err) {
         console.log("Connected");
     }
     else {
         console.log(err)
     }
 })

 router.post('/log', urlencodedParser, function (req, res) {
    res.send('welcome, ' + req.body.hi)
    console.log(req.body.hi)
  })


 router.post('/t',function(req,res){
     console.log(req.body)

 })
let count = 0;

 router.get('/xxx',function(req, res, next){
     req.session.count+=1;
 })

 


 module.exports = router;