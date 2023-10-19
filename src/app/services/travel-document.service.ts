import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TravelDocument } from '../models/travel-document';

@Injectable({
  providedIn: 'root',
})
export class TravelDocumentService {
  constructor(private http: HttpClient) {}

  getAllTravelDocuments(): Observable<TravelDocument[]> {
    return this.http.get<TravelDocument[]>('http://localhost:3000/api/travel-document');
  }

  getTravelDocumentById(id: number): Observable<TravelDocument> {
    return this.http.get<TravelDocument>(`http://localhost:3000/api/travel_document/${id}`);
  }
}
