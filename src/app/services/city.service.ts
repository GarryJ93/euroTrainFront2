import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private http: HttpClient) {}

  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>('http://localhost:3000/api/City');
  }

  getCityById(id: number): Observable<City> {
    return this.http.get<City>(`http://localhost:3000/api/City/${id}`);
  }

  addCity(City: City): Observable<City> {
    return this.http.post<City>(
      'http://localhost:3000/api/City',
      City
    );
  }
}
