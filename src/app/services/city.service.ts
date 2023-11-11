import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { City } from '../models/city';
// import { JwtService } from './jwt.service';

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
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }
  public cityList$ = new BehaviorSubject<City[]>([]);
  constructor(private http: HttpClient) // private jwtService: JwtService
  {}

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
    // this.jwtService.checkTokenExpiration();
    return this.http.post<City>(this.bddUrl + '/api/city', city, {
      headers: this.getHeaders(),
    });
  }

  updateCity(id: number, updateData: Partial<City>): Observable<Partial<City>> {
    // this.jwtService.checkTokenExpiration();
    return this.http.patch<City>(this.bddUrl + `/api/city/${id}`, updateData, {
      headers: this.getHeaders(),
    });
  }

  deleteCity(id: number): Observable<City> {
    // this.jwtService.checkTokenExpiration();
    return this.http.delete<City>(this.bddUrl + `/api/city/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
