import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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
  public allUsers$ = new BehaviorSubject<User[]>([]);
  public adminUsers$ = new BehaviorSubject<User[]>([]);
  public candidateUsers$ = new BehaviorSubject<User[]>([]);
  constructor(private http: HttpClient, private jwtService: JwtService) {}

  addUser(user: User): Observable<User> {
    return this.http.post<User>(
      this.bddUrl + '/api/auth/register',
      user,
      this.httpOptions
    );
  }

  getAllUsers(): Observable<User[]> {
    this.jwtService.checkTokenExpiration();
    return this.http.get<User[]>(this.bddUrl + '/api/user', {
      headers: this.getHeaders(),
    });
  }

  getUserById(id: number): Observable<User> {
    this.jwtService.checkTokenExpiration();
    return this.http.get<User>(this.bddUrl + `/api/user/${id}`, {
      headers: this.getHeaders(),
    });
  }

  updateAdminStatus(
    id: number,
    updateData: Partial<User>
  ): Observable<Partial<User>> {
    this.jwtService.checkTokenExpiration();
    return this.http.patch<User>(this.bddUrl + `/api/user/${id}`, updateData, {
      headers: this.getHeaders(),
    });
  }

  deleteUserAndData(id: number) {
    this.jwtService.checkTokenExpiration();
    return this.http.delete<User>(
      this.bddUrl + `/api/user/${id}`,
      { headers: this.getHeaders() })
  }

  softDeleteUser(id: number) {
    this.jwtService.checkTokenExpiration();
    return this.http.delete<User>(this.bddUrl + `/api/user/softDelete/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
