import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Character} from "../shared/models/character.model";
import {Observable} from "rxjs";
import {LocalStorageService} from "../authorization/local-storage.service";
import {JWTTokenService} from "../authorization/jwttoken.service";
import {LoginService} from "../authorization/login.service";
import {environment} from '../../environments/environment'
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // @ts-ignore
  characters: Character[];
  responseData: any;

  constructor(private route: Router, private http: HttpClient, private localStorage: LocalStorageService, private token: JWTTokenService, private loginService: LoginService) {
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

  createEmptyCharacter(): void {
    const url = `${environment.apiEnvUrl()}${environment.characterPath}`;
    const body = {};

    this.http.post<any>(url, body).subscribe((data) => {
      // console.log(data.status);
      this.route.navigate(['character-sheet'], {
        queryParams: { characterId: data[0].Entity }
      })
    });
  }
}
