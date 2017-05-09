var express = require('express');
const path = require('path');
const logger = require('morgan');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.get('/api',(req,res)=>{
  res.json({
    name:'natty',
    age:12,
    occupation: 'student'
  })
})
// app.get('/', function(request, response) {
//   response.render('pages/index');
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


