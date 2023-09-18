import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { FileService } from 'src/app/services/file.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-or-edit-user',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.scss']
})
export class AddOrEditComponent implements OnInit {

  userForm!: FormGroup;
  isSubmitted = false;

  filename: string = '';
  file!: File;

  private ngUnsubcribe = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _fileService: FileService,
    private _userService: UserService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AddOrEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {mode: string, user: User}){}

  ngOnInit(): void {
    this.userForm = this._fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });

    this.userForm.patchValue(this.data.user);
  }

  get f(){
    return this.userForm.controls;
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    if (file) {
      this.filename = file.name;
      this.file = file 
    }
  }

  onSubmit(){

    if(!this.userForm.valid) return;
    
    this.isSubmitted = true;
    if(this.data.mode === 'add'){
      if(!this.file){
        this.toastr.error('Please Select image');
        this.isSubmitted = false;
        return;
      }

      const formData = new FormData();
      formData.append("file", this.file);
      this._fileService.fileUpload(formData)
        .pipe(takeUntil(this.ngUnsubcribe))
        .subscribe({
          next: (res1:any) => {
            console.log(res1);
            
            this._userService.addUser({...this.userForm.value, avatar:res1.location})
            .pipe(takeUntil(this.ngUnsubcribe))
            .subscribe({
              next: (res2) => {
                console.log(res2)
                this.isSubmitted = false;
                this.toastr.success('User has been added!');
                this.dialogRef.close(true);
              },
              error: (error2) => {
                console.log(error2);
              }
            });
          },
          error: (error1) => {
            console.log(error1);
          }
        });
    }else if(this.data.mode === 'edit'){

      if(!this.file){
        this._userService.editUser(this.data.user.id,this.userForm.value)
          .pipe(takeUntil(this.ngUnsubcribe))
          .subscribe({
            next: (res) => {
              console.log(res);
              this.isSubmitted = false;
              this.toastr.success('User has been updated!');
              this.dialogRef.close(true);
            },
            error: (error) => {
              console.log(error);
            }
          });
      }else{

        const formData = new FormData();
        formData.append("file", this.file);
        this._fileService.fileUpload(formData)
          .pipe(takeUntil(this.ngUnsubcribe))
          .subscribe({
            next: (res1:any) => {
              console.log(res1);
              
              this._userService.editUser(this.data.user.id,{...this.userForm.value, avatar:res1.location})
              .pipe(takeUntil(this.ngUnsubcribe))
              .subscribe({
                next: (res2) => {
                  console.log(res2)
                  this.isSubmitted = false;
                  this.toastr.success('User has been updated!');
                  this.dialogRef.close(true);
                },
                error: (error2) => {
                  console.log(error2);
                }
              });
            },
            error: (error1) => {
              console.log(error1);
            }
          });
      }
    }
  }

}

