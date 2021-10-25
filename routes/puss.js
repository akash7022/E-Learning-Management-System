const { constants } = require('buffer');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const session = require('express-session');
const { request } = require('http');
app.use(session({secret:'secret',resave: true,
saveUninitialized: true,
}))
const router = express.Router();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());


const user = {
    name:"jhon",
    age : 18,
    nation : "india"
};
const { v4: uuidv4 } = require('uuid');
uuidv4();


router.get('/login',function(req, res, next) {
    req.session.user = user;
    req.session.save();
    return res.send("user logges in");
});


router.get('/user', function(req, res, next){
     return res.send(res.session.user);
})


router.get('/logtry', function(req, res, next) {
    if (req.session.user) {
        res.send(user);
      res.end()
    } else {
      req.session.user = user;
      res.end('welcome to the session demo. refresh!')
    }
  })




router.get('/vvv', function(req, res, next) {
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


  router.get('/vve', function(req, res, next) {
    req.session.destroy(function(err) {
        res.send("good bye");
      })
  })



  module.exports = router;