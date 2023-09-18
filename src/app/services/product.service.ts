import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllProducts(){
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }

  addProduct(data: Product){
    return this.http.post<Product>(`${environment.apiUrl}/products`, data);
  }

  editProduct(id: number, data: Product){
    console.log(data);
    return this.http.put<Product>(`${environment.apiUrl}/products/${id}`, data);
  }

}
