const express = require('express');
const app = express();
const router = express.Router();
const { constants } = require('buffer');
const cookieParser = require('cookie-parser');
const session = require('express-session');
app.use(session({secret:'secret',resave: true,
saveUninitialized: true}))
const fs = require(`fs`);
const mysql = require(`mysql-await`);
const { urlencoded } = require('body-parser');

const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))


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


router.post('/tshow',(req,res) =>{
    const tt = req.body.ad;
    (async () => {
        let soldiers = await con.awaitQuery('select* from ??;',[tt]);
        res.render('vt',{aas :soldiers})
    })();
})
module.exports = router;