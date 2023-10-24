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
    return this.http.get<City[]>('http://localhost:3000/api/city');
  }

  getCityById(id: number): Observable<City> {
    return this.http.get<City>(`http://localhost:3000/api/city/${id}`);
  }

  addCity(city: City): Observable<City> {
    return this.http.post<City>('http://localhost:3000/api/city', city);
  }

  updateCity(id: number, updateData: Partial<City>): Observable<Partial<City>> {
    return this.http.patch<City>(
      `http://localhost:3000/api/city/${id}`,
      updateData
    );
  }

  deleteCity(id: number): Observable<City> {
    return this.http.delete<City>(`http://localhost:3000/api/city/${id}`);
  }
}
