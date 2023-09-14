import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditComponent } from '../add-or-edit/add-or-edit.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {

  users$!: Observable<User[]>

  displayedColumns: string[] = ['id', 'name',  'email', 'action'];
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
  constructor(
    private _userService: UserService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {

  }

  openModal(mode: string, user: User | null = null){
    this.dialog.open(AddOrEditComponent, {
      data: {
        mode,
        user
      },
    });
  }
  openDeleteModal(user: User){
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

const ELEMENT_DATA: User[] = [
  {id: 1, name: 'user 1', email:'fsd', avatar: ''},
  {id: 2, name: 'user 2', email:'fsd', avatar: ''},
  {id: 3, name: 'user 3', email:'fsd', avatar: ''},
  {id: 4, name: 'user 4', email:'fsd', avatar: ''},
  {id: 5, name: 'user 5', email:'fsd', avatar: ''},
  {id: 6, name: 'user 6', email:'fsd', avatar: ''},
];
