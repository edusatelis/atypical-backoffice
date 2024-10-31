import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { CommonModule } from "@angular/common";
import { AuthComponent } from "./auth.component";
import { AuthRouterModule } from "./auth.router";
import { SharedModule } from "../shared/shared.module";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ToastrService } from "../services/toastr.service";
import { AuthenticationService } from "../services/authentication.service";
import { HttpClientModule } from "@angular/common/http";
import { UserService } from "../services/user.service";

@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        ForgotPasswordComponent,
    ],
    imports: [
        CommonModule,
        AuthRouterModule,
        SharedModule,
        HttpClientModule
    ],
    providers: [
        ToastrService,
        AuthenticationService,
        UserService
    ]
})
export class AuthModule { }