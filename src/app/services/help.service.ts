
import { Injectable } from "@angular/core";
import { Observable, map, catchError } from "rxjs";
import { environment } from "src/environments/environment";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { HelpStatusEnum } from "../enums/help.enum";

@Injectable({
    providedIn: "root",
})
export class HelpService extends BaseService {

    url: string = `${environment.apis.path}/help-backoffice`;

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


    register(dto: any): Observable<any> {
        return this.httpClient
            .post(`${this.url}/register`, dto, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    update(helpId: string, status: HelpStatusEnum) {
        return this.httpClient
            .put(`${this.url}/update/${helpId}/${status}`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    delete(roleId: string) {
        return this.httpClient
            .delete(`${this.url}/delete/${roleId}`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }
}