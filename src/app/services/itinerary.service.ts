import { Injectable } from '@angular/core';
import { Itinerary } from '../models/itinerary';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItineraryService {
  private itinerarySubject = new BehaviorSubject<Itinerary | null>(null);

  constructor(private http: HttpClient) {}

  getAllItineraries(): Observable<Itinerary[]> {
    return this.http.get<Itinerary[]>('http://localhost:3000/api/itinerary');
  }

  getItineraryById(id: number): Observable<Itinerary> {
    return this.http.get<Itinerary>(
      `http://localhost:3000/api/itinerary/${id}`
    );
  }

  createItinerary(newItinerary: Partial<Itinerary>): Observable<Itinerary> {
    console.log(newItinerary);

    return this.http
      .post<Itinerary>('http://localhost:3000/api/itinerary', newItinerary)
      .pipe(
        tap((createdItinerary) => this.itinerarySubject.next(createdItinerary))
      );
  }

  getItineraryUpdates(): Observable<Itinerary | null> {
    return this.itinerarySubject.asObservable();
  }

  deleteItinerary(id: number): Observable<Itinerary> {
    return this.http.delete<Itinerary>(`http://localhost:3000/api/itinerary/${id}`);
  }
}

