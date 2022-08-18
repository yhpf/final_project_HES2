// here we declare out components and import our modules and routes
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TodolistComponent } from './todolist/todolist.component';

import { RouterModule, Routes } from '@angular/router';
import { TodoitemComponent } from './todoitem/todoitem.component';
import { FormsModule } from '@angular/forms';
import { NewtodoitemComponent } from './newtodoitem/newtodoitem.component';

const routes:Routes = [
//  { path: '', redirectTo: '/todolist', pathMatch: 'full'}, // root route redirect to gallery component
  { path: '', component: TodolistComponent, pathMatch: 'full'},
  { path: 'todolist', component: TodolistComponent },
  { path: 'tododetails/:id', component: TodoitemComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodolistComponent,
    TodoitemComponent,
    NewtodoitemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      routes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
