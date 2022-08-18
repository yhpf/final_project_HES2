var multer = require('multer');
const Todo = require('../models/todoModel');

// changes file namnes when it saves files
// configure disk storage for files handled by multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/files');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// only accept files based on file format ending
// configure file extension folter for uploads
const fileFilter = function(req, file, cb) {
  if (file.originalname.match(/\.(jpg|jpeg|txt|doc|pdf|xls)$/)){ //regex
    cb(null, true);
  }  else {
    cb(new Error("Only jpg txt doc pdf xls"), false);
 }
}

// new class to handle REST API
class TodoService {

  // create
  static create(obj){
    const todo = new Todo(obj);
    return todo.save();
  }

  // update (in this case we take an object and replace it with another)
  static update(id, data){
    return Todo.findById(id)
      .then((todo)=>{
        todo.set(data);
        todo.save();
        return todo;
      });
  }

  // done (set as done)
  static done(id){
    return Todo.findById(id)
      .then((todo)=>{
        todo.done = true;
        todo.save();
        return todo;
      });
  }

  // find
  static read(id){
    return Todo.findById(id) 
      .then((todo)=>{
        // found
        return todo;
      });
  }

  // list
  static list(){
    return Todo.find({})
      .then((todo)=>{
        // found
        return todo;
      });
  }

  // list done (for second page)
  static listdone(){
    return Todo.find({done: true})
      .then((todo)=>{
        // found
        return todo;
      });
  }

  // delete
  static delete(id){
    return Todo.deleteOne({_id: id})
      .then((obj)=>{
        //removed
        return obj;
      })
  }
}

module.exports.storage = storage;
module.exports.fileFilter = fileFilter;
module.exports.TodoService = TodoService;