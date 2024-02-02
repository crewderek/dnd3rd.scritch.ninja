import { Component } from '@angular/core';
import { CharacterSheetComponent } from "../character-sheet/character-sheet.component";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Character} from "../shared/models/character.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  characters: Character[];
  responseData: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit(){
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
    return this.http.get<any>('https://325zkzieal.execute-api.us-west-2.amazonaws.com/api/user/characters');
  }
}
