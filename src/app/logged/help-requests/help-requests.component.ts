import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageHelpModalComponent } from './message-help-modal/message-help-modal.component';
import { HelpService } from 'src/app/services/help.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-help-requests',
  templateUrl: './help-requests.component.html',
  styleUrls: ['./help-requests.component.scss']
})
export class HelpRequestsComponent {

  response: any 
  page: number = 0;

  filtersOn: boolean = false;

  formSearch: FormGroup;
  submited: boolean = false;
  loading: boolean = false;
  message: string = '';
  responseOriginal: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: MatDialog,
    private helpService: HelpService
  ) {
    this.formSearch = this.formBuilder.group({
      profile: [''],
      status: [''],
      busca: ['']
    })
  }

  ngOnInit() {
    this.message = 'Carregando profissionais';
    this.loading = true;
    this.helpService.list().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: data => {
        this.responseOriginal = data;
        this.response = data;
      }
    })
  }

  search() {
    this.submited = false;
    const searchTerm = this.formSearch.controls['busca'].value;
  
    this.response = [...this.responseOriginal];
  
    if (searchTerm) {
      this.response = this.response.filter((item: any) =>
        item.user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      if (this.response.length === 0) {
        this.submited = true;
      }
    } else {
      this.response = [...this.responseOriginal];
      if (this.response.length === 0) {
        this.submited = true;
      }
    }
  }

  openMap() { }

  openFilters() {
    this.filtersOn = !this.filtersOn
  }

  submit() {
    this.response = [...this.responseOriginal];
    this.submited = false;

    const status = this.formSearch.controls['status'].value;
    const profile = this.formSearch.controls['profile'].value;

    if (status) {
        this.response = this.response.filter((item: any) => 
            item.status.toLowerCase().includes(status.toLowerCase())
        );
    }

    if (profile) {
        this.response = this.response.filter((item: any) => 
            item.user.type.toLowerCase().includes(profile.toLowerCase())
        );
    }

    if (this.response.length === 0) {
        this.submited = true;
    }
}

  openMessageHelp(helpRequest: any) {
    const modalRef = this.modalService.open(MessageHelpModalComponent, {
      height: '624px',
      width: '578px',
    });
    modalRef.componentInstance.helpRequest = helpRequest
  }

  getStatus(status: string): string {
    switch (status) {
      case 'OPEN':
        return 'Aberta'
      case 'PENDING':
        return 'Pendente'
      case 'refused':
        return 'Recusada'
      case 'SOLVED':
        return 'Resolvida'
      default:
        return ''
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'OPEN':
        return 'status-requested';
      case 'PENDING':
        return 'status-pending';
      case 'refused':
        return 'status-refused';
      case 'SOLVED':
        return 'status-new';
      default:
        return 'status-default';
    }
  }


}
