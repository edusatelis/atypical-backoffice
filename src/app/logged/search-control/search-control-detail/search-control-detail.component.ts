import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-control-detail',
  templateUrl: './search-control-detail.component.html',
  styleUrls: ['./search-control-detail.component.scss']
})
export class SearchControlDetailComponent {

  response: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: MatDialog,
  ) {

  }

  ngOnInit() {
      console.log(this.response)
  }

  close() {
    this.modalService.closeAll();
  }
}
