var express = require('express');
var todoController = require('./Controllers/todoController.js');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./'));

//fire Controllers
todoController(app);

app.listen(8080, '0.0.0.0', function(){
  console.log('Server started!');
});
