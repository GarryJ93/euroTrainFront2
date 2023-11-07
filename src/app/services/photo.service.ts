import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Photo } from '../models/photo';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  photos: Photo[] = [];
  bddUrl = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getImageById(id: number) {
    return this.http.get(this.bddUrl + `/api/photo/${id}`, this.httpOptions);
  }

  postImage(formData: FormData, idCity: number, idCountry: number) {
    formData.append('idCity', idCity.toString());
    formData.append('idCountry', idCountry.toString());
    return this.http.post(
      this.bddUrl + '/api/photo',
      formData,
      this.httpOptions
    );
  }

  deletePicture(id: number): Observable<Photo> {
    return this.http.delete<Photo>(
      this.bddUrl + `/api/photo/${id}`,
      this.httpOptions
    );
  }
}
