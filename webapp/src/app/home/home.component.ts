import {Component} from '@angular/core';
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
  archivedCharacters: Character[] = [];
  responseData: any;
  loggedIn: boolean = false;
  //  Create a variable that contains all the display toggle booleans
  displayToggles: any = {
    archivedCharacters: false,
    charactersLoading: true,
  };

  constructor(private route: Router, private http: HttpClient, private localStorage: LocalStorageService,
              private token: JWTTokenService, private loginService: LoginService) {
  }

  ngOnInit() {
    //  Make sure we are logged in
    if (!this.loginService.isUserLoggedIn()) {
      return;
    }

    this.loggedIn = true;
    this.getData().subscribe(
      (response) => {
        this.displayToggles.charactersLoading = true;
        response.characters.forEach((e: any) => {
          let character: Character = new Character(this.http);

          character.getCharacter(e.characterId).subscribe(
            (characterResponse) => {
              character.parseCharacterData(characterResponse.character);
              //  Check if the character is archived
              if (!character.isArchived) {
                this.archiveCharacter(character, 0);
              } else {
                this.archiveCharacter(character, 1);
              }

              this.displayToggles.charactersLoading = false;
            },
            (error) => {
              console.error('Error fetching data:', error);
            }
          );
        })
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    //  Set the default to show the non archived characters if there are any
    if(this.characters.length > 0){
      this.displayToggles.archivedCharacters = false;
    }
  }

  getData(): Observable<any> {
    return this.http.get<any>(`${environment.apiEnvUrl()}${environment.userCharactersPath}`);
  }

  markCharacterForDeletion(character: Character) {

  }

  archiveCharacter(character: Character, toArchive: number) {
    // Check if the response was successful with a code 200
    character.patchCharacter('isArchived', toArchive).subscribe((response) => {
      // If toArchive is 0, then we are unarchiving the character
      if (toArchive === 0) {
        this.archivedCharacters = this.archivedCharacters.filter((e) => e.id !== character.id);
        this.characters.push(character);
        //Check if the archivedCharacters is empty, if it is, then we need to hide the archived characters
        if (this.archivedCharacters.length == 0) {
          this.displayToggles.archivedCharacters = false;
        }
      } else {
        this.characters = this.characters.filter((e) => e.id !== character.id);
        this.archivedCharacters.push(character);
        //Check if the characters is empty, if it is, then we need to hide the characters
        if (this.characters.length == 0) {
          this.displayToggles.archivedCharacters = true;
        }
      }
    }, // Handle the error
      (error) => {
        console.error('Error fetching data:', error);
      });
  }

  createEmptyCharacter(): void {
    const url = `${environment.apiEnvUrl()}${environment.characterPath}`;
    const body = {};

    this.http.post<any>(url, body).subscribe((data) => {
      // console.log(data.status);
      this.route.navigate(['character-sheet'], {
        queryParams: {characterId: data[0].Entity}
      })
    });
  }
}
