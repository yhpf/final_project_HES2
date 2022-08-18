// This is the actuall todo item card
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  @Input() todo:any;
  @Input() baseUrl;
  @Output() doneEvent = new EventEmitter<string>();
  itemsdone:string;


  constructor(private todoService:TodoService) { 
  }

  done(title):void {
    console.log(title)
    //this.itemsdone = 'Done!'; 
    this.todo.done = !this.todo.done;
    this.todoService.updateTodo(this.todo._id, this.todo)
      .subscribe((result)=>{
        this.itemsdone = this.todo.done ? "Undo Done" : "Mark as Done";
    });
    this.doneEvent.emit(title);
  }

  ngOnInit(): void {
    this.todo.displayurl = this.baseUrl + this.todo.fileurl;
    this.itemsdone = this.todo.done ? "Mark as Not Done" : "Mark as Done";
    console.log("displayUrl is "+this.todo.displayurl)
  }
}
