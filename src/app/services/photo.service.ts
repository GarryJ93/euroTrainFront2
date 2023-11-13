import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Photo } from '../models/photo';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';


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
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  getImageById(id: number) {
    return this.http.get(this.bddUrl + `/api/photo/${id}`, this.httpOptions);
  }

  postImage(formData: FormData, idCity: number, idCountry: number) {
    this.jwtService.checkTokenExpiration();
    formData.append('idCity', idCity.toString());
    formData.append('idCountry', idCountry.toString());
    return this.http.post(this.bddUrl + '/api/photo', formData, {
      headers: this.getHeaders(),
    });
  }

  deletePicture(id: number): Observable<Photo> {
    this.jwtService.checkTokenExpiration();
    return this.http.delete<Photo>(this.bddUrl + `/api/photo/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
