import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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

  logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this._router.navigate(['/auth/login']);
  }
}
