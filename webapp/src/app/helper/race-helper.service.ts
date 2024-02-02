import { Injectable } from '@angular/core';
import * as racesJson from '../../assets/races.json'

@Injectable({
  providedIn: 'root'
})
export class RaceHelperService {
  private races = racesJson.races;

  constructor() {}

  getRaces() {
    return this.races;
  }

  selectRandomRace(): string {
    const randomIndex = Math.floor(Math.random() * this.races.length);
    return this.races[randomIndex].name;
  }
}
