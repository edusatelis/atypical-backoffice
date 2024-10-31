import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError } from "rxjs";
import { environment } from "src/environments/environment";
import { RoleRegisterRequestDto } from "../dtos/roles/role-registger-request.dto";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: "root",
})
export class EmployeeService extends BaseService {
    url: string = `${environment.apis.path}/employee-backoffice`;

    constructor(private readonly httpClient: HttpClient) {
        super();
    }

    list(): Observable<any> {
        return this.httpClient
            .get(`${this.url}`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    getById(id:string): Observable<any> {
        return this.httpClient
            .get(`${this.url}/by-id/${id}`, this.authorizedHeader())
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