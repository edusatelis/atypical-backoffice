import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, map } from "rxjs";
import { LocalStorageKeys } from "../utils/localStorage.util";
import { AuthenticateRequestDto } from "../dtos/authentication/authenticate-request.dto";
import { UserAuthenticatedDto } from "../dtos/authentication/user-authenticated.dto";

@Injectable({ providedIn: "root" })
export class AuthenticationService extends BaseService {
  api: string = `${environment.apis.path}/authentication`

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {
    super();
  }

  authenticate(dto: AuthenticateRequestDto) {
    return this.httpClient
      .post(`${this.api}/authenticate`, dto, this.anonymousHeader())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError)
      );
  }

  setAuthenticatedUser(dto: UserAuthenticatedDto) {
    localStorage.setItem(LocalStorageKeys.user, JSON.stringify(dto));
  }


  getAuthenticatedUser() {
    const user = localStorage.getItem(LocalStorageKeys.user);
    return user === null ? undefined : JSON.parse(user);
  }

  removeAuthenticatedUser() {
    localStorage.removeItem(LocalStorageKeys.user);
  }

}