import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthInterceptorService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email!: string;
  password!: string;
  login!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthInterceptorService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initialForm();
  }
  private initialForm() {
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required],
    });
  }

  OnConnect() {
    if (this.login.valid) {
      //rajouter un findoneby email pour checker l'accès 
      let email = this.login.value.email;
      let password = this.login.value.password;
      this.authService.login(email, password).subscribe({
        next: (response: any) => {
          console.log('Réponse complète du serveur :', response);
          if (response && response.accessToken) {
            // Stocker le token dans le localStorage
            localStorage.setItem('access_token', response.accessToken);
            localStorage.setItem('id', response.user.id);
            localStorage.setItem('access', response.user.access);
            localStorage.setItem('full_access', response.user.full_access);
            alert('Vous êtes connecté')
            console.log('Connexion réussie et token stocké!');
            this.router.navigate(['']);
          } else {
            console.error('Token non reçu dans la réponse.');
          }
        },
        error: (error: any) => {
          console.error('Erreur lors de la connexion:', error);
          alert('E-mail ou mot de passe incorrect')
        },
      });
    }
  }
}
