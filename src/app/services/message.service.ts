import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, catchError } from "rxjs";
import { environment } from "src/environments/environment";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root',
})
export class MessageService extends BaseService {

    url: string = `${environment.apis.path}/message`;

    // url = environment.api_url + '/message';

    constructor(private http: HttpClient) {
        super();
    }

    list() {
        return this.http
            .get(
                `${this.url}/profissional/find`,
                this.authorizedHeader()
            )
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    listConversation(userId: string) {
        return this.http
            .get(
                `${this.url}/all-user-conversation/${userId}`,
                this.authorizedHeader()
            )
            .pipe(map(this.extractData), catchError(this.serviceError));
    }


    create(dto: any) {
        return this.http
            .post(
                `${this.url}`,
                dto,
                this.authorizedHeader()
            )
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

}