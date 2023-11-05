import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpClient,
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Connection } from '../models/connection';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  private bddURL = 'http://localhost:3000/api/auth';
  // isConnected: boolean = false;
  public isConnected$ = new BehaviorSubject(localStorage.getItem('access_token'));

  constructor(private http: HttpClient) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('authorization', `Bearer ${token}`),
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }

  login(email: string, password: string): Observable<Connection> {
    const body = { email: email, password: password };
    return this.http.post<Connection>(this.bddURL + '/login', body);
  }

  // checkConnexion(): boolean {
  //   this.isConnected = !!localStorage.getItem('access_token');
  //   return this.isConnected;
  // }
}
