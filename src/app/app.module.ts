import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule } from  '@angular/common/http';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'about', component: AboutPageComponent},
  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutPageComponent,
    PageNotFoundComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
