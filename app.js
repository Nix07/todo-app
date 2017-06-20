var express = require('express');
var todoController = require('./Controllers/todoController.js');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./'));

//fire Controllers
todoController(app);

app.listen(process.env.PORT || 8080);
console.log('Server Started!');
