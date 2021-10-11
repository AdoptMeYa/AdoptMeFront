import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publish, Publication } from '../models/publish.model';
import { map } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class PublishService {
  private basePath = 'http://localhost:3000/';
  apiEndPoint = 'publications';
  constructor(private http: HttpClient) { }

  createFormPublish(descripcion: string,
                    Name: string,
                    IsAtention: string,
                    Race: string,
                    Ubication: string,
                    Commnet: string,
                    Age: string,
                    IdUser: number,
                    Fecha: string

  ): Observable<Publish> {
    return this.http.post<Publish>(this.basePath + this.apiEndPoint , {
      descripcion: descripcion,
      Name: Name,
      IsAtention: IsAtention,
      Race: Race,
      Ubication: Ubication,
      Commnet: Commnet,
      Age: Age,
      IdUser: IdUser,
      Fecha: Fecha
    })
  }
  listPublish(): Observable<Publish[]> {
    return this.http.get<Publish[]>(this.basePath + this.apiEndPoint);
  }
  listPublishByUserId(userId: number): Observable<Publish[]> {
    return this.http.get<Publish[]>(this.basePath + this.apiEndPoint + "?userId=" + userId.toString());
  }

  deletePublishById(id: number):Observable<Publish>
  {
    return this.http.delete<Publish>("http://localhost:3000/publications/" + id.toString());
  }
  getPublication(){
    return this.http.get<Publish[]>("http://localhost:3000/publications")
      .pipe(map((res: any)=>{
        return res;
      }))
  }

  updatePublishbyId(comment: string, datetime: string, userId: number ,id: number): Observable<Publication>{
    return this.http.put<Publication>("http://localhost:3000/publications/"+id.toString(), {
      userId: userId,
      comment: comment,
      datetime: datetime
    })
  }
  CreatePublish(comment: string, datetime: string, userId: number): Observable<Publication>{
    return this.http.post<Publication>(this.basePath + this.apiEndPoint, {
      comment: comment,
      datetime: datetime,
      userId: userId
    })
  }
  
}
