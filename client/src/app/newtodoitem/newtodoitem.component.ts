// This is where you add a new todo item 
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-newtodoitem',
  templateUrl: './newtodoitem.component.html',
  styleUrls: ['./newtodoitem.component.css']
})
export class NewtodoitemComponent implements OnInit {

  // When a new file is created, we'll send an event to the parent
  //  to refresh its todoList
  @Output() newTodo = new EventEmitter();

  // Todo object, bound to the form fields
  todo:any = {}
  // property for the file upload element (not bound, but set in a change event)
  fileToUpload:any = null;
    // bound to change event on file upload html control
  handleFileInput(target:any):void{
    this.fileToUpload = target.files.item(0);
  }

  constructor(private todoService:TodoService) { }

  ngOnInit() { }

  // called onSubmit
  save(newtodoitemForm:any):void {
    // since we have  file upload, we'll use FormData here rather than JSON
    let formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    formData.append('title', this.todo.title);
    formData.append('description', this.todo.description);
    formData.append('duedate', this.todo.duedate); 
    console.log("submitting");
    // Call on photoService. Upon when its Observable calls the 'next' function (which
    //  is the first argument to subscribe(next, err, complete)), we'll notify the parent component
    //  of the existince of the new file, and call reset() on the form object
    this.todoService.createTodo(formData)
      .subscribe((todo)=>{
        console.log(todo)
        this.newTodo.emit();
        newtodoitemForm.reset();
      });
  }

}
