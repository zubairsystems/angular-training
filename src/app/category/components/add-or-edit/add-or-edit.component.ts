import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { FileService } from 'src/app/services/file.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-or-edit-category',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.scss']
})
export class AddOrEditComponent implements OnInit, OnDestroy {

  categoryForm!: FormGroup;
  isSubmitted = false;
  private ngUnsubcribe = new Subject<void>();
  filename: string = '';
  file!: File;

  constructor(
    private _fb: FormBuilder,
    private _categoryService: CategoryService,
    private _fileService: FileService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AddOrEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {mode: string, category: Category}){}

  ngOnInit(): void {
    this.categoryForm = this._fb.group({
      name: ['', [Validators.required]]
    });

    this.categoryForm.patchValue(this.data.category);
  }

  get f(){
    return this.categoryForm.controls;
  }

  onSubmit(){

    if(!this.categoryForm.valid) return;
    
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
            
            this._categoryService.addCategory({...this.categoryForm.value, image:res1.location})
            .pipe(takeUntil(this.ngUnsubcribe))
            .subscribe({
              next: (res2) => {
                console.log(res2)
                this.isSubmitted = false;
                this.toastr.success('Category has been added!');
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
        this._categoryService.editCategory(this.data.category.id,this.categoryForm.value)
          .pipe(takeUntil(this.ngUnsubcribe))
          .subscribe({
            next: (res) => {
              console.log(res);
              this.isSubmitted = false;
              this.toastr.success('Category has been updated!');
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
              
              this._categoryService.editCategory(this.data.category.id,{...this.categoryForm.value, image:res1.location})
              .pipe(takeUntil(this.ngUnsubcribe))
              .subscribe({
                next: (res2) => {
                  console.log(res2)
                  this.isSubmitted = false;
                  this.toastr.success('Category has been updated!');
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

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    if (file) {
      this.filename = file.name;
      this.file = file 
    }
  }

  ngOnDestroy(){
    this.ngUnsubcribe.next();
    this.ngUnsubcribe.complete();
  }

}

