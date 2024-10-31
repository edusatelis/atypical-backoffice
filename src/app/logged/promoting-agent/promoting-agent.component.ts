import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { NewPromotingAgentComponent } from './new-promoting-agent/new-promoting-agent.component';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-promoting-agent',
  templateUrl: './promoting-agent.component.html',
  styleUrls: ['./promoting-agent.component.scss']
})
export class PromotingAgentComponent {

  response: any = [];
  page: number = 0;

  filtersOn: boolean = false;
  loading: boolean = false;
  formSearch: FormGroup;
  submited: boolean = false;
  message: string = '';
  Search: FormGroup;
  responseOriginal: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService,
    private companyService: CompanyService,
    private modalService: MatDialog,
    private toastrService: ToastrService



  ) {
    this.formSearch = this.formBuilder.group({
      uf: [''],
      city: [''],
      education: [''],
      profession: [''],
      gender: [''],
      sex: [''],
      colorRace: [''],
    })
    this.Search = this.formBuilder.group({
      busca: ['']
    })
  }

  ngOnInit() {
    this.message = 'Carregando agentes promotores';
    this.loading = true;
    this.list()
  }

  list(){
    this.companyService.list().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: data => {
        this.response = data;
        this.responseOriginal = data;
      }
    })
  }

  deleteAgent(id: string){
    this.companyService.delete(id).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: data => {
        this.toastrService.success('Agente Promotor deletado com sucesso!')
        this.list()
      },
      error: error => {
        this.toastrService.danger(error.error.errors)
      }
  
    })
  }
  search() {

    const searchTerm = this.Search.controls['busca'].value
    if (searchTerm) {

        this.response = this.response.filter((item: any) =>  item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    } else {

        this.response = [...this.responseOriginal];
    }
  }

  openMap() {}

  getCnpj(cnpj: string){
    let trasformed = cnpj.substring(0,2) + '.' + cnpj.substring(2,5) + '.' + cnpj.substring(5,8) + '/' + cnpj.substring(8,12) + '-' + cnpj.substring(12,15)
    
    return trasformed
  }

  getDate(date: any){
    let year = date.substring(0,4)
    let month = date.substring(5,7)
    let day = date.substring(8,10)

    return day + '/' + month + '/' + year
  }

  openFilters() {
    this.filtersOn = !this.filtersOn
  }


  openRegisterAgent() {
    const modalRef = this.modalService.open(NewPromotingAgentComponent, {
      height: '396px',
      width: '599px',
    });

    modalRef.afterClosed().subscribe({
      next: data => {
        this.list();
      }
    })

  }

  submit() {
    this.response = []
    this.submited = true;
  }

  openAgentDetails(id: string) {
    this.router.navigate([`/logged/promoting-agent-detail/${id}`])
  }

  getStatus(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'Ativo'
      case 'INACTIVE':
        return 'Inativo'
      default:
        return ''
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'status-new';
      case 'INACTIVE':
        return 'status-refused';
      default:
        return 'status-default';
    }
  }
}
