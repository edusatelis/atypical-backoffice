import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map } from "rxjs";
import { RoleRegisterRequestDto } from "../dtos/roles/role-registger-request.dto";

@Injectable({
    providedIn: "root",
})
export class RoleService extends BaseService {
    url: string = `${environment.apis.path}/backoffice-user-roles`;

    constructor(private readonly httpClient: HttpClient) {
        super();
    }

    list(): Observable<any> {
        return this.httpClient
            .get(`${this.url}`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    register(dto: RoleRegisterRequestDto): Observable<any> {
        return this.httpClient
            .post(`${this.url}/register`, dto, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    update(roleId: string, dto: RoleRegisterRequestDto) {
        return this.httpClient
            .put(`${this.url}/update/${roleId}`, dto, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    delete(roleId: string) {
        return this.httpClient
            .delete(`${this.url}/delete/${roleId}`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }
}