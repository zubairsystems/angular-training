import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditComponent } from '../add-or-edit/add-or-edit.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy, AfterViewInit {

  categories$!: Observable<Category[]>

  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource<Category>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
  constructor(
    private _categoryService: CategoryService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {

  }

  openModal(mode: string, category: Category | null = null){
    this.dialog.open(AddOrEditComponent, {
      data: {
        mode,
        category
      },
    });
  }
  openDeleteModal(category: Category){
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

const ELEMENT_DATA: Category[] = [
  {id: 1, name: 'category 1', image: ''},
  {id: 2, name: 'category 2', image: ''},
  {id: 3, name: 'category 3', image: ''},
  {id: 4, name: 'category 4', image: ''},
  {id: 5, name: 'category 5', image: ''},
  {id: 6, name: 'category 6', image: ''},
];