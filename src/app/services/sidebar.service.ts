import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SidebarService {

    changeSidebar = new BehaviorSubject<boolean>(false);


    constructor() { }
}