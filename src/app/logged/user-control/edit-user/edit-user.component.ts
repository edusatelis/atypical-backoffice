import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { UserTypeEnum } from 'src/app/dtos/user/user-type.enum';
import { RoleService } from 'src/app/services/role.service';
import { ToastrService } from 'src/app/services/toastr.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  form: FormGroup;
  response: any;
  loading: boolean = false;
  message: string = '';
  roles: any = [];

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private modalService: MatDialog,
    private formBuilder: FormBuilder,
    private roleService: RoleService
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

    if (this.response.type === UserTypeEnum.admin || this.response.type === UserTypeEnum.subscriber) {
      this.form.patchValue({
        name: this.response.name,
        email: this.response.email,
        phone: this.response.phone,
        cpf: this.response.cpf,
        type: this.response.type,
        status: this.response.status,
        birthDate: this.response.birthDate
      })
    } else {
      this.form.patchValue({
        name: this.response.name,
        email: this.response.email,
        phone: this.response.phone,
        cpf: this.response.cpf,
        type: this.response.type,
        status: this.response.status,
        birthDate: this.response.birthDate,
        crm: this.response.crm,
        city: this.response.address.city,
        neighborhood: this.response.address.neighborhood,
        number: this.response.address.number,
        state: this.response.address.state,
        street: this.response.address.street,
        zipcode: this.response.address.zipcode,
        complement: this.response.address.complement
      })
    }
  }

  close() {
    this.modalService.closeAll();
  }

  submit() {

    this.loading = true;

      this.message = 'Editando usuário'
    var data;
    

    if(this.response.type === UserTypeEnum.admin || this.response.type === UserTypeEnum.subscriber){
      data = {
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
      data = {
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

    this.userService.update(this.response._id, data).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: data => {
        this.toastrService.success('Usuário editado com sucesso!');
        this.close();
      },
      error: error => {
        this.toastrService.danger(error.error.errors)
      }
    })
  }



}
