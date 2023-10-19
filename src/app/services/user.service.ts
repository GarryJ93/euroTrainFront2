import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User> {
    return this.http.post<User>(
      'http://localhost:3000/api/auth/register',
      user
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/api/user');
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/api/user/${id}`);
  }

  updateAdminStatus(
    id: number,
    updateData: Partial<User>
  ): Observable<Partial<User>> {
    return this.http.patch<User>(
      `http://localhost:3000/api/user/${id}`,
      updateData
    );
  }

  deleteUserAndData(id: number) {
    return this.http.delete<User>(`http://localhost:3000/api/user/${id}`);
  }

  softDeleteUser(id: number) {
    return this.http.delete<User>(
      `http://localhost:3000/api/user/softDelete/${id}`
    );
  }
}
