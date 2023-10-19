import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from '../models/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

    constructor(private http: HttpClient) {}

  getAllCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>('http://localhost:3000/api/Currency');
  }

  getCurrencyById(id: number): Observable<Currency> {
    return this.http.get<Currency>(`http://localhost:3000/api/currency/${id}`);
  }
}

