//apiTodo.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const todoController = require('../../controllers/todoController');
const upload = multer({
  storage: todoController.storage,
  fileFilter: todoController.fileFilter
});
const TodoService = todoController.TodoService; // get new TodoService for REST API

// middleware CORS and Preflight
router.use((req, res, next)=>{
  res.set({
  // allow any domain, allow REST methods we've implemented
    // allow AJAX access from any domain with CORS
    'Access-Control-Allow-Origin':'*',
    // allow methods and headers for 'preflight'
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers",
  // Set content-type for all api requests (we will always return application/json, 
  // so we do not have to write in every single responese
    'Content-type':'application/json'
  });
  // if this is a preflight we're done and can send the response with our headers
  if (req.method == 'OPTIONS'){
    return res.status(200).end();
  }
  next();
});

// CREATE (post)
router.post('/', upload.single('file'), async (req, res, next)=>{
	const path = "/files/" + req.file.filename;

	const todo  = {
		originalname: req.file.originalname, //comes from multer
	    mimetype: req.file.mimetype,
	    fileurl: path,
	    title: req.body.title,
	    filename: req.file.filename,
	    description: req.body.description,
	    duedate: req.body.duedate,
	    size: req.file.size / 1024 | 0
	}

	try {
    const todoSave = await TodoService.create(todo);
    res.status(201);
    res.json(todoSave); // fix after feedback from ass 5
    //res.send(JSON.stringify(todoSave));
   	} catch(err) { //handle error
      	console.log(err);
      	throw new Error("TodoSaveError", todo);
   		};
});

// UPDATE (put)
router.put('/:todoid', (req, res, next)=>{
  console.log(`putting ${req.params.todoid}`);
  let putdata = req.body;
  TodoService.update(req.params.todoid, putdata)
    .then((updatedTodo)=>{
      res.status(200);
      res.json(updatedTodo);
      //res.send(JSON.stringify(updatedTodo));
    }).catch((err)=> {
      res.status(404);
      res.end();
    });
 });

// LIST all todo items
router.get('/', (req, res, next)=>{
   TodoService.list()
    .then((todos) => {
      console.log(`API: List files: ${todos}`);
      res.status(200);
      res.json(todos);
      // res.send(JSON.stringify(todos)); //could also write res.json(photos); Then  'Content-type':'application/json' can be removed from middleware
    });
  console.log("placeholder")
});

// FIND (read) one todo item
router.get('/:todoid', (req, res, next)=>{
  console.log(`finding ${req.params.todoid}`);
  TodoService.read(req.params.todoid)
    .then((todo) => {
     	console.log(`Found file: ${todo}`);
     	res.status(200);
      res.json(todo);
     	//res.send(JSON.stringify(todo));
   	}).catch((err)=>{
     	res.status(404); // cant get photo
     	res.end();
   	});
});

// DELETE
router.delete('/:todoid', (req, res, next)=>{
  let id = req.params.todoid;
  TodoService.delete(req.params.todoid)
    .then((todo) => {
     console.log(`Deleted file: ${id}`);
     res.status(200);
     res.json(todo);
     //res.send(JSON.stringify(todo));
   }).catch((err)=> {
     res.status(404);
     res.end();
   });;
});

// export router
module.exports = router;