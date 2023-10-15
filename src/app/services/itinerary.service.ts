import { Injectable } from '@angular/core';
import { Itinerary } from '../models/itinerary';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItineraryService {
  // itinerary: Itinerary[] = [];

  constructor(private http: HttpClient) {}

  getAllItineraries(): Observable<Itinerary[]> {
    return this.http.get<Itinerary[]>('http://localhost:3000/api/itinerary');
  }

  getItineraryById(id: number): Observable<Itinerary> {
    return this.http.get<Itinerary>(`http://localhost:3000/api/itinerary/${id}`);
  }
}
