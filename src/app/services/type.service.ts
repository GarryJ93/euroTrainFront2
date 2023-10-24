import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransportType } from '../models/transport-type';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  constructor(private http: HttpClient) {}

  getAllTypes(): Observable<TransportType[]> {
    return this.http.get<TransportType[]>('http://localhost:3000/api/transport-type');
  }

  getTypeById(id: number): Observable<TransportType> {
    return this.http.get<TransportType>(`http://localhost:3000/api/transport-type/${id}`);
  }
}
