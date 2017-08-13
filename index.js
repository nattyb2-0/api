var express = require('express');
const path = require('path');
const logger = require('morgan');
const psql = require('./db/db.js');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/public'));
app.get('/api',(req,res)=>{
  res.json({
    name:'natty',
    age:26,
    occupation:'hustler'})
})
// app.get('/', function(request, response) {
//   response.render('pages/index');
// });
app.post('/signup',(req, res, next)=> {
    const SALTROUNDS = 10;
    console.log(req.body);
    const userObject = {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, SALTROUNDS)
    };
    psql.one(`INSERT INTO users ( username, password )
    VALUES ('${userObject.username}', '${userObject.password}') returning *;`)
})


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


