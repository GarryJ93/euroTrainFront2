import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StayCat } from '../models/stay-cat';

@Injectable({
  providedIn: 'root',
})
export class StayCatService {
  bddUrl = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  getAllStayCats(): Observable<StayCat[]> {
    return this.http.get<StayCat[]>(
      this.bddUrl + '/api/stay-cat',
      this.httpOptions
    );
  }

  getStayCatById(id: number): Observable<StayCat> {
    return this.http.get<StayCat>(
      this.bddUrl + `/api/stay-cat/${id}`,
      this.httpOptions
    );
  }
}
