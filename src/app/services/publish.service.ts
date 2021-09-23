import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Publish} from "../models/publish.model";

@Injectable({
  providedIn: 'root'
})
export class PublishService {
  private basePath: string = "http://localhost:3000/"
  apiEndPoint: string = "pubicaciones/";
  constructor(private http: HttpClient) { }

  createFormPublish(descripcion: string,
  Name: string,
  IsAtention: string,
  Race: string,
  Ubication: string,
  Commnet: string,
  Age: string

  ): Observable<Publish> {
    return this.http.post<Publish>(this.basePath + 'signup', {
      email: email, password: password



    })
  }
}
