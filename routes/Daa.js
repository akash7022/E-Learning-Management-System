const { constants } = require('buffer');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const express = require('express');
const app = express();
const router = express.Router();
const session = require('express-session');
app.use(session({secret:'secret',resave: true,
saveUninitialized: true,
}))
app.use(function(req, res, next) {
    res.locals.usn = req.session.usn;
    next();
  });
  const { v4: uuidv4 } = require('uuid');
uuidv4();



const fs = require(`fs`);
const mysql = require(`mysql-await`);
const { urlencoded } = require('body-parser');

const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))

const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});


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


router.get('/daa', (req, res) => {
    if(!req.session.usn){
        res.send('not authorized');
    }
     (async () => {
         let results = await con.awaitQuery('select* from lms.daaclasslink;');
         let kings = await con.awaitQuery('select* from lms.notes where module=1;');
         let queens = await con.awaitQuery('select* from lms.notes where module=2;');
         let princes = await con.awaitQuery('select* from lms.notes where module=3;');
         let princs = await con.awaitQuery('select* from lms.notes where module=4;');
         let guards = await con.awaitQuery('select* from lms.notes where module=5;');
         let soldiers = await con.awaitQuery('select* from lms.assignments;');
         let ministers = await con.awaitQuery('select* from lms.recordclass;');
         let susn = req.session.usn;
       res.render('Daa',{ las :kings , lbs : results , lcs : queens , lds : princes , les : princs , lfs : guards , lgs : soldiers ,lhs : ministers,lus : susn})
     })();

})


router.post('/adminaddnotes',upload.single('notes'),(req,res) => {

    console.log(req.body, req.file);
    res.send('go check whether it worked')
    
})

router.get('/try',function(req,res,next){
    req.session.destroy(function(err) {
        res.send("good bye");
      })
})




module.exports = router;