import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Validators} from "@angular/forms";
import {LocalStorageService} from "../authorization/local-storage.service";
import {JWTTokenService} from "../authorization/jwttoken.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  accessTokenRegEx: string = 'access_token=([^&]+)';
  idTokenRegEx: string = 'id_token=([^&]+)';

  constructor(private route: ActivatedRoute, private router: Router, private accessToken: JWTTokenService,
              private idToken: JWTTokenService, private localStorage: LocalStorageService) {
  }

  ngOnInit() {
    if(this.setAccessToken() && this.setIdToken()){
      this.router.navigateByUrl('/home')
    }
  }


  setAccessToken(): boolean {
    const match = this.router.url.match(this.accessTokenRegEx);

    if (match != null) {
      this.accessToken.setToken(match[1]);
      this.localStorage.set('access_token', this.accessToken.jwtToken)
      return true;
    }

    return false;
  }

  setIdToken(): boolean{
    const match = this.router.url.match(this.idTokenRegEx);

    if (match != null) {
      this.idToken.setToken(match[1]);
      this.localStorage.set('id_token', this.idToken.jwtToken)
      return true;
    }

    return false;
  }
}
