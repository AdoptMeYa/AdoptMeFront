import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import { User } from "../models/user.model";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private basePath: string = "http://localhost:3000/"
  apiEndPoint: string = "users/";
  constructor(private http: HttpClient) { }
  /*
  findAllUsers(): Observable<UserContainer> {
    return this.http.get<UserContainer>(this.basePath  + this.apiEndPoint);
  }*/
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.basePath + this.apiEndPoint + id.toString());
  }
  putUser(id: number, objUser: {}): Observable<User>{
    return this.http.put<User>(this.basePath + this.apiEndPoint + id.toString(), objUser );
  }
}
