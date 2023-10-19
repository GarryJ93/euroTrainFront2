import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Language } from '../models/language';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private http: HttpClient) {}

  getAllLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>('http://localhost:3000/api/language');
  }

  getLanguageById(id: number): Observable<Language> {
    return this.http.get<Language>(`http://localhost:3000/api/language/${id}`);
  }
}
