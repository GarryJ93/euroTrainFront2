import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../models/country';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthInterceptorService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
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
  public countryList$ = new Subject<Country[]>();
  constructor(private http: HttpClient, private jwtService: JwtService) {}

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(
      this.bddUrl + '/api/country',
      this.httpOptions
    );
  }

  getCountryById(id: number): Observable<Country> {
    return this.http.get<Country>(
      this.bddUrl + `/api/country/${id}`,
      this.httpOptions
    );
  }

  addCountry(country: Country): Observable<Country> {
    this.jwtService.checkTokenExpiration();
    return this.http.post<Country>(this.bddUrl + '/api/country', country, {
      headers: this.getHeaders(),
    });
  }

  updateCountry(
    id: number,
    updateData: Partial<Country>
  ): Observable<Partial<Country>> {
    this.jwtService.checkTokenExpiration();
    return this.http.patch<Country>(
      this.bddUrl + `/api/country/${id}`,
      updateData,
      { headers: this.getHeaders() }
    );
  }

  deleteCountry(id: number): Observable<Country> {
    this.jwtService.checkTokenExpiration();
    return this.http.delete<Country>(this.bddUrl + `/api/country/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
