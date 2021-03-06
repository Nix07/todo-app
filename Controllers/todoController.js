var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the Database
mongoose.connect('mongodb://user1:test@ds113650.mlab.com:13650/todo-app')

//Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item : String
});

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item : 'get milk'}, {item : 'walking'}, {item : 'coding'}];
var urlencodedParser = bodyParser.urlencoded({extended : false});
module.exports = function(app) {

  app.get('/', function(req, res){
    //get data from mongodb and pass it to view
    Todo.find({}, function(err, data){
      if(err) throw err;
      res.render('todo', {todos : data});
    });
  });

  app.post('/', urlencodedParser, function(req, res){
    //get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
      if(err) throw err;
      res.json(data);
    });
  });

  app.delete('/:item', function(req, res){
    //delete ther requested item from mongodb
    Todo.find({item : req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if (err) {
        throw err;
      }
      res.json(data);
    });
  });
};
