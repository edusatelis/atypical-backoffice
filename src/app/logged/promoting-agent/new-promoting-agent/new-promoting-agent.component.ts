import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { catchError, finalize, of } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { RoleService } from 'src/app/services/role.service';
import { ToastrService } from 'src/app/services/toastr.service';
import { UserService } from 'src/app/services/user.service';

type ViacepType = {
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro: any;
};

@Component({
  selector: 'app-new-promoting-agent',
  templateUrl: './new-promoting-agent.component.html',
  styleUrls: ['./new-promoting-agent.component.scss']
})
export class NewPromotingAgentComponent {

  form: FormGroup;

  loading: boolean = false;
  
  message: string = '';
  
  roles: any = [];
  
  constructor(
    private modalService: MatDialog,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private companyService: CompanyService,
    private http: HttpClient,
    private toastrService: ToastrService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      cnpj: ['', [Validators.required]],
      nickname: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      neighborhood: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      ownerCpf: ['', [Validators.required]],
      status: ['', [Validators.required]],
      complement: ['']
    })
  }

  ngOnInit() {
  }



  close() {
    this.modalService.closeAll();
  }

  viaCep(zipCode: string){
    
    let viaCEPUrl = `https://viacep.com.br/ws/${zipCode}/json/`;
    return this.http.get<ViacepType>(viaCEPUrl).pipe(
      catchError((error) => {return of(null);}),);
  }

  onchangeCep() {
    const zipcode: string = this.form.controls['cep'].value;
  
    if (zipcode.length === 8) {
      this.viaCep(zipcode).subscribe({
        next: (data) => {
          if (data && !data.erro) {
            this.form.patchValue({
              street: data.logradouro,
              neighborhood: data.bairro,
              city: data.localidade,
              state: data.uf,
            });
          } else {
            this.toastrService.warning('CEP não encontrado.');
          }
        },
        error: (error) => {
          this.toastrService.danger('Erro ao buscar CEP.');
        }
      });
    }
  }

  submit() {

    var data = {
      name: this.form.controls['name'].value,
      cnpj: this.form.controls['cnpj'].value,
      ownerCpf: this.form.controls['ownerCpf'].value,
      status: 'ACTIVE',
      addresses:{
        state: this.form.controls['state'].value,
        nickname: this.form.controls['nickname'].value,
        city: this.form.controls['city'].value,
        zipcode: this.form.controls['cep'].value,
        complement: this.form.controls['complement'].value || "  ",
        neighborhood: this.form.controls['neighborhood'].value,
        number: this.form.controls['number'].value,
        street: this.form.controls['street'].value,
        latitude: "-23.000000",
        longitude: "-46.000000",
        maximumDistanceToWorks: 1 
      }
    }
    this.loading = true;
    this.message = 'Cadastrando Agente Promotor'

    this.companyService.register(data).pipe(
      finalize(() => {
        this.loading = false;
        this.close();
      })
    ).subscribe({
      next: data => {
        this.toastrService.success('Agente Promotor cadastrado com sucesso!')
        this.close();
      },
      error: error => {
        this.toastrService.danger(error.error.errors)
      }
    })
  }

}
