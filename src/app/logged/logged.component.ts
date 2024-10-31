import { Component } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
export class LoggedComponent {

  changeSide: boolean = true;

  dashboardArray = ['/logged/dashboard'];
  userControlArray = ['/logged/user-control'];
  roleControlArray = ['/logged/role-control'];
  registeredProfessionalsArray = ['/logged/registered-professionals'];
  demandsControlArray = ['/logged/demands-control'];
  searchControlArray = ['/logged/search-control'];
  helpRequestsArray = ['/logged/help-requests'];
  inconsistencyControlArray= ['/logged/inconsistency-control']
  promotingAgentArray= ['/logged/promoting-agent']


  public currentHref: string = '';

  user: any;
  role: any[] = [];

  roles = {
    usuario: false,
    profissional: false,
    empresas: false,
    demanda: false,
    inconsistencia: false,
    solicitacao_ajuda: false,
    pesquisa: false
  }

  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    public location: Location,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.sidebarService.changeSidebar.subscribe({
      next: data => {
        this.changeSide = data;
      }
    });


    this.currentHref = window.location.pathname;

    this.router.events.subscribe(() => {
      if (this.location.path() != '') {
        this.currentHref = this.location.path();
      } else {
        this.currentHref = 'Home';
      }
    });
  }

  change($event: any) {
    this.changeSide = $event
  }

  closeSide() {
    this.sidebarService.changeSidebar.next(false);
  }

}
