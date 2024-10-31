import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'src/app/services/toastr.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  form: FormGroup;
  formCode: FormGroup;
  formPassword: FormGroup;

  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  PressBackspace: any;

  showPassword: boolean = false;
  showPasswordConfirm: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private toastrService: ToastrService,
    private userService: UserService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.formCode = this.formBuilder.group({
      code1: ['', [Validators.required]],
      code2: ['', [Validators.required]],
      code3: ['', [Validators.required]],
      code4: ['', [Validators.required]],
      code5: ['', [Validators.required]],
      code6: ['', [Validators.required]],
    });

    this.formPassword = this.formBuilder.group({
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });

  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;
    return password && passwordConfirm && password !== passwordConfirm ? { passwordsMismatch: true } : null;
  };



  back() {
    this.location.back();
  }

  move(e: any, p: any, c: any, n: any) {
    var length = c.value.length;
    var maxlength = c.getAttribute('maxlength');

    if (length == maxlength && n != '') {
      n.focus();
      return;
    }
    if (e.key === 'Backspace') {
      if (c.value === '') {
        if (p != '') {
          if (this.PressBackspace) {
            p.focus();
            p.value = '';
          }
        }
      }
      this.PressBackspace = true;
    } else {
      this.PressBackspace = false;
    }
  }

  submit() {
    this.userService.forgotPasswordSendEmail(this.form.value).subscribe({
      next: data => {
        this.toastrService.success('Confira sua caixa de entrada, enviamos um email para verificar sua identidade!')
        this.step1 = false;
        this.step2 = true;
      },
      error: error => {
        this.toastrService.danger(error.error.errors)
      }
    })
  }

  submitCode() {

    const request = {
      email: this.form.controls['email'].value,
      code: this.formCode.controls['code1'].value + this.formCode.controls['code2'].value + this.formCode.controls['code3'].value + this.formCode.controls['code4'].value + this.formCode.controls['code5'].value + this.formCode.controls['code6'].value
    }

    this.userService.confirmCodeforgotPassword(request).subscribe({
      next: data => {
        this.step2 = false;
        this.step3 = true;
      },
      error: error => {
        this.toastrService.danger(error.error.errors)
      }
    })
  }

  submitPassword() {
    const request = {
      email: this.form.controls['email'].value,
      code: this.formCode.controls['code1'].value + this.formCode.controls['code2'].value + this.formCode.controls['code3'].value + this.formCode.controls['code4'].value + this.formCode.controls['code5'].value + this.formCode.controls['code6'].value,
      password: this.formPassword.controls['password'].value
    }
    this.userService.forgotPassword(request).subscribe({
      next: data => {
        this.toastrService.success('Senha alterada com sucesso!');
        this.back()
      },
      error: error => {
        this.toastrService.danger(error.error.errors)
      }
    })
  }

}
