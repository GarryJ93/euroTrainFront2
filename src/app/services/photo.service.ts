import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Photo } from '../models/photo';


@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  photos: Photo[] = [];

  constructor(private http: HttpClient) {}


  getImage() {
    return this.http.get('http://localhost:3000/api/photo', {
      responseType: 'blob',
    });
  }
  getImageById(id: number) {
    return this.http.get(`http://localhost:3000/api/photo/${id}`, {
      responseType: 'blob',
    });
  }

  postImage(formData: FormData) {
    return this.http.post('http://localhost:3000/api/photo', formData);
  }

  deletePhotos(id: number) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.delete(`http://localhost:3000/api/photo/${id}`, {
      headers: headers,
    });
  }
}
