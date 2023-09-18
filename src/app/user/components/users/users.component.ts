import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditComponent } from '../add-or-edit/add-or-edit.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ViewComponent } from 'src/app/user/components/view/view.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {

  users: User[] = [];
  private subcription!: Subscription;

  displayedColumns: string[] = ['id', 'avatar', 'name', 'email', 'role', 'date', 'action'];
  dataSource = new MatTableDataSource<User>(this.users);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
  constructor(
    private _userService: UserService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.subcription = this._userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
        this.dataSource.data = this.users;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  openModal(mode: string, user: User | null = null){
    const dialogRef = this.dialog.open(AddOrEditComponent, {
      data: {
        mode,
        user
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.getAllUsers();
      }
    })
  }

  viewUser(user: User){
    this.dialog.open(ViewComponent,{
      data: {
        user
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