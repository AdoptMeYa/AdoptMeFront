import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {SessionContainer }from "../models/session.model";
import { User, UserContainer } from "../models/user.model";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private basePath: string = "http://localhost:3000/"
  apiEndPoint: string = "users/";
  constructor(private http: HttpClient) { }
  findAllUsers(): Observable<UserContainer> {
    return this.http.get<UserContainer>(this.basePath  + this.apiEndPoint);
  }
  getUserById(id: number): Observable<UserContainer> {
    return this.http.get<UserContainer>(this.basePath + this.apiEndPoint + id.toString());
  }
  
}
