import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { ToastrService } from 'src/app/services/toastr.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent {

  response: any;

  loading: boolean = false;
  message: string = '';

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private modalService: MatDialog,
  ) {}

  close() {
    this.modalService.closeAll();
  }

  submit() {

    this.loading = true;
    this.message = 'Deletando usuário'


    this.userService.delete(this.response._id).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: data => {
        this.toastrService.success('Usuário deletado com sucesso!');
        this.close();
      },
      error: error => {
        this.toastrService.danger(error.error.errors)
      }
    })
  }

}
