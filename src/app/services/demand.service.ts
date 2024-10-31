import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class DemandService extends BaseService {
    url: string = `${environment.apis.path}/demand-backoffice`;

    constructor(private readonly httpClient: HttpClient) {
        super();
    }

    list() {
        return this.httpClient
            .get(`${this.url}`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    getByProfessionalId(professionalId: string) {
        return this.httpClient
        .get(`${this.url}/get-by-professionalId/${professionalId}`, this.authorizedHeader())
        .pipe(map(this.extractData), catchError(this.serviceError)); 
    } 

    getByCompany(companyId: string) {
        return this.httpClient
        .get(`${this.url}/get-by-company/${companyId}`, this.authorizedHeader())
        .pipe(map(this.extractData), catchError(this.serviceError)); 
    } 

    listByMonth(month: number): Observable<any> {
        return this.httpClient
            .get(`${this.url}/get-month/${month}`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }


}