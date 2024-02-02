import { Component } from '@angular/core';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  loginMenuIsVisibile: boolean = false;
  loginUrl: string;
  signUpUrl: string;

  constructor() {
    this.loginUrl = environment.loginUrl();
    this.signUpUrl = environment.signUpUrl();
    console.log(this.loginUrl);
  }

  userLoginOnClick(): void{
    this.loginMenuIsVisibile=!this.loginMenuIsVisibile;
  }
}
