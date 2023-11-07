import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransportCompany } from '../models/transport-company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  bddUrl = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  getAllCompanies(): Observable<TransportCompany[]> {
    return this.http.get<TransportCompany[]>(
      this.bddUrl + '/api/transport-company',
      this.httpOptions
    );
  }
  getCompanyById(id: number): Observable<TransportCompany> {
    return this.http.get<TransportCompany>(
      this.bddUrl + `/api/transport-company/${id}`,
      this.httpOptions
    );
  }
}
