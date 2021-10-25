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










router.post('/adminadd',upload.single('notes'),(req,res) => {
    let m = parseInt(req.body.mod);
    const p = req.body.ping;
    const l = req.file.path;
    
    
    con.connect(function(err){
        var records = [m,p,l];
        con.query("insert into lms.notes (module,part,link) VALUES (?,?,?)",[m,p,l] , function (err, result, fields){
            if (err) throw err;
            
        })
        
        
    });

    res.redirect('/admin')
})


router.post('/adminaddassignments',upload.single('assign'),(req,res) => {
    const an = req.body.Assignment_name
    
    const li = req.file.path;
    const id = uuidv4();
    con.query("insert into lms.assignments (name,link) VALUES (?,?)",[an,li] , function (err, result, fields){
        if (err) throw err;
        
    })
    con.query("CREATE TABLE ?? (usn VARCHAR(255), link VARCHAR(2000))",[an] , function (err, result, fields){
        if (err) throw err;
    })
    res.redirect('/admin')
    
})

router.post('/rclass',(req,res)=>{
    const t = req.body.tname;
    const r = req.body.rlink;
    con.query("insert into lms.recordclass (topic,rlink) VALUES (?,?)",[t,r] , function (err, result, fields){
        if (err) throw err;
        
    })
    res.redirect('/admin');

})


 module.exports = router;