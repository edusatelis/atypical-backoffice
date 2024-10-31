import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError } from "rxjs";
import { environment } from "src/environments/environment";
import { RoleRegisterRequestDto } from "../dtos/roles/role-registger-request.dto";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: "root",
})
export class CompanyService extends BaseService {
    url: string = `${environment.apis.path}/company-backoffice`;

    constructor(private readonly httpClient: HttpClient) {
        super();
    }

    list(): Observable<any> {
        return this.httpClient
            .get(`${this.url}`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    listByMonth(month: number): Observable<any> {
        return this.httpClient
            .get(`${this.url}/get-month/${month}`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    getById(id:string): Observable<any> {
        return this.httpClient
            .get(`${this.url}/by-id/${id}`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    getByEmployerId(id:string): Observable<any> {
        return this.httpClient
            .get(`${this.url}/by-employee/${id}`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    register(dto: any): Observable<any> {
        return this.httpClient
            .post(`${this.url}/register`, dto, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    update(id: string, dto: any) {
        return this.httpClient
            .put(`${this.url}/update/${id}`, dto, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    delete(id: string) {
        return this.httpClient
            .delete(`${this.url}/by-id/${id}`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }
}