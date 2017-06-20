var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the Database
mongoose.connect('mongodb://user1:test@ds113650.mlab.com:13650/todo-app')

//Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item : String
});

var Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({item : 'Buy Flowers'}).save(function(err){
  if(err) throw err;
  console.log('Item Saved');
})

var data = [{item : 'get milk'}, {item : 'walking'}, {item : 'coding'}];
var urlencodedParser = bodyParser.urlencoded({extended : false});
module.exports = function(app) {

  app.get('/todo', function(req, res){
    res.render('todo', {todos : data});
  });

  app.post('/todo', urlencodedParser, function(req, res){
    data.push(req.body);
    res.json(data);
  });

  app.delete('/todo/:item', function(req, res){
    data = data.filter(function(todo){
      return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data);
  });
};
