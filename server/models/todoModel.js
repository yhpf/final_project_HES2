const mongoose = require('mongoose');

// get access to Schema constructor
const Schema = mongoose.Schema;

// create a new schema for our app
const schema = new Schema({
  originalname: {type: String, required:false},
  mimetype: {type: String, required:false},
  filename: {type: String, required:false},
  fileurl: {type: String, required:false},
  description: {type: String, required:true},
  title: {type: String, required:true},
  duedate: {type: Date, required:true},
  size: {type: String, required:false},
  createdAt: {type: Date},
  updatedAt: {type: Date},
  done: {type: Boolean}
});

// set creation date or date when updated
schema.pre('save', function(next){
  if (!this.createdAt){
    this.createdAt = new Date();
  }else{
    this.updatedAt = new Date();
  }
  next();
});

// export the model with associated name and schema
module.exports = mongoose.model("Todo", schema);