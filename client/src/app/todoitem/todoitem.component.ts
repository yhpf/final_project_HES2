// This is the details page
// Info about the todo item and function to EDIT or GO BACK
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todoitem',
  templateUrl: './todoitem.component.html',
  styleUrls: ['./todoitem.component.css'],
  providers: [ TodoService ]
})
export class TodoitemComponent implements OnInit {

  // local todo object fetched from TodoService
  todo:any;
  // todo file uri with server path prepended
  tododisplayurl:string='';
  // flag for edit mode
  editing:boolean=false;
  
  constructor(private route: ActivatedRoute,
              private router: Router, 
              private todoService:TodoService ) { }

  ngOnInit(): void {
    this.getTodo();
  }

  // toggle between editing and not editing view
  setEditMode(mode:boolean):void{
    this.editing = (mode ? true : false);
  }

  // retreives route parameter and fetches data from data service
  getTodo():void {
    const param:any = this.route.snapshot.paramMap.get('id');
    this.todoService.getTodo(param)
      .subscribe((todo) => {
        this.todo = todo;
        this.tododisplayurl = this.todoService.fileUrl + this.todo.fileurl;
      });
  }

  // calls update from TodoService using data passed from ngForm.value
  updateTodo(obj:any):void {
    this.todo.title = obj.titleField;
    this.todo.description = obj.descField;
    this.todoService.updateTodo(this.todo._id, this.todo)
      .subscribe((result)=>{
        location.reload();
    });
  }

  // deletes todo item using TodoService
  deleteTodo(){
    if (confirm(`Are you sure you want to delete ${this.todo.title}?`)){
      console.log(`deleting ${this.todo._id}`);
      this.todoService.deleteTodo(this.todo._id)
        .subscribe((result)=>{
          alert(`Todo item ${this.todo.title} has been deleted`);
          this.router.navigate(['/todolist']); // location.href="/#/"; redirect back to root?
        })
      }
  }

}
