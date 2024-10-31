import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterViewerComponent } from './register-viewer/register-viewer.component';
import { UserService } from 'src/app/services/user.service';
import { finalize } from 'rxjs';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.scss']
})
export class UserControlComponent {

  page: number = 0;
  response: any = [];

  
  
  
  loading: boolean = false;
  
  message: string = '';
  
  Search: FormGroup;
  responseOriginal: any = [];


  showActions: boolean = true;

  constructor(
    private modalService: MatDialog,
    private userService: UserService,
    private formBuilder: FormBuilder,

  ) { 
    this.Search = this.formBuilder.group({
      busca: ['']
    })
  }

  ngOnInit() {
    this.list();
  }



  list() {
    this.loading = true;
    this.message = 'Carregando usuários'
    this.userService.list().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: data => {
        this.response = data;
        this.responseOriginal = data;
        console.log(data)
      },
      error: error => {
        console.error(error);

      }
    });

    
  }

  search() {

    const searchTerm = this.Search.controls['busca'].value
    if (searchTerm) {

        this.response = this.response.filter((item: any) =>  item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    } else {

        this.response = [...this.responseOriginal];
    }
  }

  openRegisterUser() {
    const modalRef = this.modalService.open(RegisterUserComponent, {
      height: '396px',
      width: '599px',
    });

    modalRef.afterClosed().subscribe({
      next: data => {
        this.list();
      }
    })

  }

  openRegisterViewer() {
    const modalRef = this.modalService.open(RegisterViewerComponent, {
      height: '396px',
      width: '599px',
    });
    modalRef.afterClosed().subscribe({
      next: data => {
        this.list();
      }
    })
  }

  getType(type: string) {
    switch (type) {
      case 'admin':
        return 'Administrador'
      case 'subscriber':
        return 'Assinante'
      case 'professional':
        return 'Profissional'
      default:
        return '-'
    }
  }

  openEdit(user: any) {
    const modalRef = this.modalService.open(EditUserComponent, {
      height: '396px',
      width: '599px',
    });
    modalRef.componentInstance.response = user;
    modalRef.afterClosed().subscribe({
      next: data => {
        this.list();
      }
    })
  }

  openDelete(user: any) {
    const modalRef = this.modalService.open(DeleteUserComponent, {
      height: '300px',
      width: '399px',
    });
    modalRef.componentInstance.response = user;
    modalRef.afterClosed().subscribe({
      next: data => {
        this.list();
      }
    })
  }

  getStatus(status: string) {
    switch (status) {
      case 'active':
        return 'Ativo'
      case 'inactive':
        return 'Inativo'
      default:
        return ''
    }
  }

}
