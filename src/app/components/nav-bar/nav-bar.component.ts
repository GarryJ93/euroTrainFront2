import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthInterceptorService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  @ViewChild('navBurger') navBurger: ElementRef | undefined;
  @ViewChild('navMenu') navMenu: ElementRef | undefined;
  access_token!: boolean;
  visible: boolean = false;

  constructor(private router: Router,
    private authService: AuthInterceptorService,
  private messageService: MessageService) { }
  ngOnInit() {
    this.authService.isConnected$.subscribe({
      next: (response) => {
        if (response) {
          this.access_token = true;
        }
        else {
          this.access_token = false;
        }
      }
    })
  }
  toggleNavbar() {
    this.navBurger!.nativeElement.classList.toggle('is-active');
    this.navMenu!.nativeElement.classList.toggle('is-active');
  }

  onDisconnect() {
    localStorage.clear();
    this.authService.isConnected$.next('');
    this.closeDialog();
    this.messageService.add({
      severity: 'warn',
      summary: 'Déconnecté',
      detail: 'Vous êtes bien déconnecté !'
    })
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 2000);
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }
}
