import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-add-or-edit-product',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.scss']
})
export class AddOrEditComponent implements OnInit {

  productForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {mode: string, product: Product}){}

  ngOnInit(): void {
    this.productForm = this._fb.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });
  }

  onSubmit(){
    console.log(this.productForm.value);
  }

}

