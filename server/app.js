// app.js of assigment 5

const express = require('express');
const path = require('path');
const url = require('url');
const index = require('./routes/index'); 
const todolist = require('./routes/todolist'); 
const bodyparser = require('body-parser'); //neeeded for POST
const apitodo = require('./routes/api/apiTodo'); // needed for REST API
const cookieParser = require('cookie-parser'); //needed for connect-flash
const session = require('express-session'); //needed for connect-flash
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.cj4ca.mongodb.net/todoapp?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})

// set our basics, cookies, sessions, static, POST form handling
app.use(cookieParser('cscie31-secret')); //optional, to see if the cookie was changed after it was sent out and came back
app.use(session({
  secret:"cscie31",
  resave: "true",
  saveUninitialized: "true"
}));
app.use(bodyparser.urlencoded({extended: false})); // body parser to use the form data
app.use(bodyparser.json());

app.use('/files', express.static(path.join(__dirname, 'public/files')))
app.use('/api/index', apitodo); //REST API router

// root route, static route to diliver angular
app.use('/', (req, res) => {
   // filter for actual files we want to deliver from disk
   var pattern = new RegExp('(.css|.html|.js|.ico|.jpg|.png|.pdf)+\/?$', 'gi'); 
   if (pattern.test(req.url)) {
      // in cases where the Angular app is mounted at the root url, we may need to strip a trailing slash from the redirected request 
      let url = req.url.replace(/\/$/, "");
      // deliver the requested file
      res.sendFile(path.resolve(__dirname, `../client/dist/myapp/${url}`));
   } else {
      // in this case, the request should be handled by Angular, which is index.html
      res.sendFile(path.resolve(__dirname, '../client/dist/myapp/index.html'));
   }
});

// error handling
app.use((req, res) => {
  res.status(404);
  res.end("sorry, this file can not be found");
  // eller redirect client back to another URL (in this case a friendly html page)
  // res.redirect('/static/friendly404Page.html');
});

module.exports = app;