import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Language } from '../models/language';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  bddUrl = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  getAllLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(
      this.bddUrl + '/api/language',
      this.httpOptions
    );
  }

  getLanguageById(id: number): Observable<Language> {
    return this.http.get<Language>(
      this.bddUrl + `/api/language/${id}`,
      this.httpOptions
    );
  }
}
