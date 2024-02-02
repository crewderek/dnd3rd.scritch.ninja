import { Injectable } from '@angular/core';
import * as gendersJSON from '../../assets/genders.json'

@Injectable({
  providedIn: 'root'
})
export class GenderHelperService {
  private genders = gendersJSON.genders;

  constructor() {}

  getGenders() {
    return this.genders;
  }

  selectRandomGender(): string {
    // const randomIndex = Math.floor(Math.random() * this.genders.length);
    const randomIndex = Math.floor(Math.random() * 2);
    return this.genders[randomIndex].name;
  }
}
