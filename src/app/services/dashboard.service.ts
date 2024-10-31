import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError } from "rxjs";
import { environment } from "src/environments/environment";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: "root",
})
export class DashboardService extends BaseService {

    url: string = `${environment.apis.path}/dashboard-backoffice`;

    constructor(private readonly httpClient: HttpClient) {
        super();
    }

    getCharts(): Observable<any> {
        return this.httpClient
            .get(`${this.url}`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    getUserData(month: any): Observable<any> {
        return this.httpClient
            .get(`${this.url}/userdata/${month}`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }
}