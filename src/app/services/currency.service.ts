import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from '../models/currency';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  bddUrl = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  getAllCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(
      this.bddUrl + '/api/Currency',
      this.httpOptions
    );
  }

  getCurrencyById(id: number): Observable<Currency> {
    return this.http.get<Currency>(
      this.bddUrl + `/api/currency/${id}`,
      this.httpOptions
    );
  }
}

