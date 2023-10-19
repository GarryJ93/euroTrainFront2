import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StayCat } from '../models/stay-cat';

@Injectable({
  providedIn: 'root',
})
export class StayCatService {
  constructor(private http: HttpClient) {}

  getAllStayCats(): Observable<StayCat[]> {
    return this.http.get<StayCat[]>('http://localhost:3000/api/stay-cat');
  }

  getStayCatById(id: number): Observable<StayCat> {
    return this.http.get<StayCat>(`http://localhost:3000/api/stay-cat/${id}`);
  }
}
