import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthInterceptorService } from './auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private readonly TOKEN_KEY = 'access_token';
  private readonly ID_KEY = 'id';
  private readonly ACCESS_KEY = 'access';
  private readonly FULL_ACCESS_KEY = 'full_access';
  private tokenExpiration$ = new BehaviorSubject<boolean>(false);
  

  constructor(private jwtHelper: JwtHelperService, private authService: AuthInterceptorService, private router : Router, private messageService: MessageService) {}
  
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  
  checkTokenExpiration(): Observable<boolean> {
    const token = this.getToken();
    const isTokenExpired = token ? this.jwtHelper.isTokenExpired(token) : true;
    this.tokenExpiration$.next(isTokenExpired);
    if(isTokenExpired)
    this.destroyToken();
    return this.tokenExpiration$.asObservable();
  }

  
  destroyToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ID_KEY);
    localStorage.removeItem(this.ACCESS_KEY);
    localStorage.removeItem(this.FULL_ACCESS_KEY);
    this.authService.isConnected$.next(localStorage.getItem('access_token'));
    this.messageService.add({
      severity: 'warn',
      summary: 'Déconnecté',
      detail:'Votre session a expiré, veuillez vous reconnecter.'
    })
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
    
  }
}
