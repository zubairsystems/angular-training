import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private _router: Router) { }

  login(data: {email: string, password: string}){
    return this.http.post(`${environment.apiUrl}/auth/login`, data);
  }
  getProfile(){
    return this.http.get<User>(`${environment.apiUrl}/auth/profile`,{
      headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${this.getToken()}`,
          'Content-Type': 'application/json'
        }
      )
    });
  }

  logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this._router.navigate(['/auth/login']);
  }

  getToken(){
    return localStorage.getItem('access_token');
  }

  isAuthenticated(){
    return localStorage.getItem('access_token') ? true: false;
  }
}
