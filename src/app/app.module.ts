import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import {JwtModule} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { API_URL } from './app-injection-tokens';
import { httpInterceptorProviders } from './interceptors';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthComponent } from './auth/auth.component';
import { ACCESS_TOKEN_KEY } from './services/auth.service';
import { RoomsComponent } from './rooms/rooms.component';
import { PlayComponent } from './play/play.component';

export function tokenGetter(){
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HeaderComponent,
    NavigationComponent,
    AuthComponent,
    RoomsComponent,
    PlayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({config:{
      tokenGetter, 
      allowedDomains: environment.tokenWhiteListedDomains
    }}),
  ],
  providers: [{
    provide: API_URL,
    useValue: environment.inWorkApi
  },
  httpInterceptorProviders
],
  bootstrap: [AppComponent]
})
export class AppModule { }
