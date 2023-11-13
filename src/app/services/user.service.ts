import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  public allUsers$ = new Subject<User[]>();
  public adminUsers$ = new Subject<User[]>();
  public candidateUsers$ = new Subject<User[]>();
  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User> {
    return this.http.post<User>(
      this.bddUrl + '/api/auth/register',
      user,
      this.httpOptions
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.bddUrl + '/api/user', {
      headers: this.getHeaders(),
    });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.bddUrl + `/api/user/${id}`, {
      headers: this.getHeaders(),
    });
  }

  updateAdminStatus(
    id: number,
    updateData: Partial<User>
  ): Observable<Partial<User>> {
    return this.http.patch<User>(this.bddUrl + `/api/user/${id}`, updateData, {
      headers: this.getHeaders(),
    });
  }

  deleteUserAndData(id: number) {
    return this.http.delete<User>(
      this.bddUrl + `/api/user/${id}`,
      { headers: this.getHeaders() })
  }

  softDeleteUser(id: number) {
    return this.http.delete<User>(this.bddUrl + `/api/user/softDelete/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
