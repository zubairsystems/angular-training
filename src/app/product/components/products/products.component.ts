import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditComponent } from '../add-or-edit/add-or-edit.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {

  // private unsubscribe = new Subject();
  // products: Product[] = [];
  products$!: Observable<Product[]>

  displayedColumns: string[] = ['id', 'title', 'price', 'category', 'action'];
  dataSource = new MatTableDataSource<Product>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
  constructor(
    private _productService: ProductService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    //this._productService.getAllProducts();
    //this.products$ = this._productService.getAllProducts();
  }

  openModal(mode: string, product: Product | null = null){
    this.dialog.open(AddOrEditComponent, {
      data: {
        mode,
        product
      },
    });
  }
  openDeleteModal(product: Product){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    // this.unsubscribe.next('');
    // this.unsubscribe.complete();
  }

}

const ELEMENT_DATA: Product[] = [
  {id: 1, title: 'Product 1', price: 100, description: 'Product 1 desc', images: ['',''], category: {id: 1, name: 'Cat 1', image:''}},
  {id: 2, title: 'Product 2', price: 100, description: 'Product 1 desc', images: ['',''], category: {id: 1, name: 'Cat 1', image:''}},
  {id: 3, title: 'Product 3', price: 100, description: 'Product 1 desc', images: ['',''], category: {id: 1, name: 'Cat 1', image:''}},
  {id: 4, title: 'Product 4', price: 100, description: 'Product 1 desc', images: ['',''], category: {id: 1, name: 'Cat 1', image:''}},
  {id: 5, title: 'Product 5', price: 100, description: 'Product 1 desc', images: ['',''], category: {id: 1, name: 'Cat 1', image:''}},
  {id: 6, title: 'Product 6', price: 100, description: 'Product 1 desc', images: ['',''], category: {id: 1, name: 'Cat 1', image:''}},
];
