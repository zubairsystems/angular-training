import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products$ = this._productService.getAllProducts();
  categories$ = this._categoryService.getAllCategories();
  users$ = this._userService.getAllUsers();

  pCount = 0;
  cCount = 0;
  uCount = 0;

  constructor(
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private _userService: UserService,
  ){}

  ngOnInit(): void{
    combineLatest([this.products$, this.categories$, this.users$]).subscribe(
      ([products, categories, users]) =>{
        this.pCount = products.length;
        this.cCount = categories.length;
        this.uCount = users.length;
      }
    );
  }
}
