import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators"
import {AdoptionRequestModel} from '../models/AdoptionRequest.model';

@Injectable({
  providedIn: 'root'
})
export class AdoptionRequestService {
  private basePath = 'http://localhost:3000/';
  apiEndPoint = 'adoptionRequests';
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  postAdoptionRequest(data: any){
    return this.http.post<AdoptionRequestModel>(this.basePath + this.apiEndPoint, data);
  }
}
