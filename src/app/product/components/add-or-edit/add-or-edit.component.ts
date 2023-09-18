import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { FileService } from 'src/app/services/file.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-or-edit-product',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.scss']
})
export class AddOrEditComponent implements OnInit {

  productForm!: FormGroup;
  isSubmitted = false;
  categories: Category[] = [];
  private subcription!: Subscription;
  private ngUnsubcribe = new Subject<void>();
  filename: string = '';
  file!: File;

  constructor(
    private _fb: FormBuilder,
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private toastr: ToastrService,
    private _fileService: FileService,
    private dialogRef: MatDialogRef<AddOrEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {mode: string, product: Product}){}

  ngOnInit(): void {
    this.productForm = this._fb.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
    });

    if(this.data.mode === 'edit'){
      this.productForm.patchValue(this.data.product);
      this.productForm.get('categoryId')?.setValue(this.data.product.category.id);
    }

    this.getAllCategories();
  }

  get f(){
    return this.productForm.controls;
  }

  getAllCategories(){
    this.subcription = this._categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onSubmit(){

    if(!this.productForm.valid) return;
    
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
            
            this._productService.addProduct({...this.productForm.value, images:[res1.location]})
            .pipe(takeUntil(this.ngUnsubcribe))
            .subscribe({
              next: (res2) => {
                console.log(res2)
                this.isSubmitted = false;
                this.toastr.success('Product has been added!');
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
        this._productService.editProduct(this.data.product.id,this.productForm.value)
          .pipe(takeUntil(this.ngUnsubcribe))
          .subscribe({
            next: (res) => {
              console.log(res);
              this.isSubmitted = false;
              this.toastr.success('Product has been updated!');
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
              
              this._productService.editProduct(this.data.product.id,{...this.productForm.value, images:[res1.location]})
              .pipe(takeUntil(this.ngUnsubcribe))
              .subscribe({
                next: (res2) => {
                  console.log(res2)
                  this.isSubmitted = false;
                  this.toastr.success('Product has been updated!');
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

}

