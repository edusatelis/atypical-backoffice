import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterRoleModalComponent } from './register-role-modal/register-role-modal.component';
import { RoleService } from 'src/app/services/role.service';
import { finalize } from 'rxjs';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { DeleteRoleComponent } from './delete-role/delete-role.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-role-control',
  templateUrl: './role-control.component.html',
  styleUrls: ['./role-control.component.scss']
})
export class RoleControlComponent {

  page: number = 0;
  response: any = [];

  loading: boolean = false;
  showActions: boolean = true;
  message: string = '';

  constructor(
    private modalService: MatDialog,
    private roleService: RoleService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.list();

    this.userService.getUser().subscribe({
      next: data => {
        if(data.roles.length === 0) {
          this.showActions = false;
        } else {
          if(!data.roles.some((role: any) => role.role == 'GERIR_FUNCOES')) {
            this.showActions = false;
          }
        }
      }
    })
  }

  list() {
    this.loading = true;
    this.message = 'Carregando funções'
    this.roleService.list().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: data => {
        this.response = data;
      }
    })
  }

  search() {}

  openRegisterRole() {
    const modalRef = this.modalService.open(RegisterRoleModalComponent, {
      height: '396px',
      width: '599px',
    });
    modalRef.afterClosed().subscribe({
      next: data => {
        this.list();
      }
    })
  }

  openEdit(role: any) {
    const modalRef = this.modalService.open(EditRoleComponent, {
      height: '396px',
      width: '599px',
    });
    modalRef.componentInstance.response = role;
    modalRef.afterClosed().subscribe({
      next: data => {
        this.list();
      }
    })
  }

  openDelete(role: any) {
    const modalRef = this.modalService.open(DeleteRoleComponent, {
      height: '300px',
      width: '399px',
    });
    modalRef.componentInstance.response = role;
    modalRef.afterClosed().subscribe({
      next: data => {
        this.list();
      }
    })
  }

  getFunctions(content: any) {
    switch (content) {
      case 'manageUsers':
        return 'Gerenciar Usuários';
      case 'requests':
        return 'Solicitações';
      case 'manageWorks':
        return 'Gerenciar Obras';
      case 'manageProfessionals':
        return 'Gerenciar Profissionais';
      case 'manageDemands':
        return 'Gerenciar Demandas';
      case 'viewBackOffice':
        return 'Visualizar Backoffice';
      case 'checkForInconsistencies':
        return 'Verificar Inconsistências';
      default:
        return 'Permissão Desconhecida';
    }
  }

}
