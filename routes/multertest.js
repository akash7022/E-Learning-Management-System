require('dotenv').config()
const express = require('express');
const app = express();
const router = express.Router();
const { constants } = require('buffer');
const cookieParser = require('cookie-parser');
var multer  = require('multer')
const {storage} = require('../cloudinary');
const upload = multer({storage});
const session = require('express-session');
app.use(session({secret:'secret',resave: true,
saveUninitialized: true}))
const { urlencoded } = require('body-parser');
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
const fs = require(`fs`);
const mysql = require(`mysql-await`);
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

router.post('/profile', upload.single('submitassign'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    const u = req.session.usn;
    const t = req.body.ad;
    const lk = req.file.path;
    con.query("insert into ?? (usn,link) VALUES (?,?)",[t,u,lk] , function (err, result, fields){
        if (err) throw err;
        
    })
  })



module.exports = router;