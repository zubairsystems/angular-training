import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditComponent } from '../add-or-edit/add-or-edit.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { ViewComponent } from '../view/view.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy, AfterViewInit {

  categories: Category[] = [];
  private subcription!: Subscription;

  displayedColumns: string[] = ['id', 'image', 'name', 'date', 'action'];
  dataSource = new MatTableDataSource<Category>(this.categories);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
  constructor(
    private _categoryService: CategoryService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    this.subcription = this._categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
        // this.dataSource = new MatTableDataSource<Category>(this.categories);
        this.dataSource.data = this.categories;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  openModal(mode: string, category: Category | null = null){
    const dialogRef = this.dialog.open(AddOrEditComponent, {
      data: {
        mode,
        category
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.getAllCategories();
      }
    })
  }

  viewCategory(category: Category){
    this.dialog.open(ViewComponent,{
      data: {
        category
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