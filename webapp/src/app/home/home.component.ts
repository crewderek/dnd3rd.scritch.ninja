import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Character} from "../shared/models/character.model";
import {Observable} from "rxjs";
import {LocalStorageService} from "../authorization/local-storage.service";
import {JWTTokenService} from "../authorization/jwttoken.service";
import {LoginService} from "../authorization/login.service";
import {environment} from '../../environments/environment'
import {Route, Router} from "@angular/router";
import * as http from "http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // @ts-ignore
  characters: Character[] = [];
  responseData: any;
  loggedIn: boolean = false;

  constructor(private route: Router, private http: HttpClient, private localStorage: LocalStorageService, private token: JWTTokenService, private loginService: LoginService) {
  }

  ngOnInit(){
    //  Make sure we are logged in
    if(!this.loginService.isUserLoggedIn())
      return;

    this.loggedIn = true;
    this.getData().subscribe(
      (response) => {
        response.characters.forEach((e: any) => {
          let character: Character = new Character(this.http);

          character.getCharacterData(e.characterId).subscribe(
            (characterResponse) => {
              character.parseCharacterData(characterResponse.character);
              this.characters.push(character);
            },
            (error) => {
              console.error('Error fetching data:', error);
            }
          );

          // this.characters.push(character)
        })
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  patchCharacterData(characterId: string, columnName: string,
                     columnValue: string | number): void {
    const url = `${environment.apiEnvUrl()}${environment.characterPath}`;
    const body = {
      "characterId": characterId,
      "columnName": columnName,
      "columnValue": columnValue
    };

    this.http.patch<any>(url, body).subscribe((data) => {
      // console.log("hi this is patch request", data);
    });
  }

  getData(): Observable<any> {
    return this.http.get<any>(`${environment.apiEnvUrl()}${environment.userCharactersPath}`);
  }

  deleteCharacter(characterId: string) {
    // return this.http.delete<any>(
    //   `${environment.apiEnvUrl()}${environment.characterPath}?characterId=${characterId}`);
    this.http.delete<any>(`${environment.apiEnvUrl()}${environment.characterPath}?characterId=${characterId}`).subscribe((response)=>{console.log(response)});
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
