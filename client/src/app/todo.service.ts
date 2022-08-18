// Service class and CRUD operations
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()

export class TodoService {
  maxId:number = 3;
  // environment dependent
  private apiurl:string = environment.apiurl;
  fileUrl:string = environment.fileUrl;

  constructor(private http:HttpClient) {
  }

  // READ (get)
  listTodoItems():Observable<any[]> {
    return this.http.get<any[]>(this.apiurl + 'api/index');
  }

  // READ (get)
  getTodo(id:string) {
    return this.http.get(this.apiurl + 'api/index/' + id);
  }

  // CREATE (post)
  createTodo(todoObject: FormData) {
    return this.http.post(this.apiurl+'api/index', todoObject);
  }

  // UPDATE (put)
  updateTodo(id:string, data:any) {
    return this.http.put(this.apiurl + 'api/index/' + id, data);
  }

  // DELETE (delete)
  deleteTodo(id:string) {
    return this.http.delete(this.apiurl + 'api/index/' + id);
  }
}
