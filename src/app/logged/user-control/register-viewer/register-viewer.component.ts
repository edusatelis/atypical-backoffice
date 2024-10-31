import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { UserTypeEnum } from 'src/app/dtos/user/user-type.enum';
import { ToastrService } from 'src/app/services/toastr.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-viewer',
  templateUrl: './register-viewer.component.html',
  styleUrls: ['./register-viewer.component.scss']
})
export class RegisterViewerComponent {
  form: FormGroup;

  loading: boolean = false;
  message: string = '';

  constructor(
    private modalService: MatDialog,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      timeView: ['', [Validators.required]],
      status: ['', [Validators.required]],
      rolesId: [[]] 
    })
  }


  close() {
    this.modalService.closeAll();
  }

  submit() {

    const request = {
      ...this.form.value,
      type: UserTypeEnum.admin
    }
    this.loading = true;
    this.message = 'Cadastrando visualizador'
    this.userService.register(request).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: data => {
        this.toastrService.success('Visualizador cadastrado com sucesso!');
        this.close();
      },
      error: error => {
        this.toastrService.danger(error.error.errors);
      }
    })

  }
}
