import { Component } from '@angular/core';
import {LoginService} from "../authorization/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private loginService: LoginService, private route: Router) {
  }

  ngOnInit(){
    this.loginService.logUserOut();

    this.route.navigate(['/home'])
  }
}
