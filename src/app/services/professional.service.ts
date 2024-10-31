import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ProfessionalService extends BaseService {
    url: string = `${environment.apis.path}/user`;

    constructor(private readonly httpClient: HttpClient) {
        super();
    }

    list(): Observable<any> {
        return this.httpClient
            .get(`${this.url}/list-professional`, this.anonymousHeader());
    }
}