const { constants } = require('buffer');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const express = require('express');
const app = express();
const router = express.Router();
const session = require('express-session');
app.use(session({secret:'secret',resave: true,
saveUninitialized: true
}))


const fs = require(`fs`);
const mysql = require(`mysql-await`);


const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))

const multer = require('multer');

const upload = multer({dest:'uploads/'});



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
 var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true })


router.post('/hush', upload.single('submitassign'), function (req, res, next) {
    console.log(req.body);
    console.log(req.file);
  })


 module.exports = router;