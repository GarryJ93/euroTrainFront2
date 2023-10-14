import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  @ViewChild('navBurger') navBurger: ElementRef | undefined;
  @ViewChild('navMenu') navMenu: ElementRef | undefined;

  toggleNavbar() {
    this.navBurger!.nativeElement.classList.toggle('is-active');
    this.navMenu!.nativeElement.classList.toggle('is-active');
  }
}
