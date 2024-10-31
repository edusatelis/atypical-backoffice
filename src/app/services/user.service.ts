import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { ForgotPasswordSendEmailRequestDto } from "../dtos/user/forgot-password-send-email-request.dto";
import { Observable, catchError, map } from "rxjs";
import { ForgotPasswordConfirmCodeRequestDto } from "../dtos/user/forgot-password-confirm-code-request.dto";
import { ForgotPasswordRequestDto } from "../dtos/user/forgot-password-request.dto";
import { UserRegisterRequestDto } from "../dtos/user/user-register-request.dto";
import { UserFirstAccessRegisterPasswordRequestDto } from "../dtos/user/user-first-access-register-password-register-request.dto";

@Injectable({
    providedIn: "root",
})
export class UserService extends BaseService {
    url: string = `${environment.apis.path}/user`;
    urlBid: string = `${environment.apis.path}/user`;

    constructor(private readonly httpClient: HttpClient) {
        super();
    }

    list(): Observable<any> {
        return this.httpClient
            .get(`${this.url}/list`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    listBeneficiary(): Observable<any> {
        return this.httpClient
            .get(`${this.urlBid}/get-beneficiary`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    listByMonth(month: number): Observable<any> {
        return this.httpClient
            .get(`${this.urlBid}/get-month-beneficiary/${month}`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    getUser(): Observable<any> {
        return this.httpClient
            .get(`${this.url}/authenticated`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    getById(id: string) {
        return this.httpClient
          .get(`${this.url}/get-by-id/${id}`, this.authorizedHeader())
          .pipe(map(this.extractData), catchError(this.serviceError));
    }


    getByEmail(email: string) {
        return this.httpClient
          .get(`${this.url}/by-email/${email}`, this.authorizedHeader())
          .pipe(map(this.extractData), catchError(this.serviceError));
    }


    forgotPasswordSendEmail(dto: ForgotPasswordSendEmailRequestDto) {
        return this.httpClient
            .post(`${this.url}/send-email-forgot-password`, dto, this.anonymousHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    confirmCodeforgotPassword(dto: ForgotPasswordConfirmCodeRequestDto) {
        return this.httpClient
            .post(`${this.url}/confirm-code-forgot-password`, dto, this.anonymousHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    forgotPassword(dto: ForgotPasswordRequestDto) {
        return this.httpClient
            .post(`${this.url}/forgot-password`, dto, this.anonymousHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    register(dto: UserRegisterRequestDto): Observable<any> {
        return this.httpClient
            .post(`${this.url}/register`, dto, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    update(userId: string, dto: UserRegisterRequestDto): Observable<any> {
        return this.httpClient
            .put(`${this.url}/update/${userId}`, dto, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }

    delete(userId: string): Observable<any> {
        return this.httpClient
            .delete(`${this.url}/delete/${userId}`, this.authorizedHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }


    firstAccessRegisterPassword(userId: string, dto: UserFirstAccessRegisterPasswordRequestDto) {
        return this.httpClient
            .post(`${this.url}/first-access/${userId}`, dto, this.anonymousHeader())
            .pipe(map(this.extractData), catchError(this.serviceError));
    }
}