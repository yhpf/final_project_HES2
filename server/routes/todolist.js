// todolist.js - Router used for todolist.pug

const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController'); // require todoController file
const TodoService = todoController.TodoService; // get new TodoService
const moment = require('moment'); // https://stackoverflow.com/questions/8675642/how-can-i-format-a-date-coming-from-mongodb


router.get('/', (req, res, next) => {
    //res.locals.localtest = "thisislocal";

    const date_ob = new Date();
    const day = ("0" + date_ob.getDate()).slice(-2);
    const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    const year = date_ob.getFullYear();
    const date = year + "-" + month + "-" + day;

    TodoService.listdone() 
        .then((todos)=>{
        res.render('todolist', { // todolist view
            date: date, 
            forminput: todos,
            moment: moment // date formatting
        });
    })
        .catch((err)=>{
            if (err) {
            res.end("ERROR!");
            }
        });
});

module.exports = router;