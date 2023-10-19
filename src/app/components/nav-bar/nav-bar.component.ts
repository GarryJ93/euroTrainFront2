import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  @ViewChild('navBurger') navBurger: ElementRef | undefined;
  @ViewChild('navMenu') navMenu: ElementRef | undefined;
  access_token!: string;
  visible: boolean = false;

  constructor(private router: Router) {}
  ngOnInit() {
    this.access_token = localStorage.getItem('access_token')!;
  }
  toggleNavbar() {
    this.navBurger!.nativeElement.classList.toggle('is-active');
    this.navMenu!.nativeElement.classList.toggle('is-active');
  }

  onDisconnect() {
    localStorage.clear();
    this.router.navigate(['/home']);
    location.reload();
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }
}
