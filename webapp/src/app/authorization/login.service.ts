import {Injectable} from '@angular/core';
// import { AppInjector } from "../app.module";
import {JWTTokenService} from "./jwttoken.service";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private idToken: JWTTokenService, private accessToken: JWTTokenService,
              private localStorage: LocalStorageService) {
    const storageIdToken: string | null = localStorage.get('id_token');
    const storageAccessToken: string | null = localStorage.get('access_token');

    if (storageIdToken != null && storageAccessToken != null) {
      this.idToken.setToken(storageIdToken);
      this.accessToken.setToken(storageAccessToken);
    }
  }

  public logUserOut() {
    this.localStorage.remove('access_token');
    this.localStorage.remove('id_token');
  }

  public isUserLoggedIn(): boolean {
    if (!this.isUserAccessTokenExpired() && !this.isUserIdTokenExpired()) {
      return true;
    }

    return false;
  }

  public isUserAccessTokenExpired(): boolean {
    return (this.isUserTokenExpired(this.accessToken) || localStorage.getItem('access_token') == null);
  }

  public isUserIdTokenExpired(): boolean {
    return (this.isUserTokenExpired(this.idToken) || localStorage.getItem('id_token') == null);
  }

  private isUserTokenExpired(token: JWTTokenService): boolean {
    //Get epoch times
    let tokenTime = new Date(0);
    tokenTime.setUTCSeconds(token.getExpiryTime())
    let currentTime = (new Date());

    //  Check if the token time is not expired
    if (tokenTime > currentTime) {
      return false;
    }

    return true;
  }

  public getUsername(): string | null {
    return this.accessToken.getUser();
  }
}
