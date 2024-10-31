import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { RoleService } from 'src/app/services/role.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-delete-role',
  templateUrl: './delete-role.component.html',
  styleUrls: ['./delete-role.component.scss']
})
export class DeleteRoleComponent {

  response: any;

  loading: boolean = false;
  message: string = '';

  constructor(
    private roleService: RoleService,
    private toastrService: ToastrService,
    private modalService: MatDialog,
  ) { }

  close() {
    this.modalService.closeAll();
  }

  submit() {

    this.loading = true;
    this.message = 'Deletando Função'

    this.roleService.delete(this.response._id).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: data => {
        this.toastrService.success('Função deletado com sucesso!');
        this.close();
      },
      error: error => {
        this.toastrService.danger(error.error.errors)
      }
    })
  }


}
