import {Component, Input} from '@angular/core';
import {Character} from "../../shared/models/character.model";
import {Weapon} from "../../shared/models/weapon.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrl: './weapons.component.css'
})
export class WeaponsComponent {
  @Input() character: Character;
  weapons: Weapon[];

  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.weapons = this.character.weapons;
  }

  getWeaponData(characterId: string): Observable<any> {
    return this.http.get<any>(
      `${environment.apiEnvUrl()}${environment.characterPath}?characterId=${characterId}`);
  }

  patchWeaponData(characterId: string, columnName: string,
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

  postWeaponData(): void {
    const url = `${environment.apiEnvUrl()}${environment.characterPath}`;
    const body = {};

    this.http.post<any>(url, body).subscribe((data) => {
      // console.log(data.status);
    });
  }
}
