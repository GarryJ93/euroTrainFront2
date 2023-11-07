import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  bddUrl = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(this.bddUrl + '/api/city', this.httpOptions);
  }

  getCityById(id: number): Observable<City> {
    return this.http.get<City>(
      this.bddUrl + `/api/city/${id}`,
      this.httpOptions
    );
  }

  getCityByIdWithCountry(id: number): Observable<City> {
    return this.http.get<City>(
      this.bddUrl + `/api/city/country/${id}`,
      this.httpOptions
    );
  }

  addCity(city: City): Observable<City> {
    return this.http.post<City>(
      this.bddUrl + '/api/city',
      city,
      this.httpOptions
    );
  }

  updateCity(id: number, updateData: Partial<City>): Observable<Partial<City>> {
    return this.http.patch<City>(
      this.bddUrl + `/api/city/${id}`,
      updateData,
      this.httpOptions
    );
  }

  deleteCity(id: number): Observable<City> {
    return this.http.delete<City>(
      this.bddUrl + `/api/city/${id}`,
      this.httpOptions
    );
  }
}
