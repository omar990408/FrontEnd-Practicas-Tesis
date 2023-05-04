import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public loginService:LoginService, public router: Router) { }

  public logOut(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }


}
