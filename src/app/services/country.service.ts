import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../models/country';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>('http://localhost:3000/api/country');
  }

  getCountryById(id: number): Observable<Country> {
    return this.http.get<Country>(`http://localhost:3000/api/country/${id}`);
  }

  addCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(
      'http://localhost:3000/api/country',
      country
    );
  }

  updateCountry(id: number, updateData: Partial<Country>): Observable<Partial<Country>> {
    return this.http.patch<Country>(
      `http://localhost:3000/api/country/${id}`,
      updateData )
  }

  deleteCountry(id: number): Observable<Country>{
    return this.http.delete<Country>(`http://localhost:3000/api/country/${id}`);
  }
}
