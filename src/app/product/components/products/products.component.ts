import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditComponent } from '../add-or-edit/add-or-edit.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ViewComponent } from '../view/view.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {

  products: Product[] = [];
  private subcription!: Subscription;

  displayedColumns: string[] = ['id', 'title', 'price', 'category', 'date', 'action'];
  dataSource = new MatTableDataSource<Product>(this.products);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
  constructor(
    private _productService: ProductService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.subcription = this._productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.dataSource.data = this.products;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  openModal(mode: string, product: Product | null = null){
    const dialogRef = this.dialog.open(AddOrEditComponent, {
      data: {
        mode,
        product
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.getAllProducts();
      }
    })
    
  }

  viewProduct(product: Product){
    this.dialog.open(ViewComponent,{
      data: {
        product
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

}