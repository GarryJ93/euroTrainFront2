import { Injectable } from '@angular/core';
import { Itinerary } from '../models/itinerary';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItineraryService {
  private itinerarySubject = new BehaviorSubject<Itinerary | null>(null);
  bddUrl = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  getAllItineraries(): Observable<Itinerary[]> {
    const url = `${this.bddUrl}/api/itinerary`;
    return this.http.get<Itinerary[]>(url, this.httpOptions);
  }

  getItineraryById(id: number): Observable<Itinerary> {
    const url = `${this.bddUrl}/api/itinerary/${id}`;
    return this.http.get<Itinerary>(url, this.httpOptions);
  }

  createItinerary(newItinerary: Partial<Itinerary>): Observable<Itinerary> {
    console.log(newItinerary);

    return this.http
      .post<Itinerary>(
        this.bddUrl + '/api/itinerary',
        newItinerary,
        this.httpOptions
      )
      .pipe(
        tap((createdItinerary) => this.itinerarySubject.next(createdItinerary))
      );
  }

  getItineraryUpdates(): Observable<Itinerary | null> {
    return this.itinerarySubject.asObservable();
  }

  deleteItinerary(id: number): Observable<Itinerary> {
    return this.http.delete<Itinerary>(this.bddUrl + `/api/itinerary/${id}`);
  }
}

