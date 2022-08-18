// This is the part of page where we present our stuff
// shows all the todo items on main page

import { Component, OnInit } from '@angular/core';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
  providers: [TodoService]
})
export class TodolistComponent implements OnInit {

  constructor(private todoService:TodoService) {
  }

  // title of webpage
  title = 'myapp';

  // get todays date
  currentDate = new Date();

  numTodoItems:number = 0;

  totalItemsDone:number = 0;
  mostRecentItemDone:string = '';
  handleDone(e:any):void {
    console.log('app-component gets done:' + e);
    this.totalItemsDone = this.todoList.filter(function(i) { return i.done }).length;
    this.mostRecentItemDone = e;
  }

  todoList:any[] = [];
  fileUrl = '';

  ngOnInit() {
    this.updateTodoList();
    this.fileUrl = this.todoService.fileUrl;
  }
  updateTodoList():void{
    this.todoService.listTodoItems().subscribe((todos)=>{
      this.todoList = todos;
      this.numTodoItems = this.todoList.length;
      this.totalItemsDone = this.todoList.filter(function(i) { return i.done }).length;
    });
  }

}
