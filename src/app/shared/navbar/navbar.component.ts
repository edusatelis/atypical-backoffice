import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  sidebarChange: boolean = false;

  user: any;

  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private userService: UserService
  ) { }

  async ngOnInit() {
    this.sidebarService.changeSidebar.subscribe({
      next: data => {
        this.sidebarChange = data;
      }
    })

    var userLocalStorage = await JSON.parse(localStorage.getItem('user') || "" );

    this.userService.getById(userLocalStorage.userId).subscribe({
      next: data => {
        this.user = data;
      }
    })

  }

  openSide() {
    const change = !this.sidebarChange;
    this.sidebarService.changeSidebar.next(change);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
