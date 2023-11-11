import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { Page404Component } from './pages/page404/page404.component';
import { HomeComponent } from './pages/home/home.component';
import { ItineraryComponent } from './pages/itinerary/itinerary.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CountryComponent } from './pages/country/country.component';
import { DestinationsComponent } from './pages/destinations/destinations.component';
import { CityViewComponent } from './pages/city-view/city-view.component';
import { ItineraryViewComponent } from './pages/itinerary-view/itinerary-view.component';
import { authGuard } from './guards/auth.guard';
import { connectedGuard } from './guards/connected.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'itinerary', component: ItineraryComponent },
  { path: 'itinerary/:id', component: ItineraryViewComponent },
  { path: 'country', component: CountryComponent },
  { path: 'destinations', component: DestinationsComponent },
  { path: 'destinations/:id', component: CityViewComponent },
  { path: 'signup', component: SignupComponent, canActivate: [connectedGuard] },
  { path: 'login', component: LoginComponent, canActivate: [connectedGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
