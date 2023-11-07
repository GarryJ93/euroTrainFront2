import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
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
  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User> {
    return this.http.post<User>(
      this.bddUrl + '/api/auth/register',
      user,
      this.httpOptions
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.bddUrl + '/api/user', this.httpOptions);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(
      this.bddUrl + `/api/user/${id}`,
      this.httpOptions
    );
  }

  updateAdminStatus(
    id: number,
    updateData: Partial<User>
  ): Observable<Partial<User>> {
    return this.http.patch<User>(
      this.bddUrl + `/api/user/${id}`,
      updateData,
      this.httpOptions
    );
  }

  deleteUserAndData(id: number) {
    return this.http.delete<User>(
      this.bddUrl + `/api/user/${id}`,
      this.httpOptions
    );
  }

  softDeleteUser(id: number) {
    return this.http.delete<User>(
      this.bddUrl + `/api/user/softDelete/${id}`,
      this.httpOptions
    );
  }
}
