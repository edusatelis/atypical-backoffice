import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-registered-professionals',
  templateUrl: './registered-professionals.component.html',
  styleUrls: ['./registered-professionals.component.scss']
})
export class RegisteredProfessionalsComponent {

  response: any = [];
  page: number = 0;

  filtersOn: boolean = false;
  loading: boolean = false;
  formSearch: FormGroup;
  submited: boolean = false;
  message: string = '';

  mapOn: boolean = false;

  Search: FormGroup;
  responseOriginal: any = [];

  employers: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService,
    private companyService: CompanyService

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
    this.message = 'Carregando profissionais';
    this.loading = true;
    this.companyService.list().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: data => {
        for(let iterator of data) {
          for(let item of iterator.employees) {
            this.employers.push(item)
          }
        }
        this.response = data;
        this.responseOriginal = [...data];
      }
    })
  }

  search() {
    const searchTerm = this.Search.controls['busca'].value;

    if (searchTerm && searchTerm.trim()) { 
      const filteredEmployers = this.employers.filter((item: any) =>
        item.user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      this.response = this.responseOriginal.map((company: any) => ({
        ...company,
        employees: company.employees.filter((employee: any) =>
          filteredEmployers.some((filteredEmployee: any) => filteredEmployee.id === employee.id)
        )
      })).filter((company: any) => company.employees.length > 0);

    } else {
      this.response = [...this.responseOriginal];
    }
  }

  openMap() {
    this.mapOn = !this.mapOn
  }

  openFilters() {
    this.filtersOn = !this.filtersOn
  }

  submit() {
    this.response = []
    this.submited = true;
  }

  openProfessionalDetails(id: any) {
    this.router.navigate([`/logged/professional-detail/${id}`])
  }

}
