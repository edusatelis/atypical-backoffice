import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { SatisfactionResearchService } from 'src/app/services/satisfaction-research.service';
import { SearchControlDetailComponent } from './search-control-detail/search-control-detail.component';
import { MatDialog } from '@angular/material/dialog';

interface list {
  program: number;
  interaction: number;
  platform: number;
}

@Component({
  selector: 'app-search-control',
  templateUrl: './search-control.component.html',
  styleUrls: ['./search-control.component.scss']
})
export class SearchControlComponent {

  response: any;

  page: number = 0;

  filtersOn: boolean = false;

  listProfessional: list = {
    program: 0,
    interaction: 0,
    platform: 0
  };
  listBenefiario: list = {
    program: 0,
    interaction: 0,
    platform: 0
  };


  formSearch: FormGroup;
  submited: boolean = false;
  loading: boolean = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: MatDialog,
    private satisfactionResearchService: SatisfactionResearchService
  ) {
    this.formSearch = this.formBuilder.group({
      phase: [''],
      time: [''],
      visitDeliveryDate: [''],
      cost: [''],
      status: [''],
    })
  }

  ngOnInit() {
    this.message = 'Carregando Pesquisas';
    this.loading = true;
    this.satisfactionResearchService.list().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: data => {
        console.log(data)
        this.response = data;
      }
    })

    this.satisfactionResearchService.listBeneficiary().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: data => {
        let program = 0;
        let interaction = 0;
        let platform = 0;


        if(data.length> 0){

          for(let i=0; i< data.length; i++){
              program += data[i].programGrade
              interaction += data[i].professionalGrade
              platform += data[i].plataformGrade
          }
  
          this.listBenefiario = {
            platform: platform / data.length,
            interaction: interaction / data.length,
            program: program / data.length 
          };
        }else{
          this.listBenefiario = {
            platform: 0,
            interaction: 0,
            program: 0
          };
        }


      }
    })

    this.satisfactionResearchService.listProfessional().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: data => {
        let program = 0;
        let interaction = 0;
        let platform = 0;


        if(data.length > 0){

          for(let i=0; i< data.length; i++){
              program += data[i].programGrade
              interaction += data[i].professionalGrade
              platform += data[i].plataformGrade
          }
  
          this.listProfessional = {
            platform: platform / data.length,
            interaction: interaction / data.length,
            program: program / data.length 
          };
        }else{
          this.listProfessional = {
            platform: 0,
            interaction: 0,
            program: 0 
          };
        }
      }
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

  openSearchDetails(search: any) {
    const modalRef = this.modalService.open(SearchControlDetailComponent, {
      height: '550px',
      width: '437px',
    });
    modalRef.componentInstance.response = search
  }

  getStatus(status: string): string {
    switch (status) {
      case 'requested':
        return 'Requested'
      case 'pending':
        return 'Pendente'
      case 'refused':
        return 'Recusada'
      case 'new':
        return 'Nova'
      default:
        return ''
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'requested':
        return 'status-requested';
      case 'pending':
        return 'status-pending';
      case 'refused':
        return 'status-refused';
      case 'new':
        return 'status-new';
      default:
        return 'status-default';
    }
  }
}
