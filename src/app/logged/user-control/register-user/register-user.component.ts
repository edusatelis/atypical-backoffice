import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { UserTypeEnum } from 'src/app/dtos/user/user-type.enum';
import { RoleService } from 'src/app/services/role.service';
import { ToastrService } from 'src/app/services/toastr.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent {

  form: FormGroup;

  loading: boolean = false;

  message: string = '';

  roles: any = [];

  constructor(
    private modalService: MatDialog,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      crm: [''],
      bio: [''],
      street: [''],
      number: [''],
      neighborhood: [''],
      complement: [''],
      city: [''],
      state: [''],
      zipcode: [''],
      especialidades: [[]],
      socialMedia: [[]],
      media: [[]],
      agreements: [[]],
      services: [[]],
      formation: [[]],
      experiences: [[]],
      recommendation: [[]],
      openTeams: [false],
      openSupervise: [false],
      birthDate: [''],
      status: [''],
      type: ['', [Validators.required]],
      typeVisit: ['']
    })
  }

  ngOnInit() {
  }


  close() {
    this.modalService.closeAll();
  }

  submit() {

    var request;

    if(this.form.controls['type'].value == 'subscribe' || this.form.controls['type'].value == 'admin' ){
      request = {
        name: this.form.controls['name'].value,
        email: this.form.controls['email'].value,
        phone: this.form.controls['phone'].value,
        cpf: this.form.controls['cpf'].value,
        password: this.form.controls['password'].value,
        type: this.form.controls['type'].value,
        status: this.form.controls['status'].value,
        birthDate: this.form.controls['birthDate'].value
      }
    }else{
      request = {
        name: this.form.controls['name'].value,
        email: this.form.controls['email'].value,
        phone: this.form.controls['phone'].value,
        cpf: this.form.controls['cpf'].value,
        password: this.form.controls['password'].value,
        type: this.form.controls['type'].value,
        status: this.form.controls['status'].value,
        birthDate: this.form.controls['birthDate'].value,
        address: {
          street: this.form.controls['street'].value,
          city: this.form.controls['city'].value,
          state: this.form.controls['state'].value,
          complement: this.form.controls['complement'].value,
          neighborhood: this.form.controls['neighborhood'].value,
          number: this.form.controls['number'].value,
          zipcode: this.form.controls['zipcode'].value
        },
        crm: this.form.controls['crm'].value
      }
    }


    this.loading = true;
    this.message = 'Cadastrando usuário'

    this.userService.register(request).pipe(
      finalize(() => {
        this.loading = false;
        this.close();
      })
    ).subscribe({
      next: data => {
        this.toastrService.success('Usuário cadastrado com sucesso!')
        this.close();
      },
      error: error => {
        this.toastrService.danger(error.error.errors)
      }
    })
  }

}
