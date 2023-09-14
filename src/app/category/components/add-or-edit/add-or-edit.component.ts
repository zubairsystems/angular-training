import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-add-or-edit-category',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.scss']
})
export class AddOrEditComponent implements OnInit {

  categoryForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {mode: string, category: Category}){}

  ngOnInit(): void {
    this.categoryForm = this._fb.group({
      name: ['', [Validators.required]]
    });
  }

  onSubmit(){
    console.log(this.categoryForm.value);
  }

}

