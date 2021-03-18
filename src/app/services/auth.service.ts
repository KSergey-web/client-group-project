import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_URL } from '../app-injection-tokens';
import { LoginDTO, RegistrEntity, UserEntity } from './interfaces/auth.interfaces';
import { CURRENT_USER_ID } from './user.service';

export const ACCESS_TOKEN_KEY: string = "inwork_access_token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl:string,
    private jwtHelper:JwtHelperService,
    private router: Router,
    ) { 
  } 

  login(dto: LoginDTO): Observable<any>{
    return this.http.post(`${this.apiUrl}/v1/api/auth/login`, dto)
    .pipe(
      tap( (obj: any) => {
        localStorage.setItem(CURRENT_USER_ID, obj._id);
        localStorage.setItem(ACCESS_TOKEN_KEY, obj.token);
        let token = localStorage.getItem(ACCESS_TOKEN_KEY);
        console.warn(token);
      })
    );
  }

  isAuthenticated(): boolean{
    let token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) return false; 
    return !this.jwtHelper.isTokenExpired(token);
  }

  logOut():void{
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['signin'])
  }

  getUser():Observable<UserEntity> {
    return this.http.get<UserEntity>(`${this.apiUrl}/v1/api/user`);
  }

  registr(dto: LoginDTO): Observable<RegistrEntity>{
    return this.http.post(`${this.apiUrl}/v1/api/auth/register`, dto)
    .pipe(
      tap( (obj: any) => {
        console.log(obj);
      })
    );
  }
}
