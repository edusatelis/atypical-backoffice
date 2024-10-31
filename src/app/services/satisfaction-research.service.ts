import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class SatisfactionResearchService extends BaseService {
    url: string = `${environment.apis.path}/satisfaction-research-backoffice`;

    constructor(private readonly httpClient: HttpClient) {
        super();
    }

    list() {
        return this.httpClient
            .get(`${this.url}`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    listBeneficiary(){
        return this.httpClient
        .get(`${this.url}/beneficiary`, this.authorizedHeader())
        .pipe(map(this.extractData), catchError(this.serviceError));
    }


    listBeneficiaryMonth(month: number){
        return this.httpClient
        .get(`${this.url}/beneficiary/${month}`, this.authorizedHeader())
        .pipe(map(this.extractData), catchError(this.serviceError));
    }

    listProfessional(){
        return this.httpClient
        .get(`${this.url}/professional`, this.authorizedHeader())
        .pipe(map(this.extractData), catchError(this.serviceError));
    }

    listProfessionalMonth(month: number){
        return this.httpClient
        .get(`${this.url}/professional/${month}`, this.authorizedHeader())
        .pipe(map(this.extractData), catchError(this.serviceError));
    }


}