import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-inconsistency-detail-modal',
  templateUrl: './inconsistency-detail-modal.component.html',
  styleUrls: ['./inconsistency-detail-modal.component.scss']
})
export class InconsistencyDetailModalComponent {

  inconsistency: any;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: MatDialog
  ) {
    this.form = this.formBuilder.group({
      message: [''],
    });
  }

  close() {
    this.modalService.closeAll();
  }

  confirm() {

  }

  donwload() {}

}
