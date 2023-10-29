import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng/accordion'; 
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { DropdownModule } from 'primeng/dropdown';
import { OrderListModule } from 'primeng/orderlist';
import { CarouselModule } from 'primeng/carousel';
import { MessagesModule } from 'primeng/messages';
import { CheckboxModule } from 'primeng/checkbox';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CityListComponent } from './components/city-list/city-list.component';
import { MessageService } from 'primeng/api';
import { GalleriaComponent } from './components/galleria/galleria.component';
import { AddItineraryComponent } from './components/add-itinerary/add-itinerary.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AdminItinerariesListComponent } from './components/admin-itineraries-list/admin-itineraries-list.component';
import { AdminItineraryCardComponent } from './components/admin-itinerary-card/admin-itinerary-card.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SidebarModule } from 'primeng/sidebar';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { DestinationsComponent } from './pages/destinations/destinations.component';
import { CityCardComponent } from './components/city-card/city-card.component';
import { DestinationListComponent } from './components/destination-list/destination-list.component';
import { CityViewComponent } from './pages/city-view/city-view.component';
import { ItineraryViewComponent } from './pages/itinerary-view/itinerary-view.component';


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
    CityListComponent,
    GalleriaComponent,
    AddItineraryComponent,
    AdminItinerariesListComponent,
    AdminItineraryCardComponent,
    SearchBarComponent,
    CategoryFilterComponent,
    DestinationsComponent,
    CityCardComponent,
    DestinationListComponent,
    CityViewComponent,
    ItineraryViewComponent,
    
  
  
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
    TableModule,
    ToastModule,
    ToolbarModule,
    CheckboxModule,
    MessagesModule,
    GalleriaModule,
    FormsModule,
    InputSwitchModule,
    SelectButtonModule,
    SidebarModule,
  
    
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
