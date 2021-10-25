const express = require('express');
const app = express();
const { constants } = require('buffer');
const cookieParser = require('cookie-parser');
const session = require('express-session');
app.use(session({secret:'secret',resave: true,
saveUninitialized: true}))
app.use(function(req, res, next) {
    res.locals.usn = req.session.usn;
    next();
  });
require('dotenv').config()

const fs = require(`fs`);
const mysql = require(`mysql-await`);
const { urlencoded } = require('body-parser');

const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))


const daaroute = require('./routes/Daa');
app.use('/', daaroute);
const adminroute = require('./routes/Admin');
app.use('/',adminroute);
const loginroute = require('./routes/Login.js');
app.use('/',loginroute);
const testroute = require('./routes/test');
app.use('/',testroute);
const pussroute = require('./routes/puss');
app.use('/',pussroute);
const submitroute = require('./routes/submit');
app.use('/',submitroute);
const mroute = require('./routes/multertest');
app.use('/',mroute);
const tableroute = require('./routes/viewtable');
app.use('/',tableroute);



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

app.get('/test', (req, res) => {
    res.render('test');
})




app.get('/', (req, res) => {
    res.render('HomePage')
})
app.get('/class',  function(req,res,next){
    if(!req.session.usn){
        res.redirect('/');
    }else{
        res.render('Class');
    }
})






app.get('/admin', (req, res) => {
    (async () => {
        let soldiers = await con.awaitQuery('select* from lms.assignments;');
      res.render('Admin',{  ags : soldiers })
    })();
    
    
})

 app.post('/admin', (req, res) => {
    const newlink = req.body.link;
     console.log(req.body.link)
         (async () => {
             let results = await con.awaitQuery('');

         })();

  
  console.log(req.body.link)
  res.redirect('/admin')
 })

 app.get('/vt', function(req, res, next) {
    if (req.session.views) {
      req.session.views++
      res.setHeader('Content-Type', 'text/html')
      res.write('<p>views: ' + req.session.views + '</p>')
      res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
      res.end()
    } else {
      req.session.views = 1
      res.end('welcome to the session demo. refresh!')
    }
  })


app.get('/vtu', function(req, res, next) {
    req.session.destroy(function(err) {
        res.send("good bye");
      })
  })
app.get('/m',(req,res) =>{
    res.render('marquee');
})

app.listen(8086, () => {
    console.log('Serving on port 8086')
})


