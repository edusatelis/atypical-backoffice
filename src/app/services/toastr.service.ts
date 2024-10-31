import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class ToastrService {
    constructor(private _snackBar: MatSnackBar) { }


    success(message: string) {
        this._snackBar.open(message, '✔️', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'success-snackbar',
            duration: 5000,
        });
    }

    danger(message: string) {
        this._snackBar.open(message, '❌', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'danger-snackbar',
            duration: 5000,
        });
    }

    warning(message: string) {
        this._snackBar.open(message, '⚠️', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'warning-snackbar',
            duration: 5000,
        });
    }
}