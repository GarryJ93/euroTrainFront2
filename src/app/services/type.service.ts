import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransportType } from '../models/transport-type';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  bddUrl = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  getAllTypes(): Observable<TransportType[]> {
    return this.http.get<TransportType[]>(
      this.bddUrl + '/api/transport-type',
      this.httpOptions
    );
  }

  getTypeById(id: number): Observable<TransportType> {
    return this.http.get<TransportType>(
      this.bddUrl + `/api/transport-type/${id}`,
      this.httpOptions
    );
  }
}
