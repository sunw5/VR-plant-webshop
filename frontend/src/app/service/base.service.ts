import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends {[key: string]: any, _id: string}>{

  apiUrl: string = environment.apiUrl;

  entityName: string = '';

  constructor(
    public http: HttpClient
  ) { }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}${this.entityName}`);
  }

  getAllbyProperty(key: string, value: any): Observable<T[]> {
    return this.getAll().pipe(
      map((results) =>
        results.filter((r) => {
          return r[key] === value;
        })
      )
    );
  }

  get(id: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${this.entityName}/${id}`);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${this.entityName}`, entity);
  }

  update(entity: T): Observable<T> {
    return this.http.patch<T>(
      `${this.apiUrl}${this.entityName}/${entity._id}`,
      entity
    );
  }

  delete(id: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${this.entityName}/${id}`);
  }
}
