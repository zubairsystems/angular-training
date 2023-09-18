import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-view-category',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {category: Category}
  ){}
}
