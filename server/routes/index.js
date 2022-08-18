// todos.js - Router used in app.js

const express = require('express');
const router = express.Router();
const url = require('url');
const multer = require('multer');
const todoController = require('../controllers/todoController'); // require todoController file
const flash = require('connect-flash');
const Todo = require('../models/todoModel'); // require todoModel file
const moment = require('moment'); // https://stackoverflow.com/questions/8675642/how-can-i-format-a-date-coming-from-mongodb

const TodoService = todoController.TodoService; // get new TodoService

// rename saved uploaded photo file and only accept certain file types (multer)
const upload = multer({ storage: todoController.storage, fileFilter: todoController.fileFilter });

// flash messaging
router.use(flash());

// search the database for our todo items (LIST)
router.get('/', (req, res, next) => {
	const date_ob = new Date();
  	const day = ("0" + date_ob.getDate()).slice(-2);
	const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
 	const year = date_ob.getFullYear();
	const date = year + "-" + month + "-" + day;

	// list
	TodoService.list() // changed from Todo.find({})
    	.then((todos)=>{
      	res.render('index', { // index view
      		date: date, 
			forminput: todos, 
        	flashMsg: req.flash("fileUploadError"), // flash message
        	moment: moment // date formatting
      	});
    })
    	.catch((err)=>{
      		if (err) {
        	res.end("ERROR!");
      		}
    	});
});

router.get('/', (req, res, next) => {
	res.render('/todolist');
});

// FIND todo item by todoid and show item with edit form
router.get('/:todoid', (req, res, next)=>{
	TodoService.read(req.params.todoid) // change from Todo.findOne
		.then((todo)=>{
  			res.render('updateTodo', { //this is the view where we can edit todo item
  				item: todo,
  				moment: moment, // date formatting
    			flashMsg: req.flash("todoFindError") // error message 
			});
		})
		.catch((err)=>{
			if (err) console.log(err);
		});
});

// when we UPDATE info in form the new values are updated on the first page
router.post('/:todoid', (req, res, next)=>{ // HOW CAN THIS BE .PUT?
  	TodoService.read(req.params.todoid) // change from Todo.findOne
    	.then((todo)=>{
      		var data  = {
         		title: req.body.title,
         		description: req.body.description,
         		duedate: req.body.duedate
   	    	}
   	    	TodoService.update(req.params.todoid, data).then(()=>{ // update via TodoService
        		res.redirect('/index');
      		});
    	})
    	.catch((err)=>{
      		if (err) console.log(err);
  		});
});

// save uploaded file to database (CREATE)
router.post('/', upload.single('file'), (req, res, next)=>{
	const path = "/files/" + req.file.filename; // static/files... static removed bc it put the wrong path in DB

	const todoData  = {
		originalname: req.file.originalname, //comes from multer
	    mimetype: req.file.mimetype,
	    fileurl: path,
	    title: req.body.title,
	    filename: req.file.filename,
	    description: req.body.description,
	    duedate: req.body.duedate,
	    size: req.file.size / 1024 | 0,
	    done: false
	}
	TodoService.create(todoData).then(()=>{ // creat via TodoService
   		res.redirect("/index");
   	})
   	.catch((err)=>{ //handle error
 		if (err){
  			console.log(err);
  			throw new Error("TodoSaveError", todo);
  		}

  	});
});

// DELETE todo item
router.post('/delete/:todoid', (req, res, next) => {
	TodoService.delete(req.params.todoid).then(()=>{
	  res.redirect('/index');
	})
	.catch((err)=>{
			if (err) console.log(err);
	});
});

// Done button
router.post('/done/:todoid', (req, res, next) => {
	TodoService.done(req.params.todoid).then(()=>{
	  res.redirect('/index');
	})
	.catch((err)=>{
			if (err) console.log(err);
	});
});

// catch/handle errors here
router.use(function(err, req, res, next){
	console.error(err.stack);
// if the error came from our fileFilter, set the flash message and redirect to the form
if (err.message == "OnlyCertainFilesAllowed"){
	req.flash('fileUploadError', "Please select one of the accepted file types.");
	res.redirect('/index');
} else if (err.message == "TodoSaveError"){ // in case of photo save error
    req.flash('todoSaveError', "There was a problem saving your todo item.");
    res.redirect('/index');
}else{
// otherwise, let express handle the error in the usual way
next(err);
}
});

module.exports = router;