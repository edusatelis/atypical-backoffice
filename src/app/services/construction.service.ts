import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError } from "rxjs";
import { environment } from "src/environments/environment";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: "root",
})
export class ConstructionService extends BaseService {

    url: string = `${environment.apis.path}/construction`;

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

    update(roleId: string, dto: any) {
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