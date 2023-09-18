import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllCategories(){
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`);
  }

  addCategory(data: Category){
    return this.http.post<Category>(`${environment.apiUrl}/categories`, data);
  }

  editCategory(id: number, data: Category){
    return this.http.put<Category>(`${environment.apiUrl}/categories/${id}`, data);
  }
}
