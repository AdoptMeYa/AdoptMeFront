import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location} from '../models/location.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(public http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getLocation(id): Observable<Location>{
    return this.http.get<Location>('http://localhost:3000/districts/' + id.toString());
  }

}
