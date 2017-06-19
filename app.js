var express = require('express');
var todoController = require('./Controllers/todoController.js');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./'));

//fire Controllers
todoController(app);

app.listen(3000);
console.log('You are listening to port 3000');
