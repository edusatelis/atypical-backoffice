import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InconsistencyDetailModalComponent } from './inconsistency-detail-modal/inconsistency-detail-modal.component';

@Component({
  selector: 'app-inconsistency-control',
  templateUrl: './inconsistency-control.component.html',
  styleUrls: ['./inconsistency-control.component.scss']
})
export class InconsistencyControlComponent {
  response: any = [
    {
      _id: '1',
      name: 'roberto',
      professional: { name: 'joão', profession: 'Engenheiro' },
      phase: 'Projeto de Melhoria',
      type: 'ART/RRT',
    },
    {
      _id: '2',
      name: 'roberto',
      professional: { name: 'larissa', profession: 'Arquiteta' },
      phase: 'Projeto de Melhoria',
      type: 'ART/RRT',
      photosOn: true
    }
  ];
  page: number = 0;

  filtersOn: boolean = false;

  formSearch: FormGroup;
  submited: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: MatDialog
  ) {
    this.formSearch = this.formBuilder.group({
      phase: [''],
      type: [''],
    })
  }

  search() { }

  openMap() { }

  openFilters() {
    this.filtersOn = !this.filtersOn
  }

  submit() {
    this.response = []
    this.submited = true;
  }

  openDetails(inconsistency: any) {
    const modalRef = this.modalService.open(InconsistencyDetailModalComponent, {
      height: 'auto',
      width: '628px',
    });
    modalRef.componentInstance.inconsistency = inconsistency
  }

}
