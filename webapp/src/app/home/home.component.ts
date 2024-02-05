import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Character} from "../shared/models/character.model";
import {Observable} from "rxjs";
import {LocalStorageService} from "../authorization/local-storage.service";
import {JWTTokenService} from "../authorization/jwttoken.service";
import {LoginService} from "../authorization/login.service";
import {environment} from '../../environments/environment'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  characters: Character[];
  responseData: any;

  constructor(private http: HttpClient, private localStorage: LocalStorageService, private token: JWTTokenService, private loginService: LoginService) {
  }

  ngOnInit(){
    //  Make sure we are logged in
    if(!this.loginService.isUserLoggedIn())
      return;

    this.getData().subscribe(
      (response) => {
        this.characters = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getData(): Observable<any> {
    return this.http.get<any>(`${environment.apiEnvUrl()}${environment.userCharactersPath}`);
  }
}
