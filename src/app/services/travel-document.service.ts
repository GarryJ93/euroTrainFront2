import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TravelDocument } from '../models/travel-document';

@Injectable({
  providedIn: 'root',
})
export class TravelDocumentService {
  bddUrl = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  getAllTravelDocuments(): Observable<TravelDocument[]> {
    return this.http.get<TravelDocument[]>(
      this.bddUrl + '/api/travel-document',
      this.httpOptions
    );
  }

  getTravelDocumentById(id: number): Observable<TravelDocument> {
    return this.http.get<TravelDocument>(
      this.bddUrl + `/api/travel_document/${id}`,
      this.httpOptions
    );
  }
}
