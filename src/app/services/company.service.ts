import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransportCompany } from '../models/transport-company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getAllCompanies(): Observable<TransportCompany[]> {
    return this.http.get<TransportCompany[]>('http://localhost:3000/api/transport-company');
  }
  getCompanyById(id: number): Observable<TransportCompany> {
    return this.http.get<TransportCompany>(`http://localhost:3000/api/transport-company/${id}`);
  }
}
