import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { API_URL } from '../app-injection-tokens';
import { User } from './interfaces/user.interface';

export const CURRENT_USER_ID: string = "CURRENT_USER_ID";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl:string,
    private router: Router,
  ) { }

  getUser(userId:string) :Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/v1/api/user/${userId}`);
  }
}
