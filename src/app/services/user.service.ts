import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(){
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  addUser(data: User){
    return this.http.post<User>(`${environment.apiUrl}/users`, data);
  }

  editUser(id: number, data: User){
    return this.http.put<User>(`${environment.apiUrl}/users/${id}`, data);
  }
}
