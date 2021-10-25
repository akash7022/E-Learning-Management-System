const { constants } = require('buffer');
const cookieParser = require('cookie-parser');
const fs = require(`fs`);
const mysql = require(`mysql-await`);
const { request } = require('http');
const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
app.use(cookieParser());
app.use(session({secret:'secret',resave: true,
saveUninitialized: true,}));
app.use(function(req, res, next) {
    res.locals.usn = req.session.usn;
    next();
  });
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const router = express.Router();
const bcrypt = require('bcryptjs');
 
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(flash());
const { v4: uuidv4 } = require('uuid');
uuidv4();


 const con = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "Sujanya@1978",
     database: "lms"
 });
 const user = {
    name:"jhon",
    age : 18,
    nation : "india"
};
 con.connect((err) => {
     if (!err) {
         console.log("Connected");
     }
     else {
         console.log(err)
     }
 })
 let count = 0;
router.post('/loginauth', urlencodedParser,function(req,res,next){
    const {USN,password} = req.body;
    let errors = [];
    if(!USN||!password){
        errors.push({msg:'please fill in all fields'});
    }
    if(errors.length>0){
        res.render('login',{errors});
    }else{
        (async () => {
            let datas = await con.awaitQuery('select* from lms.student where usn = ?',[USN]);
            Object.keys(datas).forEach(function(key) {
                var row = datas[key];
                let valpas = bcrypt.compareSync(password,row.password);
                if(valpas){
                    if (req.session.usn) {
                        res.redirect('/');
                    } else {
                      req.session.usn = row.usn;
                      res.redirect('/Class');
                    }
                    
                }else{
                    res.send('Incorrect password or usn');
                }
                
            });
            
        })();
    }
})

router.get('/userlogin',function(req, res, next){
    res.render('login');
})
router.get('/logtry', function(req, res, next) {
    if (req.session.user) {
        res.send(user);
      res.end()
    } else {
      req.session.user = 'lohith';
      res.end('welcome to the session demo. refresh!')
    }
  })


  router.get('/v', function(req, res, next) {
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


router.post('/registerauth',urlencodedParser,function(req,res){
    const {newUSN,newpassword} = req.body;
    let errs = [];
    if(!newUSN||!newpassword){
        errs.push({mssg:'please fill in all fields'});
    }

    if(errs.length>0){
        res.render('Admin',{errs});
    }else{
        bcrypt.genSalt(10, function(erro, salt) {
            bcrypt.hash(newpassword, salt, function(err0, hash) {
                // Store hash in your password DB.
                if(erro){
                    throw erro;
                }
                let newpass = hash;
                var stdata = [newUSN,newpass];
                con.query("insert into lms.student (usn,password) VALUES (?,?)",[newUSN,newpass] , function (erru, result, fields){
                    if (erru) throw erru;
                    
                })
                res.redirect('Admin');
            });
        });
    }
})

router.get('/xyz',(req,res)=>{
    if(!req.session.usn){
        res.redirect('/');
    }

})



router.get('/ve', function(req, res, next) {
    req.session.destroy(function(err) {
        res.send("good bye");
      })
  })



  router.post('/show', urlencodedParser, function (req, res) {
    console.log(req.body.ad)
  })


  router.get('/account',urlencodedParser, function (req, res){
      let accusn = req.session.usn;
      (async () => {
        let accds = await con.awaitQuery('select* from lms.stu where usn = ?',[accusn]);
        console.log(accds);
        res.render('accountdetails',{accds});
    })();

  })


 module.exports = router;