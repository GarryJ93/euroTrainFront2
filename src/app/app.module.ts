import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng/accordion'; 
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { OrderListModule } from 'primeng/orderlist';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { Page404Component } from './pages/page404/page404.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ItineraryCardComponent } from './components/itinerary-card/itinerary-card.component';
import { ItineraryListComponent } from './components/itinerary-list/itinerary-list.component';
import { CardExampleComponent } from './components/card-example/card-example.component';
import { ItineraryComponent } from './pages/itinerary/itinerary.component';
import { BlobButtonComponent } from './components/blob-button/blob-button.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CountryComponent } from './pages/country/country.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { BtnConfirmSuppressionComponent } from './components/btn-confirm-suppression/btn-confirm-suppression.component';
import { AddCountryComponent } from './components/add-country/add-country.component';
import { AddCityComponent } from './components/add-city/add-city.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NavBarComponent,
    LoginComponent,
    Page404Component,
    HomeComponent,
    FooterComponent,
    ItineraryCardComponent,
    ItineraryListComponent,
    CardExampleComponent,
    ItineraryComponent,
    BlobButtonComponent,
    AdminComponent,
    CountryComponent,
    CountryListComponent,
    AccordionComponent,
    BtnConfirmSuppressionComponent,
    AddCountryComponent,
    AddCityComponent,
  
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AccordionModule,
    ButtonModule,
    CarouselModule,
    OrderListModule,
    CascadeSelectModule,
    DropdownModule,
    DialogModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
