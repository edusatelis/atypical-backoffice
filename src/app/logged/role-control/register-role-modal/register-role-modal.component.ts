import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { RoleService } from 'src/app/services/role.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-register-role-modal',
  templateUrl: './register-role-modal.component.html',
  styleUrls: ['./register-role-modal.component.scss']
})
export class RegisterRoleModalComponent {


  form: FormGroup;

  permissions: string = '';

  loading: boolean = false;

  message: string = '';

  constructor(
    private modalService: MatDialog,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private toastrService: ToastrService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      manageUsers: [false],
      requests: [false],
      manageWorks: [false],
      manageProfessionals: [false],
      manageDemands: [false],
      viewBackOffice: [false],
      checkForInconsistencies: [false],
    })
  }


  close() {
    this.modalService.closeAll();
  }

  submit() {

    // const verifyManageUsers = this.form.controls['manageUsers'].value;
    // if (verifyManageUsers) {
    //   this.permissions.push('manageUsers')
    // }

    // const verifyRequests = this.form.controls['requests'].value;
    // if (verifyRequests) {
    //   this.permissions.push('requests')
    // }

    // const verifyManageWorks = this.form.controls['manageWorks'].value;
    // if (verifyManageWorks) {
    //   this.permissions.push('manageWorks')
    // }

    // const verifyManageProfessionals = this.form.controls['manageProfessionals'].value;
    // if (verifyManageProfessionals) {
    //   this.permissions.push('manageProfessionals')
    // }

    // const verifyManageDemands = this.form.controls['manageDemands'].value;
    // if (verifyManageDemands) {
    //   this.permissions.push('manageDemands')
    // }

    // const verifyViewBackOffice = this.form.controls['viewBackOffice'].value;
    // if (verifyViewBackOffice) {
    //   this.permissions.push('viewBackOffice')
    // }

    // const verifyCheckForInconsistencies = this.form.controls['checkForInconsistencies'].value;
    // if (verifyCheckForInconsistencies) {
    //   this.permissions.push('checkForInconsistencies')
    // }


    const request = {
      description: this.form.controls['name'].value,
      role: this.permissions,
      active: true
    }

    this.loading = true;
    this.message = 'Cadastrando função'
    this.roleService.register(request).pipe(
      finalize(() => {
        this.loading = false;
        this.close();
      })
    ).subscribe({
      next: data => {
        this.toastrService.success('Função cadastrada com sucesso!')
      },
      error: error => {
        this.toastrService.danger(error.error.errors)
      }
    })

  }

}
