import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../models/country';
import { Observable } from 'rxjs';

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
  constructor(private http: HttpClient) {}

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
    return this.http.post<Country>(
      this.bddUrl + '/api/country',
      country,
      this.httpOptions
    );
  }

  updateCountry(
    id: number,
    updateData: Partial<Country>
  ): Observable<Partial<Country>> {
    return this.http.patch<Country>(
      this.bddUrl + `/api/country/${id}`,
      updateData,
      this.httpOptions
    );
  }

  deleteCountry(id: number): Observable<Country> {
    return this.http.delete<Country>(
      this.bddUrl + `/api/country/${id}`,
      this.httpOptions
    );
  }
}
