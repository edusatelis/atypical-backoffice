import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from '../services/toastr.service';
import { UserService } from '../services/user.service';
import { UserTypeEnum } from '../dtos/user/user-type.enum';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private toastrService: ToastrService,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    async canActivate() {

        if (!this.authenticationService.getAuthenticatedUser()) {
            this.authenticationService.removeAuthenticatedUser();
            this.toastrService.warning('Usuario não autenticado');
            this.router.navigate(['/']);
        }

        this.userService.getUser().subscribe({
            next: data => {
                    return true
            }
        })

        return true;
    }
}
