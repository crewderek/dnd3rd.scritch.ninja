import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import {LoginService} from "../authorization/login.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  loginMenuIsVisibile: boolean = false;
  loginUrl: string;
  signUpUrl: string;
  logoutUrl: string;

  constructor(public loginService: LoginService) {
    this.loginUrl = environment.loginUrl();
    this.signUpUrl = environment.signUpUrl();
    this.logoutUrl = environment.logoutUrl();
  }

  userLoginOnClick(): void{
    this.loginMenuIsVisibile=!this.loginMenuIsVisibile;
  }
}
